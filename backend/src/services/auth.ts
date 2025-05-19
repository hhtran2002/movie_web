
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../models/user";
import { AppDataSource } from "../config/db";

export class AuthService {
    static async register({ name, email, password, phone }: { name: string; email: string; password: string; phone: string }) {
        const userRepository = AppDataSource.getRepository(User);

        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            throw new Error("Email đã tồn tại");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = userRepository.create({
            name,
            email,
            password: hashedPassword,
            phone
        });

        await userRepository.save(newUser);
        return newUser;
    }

    static async login({ email, password }: { email: string; password: string }) {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ email });

        if (!user) {
            throw new Error("Email hoặc mật khẩu không đúng");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Email hoặc mật khẩu không đúng");
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || "secret_key",
            { expiresIn: "1h" }
        );

        return token;
    }

    static async forgotPassword(email: string) {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ email });

        if (!user) {
            throw new Error("Email không tồn tại");
        }

        const resetToken = jwt.sign(
            { userId: user.id },
            process.env.RESET_SECRET || "reset_secret_key",
            { expiresIn: "15m" }
        );

        user.resetToken = resetToken;
        user.resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000);
        await userRepository.save(user);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Đặt lại mật khẩu",
            text: `Nhấp vào liên kết sau để đặt lại mật khẩu: http://localhost:5000/reset-password?token=${resetToken}\nLưu ý: Link chỉ có hiệu lực trong 15 phút.`
        };

        await transporter.sendMail(mailOptions);

        return true;
    }

    static async resetPassword(token: string, newPassword: string) {
        let decoded: any;
        try {
            decoded = jwt.verify(token, process.env.RESET_SECRET || "reset_secret_key");
        } catch (err) {
            throw new Error("Token không hợp lệ hoặc đã hết hạn");
        }

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: decoded.userId });

        if (!user) {
            throw new Error("Không tìm thấy người dùng");
        }

        if (user.resetToken !== token || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
            throw new Error("Token không hợp lệ hoặc đã hết hạn");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;

        await userRepository.save(user);

        return true;
    }
}

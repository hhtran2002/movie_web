import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../models/User";
import { AppDataSource } from "../config/db";
import { validationResult } from "express-validator";

export class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        // Kiểm tra lỗi từ express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { name, email, password, phone } = req.body;
        const userRepository = AppDataSource.getRepository(User);

        try {
            const existingUser = await userRepository.findOneBy({ email });
            if (existingUser) {
                res.status(400).json({ message: "Email đã tồn tại" });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = userRepository.create({
                name,
                email,
                password: hashedPassword,
                phone
            });

            await userRepository.save(newUser);
            res.status(201).json({ message: "Đăng ký thành công", user: newUser });
        } catch (error: any) {
            res.status(500).json({ message: "Lỗi server", error: error.message });
        }
    }


    // Đăng nhập
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            // Lấy repository của User
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ email });

            // Nếu không tìm thấy user
            if (!user) {
                res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });
                return;
            }

            // So sánh mật khẩu
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });
                return;
            }

            // Tạo token JWT
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                "secret_key", // Đổi "secret_key" thành biến môi trường trong production
                { expiresIn: "1h" }
            );

            res.status(200).json({ message: "Đăng nhập thành công", token });
        } catch (error: any) {
            res.status(500).json({ message: "Lỗi server", error: error.message });
        }
    }

    // Quên mật khẩu: Tạo token đặt lại mật khẩu và gửi email
    static async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ email });
  
            if (!user) {
                res.status(404).json({ message: "Email không tồn tại" });
                return;
            }
  
            // Tạo token reset mật khẩu với thời gian hết hạn 15 phút
            const resetToken = jwt.sign({ userId: user.id }, process.env.RESET_SECRET || "reset_secret_key", { expiresIn: "15m" });
  
            // Cập nhật token và thời gian hết hạn vào user
            user.resetToken = resetToken;
            user.resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 phút sau
            await userRepository.save(user);
  
            // Cấu hình Nodemailer
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER, // Ví dụ: your-email@gmail.com
                    pass: process.env.EMAIL_PASS  // Ví dụ: app password hoặc mật khẩu email
                }
            });
  
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Đặt lại mật khẩu",
                text: `Nhấp vào liên kết sau để đặt lại mật khẩu: http://localhost:3000/reset-password?token=${resetToken}\nLưu ý: Link chỉ có hiệu lực trong 15 phút.`
            };
  
            await transporter.sendMail(mailOptions);
  
            res.status(200).json({ message: "Vui lòng kiểm tra email để đặt lại mật khẩu" });
        } catch (error: any) {
            res.status(500).json({ message: "Lỗi server", error: error.message });
        }
    }


    // Đặt lại mật khẩu: Xác thực token và cập nhật mật khẩu mới
    static async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { token, newPassword } = req.body;
  
            if (!token || !newPassword) {
                res.status(400).json({ message: "Token và mật khẩu mới là bắt buộc" });
                return;
            }
  
            let decoded: any;
            try {
                decoded = jwt.verify(token, process.env.RESET_SECRET || "reset_secret_key");
            } catch (err) {
                res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
                return;
            }
  
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ id: decoded.userId });
  
            if (!user) {
                res.status(404).json({ message: "Không tìm thấy người dùng" });
                return;
            }
  
            // Kiểm tra token có khớp và chưa hết hạn
            if (user.resetToken !== token || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
                res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
                return;
            }
  
            // Mã hóa mật khẩu mới
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;

            // Xóa reset token sau khi đặt lại mật khẩu thành công
            user.resetToken = undefined;
            user.resetTokenExpires = undefined;

            await userRepository.save(user);

  
            res.status(200).json({ message: "Mật khẩu đã được đặt lại thành công" });
        } catch (error: any) {
            res.status(500).json({ message: "Lỗi server", error: error.message });
        }
    }
}

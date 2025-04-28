
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { AuthService } from "../services/AuthService";

export class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        try {
            const newUser = await AuthService.register(req.body);
            res.status(201).json({ message: "Đăng ký thành công", user: newUser });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const token = await AuthService.login(req.body);
            res.status(200).json({ message: "Đăng nhập thành công", token });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            await AuthService.forgotPassword(req.body.email);
            res.status(200).json({ message: "Vui lòng kiểm tra email để đặt lại mật khẩu" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { token, newPassword } = req.body;
            await AuthService.resetPassword(token, newPassword);
            res.status(200).json({ message: "Mật khẩu đã được đặt lại thành công" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

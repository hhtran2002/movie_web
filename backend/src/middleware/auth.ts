import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/db";
import { User } from "../models/user";

export interface AuthRequest extends Request {
  user?: User;
}

export const authenticate: RequestHandler = async (req, res, next) => {
  const authReq = req as unknown as AuthRequest;
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    // Gọi res rồi return; — không return giá trị gì
    res.status(401).json({ message: "Thiếu token xác thực" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret_key"
    );
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: payload.userId });
    if (!user) {
      res.status(401).json({ message: "Người dùng không tồn tại" });
      return;
    }
    authReq.user = user;
    next();  // tiếp tục qua controller
  } catch (err) {
    res.status(401).json({ message: "Token không hợp lệ hoặc hết hạn" });
    return;
  }
};

// backend/src/controllers/UserController.ts
import { Response } from "express";
import { AuthRequest } from "../middleware/auth";

export class UserController {
  static getAccount(req: AuthRequest, res: Response) {
    const u = req.user!;
    res.json({
      user: {
        id: u.id,
        username: u.name,
        email: u.email,
      },
    });
  }
}

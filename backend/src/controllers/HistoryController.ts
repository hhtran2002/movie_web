// backend/src/controllers/HistoryController.ts
import { Response } from "express";
import { AuthRequest } from "../middleware/auth";

export class HistoryController {
  static async getHistory(req: AuthRequest, res: Response) {
    // TODO: nếu có dùng DB, fetch từ repository History theo userId: req.user!.id
    const mock = [
      {
        id: 1,
        watchedAt: new Date(Date.now() - 86400000).toISOString(),
        Movie: { id: 101, name: "Avengers: Endgame" },
      },
      {
        id: 2,
        watchedAt: new Date().toISOString(),
        Episode: { id: 5, ep_number: 5 },
        Movie: { id: 102, name: "Stranger Things" },
      },
    ];
    res.json(mock);
  }
}

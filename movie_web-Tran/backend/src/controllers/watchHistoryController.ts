import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { WatchHistory } from "../models/WatchHistory";

export const saveWatchHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id, movie_id, ep_number, watch_time } = req.body;
        const historyRepo = AppDataSource.getRepository(WatchHistory);
        const history = historyRepo.create({ user: { id: user_id }, movie: { id: movie_id }, ep_number, watch_time });
        await historyRepo.save(history);

        res.status(201).json({ message: "Lịch sử xem đã được lưu!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

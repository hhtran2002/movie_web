import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Rating } from "../models/Rating";

export const addRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id, movie_id, rating, review } = req.body;
        const ratingRepo = AppDataSource.getRepository(Rating);
        const newRating = ratingRepo.create({ user: { id: user_id }, movie: { id: movie_id }, rating, review });
        await ratingRepo.save(newRating);

        res.status(201).json({ message: "Đánh giá thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

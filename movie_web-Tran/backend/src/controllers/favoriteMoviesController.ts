import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { FavoriteMovies } from "../models/FavoriteMovies";

export const addFavoriteMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id, movie_id } = req.body;
        const favoriteRepo = AppDataSource.getRepository(FavoriteMovies);
        const favorite = favoriteRepo.create({ user: { id: user_id }, movie: { id: movie_id } });
        await favoriteRepo.save(favorite);

        res.status(201).json({ message: "Đã thêm vào danh sách yêu thích!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

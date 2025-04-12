import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Movie } from "../models/Movie";
import { Episode } from "../models/Episode";

// Lấy danh sách phim
export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const movieRepo = AppDataSource.getRepository(Movie);
        const movies = await movieRepo.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

// Lấy chi tiết phim theo ID
export const getMovieDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const movieRepo = AppDataSource.getRepository(Movie);
        const movie = await movieRepo.findOne({ where: { id: Number(req.params.id) } });

        if (!movie) {
            res.status(404).json({ message: "Phim không tồn tại" });
            return;
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

// Lấy danh sách tập phim theo movie_id
export const getEpisodesByMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const movieId = Number(req.params.id);
        const movieRepo = AppDataSource.getRepository(Movie);
        const episodeRepo = AppDataSource.getRepository(Episode);

        const movie = await movieRepo.findOne({ where: { id: movieId } });
        if (!movie) {
            res.status(404).json({ message: "Phim không tồn tại" });
            return;
        }

        const episodes = await episodeRepo.find({ where: { movie } });

        if (episodes.length === 0) {
            res.status(404).json({ message: "Không có tập phim" });
            return;
        }
        res.status(200).json(episodes);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

// Tìm kiếm phim theo tên
export const searchMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const keyword = req.params.keyword;
        const movieRepo = AppDataSource.getRepository(Movie);
        const movies = await movieRepo.createQueryBuilder("movie")
            .where("movie.name LIKE :keyword", { keyword: `%${keyword}%` })
            .getMany();

        if (movies.length === 0) {
            res.status(404).json({ message: "Không tìm thấy phim" });
            return;
        }
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

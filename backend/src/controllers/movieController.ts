import { Request, Response } from "express";

export const getMovies = async (req: Request, res: Response) => {
    res.json({ message: "Lấy danh sách phim thành công!" });
};

export const getMovieById = async (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({ message: `Lấy phim có ID: ${id}` });
};

export const createMovie = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    res.json({ message: `Phim "${name}" đã được tạo!`, description });
};

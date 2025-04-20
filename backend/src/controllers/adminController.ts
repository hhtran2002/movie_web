import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Movie } from "../models/Movie";
import { User } from "../models/User";
import { Comment } from "../models/Comment";

// Tạo mới phim
export const createMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieRepo = AppDataSource.getRepository(Movie);
    const newMovie = movieRepo.create(req.body);
    await movieRepo.save(newMovie);
    res.status(201).json({ message: "Thêm phim thành công", movie: newMovie });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi thêm phim", error: err });
  }
};

// Cập nhật phim
export const updateMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieRepo = AppDataSource.getRepository(Movie);
    const movie = await movieRepo.findOneBy({ id: Number(req.params.id) });

    if (!movie) {
      res.status(404).json({ message: "Phim không tồn tại" });
      return;
    }

    movieRepo.merge(movie, req.body);
    const result = await movieRepo.save(movie);
    res.status(200).json({ message: "Cập nhật thành công", movie: result });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật phim", error: err });
  }
};

// Xóa phim
export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieRepo = AppDataSource.getRepository(Movie);
    const result = await movieRepo.delete({ id: Number(req.params.id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Phim không tồn tại" });
      return;
    }

    res.status(200).json({ message: "Xóa phim thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa phim", error: err });
  }
};

// Lấy danh sách người dùng
export const getAllUsers = async (_: Request, res: Response): Promise<void> => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const users = await userRepo.find({ relations: ["userType"] });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng", error: err });
  }
};

// Xóa người dùng
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const result = await userRepo.delete({ id: Number(req.params.id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Người dùng không tồn tại" });
      return;
    }

    res.status(200).json({ message: "Xóa người dùng thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa người dùng", error: err });
  }
};

// Xóa bình luận
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const commentRepo = AppDataSource.getRepository(Comment);
    const result = await commentRepo.delete({ id: Number(req.params.id) });

    if (result.affected === 0) {
      res.status(404).json({ message: "Bình luận không tồn tại" });
      return;
    }

    res.status(200).json({ message: "Xóa bình luận thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa bình luận", error: err });
  }
};

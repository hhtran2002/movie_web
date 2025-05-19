import { Request, Response } from "express";
import {
  getAllMoviesService,
  createMovieService,
  updateMovieService,
  deleteMovieService,
  createEpisodeService,
  deleteEpisodeService
} from "../services/admin";

// API lấy danh sách phim
export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await getAllMoviesService();
    res.status(200).json(movies);
  } catch (err: any) {
    console.error("Lỗi khi lấy danh sách phim:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách phim", error: err.message });
  }
};

// Tạo mới phim
export const createMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const newMovie = await createMovieService(req.body);
    res.status(201).json({ message: "Thêm phim thành công", movie: newMovie });
  } catch (err: any) {
    console.error("Lỗi khi thêm phim:", err);
    res.status(500).json({ message: "Lỗi khi thêm phim", error: err.message });
  }
};

// Cập nhật phim
export const updateMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = await updateMovieService(Number(req.params.id), req.body);
    if (!movie) {
      res.status(404).json({ message: "Phim không tồn tại" });
      return;
    }
    res.status(200).json({ message: "Cập nhật thành công", movie });
  } catch (err: any) {
    console.error("Lỗi khi cập nhật phim:", err);
    res.status(500).json({ message: "Lỗi khi cập nhật phim", error: err.message });
  }
};

// Xóa phim
export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deleteMovieService(Number(req.params.id));
    if (result.affected === 0) {
      res.status(404).json({ message: "Phim không tồn tại" });
      return;
    }
    res.status(200).json({ message: "Xóa phim thành công" });
  } catch (err: any) {
    console.error("Lỗi khi xóa phim:", err);
    if (err.message.includes("foreign key constraint")) {
      res.status(400).json({ message: "Không thể xóa phim vì có tập phim liên quan" });
    } else {
      res.status(500).json({ message: "Lỗi khi xóa phim", error: err.message });
    }
  }
};

// Tạo tập phim
export const createEpisode = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEpisode = await createEpisodeService(req.body);
    res.status(201).json({ message: "Thêm tập phim thành công", episode: newEpisode });
  } catch (err: any) {
    console.error("Lỗi khi thêm tập phim:", err);
    res.status(500).json({ message: "Lỗi khi thêm tập phim", error: err.message });
  }
};

// Xóa tập phim
export const deleteEpisode = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deleteEpisodeService(Number(req.params.id));
    if (result.affected === 0) {
      res.status(404).json({ message: "Tập phim không tồn tại" });
      return;
    }
    res.status(200).json({ message: "Xóa tập phim thành công" });
  } catch (err: any) {
    console.error("Lỗi khi xóa tập phim:", err);
    res.status(500).json({ message: "Lỗi khi xóa tập phim", error: err.message });
  }
};
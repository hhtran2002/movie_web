import { Router } from "express";
import { getMovies, getMovieById, createMovie } from "../controllers/movieController";

const router = Router();

// Lấy danh sách phim
router.get("/", getMovies);

// Lấy chi tiết phim theo ID
router.get("/:id", getMovieById);

// Thêm phim mới
router.post("/", createMovie);

export default router;

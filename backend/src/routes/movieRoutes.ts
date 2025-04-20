import express, { Request, Response } from "express";
import { 
  addFavoriteMovie, 
  addRating, 
  getAllMovies, 
  getMovieDetails, 
  getMoviesByCategory, 
  searchMovies, 
  saveWatchHistory, 
  getEpisodeById,
  watchEpisode,
  getEpisodesByMovie
} from "../controllers/movieController";

const router = express.Router();

// Lấy tất cả phim
router.get("/", getAllMovies);

// Các route cụ thể phải đặt trước
router.get("/category/:name", getMoviesByCategory);
router.get("/search/:keyword", searchMovies);
router.get("/episodes/:id", getEpisodeById);           // Lấy 1 tập phim
router.get("/watch/:id", watchEpisode);                // Xem tập phim (trả về ep_link)
router.get("/movie/:id/episodes", getEpisodesByMovie); // Lấy danh sách tập phim theo movie

// Các route POST
router.post("/favorites", addFavoriteMovie);
router.post("/ratings", addRating);
router.post("/watch-history", saveWatchHistory);

// Route chung nhất (lấy chi tiết phim)
router.get("/:id", getMovieDetails);

export default router;

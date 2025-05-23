import express from "express";
import {
  addRating,
  getAllMovies,
  getEpisodeById,
  getMovieDetails,
  saveWatchHistory,
  getMoviesByCategory,
  getSingleEpisodeMovies,
  getSeriesMovies,
  getRatingById,
  watchEpisode,
  getEpisodesByMovie,
  search
} from "../controllers/movie"; 

const router = express.Router();

// --- GET Routes ---
router.get("/", getAllMovies);
router.get("/category/:name", getMoviesByCategory);                   
router.get("/episodes/:id", getEpisodeById);
router.get("/watch/:id", watchEpisode);
router.get("/movie/:id/episodes", getEpisodesByMovie);
router.get("/details/:id", getMovieDetails);
router.get("/phimle", getSingleEpisodeMovies);
router.get("/phimbo", getSeriesMovies);
router.get("/danhgia/:id", getRatingById);

// --- POST Routes ---
router.post("/ratings", addRating);
router.post("/watch-history", saveWatchHistory);
router.get("/search", search);
// --- Route chung nhất ---
router.get("/:id", getMovieDetails);

export default router;

import express from "express";
import { addFavoriteMovie, addRating, getAllMovies, getEpisodeById, getMovieDetails, saveWatchHistory, searchMovies, getMoviesByCategory } from "../controllers/movieController";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/category/:name", getMoviesByCategory);
router.get("/search/:keyword", searchMovies);
router.get("/:id", getMovieDetails);
router.get("/episodes/:id", getEpisodeById);
router.post("/favorites", addFavoriteMovie);
router.post("/ratings", addRating);
router.post("/watch-history", saveWatchHistory);
export default router;
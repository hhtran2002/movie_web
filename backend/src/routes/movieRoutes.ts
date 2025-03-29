import { Router } from "express";
import { getAllMovies, getMovieDetails, getEpisodesByMovie, searchMovies } from "../controllers/movieController";
import { saveWatchHistory } from "../controllers/watchHistoryController";
import { addFavoriteMovie } from "../controllers/favoriteMoviesController";
import { addRating } from "../controllers/ratingController";

const router = Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieDetails);
router.get("/:id/episodes", getEpisodesByMovie);
router.get("/search/:keyword", searchMovies);

router.post("/watch-history", saveWatchHistory);
router.post("/favorites", addFavoriteMovie);
router.post("/ratings", addRating);

export default router;

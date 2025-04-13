import { Router } from "express";
import { addFavoriteMovie, addRating, getAllMovies, getEpisodeById, getMovieDetails, saveWatchHistory, searchMovies } from "../controllers/movieController";

const router = Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieDetails);
router.get("/episodes/:id", getEpisodeById);
router.get("/search/:keyword", searchMovies);

router.post("/watch-history", saveWatchHistory);
router.post("/favorites", addFavoriteMovie);
router.post("/ratings", addRating);

export default router;

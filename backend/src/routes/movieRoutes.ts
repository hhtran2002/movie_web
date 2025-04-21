import express from "express";
import { addFavoriteMovie, addRating, getAllMovies, getEpisodeById, 
    getMovieDetails, saveWatchHistory, searchMovies, getMoviesByCategory, 
    getSingleEpisodeMovies, getSeriesMovies , getRatingById } from "../controllers/movieController";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/category/:name", getMoviesByCategory);
router.get("/search/:keyword", searchMovies);
router.get("/details/:id", getMovieDetails);
router.get("/episodes/:id", getEpisodeById);
router.get("/phimle", getSingleEpisodeMovies);
router.get("/phimbo", getSeriesMovies);
router.get("/danhgia/:id", getRatingById);

router.post("/favorites", addFavoriteMovie);
router.post("/ratings", addRating);
router.post("/watch-history", saveWatchHistory);


export default router;
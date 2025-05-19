import express from "express";
import {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  createEpisode,
  deleteEpisode
} from "../controllers/admin";

const router = express.Router();

// Movie management
router.get("/movies", getAllMovies);
router.post("/movies", createMovie);
router.put("/movies/:id", updateMovie);
router.delete("/movies/:id", deleteMovie);

// Episode management
router.post("/episodes", createEpisode);
router.delete("/episodes/:id", deleteEpisode);

export default router;
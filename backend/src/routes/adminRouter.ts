import express from "express";
import {
  createMovie,
  updateMovie,
  deleteMovie,
  getAllUsers,
  deleteUser,
  deleteComment
} from "../controllers/adminController";

const router = express.Router();

// Movie management
router.post("/movies", createMovie);
router.put("/movies/:id", updateMovie);
router.delete("/movies/:id", deleteMovie);

// User management
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// Comment management
router.delete("/comments/:id", deleteComment);

export default router;

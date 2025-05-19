// src/routes/ratingRoutes.ts
import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { AppDataSource } from "../config/db";
import { Rating } from "../models/rating";
import { Movie } from "../models/movie";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

// POST /api/ratings
router.post(
  "/",
  authenticate,
  [
    body("movieId").isInt({ gt: 0 }).withMessage("movieId phải là số nguyên dương"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("rating phải trong khoảng 1–5"),
    body("review").isString().trim().notEmpty().withMessage("review không được để trống"),
  ],
  async (req: Request, res: Response): Promise<void> => {
    // 1. Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // 2. Ép kiểu để TS biết req.user là User
    const authReq = req as unknown as AuthRequest;
    const user = authReq.user!;

    const { movieId, rating, review } = req.body;
    try {
      // 3. Tìm phim
      const movieRepo = AppDataSource.getRepository(Movie);
      const movie = await movieRepo.findOneBy({ id: movieId });
      if (!movie) {
        res.status(404).json({ message: "Phim không tồn tại" });
        return;
      }

      // 4. Tạo và lưu rating
      const ratingRepo = AppDataSource.getRepository(Rating);
      const newRating = ratingRepo.create({ rating, review, user, movie });
      const saved = await ratingRepo.save(newRating);

      res.status(201).json(saved);
      return;
    } catch (err) {
      console.error("Error creating rating:", err);
      res.status(500).json({ message: "Lỗi server" });
      return;
    }
  }
);

// GET /api/ratings/movie/:movieId
router.get(
  "/movie/:movieId",
  [
    param("movieId").isInt({ gt: 0 }).withMessage("movieId phải là số nguyên dương"),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const movieId = Number(req.params.movieId);
    try {
      const ratingRepo = AppDataSource.getRepository(Rating);
      const ratings = await ratingRepo.find({
        where: { movie: { id: movieId } },
        relations: ["user"],
        order: { id: "DESC" },
      });

      res.json(ratings);
      return;
    } catch (err) {
      console.error("Error fetching ratings:", err);
      res.status(500).json({ message: "Lỗi server" });
      return;
    }
  }
);

export default router;

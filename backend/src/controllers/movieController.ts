// controllers/movieController.ts

import { Request, Response, NextFunction } from "express";
import {
  getAllMoviesService,
  getMovieDetailsService,
  getSingleEpisodeMoviesService,
  getSeriesMoviesService,
  getMoviesByCategoryService,
  searchMoviesService,
  addRatingService,
  saveWatchHistoryService,
  getEpisodeByIdService,
  getEpisodesByMovieService,
  getRatingByMovieIdService
} from "../services/movieService";

// Lấy tất cả phim
export const getAllMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movies = await getAllMoviesService();
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

export const getMovieDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movieId = parseInt(req.params.id);
    const movie = await getMovieDetailsService(movieId);
    res.json(movie);
  } catch (err) {
    next(err);
  }
};

export const getSingleEpisodeMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movies = await getSingleEpisodeMoviesService();
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

export const getSeriesMovies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movies = await getSeriesMoviesService();
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

export const getMoviesByCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name } = req.params;
    const movies = await getMoviesByCategoryService(name);
    res.json(movies);
  } catch (err) {
    next(err);
  }
};


export const addRating = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, movieId, rating, review } = req.body;
    const result = await addRatingService(userId, movieId, rating, review);
    if (!result) {
      res.status(400).json({ message: "User already rated this movie." });
    } else {
      res.status(201).json(result);
    }
  } catch (err) {
    next(err);
  }
};

export const saveWatchHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, movieId, epNumber, watchTime } = req.body;
    const history = await saveWatchHistoryService(userId, movieId, epNumber, watchTime);
    res.status(201).json(history);
  } catch (err) {
    next(err);
  }
};

export const getEpisodeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const episodeId = parseInt(req.params.id);
    const episode = await getEpisodeByIdService(episodeId);
    res.json(episode);
  } catch (err) {
    next(err);
  }
};

export const watchEpisode = getEpisodeById; // hoặc viết riêng nếu cần xử lý khác

export const getEpisodesByMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movieId = parseInt(req.params.id);
    const episodes = await getEpisodesByMovieService(movieId);
    res.json(episodes);
  } catch (err) {
    next(err);
  }
};

export const getRatingById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movieId = parseInt(req.params.id);
    const ratings = await getRatingByMovieIdService(movieId);
    res.json(ratings);
  } catch (err) {
    next(err);
  }
};

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const q = (req.query.query as string || "").trim();
  if (!q) {
    res.status(400).json({ message: "Thiếu tham số query" });
    return;
  }

  try {
    const movies = await searchMoviesService(q);
    res.json(movies);
  } catch (err) {
    console.error("Error searching movies:", err);
    res.status(500).json({ message: "Lỗi server khi tìm kiếm phim" });
  }
};
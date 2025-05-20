
import { AppDataSource } from "../config/db";
import { Movie } from "../models/Movie";
import { Episode } from "../models/Episode";
import { Rating } from "../models/Rating";
import { WatchHistory } from "../models/WatchHistory";
import { MoreThan } from "typeorm";

export const getAllMoviesService = async () => {
  const movieRepo = AppDataSource.getRepository(Movie);
  return movieRepo.find({ relations: ["genres", "categories", "countries"] });
};

export const getSingleEpisodeMoviesService = async () => {
  const movieRepo = AppDataSource.getRepository(Movie);
  return movieRepo.find({ where: { total_ep: 1 } });
};

export const getSeriesMoviesService = async () => {
  const movieRepo = AppDataSource.getRepository(Movie);
  return movieRepo.find({ where: { total_ep: MoreThan(1) } });
};

export const getRatingByMovieIdService = async (movieId: number) => {
  const ratingRepo = AppDataSource.getRepository(Rating);
  return ratingRepo.find({
    where: { movie: { id: movieId } },
    relations: ["user"],
  });
};

export const getMovieDetailsService = async (movieId: number) => {
  const movieRepo = AppDataSource.getRepository(Movie);
  return movieRepo.findOne({
    where: { id: movieId },
    relations: ["genres", "categories", "countries", "episodes"],
  });
};

export const getMoviesByCategoryService = async (categoryName: string) => {
  const movieRepo = AppDataSource.getRepository(Movie);
  const result = await movieRepo
    .createQueryBuilder("movie")
    .innerJoinAndSelect("movie.categories", "category")
    .where("category.name = :categoryName", { categoryName })
    .getMany();

  console.log("Kết quả:", result); 
  return result;
};


export const searchMoviesService = async (keyword: string) => {
  const movieRepo = AppDataSource.getRepository(Movie);
  return movieRepo
    .createQueryBuilder("movie")
    .where("movie.name LIKE :keyword", { keyword: `%${keyword}%` })
    .getMany();
};

export const addRatingService = async (userId: number, movieId: number, rating: number, review?: string) => {
  const ratingRepo = AppDataSource.getRepository(Rating);

  const existed = await ratingRepo.findOne({
    where: { user: { id: userId }, movie: { id: movieId } }
  });

  if (existed) return null;

  const newRating = ratingRepo.create({ user: { id: userId }, movie: { id: movieId }, rating, review });
  return ratingRepo.save(newRating);
};

export const saveWatchHistoryService = async (
  userId: number,
  movieId: number,
  epNumber: number,
  watchTime: string
) => {
  const historyRepo = AppDataSource.getRepository(WatchHistory);
  const history = historyRepo.create({
    user: { id: userId },
    movie: { id: movieId },
    ep_number: epNumber,
    watch_time: watchTime,
  });

  return historyRepo.save(history);
};


export const getEpisodeByIdService = async (episodeId: number) => {
  const episodeRepo = AppDataSource.getRepository(Episode);
  return episodeRepo.findOne({
    where: { id: episodeId },
    relations: ["movie"],
  });
};

export const getEpisodesByMovieService = async (movieId: number) => {
  const episodeRepo = AppDataSource.getRepository(Episode);
  return episodeRepo.find({
    where: { movie: { id: movieId } },
    order: { ep_number: "ASC" },
  });
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const movieRepo = AppDataSource.getRepository(Movie);
  return movieRepo
    .createQueryBuilder("movie")
    .where("movie.name LIKE :q", { q: `%${query}%` })
    .orWhere("movie.description LIKE :q", { q: `%${query}%` })
    .orderBy("movie.title", "ASC")
    .getMany();
};
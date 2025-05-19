import { AppDataSource } from "../config/db";
import { Movie } from "../models/movie";
import { Episode } from "../models/episode";

export const getAllMoviesService = async () => {
  const movieRepo = AppDataSource.getRepository(Movie);
  return await movieRepo.find({
    relations: ["genres"],
  });
};

export const createMovieService = async (data: Partial<Movie>) => {
  const movieRepo = AppDataSource.getRepository(Movie);
  const newMovie = movieRepo.create(data);
  return await movieRepo.save(newMovie);
};

export const updateMovieService = async (id: number, data: Partial<Movie>) => {
  const movieRepo = AppDataSource.getRepository(Movie);
  const movie = await movieRepo.findOneBy({ id });
  if (!movie) return null;
  movieRepo.merge(movie, data);
  return await movieRepo.save(movie);
};

export const deleteMovieService = async (id: number) => {
  const movieRepo = AppDataSource.getRepository(Movie);
  const episodeRepo = AppDataSource.getRepository(Episode);

  // Xóa các tập phim liên quan trước
  await episodeRepo.delete({ movie: { id } });

  return await movieRepo.delete({ id });
};

export const createEpisodeService = async (data: { ep_link: string; ep_number: number; movieId: number }) => {
  const movieRepo = AppDataSource.getRepository(Movie);
  const episodeRepo = AppDataSource.getRepository(Episode);

  const movie = await movieRepo.findOneBy({ id: data.movieId });
  if (!movie) throw new Error("Không tìm thấy phim");

  const newEpisode = episodeRepo.create({
    ep_link: data.ep_link,
    ep_number: data.ep_number,
    movie: movie,
  });

  return await episodeRepo.save(newEpisode);
};

export const deleteEpisodeService = async (id: number) => {
  const episodeRepo = AppDataSource.getRepository(Episode);
  const result = await episodeRepo.delete({ id });
  if (result.affected === 0) throw new Error("Tập phim không tồn tại");
  return result;
};
import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Movie } from "../models/Movie";
import { Episode } from "../models/Episode";
import { FavoriteMovies } from "../models/FavoriteMovies";
import { Rating } from "../models/Rating";
import { WatchHistory } from "../models/WatchHistory";
import { pool } from "mssql";
import { MoreThan } from "typeorm";

// Lấy danh sách phim
export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const movieRepo = AppDataSource.getRepository(Movie);
        const movies = await movieRepo.find({
          relations: ["genres", "categories", "countries"], // nếu cần
        });
        res.status(200).json(movies);
    } catch (error) {
        console.error("Error fetching movies", error);
        res.status(500).json({ message: "Lỗi server", error });
    }
};


export const getSingleEpisodeMovies = async (req: Request, res: Response): Promise<void>  => {
  try {
    const movieRepo = AppDataSource.getRepository(Movie);
    
    const movies = await movieRepo.find({
      where: { total_ep: 1 },
    });

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching single-episode movies:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const getSeriesMovies = async (req: Request, res: Response): Promise<void>  => {
  try {
    const movieRepo = AppDataSource.getRepository(Movie);
    
    const movies = await movieRepo.find({
      where: { total_ep: MoreThan(1) },
    });

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching series movies:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const getRatingById = async (req: Request, res: Response): Promise<void> => {
  const movieId = parseInt(req.params.id);

  try {
    const ratingRepo = AppDataSource.getRepository(Rating);
    
    const ratings = await ratingRepo.find({
      where: { movie: { id: movieId } },
      relations: [ "user"]
    });

    if (ratings.length === 0) {
      res.status(404).json({ message: "Không tìm thấy đánh giá cho phim này." });
    } else {
      res.status(200).json(ratings);
    }

  } catch (error) {
    console.error("Lỗi khi lấy đánh giá:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const movieId = parseInt(req.params.id);

  try {
    const movie = await movieRepository.findOne({
      where: { id: movieId },
      relations: ["categories", "genres", "episodes", "countries"],
    });

    if (!movie) {
      return res.status(404).json({ message: "Không tìm thấy phim" });
    }

    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy danh sách phim theo category
export const getMoviesByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
      const categoryName = req.params.name;
      const movieRepo = AppDataSource.getRepository(Movie);

      const movies = await movieRepo
      .createQueryBuilder("movie")
      .innerJoinAndSelect("movie.categories", "category")
      .where("category.name = :categoryName", { categoryName })
      .getMany();


      res.status(200).json(movies);
  } catch (error) {
      console.error("Error fetching movies by category", error);
      res.status(500).json({ message: "Lỗi server", error });
  }
};


// Lấy chi tiết phim theo ID
export const getMovieDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      const movieId = Number(req.params.id);
      const movieRepo = AppDataSource.getRepository(Movie);
      const episodeRepo = AppDataSource.getRepository(Episode);
  
      const movie = await movieRepo.findOne({ where: { id: movieId } });
  
      if (!movie) {
        res.status(404).json({ message: "Phim không tồn tại" });
        return;
      }
  
      const episodes = await episodeRepo.find({
        where: { movie: { id: movieId } },
        order: { ep_number: "ASC" },
      });
  
      res.status(200).json({ ...movie, episodes });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  };
  

// Lấy danh sách tập phim theo movie_id
export const getEpisodeById = async (req: Request, res: Response): Promise<void> => {
    try {
      const episodeId = Number(req.params.id);
      const episodeRepo = AppDataSource.getRepository(Episode);
  
      const episode = await episodeRepo.findOne({
        where: { id: episodeId },
        relations: ["movie"]
      });
  
      if (!episode) {
        res.status(404).json({ message: "Tập phim không tồn tại" });
        return;
      }
  
      res.status(200).json(episode);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  };
  

// Tìm kiếm phim theo tên
export const searchMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const keyword = req.params.keyword;
        const movieRepo = AppDataSource.getRepository(Movie);
        const movies = await movieRepo.createQueryBuilder("movie")
            .where("movie.name LIKE :keyword", { keyword: `%${keyword}%` })
            .getMany();

        if (movies.length === 0) {
            res.status(404).json({ message: "Không tìm thấy phim" });
            return;
        }
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

// Thêm phim yêu thích
export const addFavoriteMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id, movie_id } = req.body;
        const favoriteRepo = AppDataSource.getRepository(FavoriteMovies);
        const favorite = favoriteRepo.create({ user: { id: user_id }, movie: { id: movie_id } });
        await favoriteRepo.save(favorite);

        res.status(201).json({ message: "Đã thêm vào danh sách yêu thích!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

// Thêm đánh giá
export const addRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id, movie_id, rating, review } = req.body;
        const ratingRepo = AppDataSource.getRepository(Rating);
        const newRating = ratingRepo.create({ user: { id: user_id }, movie: { id: movie_id }, rating, review });
        await ratingRepo.save(newRating);

        res.status(201).json({ message: "Đánh giá thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

// Lưu lịch sử xem phim
export const saveWatchHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id, movie_id, ep_number, watch_time } = req.body;
        const historyRepo = AppDataSource.getRepository(WatchHistory);
        const history = historyRepo.create({ user: { id: user_id }, movie: { id: movie_id }, ep_number, watch_time });
        await historyRepo.save(history);

        res.status(201).json({ message: "Lịch sử xem đã được lưu!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

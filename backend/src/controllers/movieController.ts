// import { Request, Response } from "express";
// import { AppDataSource } from "../config/db";
// import { Movie } from "../models/Movie";
// import { Episode } from "../models/Episode";
// import { FavoriteMovies } from "../models/FavoriteMovies";
// import { Rating } from "../models/Rating";
// import { WatchHistory } from "../models/WatchHistory";
// // import { pool } from "mssql";
// import { MoreThan } from "typeorm";

// // Lấy danh sách phim
// export const getAllMovies = async (req: Request, res: Response): Promise<void> => {

//     try {
//         const movieRepo = AppDataSource.getRepository(Movie);
//         const movies = await movieRepo.find({
//           relations: ["genres", "categories", "countries"], // nếu cần
//         });
//         res.status(200).json(movies);
//     } catch (error) {
//         console.error("Error fetching movies", error);
//         res.status(500).json({ message: "Lỗi server", error });
//     }
// };


// export const getSingleEpisodeMovies = async (req: Request, res: Response): Promise<void>  => {
//   try {
//     const movieRepo = AppDataSource.getRepository(Movie);
    
//     const movies = await movieRepo.find({
//       where: { total_ep: 1 },
//     });

//     res.status(200).json(movies);
//   } catch (error) {
//     console.error("Error fetching single-episode movies:", error);
//     res.status(500).json({ message: "Lỗi server", error });
//   }
// };

// export const getSeriesMovies = async (req: Request, res: Response): Promise<void>  => {
//   try {
//     const movieRepo = AppDataSource.getRepository(Movie);
    
//     const movies = await movieRepo.find({
//       where: { total_ep: MoreThan(1) },
//     });

//     res.status(200).json(movies);
//   } catch (error) {
//     console.error("Error fetching series movies:", error);
//     res.status(500).json({ message: "Lỗi server", error });
//   }
// };

// export const getRatingById = async (req: Request, res: Response): Promise<void> => {
//   const movieId = parseInt(req.params.id);

//   try {
//     const ratingRepo = AppDataSource.getRepository(Rating);
    
//     const ratings = await ratingRepo.find({
//       where: { movie: { id: movieId } },
//       relations: [ "user"]
//     });

//     if (ratings.length === 0) {
//       res.status(404).json({ message: "Không tìm thấy đánh giá cho phim này." });
//     } else {
//       res.status(200).json(ratings);
//     }

//   } catch (error) {
//     console.error("Lỗi khi lấy đánh giá:", error);
//     res.status(500).json({ message: "Lỗi server", error });
//   }
// };

// export const getMovieById = async (req: Request, res: Response) => {
//   const movieRepository = AppDataSource.getRepository(Movie);
//   const movieId = parseInt(req.params.id);


//   try {
//     const movieRepo = AppDataSource.getRepository(Movie);
//     const movies = await movieRepo.find({
//       relations: ["genres", "categories", "countries"],
//     });
//     res.status(200).json(movies);
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     res.status(500).json({ message: "Lỗi server khi lấy danh sách phim", error });
//   }
// };

// // Lấy chi tiết phim theo ID
// export const getMovieDetails = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const movieId = Number(req.params.id);
//     if (isNaN(movieId)) {
//       res.status(400).json({ message: "ID phim không hợp lệ" });
//       return;
//     }

//     const movieRepo = AppDataSource.getRepository(Movie);
//     const movie = await movieRepo.findOne({
//       where: { id: movieId },
//       relations: ["genres", "categories", "countries", "episodes"],
//     });

//     if (!movie) {
//       res.status(404).json({ message: "Phim không tồn tại" });
//       return;
//     }

//     res.status(200).json(movie);
//   } catch (error) {
//     console.error("Error fetching movie details:", error);
//     res.status(500).json({ message: "Lỗi server khi lấy chi tiết phim", error });
//   }
// };

// // Lấy danh sách phim theo thể loại
// export const getMoviesByCategory = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const categoryName = req.params.name;
//     if (!categoryName) {
//       res.status(400).json({ message: "Tên thể loại không hợp lệ" });
//       return;
//     }

//     const movieRepo = AppDataSource.getRepository(Movie);
//     const movies = await movieRepo
//       .createQueryBuilder("movie")
//       .innerJoinAndSelect("movie.categories", "category")
//       .where("category.name = :categoryName", { categoryName })
//       .getMany();

//     if (movies.length === 0) {
//       res.status(404).json({ message: "Không tìm thấy phim theo thể loại" });
//       return;
//     }

//     res.status(200).json(movies);
//   } catch (error) {
//     console.error("Error fetching movies by category:", error);
//     res.status(500).json({ message: "Lỗi server khi lấy phim theo thể loại", error });
//   }
// };

// // Tìm kiếm phim theo từ khóa
// export const searchMovies = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const keyword = req.params.keyword;
//     if (!keyword) {
//       res.status(400).json({ message: "Từ khóa tìm kiếm không hợp lệ" });
//       return;
//     }

//     const movieRepo = AppDataSource.getRepository(Movie);
//     const movies = await movieRepo
//       .createQueryBuilder("movie")
//       .where("movie.name LIKE :keyword", { keyword: `%${keyword}%` })
//       .getMany();

//     if (movies.length === 0) {
//       res.status(404).json({ message: "Không tìm thấy phim theo từ khóa" });
//       return;
//     }

//     res.status(200).json(movies);
//   } catch (error) {
//     console.error("Error searching movies:", error);
//     res.status(500).json({ message: "Lỗi server khi tìm kiếm phim", error });
//   }
// };

// // Thêm phim yêu thích
// export const addFavoriteMovie = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { user_id, movie_id } = req.body;
//     if (!user_id || !movie_id) {
//       res.status(400).json({ message: "Thiếu tham số user_id hoặc movie_id" });
//       return;
//     }

//     const favoriteRepo = AppDataSource.getRepository(FavoriteMovies);

//     const existed = await favoriteRepo.findOne({
//       where: { user: { id: user_id }, movie: { id: movie_id } }
//     });
//     if (existed) {
//       res.status(400).json({ message: "Phim đã có trong danh sách yêu thích" });
//       return;
//     }

//     const favorite = favoriteRepo.create({ user: { id: user_id }, movie: { id: movie_id } });
//     await favoriteRepo.save(favorite);

//     res.status(201).json({ message: "Đã thêm vào danh sách yêu thích!" });
//   } catch (error) {
//     console.error("Error adding favorite movie:", error);
//     res.status(500).json({ message: "Lỗi server khi thêm phim yêu thích", error });
//   }
// };

// // Thêm đánh giá
// export const addRating = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { user_id, movie_id, rating, review } = req.body;
//     if (!user_id || !movie_id || rating === undefined) {
//       res.status(400).json({ message: "Thiếu tham số user_id, movie_id hoặc rating" });
//       return;
//     }

//     const ratingRepo = AppDataSource.getRepository(Rating);

//     const existed = await ratingRepo.findOne({
//       where: { user: { id: user_id }, movie: { id: movie_id } }
//     });
//     if (existed) {
//       res.status(400).json({ message: "Bạn đã đánh giá phim này rồi" });
//       return;
//     }

//     const newRating = ratingRepo.create({ user: { id: user_id }, movie: { id: movie_id }, rating, review });
//     await ratingRepo.save(newRating);

//     res.status(201).json({ message: "Đánh giá thành công!" });
//   } catch (error) {
//     console.error("Error adding rating:", error);
//     res.status(500).json({ message: "Lỗi server khi thêm đánh giá", error });
//   }
// };

// // Lưu lịch sử xem phim
// export const saveWatchHistory = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { user_id, movie_id, ep_number, watch_time } = req.body;
//     if (!user_id || !movie_id || ep_number === undefined || !watch_time) {
//       res.status(400).json({ message: "Thiếu tham số trong lịch sử xem" });
//       return;
//     }

//     const historyRepo = AppDataSource.getRepository(WatchHistory);
//     const history = historyRepo.create({ user: { id: user_id }, movie: { id: movie_id }, ep_number, watch_time });
//     await historyRepo.save(history);

//     res.status(201).json({ message: "Lịch sử xem đã được lưu!" });
//   } catch (error) {
//     console.error("Error saving watch history:", error);
//     res.status(500).json({ message: "Lỗi server khi lưu lịch sử xem", error });
//   }
// };

// // Lấy thông tin một tập phim cụ thể
// export const getEpisodeById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const episodeId = Number(req.params.id);
//     if (isNaN(episodeId)) {
//       res.status(400).json({ message: "ID tập phim không hợp lệ" });
//       return;
//     }

//     const episodeRepo = AppDataSource.getRepository(Episode);
//     const episode = await episodeRepo.findOne({
//       where: { id: episodeId },
//       relations: ["movie"],
//     });

//     if (!episode) {
//       res.status(404).json({ message: "Tập phim không tồn tại" });
//       return;
//     }

//     res.status(200).json(episode);
//   } catch (error) {
//     console.error("Error fetching episode by ID:", error);
//     res.status(500).json({ message: "Lỗi server khi lấy tập phim", error });
//   }
// };

// // API xem tập phim (chỉ trả về link)
// export const watchEpisode = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const episodeId = Number(req.params.id);
//     if (isNaN(episodeId)) {
//       res.status(400).json({ message: "ID tập phim không hợp lệ" });
//       return;
//     }

//     const episodeRepo = AppDataSource.getRepository(Episode);
//     const episode = await episodeRepo.findOne({
//       where: { id: episodeId },
//       relations: ["movie"],
//     });

//     if (!episode) {
//       res.status(404).json({ message: "Tập phim không tồn tại" });
//       return;
//     }

//     res.status(200).json({
//       ep_link: episode.ep_link,
//       ep_number: episode.ep_number,
//       movie_name: episode.movie.name
//     });
//   } catch (error) {
//     console.error("Error watching episode:", error);
//     res.status(500).json({ message: "Lỗi server khi phát tập phim", error });
//   }
// };

// // API lấy danh sách tập theo movieId
// export const getEpisodesByMovie = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const movieId = Number(req.params.id);
//     if (isNaN(movieId)) {
//       res.status(400).json({ message: "ID phim không hợp lệ" });
//       return;
//     }

//     const episodeRepo = AppDataSource.getRepository(Episode);
//     const episodes = await episodeRepo.find({
//       where: { movie: { id: movieId } },
//       order: { ep_number: "ASC" }
//     });

//     res.status(200).json(episodes);
//   } catch (error) {
//     console.error("Error fetching episodes by movie ID:", error);
//     res.status(500).json({ message: "Lỗi server khi lấy danh sách tập", error });
//   }
// };


// src/controllers/movie.controller.ts
import { Request, Response } from "express";
import * as movieService from "../services/movieService";

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await movieService.getAllMoviesService();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const getSingleEpisodeMovies = async (req: Request, res: Response) => {
  try {
    const movies = await movieService.getSingleEpisodeMoviesService();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching single-episode movies:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const getSeriesMovies = async (req: Request, res: Response) => {
  try {
    const movies = await movieService.getSeriesMoviesService();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching series movies:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const getRatingById = async (req: Request, res: Response) => {
  const movieId = Number(req.params.id);
  if (isNaN(movieId)) return res.status(400).json({ message: "ID phim không hợp lệ" });

  try {
    const ratings = await movieService.getRatingByMovieIdService(movieId);
    if (ratings.length === 0) {
      res.status(404).json({ message: "Không tìm thấy đánh giá cho phim này." });
    } else {
      res.status(200).json(ratings);
    }
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const getMovieDetails = async (req: Request, res: Response) => {
  const movieId = Number(req.params.id);
  if (isNaN(movieId)) return res.status(400).json({ message: "ID phim không hợp lệ" });

  try {
    const movie = await movieService.getMovieDetailsService(movieId);
    if (!movie) return res.status(404).json({ message: "Phim không tồn tại" });
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const getMoviesByCategory = async (req: Request, res: Response) => {
  const { name } = req.params;
  if (!name) return res.status(400).json({ message: "Tên thể loại không hợp lệ" });

  try {
    const movies = await movieService.getMoviesByCategoryService(name);
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies by category:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const searchMovies = async (req: Request, res: Response) => {
  const { keyword } = req.params;
  if (!keyword) return res.status(400).json({ message: "Từ khóa tìm kiếm không hợp lệ" });

  try {
    const movies = await movieService.searchMoviesService(keyword);
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const addFavoriteMovie = async (req: Request, res: Response) => {
  const { user_id, movie_id } = req.body;
  if (!user_id || !movie_id) return res.status(400).json({ message: "Thiếu tham số user_id hoặc movie_id" });

  try {
    const result = await movieService.addFavoriteMovieService(user_id, movie_id);
    if (!result) {
      return res.status(400).json({ message: "Phim đã có trong danh sách yêu thích" });
    }
    res.status(201).json({ message: "Đã thêm vào danh sách yêu thích!" });
  } catch (error) {
    console.error("Error adding favorite movie:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const addRating = async (req: Request, res: Response) => {
  const { user_id, movie_id, rating, review } = req.body;
  if (!user_id || !movie_id || rating === undefined) {
    return res.status(400).json({ message: "Thiếu tham số user_id, movie_id hoặc rating" });
  }

  try {
    const result = await movieService.addRatingService(user_id, movie_id, rating, review);
    if (!result) {
      return res.status(400).json({ message: "Bạn đã đánh giá phim này rồi" });
    }
    res.status(201).json({ message: "Đánh giá thành công!" });
  } catch (error) {
    console.error("Error adding rating:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const saveWatchHistory = async (req: Request, res: Response) => {
  const { user_id, movie_id, ep_number, watch_time } = req.body;
  if (!user_id || !movie_id || ep_number === undefined || !watch_time) {
    return res.status(400).json({ message: "Thiếu tham số" });
  }

  try {
    await movieService.saveWatchHistoryService(user_id, movie_id, ep_number, watch_time);
    res.status(201).json({ message: "Lịch sử xem đã được lưu!" });
  } catch (error) {
    console.error("Error saving watch history:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const getEpisodeById = async (req: Request, res: Response) => {
  const episodeId = Number(req.params.id);
  if (isNaN(episodeId)) return res.status(400).json({ message: "ID tập phim không hợp lệ" });

  try {
    const episode = await movieService.getEpisodeByIdService(episodeId);
    if (!episode) return res.status(404).json({ message: "Tập phim không tồn tại" });

    res.status(200).json(episode);
  } catch (error) {
    console.error("Error fetching episode:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const watchEpisode = async (req: Request, res: Response) => {
  const episodeId = Number(req.params.id);
  if (isNaN(episodeId)) return res.status(400).json({ message: "ID tập phim không hợp lệ" });

  try {
    const episode = await movieService.getEpisodeByIdService(episodeId);
    if (!episode) return res.status(404).json({ message: "Tập phim không tồn tại" });

    res.status(200).json({
      ep_link: episode.ep_link,
      ep_number: episode.ep_number,
      movie_name: episode.movie.name
    });
  } catch (error) {
    console.error("Error watching episode:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const getEpisodesByMovie = async (req: Request, res: Response) => {
  const movieId = Number(req.params.id);
  if (isNaN(movieId)) return res.status(400).json({ message: "ID phim không hợp lệ" });

  try {
    const episodes = await movieService.getEpisodesByMovieService(movieId);
    res.status(200).json(episodes);
  } catch (error) {
    console.error("Error fetching episodes:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

import { Router, Response, Request } from "express";
import { authenticate, AuthRequest } from "../middleware/auth";
import { AppDataSource } from "../config/db";
import { saveWatchHistoryService } from "../services/movieService";
import { WatchHistory } from "../models/WatchHistory";
import { Movie } from "../models/Movie";

const router = Router();

/**
 * GET /api/history
 * → Lấy lịch sử xem phim của người dùng
 */
router.get("/history", authenticate as any, async (req: Request, res: Response) => {
  try {
    const historyRepo = AppDataSource.getRepository(WatchHistory);
    const userId = (req as unknown as AuthRequest).user!.id;
    const history = await historyRepo.find({
      where: { user: { id: userId } },
      relations: ["movie"],
      order: { watch_time: "DESC" },
    });

    const formatted = history.map((item) => ({
      id: item.id,
      watchedAt: item.watch_time,
      Movie: { id: item.movie.id, name: item.movie.name },
      Episode: { ep_number: item.ep_number },
    }));

    res.json(formatted);
  } catch (err) {
    console.error("❌ Lỗi khi lấy lịch sử:", err);
    res.status(500).json({ message: "Lỗi khi tải lịch sử xem phim." });
  }
});

/**
 * POST /api/history/save
 * → Lưu lịch sử xem phim
 */
router.post("/history/save", authenticate as any, async (req: Request, res: Response): Promise<void> => {
  try {
    const { movieId, epNumber } = req.body;

    if (!movieId || !epNumber) {
      res.status(400).json({ message: "Thiếu thông tin." });
      return;
    }

    await saveWatchHistoryService(
      Number((req as unknown as AuthRequest).user!.id),
      movieId,
      epNumber,
      new Date().toISOString()
    );

    res.status(200).json({ message: "Đã lưu lịch sử." });
  } catch (err) {
    console.error("❌ Lỗi lưu lịch sử:", err);
    res.status(500).json({ message: "Lỗi server." });
  }
});

export default router;

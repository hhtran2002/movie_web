import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { HistoryController } from "../controllers/HistoryController";

const router = Router();
router.get("/history", HistoryController.getHistory);
export default router;

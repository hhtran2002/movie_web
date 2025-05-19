import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { UserController } from "../controllers/user";

const router = Router();
router.get(
  "/user/account",
  authenticate,
  UserController.getAccount as unknown as import("express").RequestHandler
);
export default router;

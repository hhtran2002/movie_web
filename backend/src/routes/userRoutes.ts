import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { UserController } from "../controllers/UserController";

const router = Router();
router.get("/user/account", UserController.getAccount);
export default router;

import { Router, Request, Response, NextFunction } from "express";
import { AuthController } from "../controllers/auth";
import { validateRegister } from "../middleware/validateRegister";

const router = Router();

router.post("/register", validateRegister, (req: Request, res: Response, next: NextFunction) => {
    AuthController.register(req, res).catch(next);
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    AuthController.login(req, res).catch(next);
});

router.post("/forgot-password", (req: Request, res: Response, next: NextFunction) => {
    AuthController.forgotPassword(req, res).catch(next);
});

router.post("/reset-password", (req: Request, res: Response, next: NextFunction) => {
    AuthController.resetPassword(req, res).catch(next);
});
export default router;

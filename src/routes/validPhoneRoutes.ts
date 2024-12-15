import { Router } from "express";
import { validatePhoneController } from "../controllers/validPhoneController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/validate-phone", authenticateToken, validatePhoneController);

export default router;

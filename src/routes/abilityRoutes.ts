import express from "express";
import { createAbility, updateAbility } from "../controllers/abilityController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

// Rota para criar habilidades
router.post("/", authenticateToken, createAbility);

// Rota para editar habilidades
router.put("/", authenticateToken, updateAbility);

export default router;

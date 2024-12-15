import express from "express";
import {
  createUserAbility,
  deleteUserAbilities,
  getUserAbilities,
} from "../controllers/userAbilityController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

// Endpoint para criar o relacionamento entre usuário e habilidade
router.post("/abilities", authenticateToken, createUserAbility);
router.get("/abilities", authenticateToken, getUserAbilities);
router.delete("/abilities", authenticateToken, deleteUserAbilities);

export default router;

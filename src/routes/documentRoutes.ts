import express from "express";
import multer from "multer";
import path from "path";
import { createUserDocument } from "../controllers/documentController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

// Configuração do Multer
const uploadFolder = path.join(__dirname, "../../uploads/documents");

const upload = multer({
  dest: uploadFolder,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Somente arquivos PDF são permitidos!"));
    }
    cb(null, true);
  },
});

// Rota para criar documento do usuário
router.post(
  "/documents",
  authenticateToken,
  upload.single("document"),
  createUserDocument
);

// Rota padrão para acessar arquivos
router.use("/files", authenticateToken, express.static(uploadFolder));

export default router;

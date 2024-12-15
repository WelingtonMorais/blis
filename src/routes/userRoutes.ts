import express from "express";
import { createUser, loginUser } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";
import multer from "multer";

// Configuração do Multer para upload de arquivos
const upload = multer({
  dest: "uploads/", // Pasta onde os arquivos serão armazenados
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de tamanho do arquivo (10MB)
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Somente arquivos PDF são permitidos"));
    }
    cb(null, true);
  },
});

const router = express.Router();

// Rota de criação de usuário
router.post("/create", createUser);
// Rota de login de usuário
router.post("/login", loginUser);

// Rota para upload de documentos de usuário
// router.post("/documents", authenticateToken, upload.single("document"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "Nenhum arquivo enviado" });
//   }
//   res.status(200).json({ message: "Arquivo enviado com sucesso", file: req.file });
// });

export default router;

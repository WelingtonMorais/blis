import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware para autenticar o token JWT
const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Extrai o token do cabeçalho "Authorization"
  const token = req.headers["authorization"]?.split(" ")[1]; // Exemplo: "Bearer <token>"

  if (!token) {
    res.status(403).json({ error: "Token is required" });
    return; // Garante que a função não continue
  }

  // Verifica o token usando a chave secreta configurada
  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
    if (err) {
      res.status(403).json({ error: "Invalid token" });
      return; // Garante que a função não continue
    }

    // Armazena o usuário decodificado no objeto req
    (req as any).user = user;

    next(); // Chama o próximo middleware ou controlador
  });
};

export { authenticateToken };

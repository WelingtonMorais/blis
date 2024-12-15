import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes"; // Importando as rotas de usuários
import documentRoutes from "./routes/documentRoutes";
import abilityRoutes from "./routes/abilityRoutes";
import userAbilityRoutes from "./routes/userAbilityRoutes";
import validPhoneRoutes from "./routes/validPhoneRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Usando a rota de usuários
app.use("/users", userRoutes, documentRoutes, userAbilityRoutes);
app.use("/abilities", abilityRoutes);
app.use("/phone", validPhoneRoutes);

// Outras rotas podem ser adicionadas conforme necessário
// app.use("/auth", authRoutes);
// app.use("/documents", documentRoutes);
// app.use("/abilities", abilityRoutes);
// app.use("/users/abilities", userAbilityRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

// Criação de um usuário
const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, birthdate, password } = req.body;
  console.log({ name, email, birthdate, password });
  // Verifica se o email já está registrado
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  console.log({ existingUser });

  if (existingUser) {
    res.status(400).json({ error: "Email já está em uso" });
    return;
  }

  // Criptografando a senha
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log({ hashedPassword });
  // Converte a data de nascimento para um objeto Date válido
  const birthdateObj = new Date(birthdate);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        birthdate: birthdateObj,
        password: hashedPassword,
      },
    });
    console.log({ user });

    res.status(201).json({ user });
  } catch (error) {
    // Verifica se o erro é uma instância de Error
    if (error instanceof Error) {
      console.error("Erro ao criar o usuário:", error.message);
      res
        .status(500)
        .json({ error: "Erro ao criar o usuário", details: error.message });
    } else {
      // Caso o erro não seja uma instância de Error
      console.error("Erro desconhecido:", error);
      res.status(500).json({ error: "Erro desconhecido", details: error });
    }
  }
};
// Login do usuário
const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Busca o usuário pelo e-mail
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Verifica se o usuário existe
    if (!user) {
      res.status(400).json({ error: "Credenciais inválidas" });
      return; // Encerrando após enviar a resposta
    }

    // Verifica se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ error: "Credenciais inválidas" });
      return; // Encerrando após enviar a resposta
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1h", // O token expira em 1 hora
      }
    );

    // Retorna o token
    res.status(200).json({ token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export { createUser, loginUser };

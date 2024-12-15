import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

export const createUserDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, name } = req.body;

    // Validação
    if (!req.file) {
      res.status(400).json({ error: "Nenhum arquivo enviado!" });
      return;
    }

    const documentUrl = `/files/${req.file.filename}`;

    // Inserir no banco de dados
    const userDocument = await prisma.userDocument.create({
      data: {
        name,
        url: documentUrl,
        userId,
      },
    });

    res
      .status(201)
      .json({ message: "Documento criado com sucesso!", userDocument });
  } catch (error) {
    console.error("Erro ao criar documento:", error);
    res.status(500).json({ error: "Erro ao criar documento." });
  }
};

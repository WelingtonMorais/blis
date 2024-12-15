import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Criação de habilidade
export const createAbility = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: "O campo 'name' é obrigatório." });
    return;
  }

  try {
    const ability = await prisma.ability.create({
      data: {
        name,
        active: true, // Sempre ativo por padrão
      },
    });
    res.status(201).json(ability);
  } catch (error) {
    console.error("Erro ao criar habilidade:", error);
    res.status(500).json({ error: "Erro ao criar habilidade." });
  }
};

// Edição de habilidade
export const updateAbility = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id, name, active } = req.body;

  if (!id) {
    res.status(400).json({ error: "O campo 'id' é obrigatório." });
    return;
  }

  try {
    const ability = await prisma.ability.update({
      where: { id },
      data: {
        name,
        active,
      },
    });
    res.status(200).json(ability);
  } catch (error) {
    console.error("Erro ao atualizar habilidade:", error);
    res.status(500).json({ error: "Erro ao atualizar habilidade." });
  }
};

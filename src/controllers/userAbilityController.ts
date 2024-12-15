import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUserAbility = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, abilityId, yearsExperience } = req.body;

    // Validação de anos de experiência
    if (yearsExperience < 0) {
      res.status(400).json({ error: "yearsExperience deve ser no mínimo 0." });
      return;
    }

    // Verificar se a habilidade existe e está ativa
    const ability = await prisma.ability.findUnique({
      where: { id: abilityId },
    });

    if (!ability) {
      res.status(404).json({ error: "Habilidade não encontrada." });
      return;
    }

    if (!ability.active) {
      res.status(400).json({ error: "A habilidade não está ativa." });
      return;
    }

    // Criar o relacionamento entre usuário e habilidade
    const userAbility = await prisma.usersAbilities.create({
      data: {
        userId,
        abilityId,
        yearsExperience,
      },
    });

    res.status(201).json(userAbility);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o relacionamento." });
  }
};

export const deleteUserAbilities = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userAbilityIds } = req.body;

    // Validação para garantir que os IDs foram fornecidos
    if (!Array.isArray(userAbilityIds) || userAbilityIds.length === 0) {
      res.status(400).json({
        error: "É necessário fornecer uma lista de IDs de habilidades.",
      });
      return;
    }

    // Deletar as habilidades relacionadas ao usuário
    await prisma.usersAbilities.deleteMany({
      where: {
        id: { in: userAbilityIds },
      },
    });

    res.status(200).json({ message: "Habilidades deletadas com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar as habilidades." });
  }
};

export const getUserAbilities = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Conversão para inteiros
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (pageNumber <= 0 || limitNumber <= 0) {
      res
        .status(400)
        .json({ error: "Os parâmetros page e limit devem ser maiores que 0." });
      return;
    }

    // Calcular o deslocamento (offset)
    const offset = (pageNumber - 1) * limitNumber;

    // Consultar UsersAbilities com informações de usuários e habilidades
    const userAbilities = await prisma.usersAbilities.findMany({
      skip: offset,
      take: limitNumber,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        ability: {
          select: {
            id: true,
            name: true,
            active: true,
          },
        },
      },
    });

    // Contar o total de registros para paginação
    const totalCount = await prisma.usersAbilities.count();

    res.status(200).json({
      data: userAbilities,
      pagination: {
        total: totalCount,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalCount / limitNumber),
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erro ao listar as habilidades do usuário." });
  }
};

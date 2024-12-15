import { Request, Response } from "express";
import { validatePhoneNumber } from "../services/phoneValidationService";

export const validatePhoneController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      res.status(400).json({ error: "O número de telefone é obrigatório." });
      return;
    }

    const validationData = await validatePhoneNumber(phoneNumber);

    res.status(200).json(validationData);
  } catch (error: any) {
    res.status(500).json({
      error: "Erro ao validar o número de telefone.",
      details: error.message,
    });
  }
};

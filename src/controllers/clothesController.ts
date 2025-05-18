const { PrismaClient } = require('@prisma/client');
import type { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllClothes = async (req: Request, res: Response) => {
  const clothes = await prisma.clothe.findMany();
  res.json(clothes);
};

export const getClotheToId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const clothe = await prisma.clothe.findUnique({ where: { id_clothe: id } });
    clothe
      ? res.json(clothe)
      : res.status(404).json({ error: "Vestimenta não encontrada!" });
  } catch (err) {
    res.status(500).json({
      message: "Opss! Ocorreu um erro ao obter esta vestimenta...",
      error: err,
    });
  }
};

export const registerClothe = async (req: Request, res: Response) => {
  const { description, image, favorite, category } = req.body;
  try {
    const newClothe = await prisma.clothe.create({
      data: { description, image, favorite, category },
    });
    res.status(201).json(newClothe);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Opss! Ocorreu um erro ao criar vestimenta...",
        error: err,
      });
  }
};

export const updateClothe = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, image, favorite, category } = req.body;
  try {
    const updated = await prisma.clothe.update({
      where: { id_clothe: id },
      data: { description, image, favorite, category },
    });
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Opss! Ocorreu um erro ao atualizar vestimenta...",
        error: err,
      });
  }
};

export const deleteClothe = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const clothe = await prisma.clothe.delete({ where: { id_clothe: id } });
    clothe
      ? res.json({ message: "Vestimenta deletada com sucesso!" })
      : res.status(404).json({ error: "Vestimenta não encontrada!" });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Opss! Ocorreu um erro ao deletar vestimenta...",
        error: err,
      });
  }
};

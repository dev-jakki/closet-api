const express = require('express');
const { PrismaClient } = require('@prisma/client');
import type { Request, Response } from 'express';

const router = express.Router();
const prisma = new PrismaClient();

// GET all clothes
router.get("/", async (req: Request, res: Response) => {
  const clothes = await prisma.clothe.findMany();
  res.json(clothes);
});

// GET one clothe
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const clothe = await prisma.clothe.findUnique({ where: { id_clothe: id } });
    clothe
      ? res.json(clothe)
      : res.status(404).json({ error: "Clothe not found" });
  } catch (err) {
    res.status(500).json({
      message: "Opss! Ocorreu um erro ao obter esta vestimenta...",
      error: err,
    });
  }
});

// POST create clothe
router.post("/", async (req: Request, res: Response) => {
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
});

// PUT update clothe
router.put("/:id", async (req: Request, res: Response) => {
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
});

// DELETE clothe
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.clothe.delete({ where: { id_clothe: id } });
    res.json({ message: "Clothe deletado com sucesso" });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Opss! Ocorreu um erro ao deletar vestimenta...",
        error: err,
      });
  }
});

module.exports = router;

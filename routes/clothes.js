import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET all clothes
router.get('/', async (req, res) => {
  const clothes = await prisma.clothe.findMany();
  res.json(clothes);
});

// GET one clothe
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const clothe = await prisma.clothe.findUnique({ where: { id_clothe: id } });
    clothe ? res.json(clothe) : res.status(404).json({ error: 'Clothe not found' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar clothe' });
  }
});

// POST create clothe
router.post('/', async (req, res) => {
  const { description, image, favorite, category } = req.body;
  try {
    const newClothe = await prisma.clothe.create({
      data: { description, image, favorite, category },
    });
    res.status(201).json(newClothe);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar clothe' });
  }
});

// PUT update clothe
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { description, image, favorite, category } = req.body;
  try {
    const updated = await prisma.clothe.update({
      where: { id_clothe: id },
      data: { description, image, favorite, category },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar clothe' });
  }
});

// DELETE clothe
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.clothe.delete({ where: { id_clothe: id } });
    res.json({ message: 'Clothe deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar clothe' });
  }
});

export default router;

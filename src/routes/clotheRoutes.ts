import express from 'express';
import { getAllClothes, getClotheToId, registerClothe, updateClothe, deleteClothe } from '../controllers/clothesController.js';
import { authMiddleware } from 'controllers/authMiddleware.js';

const router = express.Router();

router.get('/clothes', authMiddleware, getAllClothes);
router.get('/clothes/:id', authMiddleware, getClotheToId);
router.get('/clothes', authMiddleware, registerClothe);
router.get('/clothes/:id', authMiddleware, updateClothe);
router.get('/clothes/:id', authMiddleware, deleteClothe);

export default router;

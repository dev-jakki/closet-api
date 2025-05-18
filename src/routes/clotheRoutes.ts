import express from 'express';
import { getAllClothes, getClotheToId, registerClothe, updateClothe, deleteClothe } from '../controllers/clothesController';

const router = express.Router();

router.get('/clothes', getAllClothes);
router.get('/clothes/:id', getClotheToId);
router.get('/clothes', registerClothe);
router.get('/clothes/:id', updateClothe);
router.get('/clothes/:id', deleteClothe);

export default router;

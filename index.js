import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de Closet rodando!');
});

// Rota para listar roupas
app.get('/roupas', async (req, res) => {
  try {
    const clothes = await prisma.clothe.findMany();
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar roupas' });
  }
});

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running to successfully!`));

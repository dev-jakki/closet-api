import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rota para listar roupas
app.get('/api/roupas', async (req, res) => {
  const result = await pool.query('SELECT * FROM roupas ORDER BY id DESC');
  res.json(result.rows);
});

// Rota para adicionar roupa
app.post('/api/roupas', async (req, res) => {
  const { nome, categoria, cor, tamanho, imagemUrl, favorito } = req.body;
  const result = await pool.query(
    'INSERT INTO roupas (nome, categoria, cor, tamanho, imagemUrl, favorito) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [nome, categoria, cor, tamanho, imagemUrl, favorito]
  );
  res.json(result.rows[0]);
});

// Rota para deletar roupa
app.delete('/api/roupas/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM roupas WHERE id = $1', [id]);
  res.json({ mensagem: 'Deletado com sucesso' });
});

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rota para listar roupas
app.get('/roupas', async (req, res) => {
  const result = await pool.query('SELECT * FROM roupa ORDER BY id DESC');
  res.json(result.rows);
});

// Rota para adicionar roupa
app.post('/roupas', async (req, res) => {
  const { id_roupa, descricao, categoria, favorito } = req.body;
  const result = await pool.query(
    'INSERT INTO roupa (id_roupa, descricao, categoria, favorito) VALUES ($1, $2, $3, $4) RETURNING *',
    [id_roupa, descricao, categoria, favorito]
  );
  res.json(result.rows[0]);
});

// Rota para deletar roupa
app.delete('/roupas/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM roupa WHERE id_roupa = $1', [id]);
  res.json({ mensagem: 'Deletado com sucesso' });
});

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running to successfully!`));

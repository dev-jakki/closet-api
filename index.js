import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clothesRoutes from './routes/clothes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/clothes', clothesRoutes);

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running to successfully!`));

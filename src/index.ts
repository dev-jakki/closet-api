import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import clotheRoutes from './routes/clotheRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', clotheRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running to successfully!`));

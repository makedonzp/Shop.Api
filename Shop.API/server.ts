import express from 'express';
import cors from 'cors';
import productRoutes from './src/api/routes/productsRoutes';
import { initDb } from './src/db/initDb';

const app = express();
app.use(cors());
app.use(express.json());

// Инициализация базы данных
initDb();

// Используем маршруты
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Shop.API is running on port ${PORT}`);
});
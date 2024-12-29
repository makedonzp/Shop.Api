import express from 'express';
import path from 'path';
import productRoutes from './routes/productRoutes';

const app = express();

// Настройка EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Парсинг JSON и URL-encoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Маршруты
app.use('/admin', productRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Shop.Admin is running on port ${PORT}`);
});
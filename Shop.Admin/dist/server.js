"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const app = (0, express_1.default)();
// Настройка EJS
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
// Статические файлы
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Парсинг JSON и URL-encoded данных
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Маршруты
app.use('/admin', productRoutes_1.default);
// Запуск сервера
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Shop.Admin is running on port ${PORT}`);
});

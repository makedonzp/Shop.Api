"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const productsRoutes_1 = __importDefault(require("./src/api/routes/productsRoutes"));
const initDb_1 = require("./src/db/initDb");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Инициализация базы данных
(0, initDb_1.initDb)();
// Используем маршруты
app.use('/api/products', productsRoutes_1.default);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Shop.API is running on port ${PORT}`);
});

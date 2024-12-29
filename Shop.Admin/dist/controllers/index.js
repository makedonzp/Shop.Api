"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
// Экспорт контроллеров
var productController_1 = require("./productController");
Object.defineProperty(exports, "getProducts", { enumerable: true, get: function () { return productController_1.getProducts; } });
Object.defineProperty(exports, "getProductById", { enumerable: true, get: function () { return productController_1.getProductById; } });
Object.defineProperty(exports, "createProduct", { enumerable: true, get: function () { return productController_1.createProduct; } });
Object.defineProperty(exports, "updateProduct", { enumerable: true, get: function () { return productController_1.updateProduct; } });
// Экспорт базы данных
const productModel_1 = require("../models/productModel");
Object.defineProperty(exports, "db", { enumerable: true, get: function () { return productModel_1.db; } });

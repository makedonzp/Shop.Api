"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const productModel_1 = require("../models/productModel"); // Импортируем db и Product
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [products] = yield productModel_1.db.query('SELECT * FROM products');
        res.render('products/list', { products });
    }
    catch (error) {
        res.status(500).send('Server error');
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Проверка наличия id
    if (!id) {
        return res.status(400).send('Bad request: ID is required');
    }
    try {
        const [rows] = yield productModel_1.db.query('SELECT * FROM products WHERE id = ?', [id]);
        if (!rows || rows.length === 0) {
            return res.status(404).send('Product not found');
        }
        const product = rows[0];
        res.render('products/detail', { product });
    }
    catch (error) {
        next(error);
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price } = req.body;
    // Проверка наличия обязательных полей
    if (!title || !description || !price) {
        return res.status(400).send('Bad request: Title, description, and price are required');
    }
    try {
        yield productModel_1.db.query('INSERT INTO products (title, description, price) VALUES (?, ?, ?)', [title, description, price]);
        res.redirect('/admin/products');
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, price } = req.body;
    // Проверка наличия id
    if (!id) {
        return res.status(400).send('Bad request: ID is required');
    }
    // Проверка наличия обязательных полей
    if (!title || !description || !price) {
        return res.status(400).send('Bad request: Title, description, and price are required');
    }
    try {
        yield productModel_1.db.query('UPDATE products SET title = ?, description = ?, price = ? WHERE id = ?', [title, description, price, id]);
        res.redirect(`/admin/products/${id}`);
    }
    catch (error) {
        next(error);
    }
});
exports.updateProduct = updateProduct;

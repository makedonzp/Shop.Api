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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const express_validator_1 = require("express-validator");
const db_1 = require("../../db/db");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, db_1.openDb)();
        const products = yield db.all('SELECT * FROM products');
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const db = yield (0, db_1.openDb)();
        const product = yield db.get('SELECT * FROM products WHERE id = ?', [id]);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, price } = req.body;
    try {
        const db = yield (0, db_1.openDb)();
        const result = yield db.run('INSERT INTO products (title, description, price) VALUES (?, ?, ?)', [title, description, price]);
        res.status(201).json({ id: result.lastID, title, description, price });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, price } = req.body;
    try {
        const db = yield (0, db_1.openDb)();
        yield db.run('UPDATE products SET title = ?, description = ?, price = ? WHERE id = ?', [title, description, price, id]);
        res.status(200).json({ id, title, description, price });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const db = yield (0, db_1.openDb)();
        yield db.run('DELETE FROM products WHERE id = ?', [id]);
        res.status(200).json({ message: 'Product deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteProduct = deleteProduct;

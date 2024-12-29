import { Request, Response, NextFunction } from 'express';
import { db, Product } from '../models/productModel'; // Импортируем db и Product

export const getProducts = async (req: Request, res: Response) => {
    try {
        const [products] = await db.query<Product[]>('SELECT * FROM products');
        res.render('products/list', { products });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    // Проверка наличия id
    if (!id) {
        return res.status(400).send('Bad request: ID is required');
    }

    try {
        const [rows] = await db.query<Product[]>('SELECT * FROM products WHERE id = ?', [id]);
        if (!rows || rows.length === 0) {
            return res.status(404).send('Product not found');
        }
        const product = rows[0];
        res.render('products/detail', { product });
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, price } = req.body;

    // Проверка наличия обязательных полей
    if (!title || !description || !price) {
        return res.status(400).send('Bad request: Title, description, and price are required');
    }

    try {
        await db.query(
            'INSERT INTO products (title, description, price) VALUES (?, ?, ?)',
            [title, description, price]
        );
        res.redirect('/admin/products');
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
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
        await db.query(
            'UPDATE products SET title = ?, description = ?, price = ? WHERE id = ?',
            [title, description, price, id]
        );
        res.redirect(`/admin/products/${id}`);
    } catch (error) {
        next(error);
    }
};
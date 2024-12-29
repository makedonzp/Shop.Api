import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { openDb } from '../../db/db';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const db = await openDb();
    const products = await db.all('SELECT * FROM products');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const db = await openDb();
    const product = await db.get('SELECT * FROM products WHERE id = ?', [id]);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, price } = req.body;
  try {
    const db = await openDb();
    const result = await db.run(
      'INSERT INTO products (title, description, price) VALUES (?, ?, ?)',
      [title, description, price]
    );
    res.status(201).json({ id: result.lastID, title, description, price });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  try {
    const db = await openDb();
    await db.run(
      'UPDATE products SET title = ?, description = ?, price = ? WHERE id = ?',
      [title, description, price, id]
    );
    res.status(200).json({ id, title, description, price });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const db = await openDb();
    await db.run('DELETE FROM products WHERE id = ?', [id]);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
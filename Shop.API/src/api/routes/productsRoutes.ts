import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  } from '../controllers/productsController'; // Исправлено на productsController
import { productValidationRules } from '../../validators/productValidator';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', productValidationRules, createProduct);
router.put('/:id', productValidationRules, updateProduct);
router.delete('/:id', deleteProduct);

export default router;
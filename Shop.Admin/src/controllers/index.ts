// Экспорт контроллеров
export { getProducts, getProductById, createProduct, updateProduct } from './productController';

// Экспорт модели Product
export { Product } from '../models/productModel';

// Экспорт базы данных
import { db } from '../models/productModel';
export { db };
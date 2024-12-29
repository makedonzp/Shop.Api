import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminProductManager.module.css'; // Импорт стилей

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const AdminProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке товаров:', error);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/products', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ title: '', description: '', price: 0 });
      alert('Товар успешно добавлен!');
    } catch (error) {
      console.error('Ошибка при добавлении товара:', error);
      alert('Не удалось добавить товар.');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
      alert('Товар успешно удалён!');
    } catch (error) {
      console.error('Ошибка при удалении товара:', error);
      alert('Не удалось удалить товар.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Управление товарами</h1>

      <form onSubmit={handleAddProduct} className={styles.form}>
        <div>
          <label>Название:</label>
          <input
            type="text"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Описание:</label>
          <input
            type="text"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Цена:</label>
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            required
          />
        </div>
        <button type="submit">Добавить товар</button>
      </form>

      <h2>Список товаров</h2>
      <ul className={styles.productList}>
        {products.map((product) => (
          <li key={product.id} className={styles.productItem}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Цена: ${product.price}</p>
            <button onClick={() => handleDeleteProduct(product.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductManager;
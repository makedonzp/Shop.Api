import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './ProductDetailPage.module.css'; // Импорт стилей

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!product) return <div className={styles.container}>Загрузка...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.productDetail}>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>Цена: ${product.price}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
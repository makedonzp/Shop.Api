import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css'; // Импорт стилей

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Главная страница</h1>
      <Link to="/products">
        <button className={styles.button}>Перейти к списку товаров</button>
      </Link>
      <Link to="/admin/products">
        <button className={styles.button}>Управление товарами</button>
      </Link>
    </div>
  );
};

export default HomePage;
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css'; // Импорт стилей
import { Col, Container, Row } from 'react-bootstrap';

const HomePage: React.FC = () => {
  return (
    <Container className={styles.container}>
      <Row>
        <Col>
        <h1>Главная страница</h1>
        </Col>
      </Row>
      <Row>
        <Col>
        <Link to="/products">
        <button className={styles.button}>Перейти к списку товаров</button>
      </Link>
      <Link to="/admin/products">
        <button className={styles.button}>Управление товарами</button>
      </Link>
        </Col>
        </Row>      
      
    </Container>
  );
};

export default HomePage;
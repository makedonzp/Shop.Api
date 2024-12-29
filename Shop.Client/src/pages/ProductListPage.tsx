import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './ProductListPage.module.css'; // Импорт стилей
import { Col, Container, Row } from 'react-bootstrap';


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Container fluid className={styles.containerFluid}>
        <Row>
            <Col>
            <Link className={styles.BackBtn} to={"/"}>Назад</Link>
            </Col>
        </Row>
    <Container className={styles.container}>
        <Row>
            <Col>
                 <h1>Список товаров</h1>
            </Col>
        </Row>
        <Row>
            <Col>
            <ul className={styles.productList}>
            {products.map(product => (
                <li key={product.id} className={styles.productItem}>
                    <Link to={`/products/${product.id}`}>
                 <div className={styles.textCards}>
                 <h2>{product.title}</h2>
                 <p>{product.description}</p>
                 </div>
                 <p>Цена: ${product.price}</p>
                    </Link>
                </li>
                ))}
      </ul>
            </Col>
        </Row>
      
      
    </Container>
    </Container>
  );
};

export default ProductListPage;
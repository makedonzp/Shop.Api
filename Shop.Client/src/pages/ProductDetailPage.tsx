import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './ProductDetailPage.module.css'; // Импорт стилей
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
    <Container fluid className={styles.containerFluid}>
        <Row>
            <Col>
            <Link className={styles.backBnt} to={"/products"}>Назад</Link>
            </Col>
        </Row>
    <Container className={styles.container}>
        <Row>
            <Col>
                <div className={styles.productDetail}>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <p>Цена: ${product.price}</p>
                </div>
            </Col>
        </Row>
      
    </Container>
    </Container>
  );
};

export default ProductDetailPage;
import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCart, saveCart } from "./CartHelper"; // Import hàm từ cartHelper
import { toast } from "react-toastify";

const ProductCard = ({ product, onProductClick, onAddToCart }) => {
  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img variant="top" height={200} src={product.hinhAnh} />
      <Card.Body>
        <Card.Title>{product.tenMon}</Card.Title>
        <Card.Text>{product.giaTien} VND</Card.Text>
        <Button
          variant="primary"
          onClick={() => onProductClick(product.id_mon)}
        >
          Review Details
        </Button>
      </Card.Body>
    </Card>
  );
};

const ProductGrid = ({ products, onProductClick }) => {
  const [cart, setCart] = useState(getCart()); // Lấy giỏ hàng từ local storage

  // Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const isInCart = prevCart.find((item) => item.id_mon === product.id_mon);
      if (isInCart) {
        toast.success("Add to Cart successfully");
        return prevCart.map((item) =>
          item.id_mon === product.id_mon
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      product.quantity = 1;
      toast.success("Add to Cart successfully");

      // Nếu sản phẩm chưa có, thêm mới vào giỏ

      return [...prevCart, product];
    });
  };

  // Lưu giỏ hàng vào local storage mỗi khi cart thay đổi
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  return (
    <Container>
      <Row className="justify-content-start">
        {products.map((product) => (
          <Col key={product.id_mon} xs={12} sm={6} md={4} lg={3}>
            <ProductCard
              product={product}
              onProductClick={onProductClick}
              onAddToCart={handleAddToCart}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductGrid;

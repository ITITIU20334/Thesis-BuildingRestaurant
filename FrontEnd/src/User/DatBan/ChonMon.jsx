import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getCart, saveCart } from "./../common/CartHelper"; // Import hàm từ cartHelper
import { toast } from "react-toastify";
import NavigationBar from "./../common/NavigationBar";

const ProductCardDatBan = ({ product, onAddToCart }) => {
  return (
    <Card style={{ width: "10rem", margin: "10px" }}>
      <Card.Img variant="top" height={100} src={product.hinhAnh} />
      <Card.Body>
        <Card.Title>{product.tenMon}</Card.Title>
        <Card.Text>{product.giaTien.toLocaleString()} VND</Card.Text>
        <Button variant="success" onClick={() => onAddToCart(product)}>
          Select Food
        </Button>
      </Card.Body>
    </Card>
  );
};

const ProductGridDatBan = ({ products, cart, setCart }) => {
  // Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const isInCart = prevCart.find((item) => item.id_mon === product.id_mon);
      if (isInCart) {
        return prevCart.map((item) =>
          item.id_mon === product.id_mon
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      product.quantity = 1;

      return [...prevCart, product];
    });
  };

  return (
    <Container>
      <Row className="justify-content-start">
        {products.map((product) => (
          <Col
            key={product.id_mon}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-4"
          >
            <ProductCardDatBan
              product={product}
              onAddToCart={handleAddToCart}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

// Thành phần CartDisplay
const CartDisplay = ({ cart, setCart }) => {
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id_mon !== productId);
      saveCart(updatedCart);
      return updatedCart;
    });
  };
  useEffect(() => {
    sessionStorage.setItem("total", calculateTotal(cart));
    console.log("Total amount in CartDisplay:", calculateTotal(cart));
  }, [cart]);

  const calculateTotal = (cart) => {
    return cart.reduce(
      (total, item) => total + item.giaTien * item.quantity,
      0
    );
  };

  return (
    <Container>
      <Card className="shadow p-4">
        {cart.length > 0 ? (
          <>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price (VND)</th>
                  <th>Quantity</th>
                  <th>Total Amount (VND)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item.id_mon}>
                    <td>{index + 1}</td>
                    <td>{item.tenMon}</td>
                    <td>{item.giaTien.toLocaleString()}</td>
                    <td>{item.quantity || 1}</td>
                    <td>
                      {(item.giaTien * (item.quantity || 1)).toLocaleString()}
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveFromCart(item.id_mon)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-end mt-4">
              <h4>
                Total Amount:{" "}
                <span className="text-success">
                  {calculateTotal(cart).toLocaleString()} VND{" "}
                </span>
              </h4>
            </div>
          </>
        ) : (
          <p className="text-center text-muted">No dishes selected</p>
        )}
      </Card>
    </Container>
  );
};

const calculateTotal = (cart) => {
  console.log("Hehee");
  return cart.reduce((total, item) => total + item.giaTien * item.quantity, 0);
};

const ChonMon = ({ products }) => {
  const [cart, setCart] = useState(getCart() || []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  return (
    <div>
      <NavigationBar />
      <ProductGridDatBan products={products} cart={cart} setCart={setCart} />
      <CartDisplay cart={cart} setCart={setCart} />
    </div>
  );
};

export { ProductGridDatBan, CartDisplay };
export default ChonMon;

import React, { useEffect, useState } from "react";
import { getCart, saveCart } from "./CartHelper";
import { Button, Card, Table, Container } from "react-bootstrap";
import NavigationBar from "./NavigationBar";

const CartDisplay = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = getCart();
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id_mon !== productId);
      saveCart(updatedCart);
      return updatedCart;
    });
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.giaTien * item.quantity,
      0
    );
  };

  return (
    <div>
      <NavigationBar />
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
                    {calculateTotal().toLocaleString("vi-VN")} VND
                  </span>
                </h4>
              </div>
            </>
          ) : (
            <p className="text-center text-muted">No Dishes Selected</p>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default CartDisplay;

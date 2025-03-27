import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { fetchMonAnById, fetchMonNgauNhien } from "../services/MonAnService";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./common/NavigationBar";
import ProductGrid from "./common/MonAnMenu";
import Footer from "./common/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [monans, setMonAn] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    listMonAn();
  }, []);
  const listMonAn = () => {
    fetchMonNgauNhien()
      .then((response) => {
        const randomMonAn = response.data.slice(0, 4);
        setMonAn(randomMonAn);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    console.log(id);
  };
  useEffect(() => {
    fetchMonAnById(id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <NavigationBar />
      <div style={{ marginTop: "100px" }}>
        <Container style={{ marginTop: "20px" }}>
          <Row>
            <Col md={6}>
              <Card>
                <Card.Img
                  variant="top"
                  src={product.hinhAnh}
                  style={{ display: "block", maxWidth: "100%", height: "auto" }}
                />
              </Card>
            </Col>
            <Col md={6}>
              <div className="product-details">
                <h1>{product.tenMon}</h1>
                <p style={{ marginTop: "50px", fontSize: "20px" }}>
                  Giá:{" "}
                  <strong>{product.giaTien.toLocaleString("vi-VN")} VND</strong>
                  <br></br>(Price does not include VAT)
                </p>
                <p style={{ margin: "50px" }}>{product.moTa}</p>

                <Form className="text-center">
                  <Button
                    className="center"
                    variant="primary"
                    type="submit"
                    style={{ marginTop: "10px" }}
                    href="/datban"
                  >
                    Booking 
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
        <Container style={{ marginTop: "50px" }}>
          <Row>
            <Col>
              <h2>Related food</h2>
            </Col>
          </Row>
          <Row>
            <Row>
              <ProductGrid
                products={monans}
                onProductClick={handleProductClick}
              />
            </Row>
          </Row>
        </Container>
        <div style={{ marginTop: "50px" }}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

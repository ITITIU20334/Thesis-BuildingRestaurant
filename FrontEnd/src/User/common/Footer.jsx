// Footer.js
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <p>
            Tie Restaurant Service Trading Joint Stock Company Branch
            </p>
            <p>
              <strong>Tie Restaurant</strong>
            </p>
            <p>19, Road 449, Le Van Viet, District 9, Ho Chi Minh City</p>
            <p>📞 0123 456 789</p>
            <p>⏰ Working Time: 8 A.M - 23 P.M </p>

            <p>
            Branch registration certificate number: 0311542661-002 
            issued by the Business Registration Office - Department of 
            Planning and Investment of Ho Chi Minh City
            </p>
          </Col>
          <Col md={4}>
            <h5>POLICY</h5>
            <ul>
              <li>Terms of Use</li>
              <li>Shipping Policy</li>
              <li>Privacy Policy</li>
              <li>Refund Policy</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>EMAIL KHUYẾN MÃI</h5>
            <p>
              Đăng ký email với chúng tôi để nhận được những tin khuyến mãi mới
              nhất từ chúng tôi
            </p>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Nhập email của bạn" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Gửi
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

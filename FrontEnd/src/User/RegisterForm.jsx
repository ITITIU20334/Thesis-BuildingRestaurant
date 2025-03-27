import axios from "axios";
import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./common/NavigationBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hoTen, sethoTen] = useState("");
  const [soDT, setSoDT] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const URL_BASE = "http://localhost:8080/auth/dangky";
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const taikhoan = { username, password, hoTen, soDT };

    const phoneRegex = /^(03|05|07|08|09)+([0-9]{8})$/;

    if (!phoneRegex.test(soDT)) {
      setError("Phone number is not correct format!");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post(URL_BASE, taikhoan);
      setSuccess(response.data);
      setError("");
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      setError("Username already exists!");
    }
    setSuccess("");
  };

  return (
    <>
      <NavigationBar />
      <div style={{ marginTop: "100px" }}>
        <Container className="mt-5">
          <Row className="justify-content-md-center">
            <Col md={6}>
              <h2 className="text-center">Register</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Account</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Full Name"
                    value={hoTen}
                    onChange={(e) => sethoTen(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={soDT}
                    onChange={(e) => setSoDT(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                  Register
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default RegisterForm;

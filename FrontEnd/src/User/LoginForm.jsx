import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./common/NavigationBar";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/auth/login",
        new URLSearchParams({
          username,
          password,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );

      const response = await axios.get("http://localhost:8080/auth/success", {
        withCredentials: true,
      });

      const { username: loggedInUsername, roles } = response.data;
      sessionStorage.setItem("username", loggedInUsername);
      sessionStorage.setItem("role", roles);
      window.location.reload();
      setError(null);
    } catch (err) {
      setError("Login failed. Please check your account again!");
      console.error(err);
    }
  };
  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "USER") {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <NavigationBar />
      <Container style={{ marginTop: "100px" }}>
        <Row className="justify-content-md-center">
          <Col md="4">
            <h2 className="text-center">Loggin</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Account</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" href="/register" block>
                Register
              </Button>
              <Button
                variant="primary"
                style={{ marginLeft: "30px" }}
                type="submit"
                block
              >
                Login
              </Button>
            </Form>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginForm;

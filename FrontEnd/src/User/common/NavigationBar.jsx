import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TimKiemMonAn from "../TimKiemMonAn";
import { useNavigate } from "react-router-dom";

const NavigationBar = ({ username, role }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role === "USER" || role === "ADMIN") {
      setIsLoggedIn(true);
    }
  }, []);

  const navigate = useNavigate();
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  const handleSearch = () => {
    navigate(`/timkiem/${searchTerm}`);
  };
  const handleLogout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand href="#home" className="ml-3">
        <img src="" alt="" />
      </Navbar.Brand>
      <Nav className="ml-auto txt-while mr-3">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/menu">Menu</Nav.Link>
        <Nav.Link href="#">Contact</Nav.Link>
        <Nav.Link href="#">FAQS</Nav.Link>
        <Nav.Link>About Us</Nav.Link>
        <Nav.Link>|</Nav.Link>
        {showSearch && (
          <Form inline className="ml-auto search-form">
            <FormControl
              type="text"
              placeholder=""
              className="mr-sm-2 search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="outline-success"
              className="search-button"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Form>
        )}
        <Nav.Link onClick={toggleSearch}>
          <img
            src="https://img.icons8.com/?size=100&id=132&format=png&color=FFFFFF"
            alt="search"
            height={25}
          />
        </Nav.Link>
        {isLoggedIn ? (
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {username}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Account</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Nav.Link href="/login">
            <img
              src="https://img.icons8.com/?size=100&id=82751&format=png&color=FFFFFF"
              alt="login"
              height={25}
            />
            Login
          </Nav.Link>
        )}
        <Nav.Link href="/datban">
          <Button variant="secondary">Online Reservation</Button>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;

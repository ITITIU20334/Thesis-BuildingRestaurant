import React from "react";
import { Navbar, Nav } from "react-bootstrap";
const Sidebar = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="flex-column sidebar"
    >
      {" "}
      <Navbar.Brand href="#home">Sidebar</Navbar.Brand>{" "}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />{" "}
      <Navbar.Collapse id="basic-navbar-nav">
        {" "}
        <Nav className="flex-column">
          {" "}
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="/admin/danhmuc">Link</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>{" "}
      </Navbar.Collapse>{" "}
    </Navbar>
  );
};
export default Sidebar;

import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const ThemQuanLy = (props) => {
  const { handleClose, show, listQuanLy } = props;
  const [hoTen, setHoTen] = useState("");
  const [soDT, setSoDT] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const role = "ADMIN";
  const URL_BASE = "http://localhost:8080/auth/dangky";
  const handleSaveQuanLy = async () => {
    if (hoTen === "" || soDT === "" || username === "" || password === "") {
      console.log(hoTen, soDT, username, password);
      toast.error("Please Complete Information");
    } else {
      const taikhoan = { username, password, hoTen, soDT, role };
      const phoneRegex = /^(03|05|07|08|09)+([0-9]{8})$/;
      if (!phoneRegex.test(soDT)) {
        toast.error("Phone number is not in correct format!");
      } else {
        try {
          await axios.post(URL_BASE, taikhoan);
          toast.success("Registration successful!");
          listQuanLy();
          handleClose();
        } catch (error) {
          toast.error("Username already exists!");
        }
      }
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label className="form-label">Full Name:</label>
              <input
                value={hoTen}
                className="form-control"
                onChange={(event) => setHoTen(event.target.value)}
                type="text"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number:</label>
              <input
                value={soDT}
                className="form-control"
                onChange={(event) => setSoDT(event.target.value)}
                type="text"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <input
                value={username}
                className="form-control"
                onChange={(event) => setUsername(event.target.value)}
                type="text"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                value={password}
                className="form-control"
                onChange={(event) => setPassword(event.target.value)}
                type="password"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveQuanLy()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ThemQuanLy;

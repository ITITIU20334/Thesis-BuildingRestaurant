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
      toast.error("Vui lòng nhập đủ thông tin");
    } else {
      const taikhoan = { username, password, hoTen, soDT, role };
      const phoneRegex = /^(03|05|07|08|09)+([0-9]{8})$/;
      if (!phoneRegex.test(soDT)) {
        toast.error("Số điện thoại không đúng định dạng!");
      } else {
        try {
          await axios.post(URL_BASE, taikhoan);
          toast.success("Đăng ký thành công!");
          listQuanLy();
          handleClose();
        } catch (error) {
          toast.error("Tên người dùng đã tồn tại!");
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
          <Modal.Title>Thêm tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label className="form-label">Họ tên :</label>
              <input
                value={hoTen}
                className="form-control"
                onChange={(event) => setHoTen(event.target.value)}
                type="text"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Số Điện thoại :</label>
              <input
                value={soDT}
                className="form-control"
                onChange={(event) => setSoDT(event.target.value)}
                type="text"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">tên tài khoản :</label>
              <input
                value={username}
                className="form-control"
                onChange={(event) => setUsername(event.target.value)}
                type="text"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mật khẩu :</label>
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
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ThemQuanLy;

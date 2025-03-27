import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { changePassword } from "../../services/ProfileService";
import { toast } from "react-toastify";

const UpdatePassword = (props) => {
  const { show, handleClose, username } = props;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  function handleDoiMatKhau() {
    if (oldPassword === "" || newPassword === "") {
      alert("Please fill in all the required information!");
      return;
    }
    if (newPassword.length < 6) {
      toast.info("The new password must be at least 6 characters!");
      return;
    } else {
      const data = { username, oldPassword, newPassword };
      changePassword(data)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Password changed successfully");
            handleClose();
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            toast.error("Old Password Incorrect. Please Check Again!");
          } else {
            toast.error("Failed");
          }
        });
    }
  }
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Update Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="mb-3">
            <label className="form-label">Old Password</label>
            <input
              value={oldPassword}
              type="password"
              className="form-control"
              onChange={(event) => setOldPassword(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              value={newPassword}
              type="password"
              className="form-control"
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={handleDoiMatKhau}>
          Update
        </button>
        <button className="btn btn-secondary" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdatePassword;

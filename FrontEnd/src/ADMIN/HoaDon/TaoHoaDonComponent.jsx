import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { saveHoaDon } from "../../services/HoaDonService";
import { toast } from "react-toastify";
import { capNhatBan } from "../../services/BanService";

const TaoHoaDonComponent = (props) => {
  const { handleClose, show, Ban, listBan } = props;
  const [ngayTao, setngayTao] = useState(new Date().toISOString().slice(0, 10));
  const [tenBan, setTenBan] = useState("");
  const [hoTen, setHoten] = useState("Unnamed Guest");
  const username = sessionStorage.getItem("username");
  const idBan = Ban;
  useEffect(() => {
    if (show && Ban) {
      setTenBan(Ban.tenBan || "");
    }
  }, [Ban, show]);
  const handleLapHoaDon = async () => {
    const laphd = { ngayTao, idBan, hoTen, username };
    console.log(laphd);
    let res = await saveHoaDon(laphd);
    capNhatBan(Ban.idBan);
    listBan();
    window.location.reload();
    if (res) {
      handleClose();

      toast.success("Bill created successfully");
    } else {
      toast.error("Bill created fail");
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
          <Modal.Title>Create Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label className="form-label">Date: </label>
              <input
                value={ngayTao}
                className="form-control"
                onChange={(event) => setngayTao(event.target.value)}
                type="text"
                disabled="true"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Table No. </label>
              <input
                value={tenBan}
                className="form-control"
                onChange={(event) => setTenBan(event.target.value)}
                type="text"
                disabled="true"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Full Name: </label>
              <input
                value={hoTen}
                className="form-control"
                onChange={(event) => setHoten(event.target.value)}
                type="text"
                disabled="true"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleLapHoaDon()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaoHoaDonComponent;

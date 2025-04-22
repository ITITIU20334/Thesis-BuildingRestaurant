import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { saveDonDatBan } from "../../services/DonDatBanService";
import { toast } from "react-toastify";

const TaoDonComponent = (props) => {
  const { handleClose, show, listDonDatBan } = props;
  const [ngayDat, setNgaydat] = useState("");
  const [thoiGian, setGioDat] = useState("");
  const [soLuong, setsoLuong] = useState();
  const [hoTen, sethoTen] = useState("");
  const [soDT, setSoDT] = useState("");
  const [ghiChu, setghiChu] = useState("");

  const handleSave = async () => {
    const dondatbans = { ngayDat, thoiGian, hoTen, soDT, soLuong, ghiChu };
    console.log(dondatbans);
    let res = await saveDonDatBan(dondatbans);
    if (res) {
      handleClose();
      listDonDatBan();
      setNgaydat("");
      setGioDat("");
      setsoLuong();
      sethoTen("");
      setSoDT("");
      setghiChu("");
      toast.success("Create table reservation successfully");
    } else {
      toast.error("Create table reservation failed");
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
          <Modal.Title>Create Reservation Table: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label className="form-label">Date: </label>
              <input
                value={ngayDat}
                className="form-control"
                onChange={(event) => setNgaydat(event.target.value)}
                type="date"
              />
            </div>
          </div>
          <div>
            <div class="form-group">
              <label for="thoiGian1">Time: </label>
              <select
                class="form-control"
                id="thoiGian1"
                value={thoiGian}
                onChange={(e) => setGioDat(e.target.value)}
              >
                <option></option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
              </select>
            </div>
          </div>

          <div>
            <div className="mb-3">
              <label className="form-label">Full Name: </label>
              <input
                value={hoTen}
                className="form-control"
                onChange={(event) => sethoTen(event.target.value)}
                type="text"
              />
            </div>
          </div>
          <div>
            <div className="mb-3">
              <label className="form-label">Phone Number: </label>
              <input
                value={soDT}
                className="form-control"
                onChange={(event) => setSoDT(event.target.value)}
                type="text"
              />
            </div>
          </div>
          <div>
            <div className="mb-3">
              <label className="form-label">Number of Customers: </label>
              <input
                value={soLuong}
                className="form-control"
                onChange={(event) => setsoLuong(event.target.value)}
                type="number"
                min={1}
                max={20}
              />
            </div>
          </div>
          <div>
            <div className="mb-3">
              <label className="form-label">Note: </label>
              <input
                value={ghiChu}
                className="form-control "
                onChange={(event) => setghiChu(event.target.value)}
                type="text"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaoDonComponent;

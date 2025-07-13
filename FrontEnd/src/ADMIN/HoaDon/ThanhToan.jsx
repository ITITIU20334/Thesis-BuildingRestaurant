import React, { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { hoanThanh } from "../../services/HoaDonService";
import { capNhatBan } from "../../services/BanService";
import { toast } from "react-toastify";

const ThanhToan = (props) => {
  const { show, handleCloseForm, handleCloseThanhToan, data, listBan } = props;
  const [phuongThucTT, setPhuongThuc] = useState("");
  const [soTienKhachDua, setSoTienKhachDua] = useState("");
  const [tienThoiLai, setTienThoiLai] = useState(null);

  // Hàm tính tiền thối lại
  const handleTinhTienThoi = () => {
    const tienThoi = parseFloat(soTienKhachDua) - parseFloat(data.SoTien);
    setTienThoiLai(tienThoi > 0 ? tienThoi : 0);
  };

  const handleThanhToan = () => {
    console.log(phuongThucTT);
    hoanThanh(data.idhd, phuongThucTT);
    capNhatBan(data.idBan);
    listBan();
    toast.success("Bill payment successful");
    handleCloseThanhToan();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseForm}
        backdrop="static"
        keyboard={false}
        style={{ height: "10000px" }}
      >
        <Modal.Body>
          <Container className="text-center">Bill Payment</Container>
          <Row>
            <div style={{ marginTop: "50px" }}>
              Total Amount: {data.SoTien} VND
            </div>
          </Row>
          <Row style={{ marginTop: "50px" }}>
            <div className="form-group">
              <label htmlFor="thoiGian2">Payment Method:</label>
              <select
                className="form-control"
                id="thoiGian2"
                value={phuongThucTT}
                onChange={(e) => {
                  setPhuongThuc(e.target.value);
                  setSoTienKhachDua("");
                  setTienThoiLai(null);
                }}
              >
                <option value=""></option>
                <option value="Cash">Cash</option>
                <option value="qrCode">QR Code</option>
              </select>
            </div>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            {phuongThucTT === "Cash" && (
              <div>
                <label htmlFor="soTienKhachDua">Amount Paid by Customer:</label>
                <input
                  type="number"
                  id="soTienKhachDua"
                  className="form-control"
                  value={soTienKhachDua}
                  onChange={(e) => setSoTienKhachDua(e.target.value)}
                  placeholder="Enter amount received from customer"
                />
                <Button
                  variant="primary"
                  style={{ marginTop: "10px" }}
                  onClick={handleTinhTienThoi}
                  disabled={!soTienKhachDua || soTienKhachDua < data.SoTien}
                >
                  Calculate Change
                </Button>
                {tienThoiLai !== null && (
                  <div style={{ marginTop: "50px" }}>
                    {tienThoiLai >= 0 ? (
                      <p>Excess Cash: {tienThoiLai} VND</p>
                    ) : (
                      <p>Not enough money to pay</p>
                    )}
                  </div>
                )}
              </div>
            )}
            {phuongThucTT === "qrCode" && (
              <div className="text-center">
                <img
                  src={`https://img.vietqr.io/image/STB-070119321301-compact.png?amount=${data.SoTien}`}
                  alt="QR Code"
                  style={{ width: "300px", height: "300px" }}
                />
                <p>Scan QR Code to Pay</p>
              </div>
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleThanhToan()}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleCloseForm}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ThanhToan;

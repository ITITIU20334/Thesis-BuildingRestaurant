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
    const tienThoi = parseFloat(soTienKhachDua) - parseFloat(data.tongCong);
    setTienThoiLai(tienThoi > 0 ? tienThoi : 0);
  };

  const handleThanhToan = () => {
    console.log(phuongThucTT);
    hoanThanh(data.idhd, phuongThucTT);
    capNhatBan(data.idBan);
    listBan();
    toast.success("Thanh toán hóa đơn thành công");
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
          <Container className="text-center">Thanh toán hóa đơn</Container>
          <Row>
            <div style={{ marginTop: "50px" }}>
              Tổng tiền: {data.tongCong} VND
            </div>
          </Row>
          <Row style={{ marginTop: "50px" }}>
            <div className="form-group">
              <label htmlFor="thoiGian2">Phương thức thanh toán:</label>
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
                <option value="">Chọn phương thức</option>
                <option value="tienMat">Tiền mặt</option>
                <option value="qrCode">Mã QR</option>
              </select>
            </div>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            {phuongThucTT === "tienMat" && (
              <div>
                <label htmlFor="soTienKhachDua">Số tiền khách đưa:</label>
                <input
                  type="number"
                  id="soTienKhachDua"
                  className="form-control"
                  value={soTienKhachDua}
                  onChange={(e) => setSoTienKhachDua(e.target.value)}
                  placeholder="Nhập số tiền khách đưa"
                />
                <Button
                  variant="primary"
                  style={{ marginTop: "10px" }}
                  onClick={handleTinhTienThoi}
                  disabled={!soTienKhachDua || soTienKhachDua < data.tongCong}
                >
                  Tính tiền thối
                </Button>
                {tienThoiLai !== null && (
                  <div style={{ marginTop: "50px" }}>
                    {tienThoiLai > 0 ? (
                      <p>Tiền thối lại: {tienThoiLai} VND</p>
                    ) : (
                      <p>Không đủ tiền để thanh toán.</p>
                    )}
                  </div>
                )}
              </div>
            )}
            {phuongThucTT === "qrCode" && (
              <div className="text-center">
                <img
                  src={`https://img.vietqr.io/image/ICB-108876742179-compact.png?amount=${data.tongCong}`}
                  alt="QR Code"
                  style={{ width: "300px", height: "300px" }}
                />
                <p>Quét mã QR để thanh toán.</p>
              </div>
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleThanhToan()}>
            Xác nhận đã thanh toán
          </Button>
          <Button variant="secondary" onClick={handleCloseForm}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ThanhToan;

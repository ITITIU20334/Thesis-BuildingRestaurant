import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getDonByToken } from "../../services/DonDatBanService";

const ThanhToan = ({ show, handleCloseForm, handleCloseThanhToan }) => {
  const [phuongThucTT, setPhuongThuc] = useState("");
  const [params] = useSearchParams();
  const token = params.get("token");
  const [dondatbans, setDonDatBan] = useState(null);

  useEffect(() => {
    listDonDatBan();
  }, [token]);

  function listDonDatBan() {
    getDonByToken(token)
      .then((response) => {
        setDonDatBan(response.data);
        console.log("DonDatBan:", dondatbans);
      })
      .catch((error) => {
        console.log(error);
      });
  }

 const handleThanhToan = () => {
  if (!phuongThucTT) {
    toast.warning("Please select a payment method");
    return;
  }

  if (phuongThucTT === "vnpay") {
    if (!dondatbans || !dondatbans.id) {
      toast.error("Booking data not loaded.");
      return;
    }

    const dto = {
      idDonDatBan: dondatbans.id,
      paymentMethod: 1,
      fullName: dondatbans.hoTen || "Guest",
      username: dondatbans.idKhach?.username || "",
      tongTien: dondatbans.tongTien || 0,
      tnfRef: dondatbans.tnfRef || token,
    };

    console.log("Gửi DTO tới PaymentController:", dto);

    fetch("http://localhost:8080/api/payment/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
      .then((res) => {
        if (!res.ok) throw new Error("VNPay failed");
        return res.text();
      })
      .then((vnpayUrl) => {
        window.location.href = vnpayUrl;
      })
      .catch((err) => {
        console.error("VNPay error:", err);
        toast.error("Unable to make payment by VNPay.");
      });
    } else if (phuongThucTT === "momo") {
      toast.success("Please scan the QR code using your MoMo app");
    } else {
      toast.success("You have selected to pay with cash");
      setTimeout(() => {
        handleCloseThanhToan();
      }, 2000);
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal
        show={show}
        onHide={handleCloseForm}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Container className="text-center">
            <h4 className="mb-4 fw-bold text-uppercase">
              Choose Payment Method
            </h4>

            <p className="mb-4">
              Total Amount:{" "}
              <span className="fw-bold text-success fs-5">
                {dondatbans ? dondatbans.tongTien : "0"} VND
              </span>
            </p>

            <Row className="justify-content-center mb-4">
              <Col xs="auto">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pttt"
                    value="tienmat"
                    id="ptttTienMat"
                    onChange={(e) => setPhuongThuc(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="ptttTienMat">
                    Cash
                  </label>
                </div>
              </Col>
              <Col xs="auto">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pttt"
                    value="vnpay"
                    id="ptttVNPay"
                    onChange={(e) => setPhuongThuc(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="ptttVNPay">
                    VNPay
                  </label>
                </div>
              </Col>
              <Col xs="auto">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pttt"
                    value="momo"
                    id="ptttMoMo"
                    onChange={(e) => setPhuongThuc(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="ptttMoMo">
                    QR MoMo
                  </label>
                </div>
              </Col>
            </Row>

            {phuongThucTT === "momo" && (
              <div className="mt-4">
                <p>Please scan this QR code using MoMo app:</p>
                <img
                  src={require("./QR.jpg")}
                  alt="QR MoMo"
                  style={{
                    width: "400px",
                    height: "500px",
                    objectFit: "contain",
                    borderRadius: "12px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                  }}
                />
              </div>
            )}

            <Row>
              <Col>
                <Button
                  variant="success"
                  className="px-4 me-2"
                  onClick={handleThanhToan}
                >
                  Confirm Payment
                </Button>
                <Button
                  variant="secondary"
                  className="px-4"
                  onClick={handleCloseForm}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

const TestThanhToan = () => {
  const [show, setShow] = useState(true);

  const fakeHoaDon = {
    idhd: 8888,
    tongCong: 2000000,
  };

  return (
    <div>
      <h3 className="text-center mt-3">Customer Payment</h3>
      <ThanhToan
        show={show}
        handleCloseForm={() => setShow(false)}
        handleCloseThanhToan={() => {
          setShow(false);
          alert("Thank you!");
        }}
        data={fakeHoaDon}
      />
    </div>
  );
};

export default TestThanhToan;

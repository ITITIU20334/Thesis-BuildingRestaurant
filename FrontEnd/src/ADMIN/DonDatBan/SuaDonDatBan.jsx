import React, { useState, useEffect } from "react";
import AdminPage from "../Template/AdminDash";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { UpdateDonDatBan } from "../../services/DonDatBanService";
import { toast } from "react-toastify";

const SuaDonDatBan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};

  const [hoTen, setHoTen] = useState("");
  const [soDT, setSoDT] = useState("");
  const [ngayDat, setNgayDat] = useState("");
  const [thoiGian, setThoiGian] = useState("");
  const [ghiChu, setGhiChu] = useState("");
  useEffect(() => {
    if (data) {
      setHoTen(data.hoTen);
      setSoDT(data.soDT);
      setNgayDat(data.ngayDat);
      setThoiGian(data.thoiGian);
      setGhiChu(data.ghiChu);
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log({
      hoTen,
      soDT,
      ngayDat,
      thoiGian,
      ghiChu,
    });
    const dataUpdate = { hoTen, soDT, ngayDat, thoiGian, ghiChu };
    let res = await UpdateDonDatBan(data.id, dataUpdate);
    if (res) {
      toast.success("Updated table reservation successfully");
      navigate("/admin/dondatban");
    } else {
      toast.error("Update failed table reservation");
    }
  };

  return (
    <>
      <AdminPage />
      <Container className="mt-4">
        <Card>
          <Card.Header>
            <h2>Edit Reservation Table</h2>
          </Card.Header>
          <Card.Body>
            {data ? (
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formHoTen">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={hoTen}
                      onChange={(event) => setHoTen(event.target.value)}
                      placeholder=""
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formSoDT">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={soDT}
                      onChange={(event) => setSoDT(event.target.value)}
                      placeholder=""
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formNgayDat">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={ngayDat}
                      onChange={(event) => setNgayDat(event.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formThoiGian">
                    <Form.Label>Time</Form.Label>
                    <Form.Select
                      value={thoiGian}
                      onChange={(event) => setThoiGian(event.target.value)}
                    >
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGhiChu">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={ghiChu}
                    onChange={(event) => setGhiChu(event.target.value)}
                    placeholder=""
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </Form>
            ) : (
              <p>No data to edit</p>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default SuaDonDatBan;

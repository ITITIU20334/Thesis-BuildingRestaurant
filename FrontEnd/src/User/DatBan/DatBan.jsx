import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "../common/NavigationBar";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Tab,
  Tabs,
} from "react-bootstrap";
import { fetchAllDanhMuc } from "../../services/DanhMucService";
import { fetchMonAnByLoai } from "../../services/MonAnService";
import Footer from "../common/Footer";
import { UserDatBan } from "../../services/DonDatBanService";
import { toast } from "react-toastify";
import { CartDisplay, ProductGridDatBan } from "./ChonMon";

const DatBan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ban, dataDatBan } = location.state || {};
  const [hoTen, setHoTen] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [ghiChu, setGhiChu] = useState("");
  const [danhmucs, setDanhMuc] = useState([]);
  const [monans, setMonAn] = useState([]);
  const [activeKey, setActiveKey] = useState("1");
  const [cart, setCart] = useState([]);
  const username = sessionStorage.getItem("username");
  const total = sessionStorage.getItem("total");
  const [email, setemail] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const danhMucResponse = await fetchAllDanhMuc();
        setDanhMuc(danhMucResponse.data);
        if (danhMucResponse.data.length > 0) {
          // Gọi listMonAn với id của danh mục đầu tiên nếu có
          setActiveKey(danhMucResponse.data[0].id_Loai);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (activeKey) {
      listMonAn(activeKey);
    }
  }, [activeKey]);

  function listMonAn(id) {
    fetchMonAnByLoai(id)
      .then((response) => {
        setMonAn(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleChonMonAn = (monAn) => {
    setCart((prevCart) => {
      const isInCart = prevCart.find((item) => item.id_mon === monAn.id_mon);
      if (isInCart) {
        return prevCart.map((item) =>
          item.id_mon === monAn.id_mon
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      monAn.quantity = 1;
      return [...prevCart, monAn];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const simplifiedCart = cart.map((item) => ({
      idMon: item.id_mon,
      soLuong: item.quantity,
      giaTien: item.giaTien,
      tongTien: item.quantity * item.giaTien,
    }));

    // if (username === null) {
    //   toast.error("Please login to reserve a table");
    //   return;
    // }
    if (hoTen === "" || soDienThoai === "") {
      toast.error("Please enter complete information");
      return;
    } else {
      const formData = {
        ngayDat: dataDatBan.ngayDat,
        thoiGian: dataDatBan.thoiGian,
        soLuong: dataDatBan.soNguoi,
        idBan: ban,
        hoTen: hoTen,
        soDT: soDienThoai,
        ghiChu: ghiChu,
        idKhach: username,
        chiTietDonDatBans: simplifiedCart,
        email: email,
      };

      console.log("Form data:", formData);
      let res = await UserDatBan(formData);
      if (res) {
        toast.success("Booking successful");
        window.alert("Booking successful");
        navigate("/");
      } else {
        window.alert("Booking failed");
      }
    }
  };

  return (
    <div>
      <NavigationBar />
      <Container style={{ marginTop: "100px" }}>
        {ban ? (
          <Card>
            <Card.Header>
              <h1>Reservation Information</h1>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="thongTinBan">
                      <Form.Label>Table Name</Form.Label>
                      <Form.Control type="text" readOnly value={ban.tenBan} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="hoTen">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Full Name"
                        value={hoTen}
                        onChange={(e) => setHoTen(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="ngayDatBan">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={dataDatBan ? dataDatBan.ngayDat : ""}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="soDienThoai">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter number"
                        value={soDienThoai}
                        onChange={(e) => setSoDienThoai(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="thoiGianDatBan">
                      <Form.Label>Time</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={dataDatBan ? dataDatBan.thoiGian : ""}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Email"
                        
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="ghiChu">
                      <Form.Label>Note</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Write note"
                        value={ghiChu}
                        onChange={(e) => setGhiChu(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}></Col>
                  <Col md={6}>
                    <Form.Group controlId="soNguoiDatBan">
                      <Form.Label>Number of Customers</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        value={dataDatBan ? dataDatBan.soNguoi : ""}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row style={{ marginTop: "50px" }}>
                  <Col md={7}>
                    <h3>Menu</h3>
                    <Tabs
                      activeKey={activeKey}
                      onSelect={(k) => setActiveKey(k)}
                      id="justify-tab-example"
                      className="mb-3"
                      justify
                    >
                      {danhmucs.map((x) => (
                        <Tab
                          eventKey={x.id_Loai}
                          title={x.tenLoai}
                          key={x.id_Loai}
                        >
                          <div>
                            {Array.isArray(monans) && monans.length > 0 && (
                              <ProductGridDatBan
                                products={monans}
                                cart={cart}
                                setCart={setCart}
                              />
                            )}
                          </div>
                        </Tab>
                      ))}
                    </Tabs>
                  </Col>
                  <Col md={5}>
                    <CartDisplay cart={cart} setCart={setCart} />
                  </Col>
                </Row>

                <Button
                  variant="primary"
                  style={{ marginTop: "20px" }}
                  type="submit"
                >
                  Booking
                </Button>
              </Form>
            </Card.Body>
          </Card>
        ) : (
          <p>No Table Information</p>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default DatBan;

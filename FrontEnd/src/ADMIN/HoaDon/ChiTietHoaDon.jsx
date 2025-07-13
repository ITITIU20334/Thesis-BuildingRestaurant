import React, { useEffect, useState } from "react";
import {
  chiTietHD,
  deleteMon,
  hoanThanh,
  InHoaDon,
} from "../../services/HoaDonService";
import { Button, Fade, Modal, Table } from "react-bootstrap";
import ThemMonAn from "./ThemMonAn";
import { capNhatBan } from "../../services/BanService";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ThanhToan from "./ThanhToan";

const ChiTietHoaDon = (props) => {
  const { handleClose, show, idBan, listBan, listHD } = props;
  const [chitiet, setChiTiet] = useState([]);
  const [chonMonModal, setChonMonModal] = useState(false);
  const [thanhToanModal, setThanhToanModal] = useState(false);
  const [idHD, setIdHD] = useState("");
  const [dataThanhToan, setdataThanhToan] = useState([]);
  const daThanhToan = chitiet.map((item) => {
    return item.daThanhToan;
  });
  const navigate = useNavigate();
  // Đóng Modal thêm món ăn
  const handleCloseForm = () => {
    listChiTiet(idBan);
    setChonMonModal(false);
    setThanhToanModal(false);
  };
  const handleCloseThanhToan = () => {
    handleClose();
    setThanhToanModal(false);
  };

  useEffect(() => {
    if (idBan) {
      listChiTiet(idBan);
    }
  }, [idBan]); // Gọi lại khi idBan thay đổi

  // Lấy chi tiết hóa đơn
  function listChiTiet(idBan) {
    chiTietHD(idBan)
      .then((response) => {
        setChiTiet(response.data);
        console.log(response);
        console.log(chitiet);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const ChonMonAn = (x) => {
    setIdHD(x);
    setChonMonModal(true); // Mở Modal để thêm món ăn
  };

  function DeleteMonAn(id) {
    if (window.confirm("Do you want to delete this food?")) {
      deleteMon(id)
        .then((rp) => {
          listChiTiet(idBan);
        })
        .catch((error) => {
          if (error.response && error.response.status === 500) {
          }
        });
    }
  }
  const handleInHoaDon = async (id) => {
    let res = await InHoaDon(id);
    if (res) {
      toast.success("Print successfully");
    } else {
      toast.error("Error");
    }
  };
  // const handleThanhToan = (idhd, idBan) => {
  //   hoanThanh(idhd);
  //   capNhatBan(idBan);
  //   listBan();
  //   handleClose();
  // };

  const handleThanhToan = (idhd, tongCong) => {
    const SoTien = tongCong - daThanhToan;
    console.log("SoTien:", SoTien);
    setdataThanhToan({ idhd, idBan, SoTien });
    console.log(dataThanhToan);
    setThanhToanModal(true);
  };
  const tongCong = chitiet.map((item, index) =>
    item.chiTietHoaDons.reduce(
      (acc, x) => acc + x.soLuong * x.idMonAn.giaTien,
      0
    )
  );
  const printPDF = () => {
    const input = document.getElementById("hoa-don-content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("bill.pdf");
    });
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
          <Modal.Title>
            <div className="text-center">
              <strong>Bill Detail</strong>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="hoa-don-content">
            {chitiet.map((item, index) => (
              <React.Fragment key={item.idHD}>
                <div className="d-flex">
                  <p>Date: </p>
                  <p className="ms-1">
                    {new Date(item.ngayTao).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div className="d-flex">
                  <p>Table No. </p>
                  <p className="ms-3">{item.idBan.tenBan}</p>
                </div>
                <div className="d-flex">
                  <p>Customer: </p>
                  <p className="ms-3">{item.hoTen}</p>
                </div>
                <div className="d-flex">
                  <p>Created by: </p>
                  <p className="ms-3">{item.tenNhanVien}</p>
                </div>
                <Button onClick={() => ChonMonAn(item.idHD)}>Add food</Button>
                <Table striped bordered hover style={{ marginTop: "20px" }}>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.chiTietHoaDons.map((x, index) => (
                      <tr key={x.idMonAn.idMon}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{x.idMonAn.tenMon}</td>
                        <td className="text-center">{x.soLuong}</td>
                        <td className="text-center">{x.idMonAn.giaTien}</td>
                        <td className="text-center">
                          {x.soLuong * x.idMonAn.giaTien}
                        </td>
                        <td>
                          <Button
                            onClick={() => {
                              DeleteMonAn(x.id);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={"2"}>Total:</td>
                      <td colSpan={"4"}>{tongCong}</td>
                    </tr>
                    <tr>
                      <td colSpan={"2"}>Paid:</td>
                      <td colSpan={"4"}>{daThanhToan}</td>
                    </tr>
                    <tr>
                      <td colSpan={"2"}>Total Amount:</td>
                      <td colSpan={"4"}>{tongCong - daThanhToan}</td>
                    </tr>
                  </tbody>
                </Table>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleThanhToan(item.idHD, tongCong);
                  }}
                >
                  Check out
                </Button>
                <Button
                  style={{ marginLeft: "30px" }}
                  variant="primary"
                  onClick={() => handleInHoaDon(item.idHD)}
                >
                  Print Bill
                </Button>
              </React.Fragment>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ThemMonAn
        show={chonMonModal}
        handleCloseForm={handleCloseForm}
        listHoaDon={chitiet}
        idHoaDon={idHD}
      />
      <ThanhToan
        show={thanhToanModal}
        handleCloseForm={handleCloseForm}
        handleCloseThanhToan={handleCloseThanhToan}
        data={dataThanhToan}
        listBan={listBan}
      />
    </>
  );
};

export default ChiTietHoaDon;

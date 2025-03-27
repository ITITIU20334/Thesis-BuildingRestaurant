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
    if (window.confirm("Bạn có muốn xóa món ăn này")) {
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
      toast.success("in thành công");
    } else {
      toast.error("Có lỗi xảy ra");
    }
  };
  // const handleThanhToan = (idhd, idBan) => {
  //   hoanThanh(idhd);
  //   capNhatBan(idBan);
  //   listBan();
  //   handleClose();
  // };

  const handleThanhToan = (idhd, tongCong) => {
    setdataThanhToan({ idhd, idBan, tongCong });
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
      pdf.save("hoa-don.pdf");
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
              <strong>CHI TIẾT HÓA ĐƠN</strong>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="hoa-don-content">
            {chitiet.map((item, index) => (
              <React.Fragment key={item.idHD}>
                <div className="d-flex">
                  <p>Ngày Tạo hóa đơn :</p>
                  <p className="ms-1">
                    {new Date(item.ngayTao).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div className="d-flex">
                  <p>Bàn số :</p>
                  <p className="ms-3">{item.idBan.tenBan}</p>
                </div>
                <div className="d-flex">
                  <p>Khách hàng :</p>
                  <p className="ms-3">{item.hoTen}</p>
                </div>
                <div className="d-flex">
                  <p>Người tạo hóa đơn :</p>
                  <p className="ms-3">{item.tenNhanVien}</p>
                </div>
                <Button onClick={() => ChonMonAn(item.idHD)}>Thêm món</Button>
                <Table striped bordered hover style={{ marginTop: "20px" }}>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên Món</th>
                      <th>Số Lượng</th>
                      <th>Giá Tiền</th>
                      <th>Tổng Cộng</th>
                      <th>Thao tác</th>
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
                            Xóa
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={"2"}>Tổng cộng :</td>
                      <td colSpan={"4"}>{tongCong}</td>
                    </tr>
                  </tbody>
                </Table>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleThanhToan(item.idHD, tongCong);
                  }}
                >
                  Thanh toán
                </Button>
                <Button
                  style={{ marginLeft: "30px" }}
                  variant="primary"
                  onClick={() => handleInHoaDon(item.idHD)}
                >
                  In hóa đơn
                </Button>
              </React.Fragment>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
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

import React, { useEffect, useState } from "react";
import {
  chiTietHD,
  deleteMon,
  hoanThanh,
  InHoaDon,
} from "../../services/HoaDonService";
import { Button, Modal, Table } from "react-bootstrap";
import { capNhatBan } from "../../services/BanService";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";

const UserChiTietHD = (props) => {
  const { handleClose, show, HD } = props;
  const [chitiet, setChiTiet] = useState([]);

  const handleInHoaDon = async (id) => {
    let res = await InHoaDon(id);
    if (res) {
      handleClose();
    } else {
      toast.error("Error");
    }
  };

  const tongCong =
    HD?.chiTietHoaDons?.reduce(
      (acc, item) => acc + item.soLuong * item.idMonAn.giaTien,
      0
    ) || 0;

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
              <strong>Bill Details</strong>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="hoa-don-content">
            <React.Fragment key={HD?.idHD}>
              <div className="d-flex">
                <p>Date:</p>
                <p className="ms-1">
                  {new Date(HD?.ngayTao).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <div className="d-flex">
                <p>Table No. </p>
                <p className="ms-3">
                  {HD?.idBan?.tenBan ? HD.idBan.tenBan : "No table found"}
                </p>
              </div>
              <div className="d-flex">
                <p>Customer:</p>
                <p className="ms-3">{HD?.hoTen}</p>
              </div>
              <div className="d-flex">
                <p>Billed By: </p>
                <p className="ms-3">{HD?.tenNhanVien}</p>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {HD?.chiTietHoaDons?.map((x, index) => (
                    <tr key={x.idMonAn.idMon}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{x.idMonAn.tenMon}</td>
                      <td className="text-center">{x.soLuong}</td>
                      <td className="text-center">{x.idMonAn.giaTien}</td>
                      <td className="text-center">
                        {x.soLuong * x.idMonAn.giaTien}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="mt-3">
                <p>
                  <strong>Total Amount: </strong>
                  {tongCong.toLocaleString("vi-VN")} VND
                </p>
              </div>
              {HD?.trangThai === "Completed" ||
              HD?.trangThai === "Completed\r\n" ? (
                <Button
                  variant="primary"
                  onClick={() => handleInHoaDon(HD?.idHD)}
                >
                  Print
                </Button>
              ) : (
                <></>
              )}
            </React.Fragment>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserChiTietHD;

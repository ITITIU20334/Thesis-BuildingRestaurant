import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { taoHoaDon } from "../../services/HoaDonService";
import { toast } from "react-toastify";
import { HoanThanh } from "../../services/DonDatBanService";
import { capNhatBan } from "../../services/BanService";

const ChitietDonDatBan = (props) => {
  const { handleClose, show, dataChitiet, listDonDatBan } = props;
  const username = sessionStorage.getItem("username");
  const [ngayDat, setNgaydat] = useState("");
  const [thoiGian, setGioDat] = useState("");
  const [soLuong, setsoLuong] = useState();
  const [hoTen, sethoTen] = useState("");
  const [soDT, setSoDT] = useState("");
  const [ghiChu, setghiChu] = useState("");
  const [ban, setBan] = useState([]);
  const [khachHang, setKhachHang] = useState([]);
  const [monan, setMonAn] = useState([]);
  const ngayTao = new Date().toISOString().slice(0, 10);
  useEffect(() => {
    if (show && dataChitiet) {
      sethoTen(dataChitiet.hoTen);
      setSoDT(dataChitiet.soDT);
      setKhachHang(dataChitiet.idKhach);
      setNgaydat(dataChitiet.ngayDat);
      setGioDat(dataChitiet.thoiGian);
      setsoLuong(dataChitiet.soLuong);
      setghiChu(dataChitiet.ghiChu);
      setBan(dataChitiet.idBan);
      setMonAn(dataChitiet.chiTietDonDatBans);
    }
  }, [dataChitiet, show]);
  const tongCong = monan.reduce(
    (acc, item) => acc + item.soLuong * item.monAnId.giaTien,
    0
  );
  const handleTaoHD = async () => {
    if (ban === null) {
      toast.error("Ban chua chon ban");
      handleClose();
      return;
    } else if (ngayDat > ngayTao) {
      toast.error("Ngay dat ban khong hop le");
      handleClose();
      return;
    } else {
      const hoaDonDTO = {
        ngayTao: ngayTao,
        idBan: ban,
        idDatBan: dataChitiet.id,
        khachHang: khachHang,
        tongTien: tongCong,
        username: username,
        hoTen: hoTen,
        chiTietHoaDons: monan.map((item) => ({
          idMonAn: item.monAnId.id_mon,
          soLuong: item.soLuong,
          thanhTien: item.soLuong * item.monAnId.giaTien,
        })),
      };
      console.log("Tạo hóa đơn:", hoaDonDTO);
      let res = await taoHoaDon(hoaDonDTO);
      if (res) {
        toast.success("Tạo hóa đơn thành công");
        HoanThanh(dataChitiet.id);
        capNhatBan(ban.idBan);
        handleClose();
      } else {
        toast.error("Tạo hóa đơn thất bại");
        console.log("Tạo hóa đơn thất bại");
      }
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
          <Modal.Title>Chi Tiet Don</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className="form-label me-4">Ho Ten: </label>
            <label>{hoTen}</label>
          </div>
          <div>
            <label className="form-label  me-4">So dien thoai: </label>
            <label htmlFor="">{soDT}</label>
          </div>
          <div>
            <label className="form-label me-4">Ngay dat ban: </label>
            <label htmlFor="">{ngayDat}</label>
          </div>
          <div>
            <label className="form-label me-4">Gio dat ban: </label>
            <label>{thoiGian}</label>
          </div>
          <div>
            <label className="form-label me-4">So luong khach: </label>
            <label>{soLuong}</label>
          </div>
          <div>
            <label className="form-label me-4">Ghi Chu:</label>
            <label> {ghiChu}</label>
          </div>
          <div>
            <div className="text-center">
              <strong>CHI TIET MON AN</strong>
            </div>
            <div>
              <Table striped bordered hover>
                <tr>
                  <th>STT</th>
                  <th>Ten Mon</th>
                  <th>So Luong</th>
                  <th>Gia Tien</th>
                  <th>Tong Cong</th>
                </tr>
                <tbody>
                  {monan.map((x, index) => (
                    <tr>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{x.monAnId.tenMon}</td>
                      <td className="text-center">{x.soLuong}</td>
                      <td className="text-center">{x.monAnId.giaTien}</td>
                      <td className="text-center">
                        {x.soLuong * x.monAnId.giaTien}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="mt-3 ">
                <p>
                  <strong>Tong so tien: </strong>
                  {tongCong.toLocaleString("vi-VN")} VND
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleTaoHD()}>
            Tao hoa don
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChitietDonDatBan;

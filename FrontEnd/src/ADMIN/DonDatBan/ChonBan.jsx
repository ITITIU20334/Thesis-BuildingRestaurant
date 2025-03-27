import React, { useState, useEffect } from "react";
import { Modal, Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { fetchAllBanTrong } from "../../services/BanService";
import { ChonBanService } from "../../services/DonDatBanService";

const ChonBanModal = (props) => {
  const { handleClose, show, listDonDatBan, id, ngayDat, thoiGian } = props;
  const [bans, setBan] = useState([]);

  const idDonDatBan = id;
  const ngayDatban = ngayDat;
  const thoiGianban = thoiGian;
  console.log(ngayDatban, thoiGianban);
  console.log("idDonDatBan", idDonDatBan);
  useEffect(() => {
    listBan();
  }, []);

  async function listBan() {
    try {
      const dataBan = await fetchAllBanTrong(ngayDatban, thoiGianban);
      setBan(dataBan);
      console.log(dataBan);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bàn trống:", error);
    }
  }

  const handleChonBan = async (x) => {
    console.log(x);
    const chonBan = x;
    const chon = { chonBan, idDonDatBan };
    let res = await ChonBanService(chon);
    if (res) {
      handleClose();
      listDonDatBan();
      toast.success("Xếp bàn thành công");
    } else {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Chọn bàn</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên bàn</th>
              <th>Vị trí</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {bans.map((x, index) => (
              <tr key={x.idBan}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{x.tenBan}</td>
                <td className="text-center">{x.viTri}</td>
                <td className="text-center">{x.trangThai}</td>
                <td className="text-center">
                  <Button variant="primary" onClick={() => handleChonBan(x)}>
                    Chọn
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default ChonBanModal;

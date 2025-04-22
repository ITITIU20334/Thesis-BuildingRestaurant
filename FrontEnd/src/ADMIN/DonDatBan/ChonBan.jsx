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
      console.error("Error when getting list of empty tables", error);
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
      toast.success("Successful table arrangement");
    } else {
      toast.error("Error");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Choose Table</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Position</th>
              <th>Status</th>
              <th>Action</th>
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
                    Select
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

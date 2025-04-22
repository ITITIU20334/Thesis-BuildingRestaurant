import React, { useEffect, useState } from "react";
import {
  DuyetDon,
  fetchAllDonDatBan,
  HuyDon,
} from "../../services/DonDatBanService";
import AdminPage from "../Template/AdminDash";
import { Button, Dropdown, Table } from "react-bootstrap";
import TaoDonComponent from "./TaoDonComponent";
import ChitietDonDatBan from "./ChitietDonDatBan";
import ChonBan from "./ChonBan";
import ChonBanModal from "./ChonBan";
import { useNavigate } from "react-router-dom";

export const DonDatBanComponent = () => {
  const now = new Date();
  const [dondatbans, setDonDatBan] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ngayDat, setNgayDat] = useState(now.toISOString().split("T")[0]);
  const [thoiGian, setThoiGian] = useState(now.toTimeString().split(" ")[0]);
  const [showModalChonBan, setShowModalChonBan] = useState(false);
  const [ModalChiTiet, setModalChiTiet] = useState(false);
  const [dataChitiet, setDataChiTiet] = useState({});
  const [idDon, setID] = useState({});
  const navigate = useNavigate();
  const handleClose = () => {
    setShowModal(false);
    setModalChiTiet(false);
    setShowModalChonBan(false);
    listDonDatBan();
  };

  useEffect(() => {
    listDonDatBan();
  }, []);

  function listDonDatBan() {
    fetchAllDonDatBan()
      .then((response) => {
        setDonDatBan(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const ChiTietDon = (x) => {
    setModalChiTiet(true);
    setDataChiTiet(x);
  };

  const ChonBan = (x) => {
    setShowModalChonBan(true);
    setNgayDat(x.ngayDat);
    setThoiGian(x.thoiGian);
    console.log(x.id);

    setID(x.id);
  };

  const handleUpdate = (data) => {
    navigate("/sua-don-dat-ban", { state: { data } });
  };
  return (
    <div>
      <AdminPage />
      <div className="my-3">
        <span>
          <span>
            <b>Create Order: </b>
          </span>
          <button
            className="btn ms-5 btn-success"
            onClick={() => setShowModal(true)}
          >
            Create
          </button>
        </span>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Date</th>
            <th>Time</th>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Note</th>
            <th>Table</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dondatbans.map((x, index) => (
            <tr key={x.id}>
              <td>{index + 1}</td> <td>{x.ngayDat}</td>
              <td>{x.thoiGian.substring(0, 5)}</td> <td>{x.hoTen}</td>
              <td>{x.soDT}</td> <td>{x.trangThai}</td> <td>{x.ghiChu}</td>
              <td>
                {x.idBan && x.idBan.tenBan ? x.idBan.tenBan : "No table available"}
              </td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic  d-flex jcon te"
                  >
                    Action
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {x.trangThai === "Dang xu Ly" ? (
                      <>
                        <Dropdown.Item
                          onClick={() => DuyetDon(x.id)}
                          href="/admin/dondatban"
                        >
                          Confirm
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => ChiTietDon(x)}>
                          Detail
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => HuyDon(x.id)}
                          href="/admin/dondatban"
                        >
                          Cancel
                        </Dropdown.Item>
                      </>
                    ) : (
                      <>
                        <Dropdown.Item onClick={() => ChonBan(x)}>
                          Select Table
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleUpdate(x)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => ChiTietDon(x)}>
                          Detail
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => HuyDon(x.id)}
                          href="/admin/dondatban"
                        >
                          Cancel
                        </Dropdown.Item>
                      </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TaoDonComponent
        show={showModal}
        handleClose={handleClose}
        listDonDatBan={listDonDatBan}
      />
      <ChitietDonDatBan
        show={ModalChiTiet}
        handleClose={handleClose}
        dataChitiet={dataChitiet}
        listDonDatBan={listDonDatBan}
      />
      <ChonBanModal
        handleClose={handleClose}
        show={showModalChonBan}
        listDonDatBan={listDonDatBan}
        ngayDat={ngayDat}
        thoiGian={thoiGian}
        id={idDon}
      />
    </div>
  );
};

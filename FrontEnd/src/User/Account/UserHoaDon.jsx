import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { fetchHoaDonKhach } from "../../services/HoaDonService";
import UserChiTietHD from "./UserChiTietHD";

const UserHoaDon = (props) => {
  const username = sessionStorage.getItem("username");
  const [hoadons, setHoaDon] = useState([]);
  const [ModalHoaDon, setMoDalHoaDon] = useState(false);
  const [dataChitiet, setDataChiTiet] = useState({});
  const handleClose = () => {
    setMoDalHoaDon(false);
  };
  useEffect(() => {
    listHoaDon(username);
  }, [username]);

  function listHoaDon(username) {
    fetchHoaDonKhach(username)
      .then((response) => {
        setHoaDon(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const chiTietDon = (x) => {
    setMoDalHoaDon(true);
    setDataChiTiet(x);
  };

  const columns = [
    {
      name: "Number",
      selector: (row, index) => index + 1,
      center: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.ngayTao).toLocaleDateString("vi-VN"),
      center: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.hoTen,
      center: true,
    },
    {
      name: "Table No.",
      selector: (row) => (row.idBan && row.idBan.tenBan ? row.idBan.tenBan : 0),
      center: true,
    },
    {
      name: "Total Amount",
      selector: (row) => row.tongTien,
      center: true,
    },
    {
      name: "Status",
      selector: (row) => row.trangThai,
      center: true,
    },
    {
      name: "Details",
      selector: (row) => (
        <button className="btn btn-primary" onClick={() => chiTietDon(row)}>
          View
        </button>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={hoadons}
        noHeader
        striped
        bordered
        highlightOnHover
        pagination
        className="bordered-table"
      />
      <UserChiTietHD
        show={ModalHoaDon}
        handleClose={handleClose}
        HD={dataChitiet}
      />
    </div>
  );
};

export default UserHoaDon;

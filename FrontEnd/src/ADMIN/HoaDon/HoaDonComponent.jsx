import React, { useEffect, useState } from "react";
import AdminPage from "../Template/AdminDash";
import DataTable from "react-data-table-component";
import { fetchAllHoaDon } from "../../services/HoaDonService";
import UserChiTietHD from "../../User/Account/UserChiTietHD";

const HoaDonComponent = (props) => {
  const [hoadons, setHoaDon] = useState([]);
  const [ModalHoaDon, setMoDalHoaDon] = useState(false);
  const [dataChitiet, setDataChiTiet] = useState({});
  const [filteredData, setFilteredData] = useState([]); // Lưu dữ liệu đã lọc

  useEffect(() => {
    listHoaDon();
  }, []);

  const handleClose = () => {
    setMoDalHoaDon(false);
  };

  function listHoaDon() {
    fetchAllHoaDon()
      .then((response) => {
        setHoaDon(response.data);
        setFilteredData(response.data); // Đồng bộ `filteredData` với `hoadons`
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
      name: "No",
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
      selector: (row) =>
        row.idBan && row.idBan.tenBan ? row.idBan.tenBan : "N/A",
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
      name: "Detail",
      cell: (row) => (
        <button className="btn btn-primary" onClick={() => chiTietDon(row)}>
          Review Bill
        </button>
      ),
    },
  ];

  return (
    <>
      <AdminPage />
      <div className="my-3">
        <span>
          <b>Billing History</b>
        </span>
      </div>
      <DataTable
        columns={columns}
        data={filteredData} // Hiển thị dữ liệu đã lọc
        pagination
        highlightOnHover
        fixedHeader
        subHeader
        className="bordered-table"
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              const filtered = hoadons.filter(
                (item) =>
                  item.hoTen?.toLowerCase().includes(value) ||
                  item.idBan?.tenBan?.toLowerCase().includes(value) ||
                  item.tongTien?.toString().includes(value) ||
                  item.trangThai?.toLowerCase().includes(value)
              );
              setFilteredData(filtered);
            }}
            className="form-control"
            style={{ width: "300px", marginBottom: "10px" }}
          />
        }
      />
      <UserChiTietHD
        show={ModalHoaDon}
        handleClose={handleClose}
        HD={dataChitiet}
      />
    </>
  );
};

export default HoaDonComponent;

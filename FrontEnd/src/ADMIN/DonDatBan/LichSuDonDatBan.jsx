import React, { useEffect, useState } from "react";
import { fetchLichSuDon } from "../../services/DonDatBanService";
import DataTable from "react-data-table-component";
import AdminPage from "../Template/AdminDash";

const LichSuDonDatBan = () => {
  const [dondatbans, setDonDatBan] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    listDonDatBan();
  }, []);

  function listDonDatBan() {
    fetchLichSuDon()
      .then((response) => {
        setDonDatBan(response.data);
        setFilteredData(response.data); // Khởi tạo dữ liệu lọc
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Cột cho bảng DataTable
  const columns = [
    {
      name: "No",
      cell: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Date",
      selector: (row) => row.ngayDat,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) =>
        typeof row.thoiGian === "string" ? row.thoiGian.substring(0, 5) : "",
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.hoTen,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.soDT,
    },
    {
      name: "Status",
      selector: (row) => row.trangThai,
    },
    {
      name: "Note",
      selector: (row) => row.ghiChu,
    },
  ];

  return (
    <div>
      <AdminPage />
      <div className="my-3"></div>

      <DataTable
        title="History Table Booking"
        columns={columns}
        data={filteredData}
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
              const filtered = dondatbans.filter(
                (item) =>
                  item.hoTen?.toLowerCase().includes(value) ||
                  item.soDT?.toLowerCase().includes(value) ||
                  item.ngayDat?.toLowerCase().includes(value) ||
                  item.trangThai?.toLowerCase().includes(value)
              );
              setFilteredData(filtered);
            }}
            className="form-control"
            style={{ width: "300px", marginBottom: "10px" }}
          />
        }
      />
    </div>
  );
};

export default LichSuDonDatBan;

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
      name: "STT",
      cell: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Ngày Đặt Bàn",
      selector: (row) => row.ngayDat,
      sortable: true,
    },
    {
      name: "Thời Gian",
      selector: (row) =>
        typeof row.thoiGian === "string" ? row.thoiGian.substring(0, 5) : "",
      sortable: true,
    },
    {
      name: "Họ Tên",
      selector: (row) => row.hoTen,
      sortable: true,
    },
    {
      name: "Số Điện Thoại",
      selector: (row) => row.soDT,
    },
    {
      name: "Trạng Thái",
      selector: (row) => row.trangThai,
    },
    {
      name: "Ghi Chú",
      selector: (row) => row.ghiChu,
    },
  ];

  return (
    <div>
      <AdminPage />
      <div className="my-3"></div>

      <DataTable
        title="Lịch Sử Đơn Đặt Bàn"
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
            placeholder="Tìm kiếm..."
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

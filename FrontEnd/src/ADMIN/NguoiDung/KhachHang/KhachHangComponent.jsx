import React, { useEffect, useState } from "react";
import { fetchAllAdmin, fetchAllKhach } from "../../../services/ProfileService";
import AdminPage from "../../Template/AdminDash";
import DataTable from "react-data-table-component";

const KhachHangComponent = () => {
  const [khachs, setKhachHang] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    listKhachHang();
  }, []);
  const listKhachHang = () => {
    fetchAllKhach()
      .then((response) => {
        setKhachHang(response.data);
        setFilteredData(response.data); // Dữ liệu ban đầu cho bảng
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = khachs.filter(
      (item) =>
        (item.hoTen && item.hoTen.toLowerCase().includes(value)) ||
        (item.username && item.username.toLowerCase().includes(value))
    );

    setFilteredData(filtered);
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Full Name",
      selector: (row) => row.hoTen,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.soDT,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
  ];
  return (
    <div>
      <AdminPage />

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Username..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="text-start">
        <h1>List Account</h1>
      </div>
      <div className="border rounded p-3 shadow-sm">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          responsive
          striped
        />
      </div>
    </div>
  );
};

export default KhachHangComponent;

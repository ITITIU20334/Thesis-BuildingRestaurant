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
      name: "STT",
      selector: (row, index) => index + 1,
      center: true,
    },
    {
      name: "Ngày Tạo",
      selector: (row) => new Date(row.ngayTao).toLocaleDateString("vi-VN"),
      center: true,
    },
    {
      name: "Họ Tên",
      selector: (row) => row.hoTen,
      center: true,
    },
    {
      name: "Bàn Số",
      selector: (row) =>
        row.idBan && row.idBan.tenBan ? row.idBan.tenBan : "N/A",
      center: true,
    },
    {
      name: "Tổng Tiền",
      selector: (row) => row.tongTien,
      center: true,
    },
    {
      name: "Trạng Thái",
      selector: (row) => row.trangThai,
      center: true,
    },
    {
      name: "Chi Tiết",
      cell: (row) => (
        <button className="btn btn-primary" onClick={() => chiTietDon(row)}>
          Xem hóa đơn
        </button>
      ),
    },
  ];

  return (
    <>
      <AdminPage />
      <div className="my-3">
        <span>
          <b>Lịch sử hóa đơn</b>
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
            placeholder="Tìm kiếm..."
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

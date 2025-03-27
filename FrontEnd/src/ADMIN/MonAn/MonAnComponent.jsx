import { useEffect, useState } from "react";
import { deleteMonAn, fetchAllMonAn } from "../../services/MonAnService";
import ThemMonAnComponent from "./ThemMonAn";
import { toast } from "react-toastify";
import UpdateMonAnComponent from "./SuaMonAn";
import AdminPage from "../Template/AdminDash";
import DataTable from "react-data-table-component";

const MonAnComponent = () => {
  const [monans, setMonAn] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For filtered results
  const [searchText, setSearchText] = useState(""); // Search input
  const [showModal, setShowModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [ModalUpdate, setModalUpdate] = useState(false);

  useEffect(() => {
    listMonAn();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setModalUpdate(false);
  };

  const listMonAn = () => {
    fetchAllMonAn()
      .then((response) => {
        setMonAn(response.data);
        setFilteredData(response.data); // Initialize filtered data
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteMonAn = (id) => {
    if (window.confirm("Bạn có muốn xóa món ăn này?")) {
      deleteMonAn(id)
        .then(() => {
          listMonAn();
          toast.success("Xóa món ăn thành công!");
        })
        .catch((error) => {
          toast.error("Không thể xóa món ăn!");
        });
    }
  };

  const UpdateMonAn = (x) => {
    setDataUpdate(x);
    setModalUpdate(true);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = monans.filter(
      (item) =>
        item.tenMon.toLowerCase().includes(value) ||
        item.loaiMonAn.tenLoai.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  // Columns configuration for DataTable
  const columns = [
    {
      name: "STT",
      selector: (row, index) => index + 1,
      width: "50px",
      center: true,
    },
    {
      name: "Tên Món Ăn",
      selector: (row) => row.tenMon,
      sortable: true,
    },
    {
      name: "Loại Món Ăn",
      selector: (row) => row.loaiMonAn.tenLoai,
      sortable: true,
    },
    {
      name: "Hình Ảnh",
      cell: (row) => (
        <img
          src={row.hinhAnh}
          alt={row.tenMon}
          style={{ width: "100px", height: "auto" }}
        />
      ),
      center: true,
    },
    {
      name: "Giá Tiền",
      selector: (row) => row.giaTien,
      sortable: true,
      center: true,
    },
    {
      name: "Hành Động",
      cell: (row) => (
        <div>
          <button
            onClick={() => DeleteMonAn(row.id_mon)}
            className="btn btn-danger ms-2"
          >
            Xóa
          </button>
          <button
            onClick={() => UpdateMonAn(row)}
            className="btn btn-success ms-2"
          >
            Sửa
          </button>
        </div>
      ),
      center: true,
    },
  ];

  const subHeaderComponent = (
    <div className="d-flex justify-content-between align-items-center w-100">
      <input
        type="text"
        placeholder="Tìm kiếm món ăn..."
        className="form-control"
        style={{ maxWidth: "300px" }}
        value={searchText}
        onChange={handleSearch}
      />
    </div>
  );

  return (
    <>
      <AdminPage />
      <div className="">
        <span>
          <b>Thêm món ăn</b>
          <button
            className="btn ms-5 btn-success"
            onClick={() => setShowModal(true)}
          >
            Thêm
          </button>
        </span>
      </div>
      <DataTable
        title="Danh Sách Món Ăn"
        columns={columns}
        data={filteredData} // Use filtered data for rendering
        pagination
        highlightOnHover
        fixedHeader
        fixedHeaderScrollHeight="500px"
        subHeader
        subHeaderComponent={subHeaderComponent}
      />
      <ThemMonAnComponent
        show={showModal}
        handleClose={handleClose}
        listMonAn={listMonAn}
      />
      <UpdateMonAnComponent
        show={ModalUpdate}
        handleClose={handleClose}
        listMonAn={listMonAn}
        dataUpdate={dataUpdate}
      />
    </>
  );
};

export default MonAnComponent;

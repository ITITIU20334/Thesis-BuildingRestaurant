import React, { useEffect, useState } from "react";
import { deleteDanhMuc, fetchAllDanhMuc } from "../../services/DanhMucService";
import ThemDanhMucComponent from "./ThemDanhMuc";
import UpdateDanhMucComponent from "./SuaDanhMuc";
import AdminPage from "../Template/AdminDash";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";

const DanhMucComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [ModalUpdate, setModalUpdate] = useState(false);
  const [danhmucs, setDanhMuc] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClose = () => {
    setModalUpdate(false);
    setShowModal(false);
  };

  useEffect(() => {
    listDanhMuc();
  }, []);

  const listDanhMuc = () => {
    fetchAllDanhMuc()
      .then((response) => {
        setDanhMuc(response.data);
        setFilteredData(response.data); // Dữ liệu ban đầu cho bảng
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = danhmucs.filter((item) =>
      item.tenLoai.toLowerCase().includes(value)
    );

    setFilteredData(filtered);
  };

  const DeleteDanhMuc = (id) => {
    if (window.confirm("Do you want to delete this category?")) {
      deleteDanhMuc(id)
        .then(() => {
          listDanhMuc();
          toast.success("Deleted");
        })
        .catch((error) => {
          if (error.response?.status === 500) {
            toast.error("Cannot Delete: Category is currently in use!!");
          } else {
            toast.error("Failed Delete");
          }
        });
    }
  };

  const UpdateDanhMuc = (x) => {
    setDataUpdate(x);
    setModalUpdate(true);
  };

  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Name Category",
      selector: (row) => row.tenLoai,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            onClick={() => DeleteDanhMuc(row.id_Loai)}
            className="btn btn-danger ms-2"
          >
            Delete
          </button>
          <button
            onClick={() => UpdateDanhMuc(row)}
            className="btn btn-success ms-2"
          >
            Update
          </button>
        </>
      ),
    },
  ];

  return (
    <div>
      <AdminPage />

      <div className="my-3">
        <span>
          <b>Add category</b>
          <button
            className="btn ms-5 btn-success"
            onClick={() => setShowModal(true)}
          >
            Add
          </button>
        </span>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name Category..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="text-start">
        <h1>Category List</h1>
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

      <ThemDanhMucComponent
        show={showModal}
        handleClose={handleClose}
        listDanhMuc={listDanhMuc}
      />

      <UpdateDanhMucComponent
        show={ModalUpdate}
        handleClose={handleClose}
        listDanhMuc={listDanhMuc}
        dataUpdate={dataUpdate}
      />
    </div>
  );
};

export default DanhMucComponent;

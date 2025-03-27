import React, { useEffect, useState } from "react";
import { fetchAllAdmin, xoaUser } from "../../../services/ProfileService";
import DataTable from "react-data-table-component";
import AdminPage from "../../Template/AdminDash";
import ThemQuanLy from "./ThemQuanLy";
import { toast } from "react-toastify";
import UpdateProfile from "../../../User/Account/UpdateProfile";
import UpdatePassword from "../../../User/Account/UpdatePassword";

const QuanLyComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [ModalUpdate, setModalUpdate] = useState(false);
  const [ModalUpdatePass, setModalUpdatePass] = useState(false);
  const [quanlys, setQuanLy] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState("");
  const handleClose = () => {
    setModalUpdate(false);
    setShowModal(false);
    setModalUpdatePass(false);
  };
  useEffect(() => {
    listQuanLy();
  }, []);
  const listQuanLy = () => {
    fetchAllAdmin()
      .then((response) => {
        setQuanLy(response.data);
        setFilteredData(response.data); // Dữ liệu ban đầu cho bảng
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const DeleteUser = (id) => {
    if (window.confirm("Do you want to delete this account?")) {
      xoaUser(id)
        .then(() => {
          listQuanLy();
          toast.success("Deleted");
        })
        .catch((error) => {
          if (error.response?.status === 500) {
            toast.error("Cannot delete this user!");
          } else {
            toast.error("Failed Delete!");
          }
        });
    }
  };
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = quanlys.filter(
      (item) =>
        (item.hoTen && item.hoTen.toLowerCase().includes(value)) ||
        (item.username && item.username.toLowerCase().includes(value))
    );

    setFilteredData(filtered);
  };

  const UpDateThongTin = (x) => {
    setDataUpdate(x);
    setModalUpdate(true);
  };
  const HandleUpdatePassword = (username) => {
    console.log("Update password");
    setUsername(username);
    setModalUpdatePass(true);
    console.log(ModalUpdatePass);
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
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            className="btn btn-danger ms-2"
            onClick={() => DeleteUser(row.idKhach)}
          >
            Delete
          </button>
          <button
            onClick={() => UpDateThongTin(row)}
            className="btn btn-success ms-2"
          >
            Edit
          </button>
          <button
            onClick={() => HandleUpdatePassword(row.username)}
            className="btn btn-success ms-2"
          >
            Change Password
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
          <b>Add Account</b>
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
      <ThemQuanLy
        show={showModal}
        handleClose={handleClose}
        listQuanLy={listQuanLy}
      />
      <UpdateProfile
        show={ModalUpdate}
        handleClose={handleClose}
        dataupdate={dataUpdate}
        reload={listQuanLy}
      />
      <UpdatePassword
        show={ModalUpdatePass}
        handleClose={handleClose}
        username={username}
      />
    </div>
  );
};

export default QuanLyComponent;

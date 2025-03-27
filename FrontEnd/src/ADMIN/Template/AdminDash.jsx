import React from "react";
import Sidebar from "./AdminSideBar";
import DanhMucComponent from "../DanhMuc/DanhMucComponent";
import { Navigate, useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const username = "Admin"; // Thay bằng logic lấy username từ backend hoặc context
  function handleLogout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    navigate("/");
  }
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Page</title>
        {/* Thư viện Bootstrap CSS */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        {/* Thư viện Bootstrap JS và Popper.js */}
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
      </head>
      <body>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/admin/">
              Admin Page
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/admin/">
                    <i className="fa fa-home"></i> Home
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownUsers"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-users"></i> Bill
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownUsers"
                  >
                    <li>
                      <a className="dropdown-item" href="/admin/hoadon">
                        History
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownUsers"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-users"></i> Reservation Table
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownUsers"
                  >
                    <li>
                      <a className="dropdown-item" href="/admin/ban/sodo">
                        Table Map
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/admin/dondatban">
                        Table Booking Schedule
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/admin/dondatban/lichsu"
                      >
                        History Table Booking
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-list"></i> Menu
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="/admin/danhmuc">
                        Category
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/admin/monan">
                        Menu
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/admin/ban">
                        Table
                      </a>
                    </li>
                    <li className="dropdown-divider"></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownUsers"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-users"></i> Report
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownUsers"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="/admin/baocao/bao-cao-ngay"
                      >
                        Print Report
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownUsers"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-users"></i> Role
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownUsers"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="/admin/nguoidung/quanly"
                      >
                        Admin
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/admin/nguoidung/khachhang"
                      >
                        Customer
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item text-white">
                  <div className="container mt-1">Hello: {username}</div>
                </li>
                <li className="nav-item">
                  <form>
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Logout"
                      onClick={() => handleLogout()}
                    />
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Table */}
        <div className="container mt-4"></div>
      </body>
    </>
  );
};

export default AdminPage;

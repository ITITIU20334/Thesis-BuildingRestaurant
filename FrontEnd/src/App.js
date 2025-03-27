import logo from "./logo.svg";
import "./App.css";
import jwt_decode from "jwt-decode";
import DanhMucComponent from "./ADMIN/DanhMuc/DanhMucComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import MonAnComponent from "./ADMIN/MonAn/MonAnComponent";
import Home from "./User/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./User/Menu";
import ProductDetail from "./User/ChiTietMonAn";
import LoginForm from "./User/LoginForm";
import RegisterForm from "./User/RegisterForm";
import Dashboard from "./ADMIN/Template/AdminDash";
import AdminPage from "./ADMIN/Template/AdminDash";
import CartDisplay from "./User/common/CartDisplay";
import BanComponent from "./ADMIN/Ban/BanComponent";
import { DonDatBanComponent } from "./ADMIN/DonDatBan/DonDatBanComponent";
import FormDatBan from "./User/DatBan/FormDatBan";
import LichSuDonDatBan from "./ADMIN/DonDatBan/LichSuDonDatBan";
import ProtectedRoute from "./User/common/ProtectedRoute";
import HoaDonComponent from "./ADMIN/HoaDon/HoaDonComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChonBan from "./ADMIN/DonDatBan/ChonBan";
import TimKiemMonAnPage from "./User/TimKiemMonAn";
import SoDoBan from "./ADMIN/DonDatBan/SoDoBan";
import AdminHome from "./ADMIN/Template/AdminHome";
import DatBan from "./User/DatBan/DatBan";
import SuaDonDatBan from "./ADMIN/DonDatBan/SuaDonDatBan";
import Profile from "./User/Account/Profile";
import QuanLyComponent from "./ADMIN/NguoiDung/QuanLy/QuanLyComponent";
import KhachHangComponent from "./ADMIN/NguoiDung/KhachHang/KhachHangComponent";
import InBaoCaoNgay from "./ADMIN/BaoCao/InBaoCaoNgay";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/giohang" element={<CartDisplay />} />
          <Route path="/datban" element={<FormDatBan />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/timkiem/:tim" element={<TimKiemMonAnPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/danhmuc" element={<DanhMucComponent />} />
          <Route path="/dat-ban/:idBan" element={<DatBan />} />
          <Route path="/sua-don-dat-ban" element={<SuaDonDatBan />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/danhmuc"
            element={
              <ProtectedRoute>
                <DanhMucComponent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/ban"
            element={
              <ProtectedRoute>
                <BanComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ban/sodo"
            element={
              <ProtectedRoute>
                <SoDoBan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/monan"
            element={
              <ProtectedRoute>
                <MonAnComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dondatban"
            element={
              <ProtectedRoute>
                <DonDatBanComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dondatban/lichsu"
            element={
              <ProtectedRoute>
                <LichSuDonDatBan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/hoadon"
            element={
              <ProtectedRoute>
                <HoaDonComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/nguoidung/quanly"
            element={
              <ProtectedRoute>
                <QuanLyComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/nguoidung/khachhang"
            element={
              <ProtectedRoute>
                <KhachHangComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/baocao/bao-cao-ngay"
            element={
              <ProtectedRoute>
                <InBaoCaoNgay />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

export default App;

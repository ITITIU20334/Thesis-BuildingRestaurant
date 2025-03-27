import { useEffect, useState } from "react";
import { capNhatBan, deleteBan, fetchAllBan } from "../../services/BanService";
import { Button, Dropdown, Table, Toast } from "react-bootstrap";
import AdminPage from "../Template/AdminDash";
import { toast } from "react-toastify";

import TaoHoaDonComponent from "../HoaDon/TaoHoaDonComponent";
import ChiTietHoaDon from "../HoaDon/ChiTietHoaDon";
import BanCardAdmin from "../Template/BanCardAdmin";

const SoDoBan = (props) => {
  const [bans, setBan] = useState([]);
  const [showHoaDonModal, setShowHoaDonModal] = useState(false);
  const [Ban, setBanid] = useState({});
  const [idBan, setidBan] = useState("");
  const [showChiTietHDMOdal, setShowChiTietHDModal] = useState(false);
  const handleClose = () => {
    setShowHoaDonModal(false);
    setShowChiTietHDModal(false);
    listBan();
  };
  useEffect(() => {
    listBan();
  }, []);
  function listBan() {
    fetchAllBan()
      .then((response) => {
        setBan(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const taoHoaDon = (x) => {
    setBanid(x);
    setShowHoaDonModal(true);
  };
  const ChitetHDShow = (x) => {
    setidBan(x);

    setShowChiTietHDModal(true);
  };

  return (
    <div>
      <AdminPage />
      <div className="my-3">
        <span>
          <span>
            <b>Sơ đồ bàn</b>
          </span>
        </span>
      </div>
      <BanCardAdmin
        bans={bans}
        taoHoaDon={taoHoaDon}
        ChitetHDShow={ChitetHDShow}
      />
      <TaoHoaDonComponent
        show={showHoaDonModal}
        handleClose={handleClose}
        Ban={Ban}
        listBan={listBan}
      />
      <ChiTietHoaDon
        handleClose={handleClose}
        show={showChiTietHDMOdal}
        idBan={idBan}
        listBan={listBan}
      />
    </div>
  );
};

export default SoDoBan;

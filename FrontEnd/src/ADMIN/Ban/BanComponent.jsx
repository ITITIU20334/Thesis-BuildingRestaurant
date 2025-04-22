import { useEffect, useState } from "react";
import { capNhatBan, deleteBan, fetchAllBan } from "../../services/BanService";
import { Button, Dropdown, Table, Toast } from "react-bootstrap";
import AdminPage from "../Template/AdminDash";
import ThemBanComponent from "./ThemBanComponent";
import { toast } from "react-toastify";
import SuaBanComponent from "./SuaBanComponent";
import TaoHoaDonComponent from "../HoaDon/TaoHoaDonComponent";
import ChiTietHoaDon from "../HoaDon/ChiTietHoaDon";

const BanComponent = (props) => {
  const [bans, setBan] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showHoaDonModal, setShowHoaDonModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [ModalUpdate, setModalUpdate] = useState(false);
  const [Ban, setBanid] = useState({});
  const [idBan, setidBan] = useState("");
  const [showChiTietHDMOdal, setShowChiTietHDModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setModalUpdate(false);
    setShowHoaDonModal(false);
    setShowChiTietHDModal(false);
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
  function DeleteBan(id) {
    if (window.confirm("Do you want to delete this category?")) {
      deleteBan(id)
        .then((rp) => {
          listBan();
          Toast.success("Deleted");
        })
        .catch((error) => {
          if (error.response && error.response.status === 500) {
            toast.error("Can not delete!!");
          }
        });
    }
  }
  const UpdateBan = (x) => {
    setDataUpdate(x);
    setModalUpdate(true);
    console.log(x);
    console.log("ID Send:", x.idBan);
    console.log("Update Category:", x.viTri);
  };
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
            <b>Add new table</b>
          </span>
          <button
            className="btn ms-5 btn-success"
            onClick={() => setShowModal(true)}
          >
            Add
          </button>
        </span>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Number</th>
            <th>Name Table</th>
            <th>Position</th>
            <th>Number of Customers</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bans.map((x, index) => (
            <tr key={x.idBan}>
              <td>{index + 1}</td>
              <td>{x.tenBan}</td>
              <td>{x.viTri}</td>
              <td>{x.soNguoi}</td>
              <td>{x.trangThai}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Action
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/admin/ban">
                      <Button onClick={() => capNhatBan(x.idBan)}>
                        Update status
                      </Button>
                    </Dropdown.Item>

                    <Dropdown.Item>
                      <Button onClick={() => UpdateBan(x)}> Edit</Button>
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="/admin/ban"
                      onClick={() => deleteBan(x.idBan)}
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ThemBanComponent
        show={showModal}
        handleClose={handleClose}
        listBan={listBan}
      />
      <SuaBanComponent
        show={ModalUpdate}
        handleClose={handleClose}
        listBan={listBan}
        dataUpdate={dataUpdate}
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
        listHD={listBan}
      />
    </div>
  );
};

export default BanComponent;

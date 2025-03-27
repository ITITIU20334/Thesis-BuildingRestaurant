import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { fetchDonDatBanByKhach, HuyDon } from "../../services/DonDatBanService";
import UserChiTiet from "./UserChiTietDon";

const UserDonDatBan = () => {
  const username = sessionStorage.getItem("username");
  const [dons, setDonDatBan] = useState([]);
  const [ModalChiTiet, setModalChiTiet] = useState(false);
  const [dataChitiet, setDataChiTiet] = useState({});
  const handleClose = () => {
    setModalChiTiet(false);
  };

  useEffect(() => {
    if (username) {
      getDonDatBan(username);
      console.log(username);
    }
  }, [username]);

  function getDonDatBan(username) {
    fetchDonDatBanByKhach(username)
      .then((response) => {
        setDonDatBan(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleHuyDon = (id) => {
    HuyDon(id)
      .then(() => {
        getDonDatBan(username); // Refresh the list after cancelling the order
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ChiTietDon = (x) => {
    setModalChiTiet(true);
    setDataChiTiet(x);
  };

  const columns = [
    {
      name: "Number",
      selector: (row, index) => index + 1,
      center: true,
    },
    {
      name: "Date",
      selector: (row) => row.ngayDat,
      center: true,
    },
    {
      name: "Time",
      selector: (row) => row.thoiGian.substring(0, 5),
      center: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.hoTen,
      center: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.soDT,
      center: true,
    },
    {
      name: "Status",
      selector: (row) => row.trangThai,
      center: true,
    },
    {
      name: "Note",
      selector: (row) => row.ghiChu,
      center: true,
    },
    {
      name: "Table",
      selector: (row) =>
        row.idBan && row.idBan.tenBan ? row.idBan.tenBan : "No Table Found",
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Action
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {row.trangThai === "Processing..." ? (
              <>
                <Dropdown.Item onClick={() => ChiTietDon(row)}>
                  Details
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleHuyDon(row.id)}>
                  Cancel
                </Dropdown.Item>
              </>
            ) : (
              <Dropdown.Item onClick={() => ChiTietDon(row)}>
                Details
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      ),
      center: true,
    },
  ];

  return (
    <Container>
      <DataTable
        columns={columns}
        data={dons}
        noHeader
        striped
        highlightOnHover
        pagination
        className="bordered-table"
      />
      <UserChiTiet
        show={ModalChiTiet}
        handleClose={handleClose}
        dataChitiet={dataChitiet}
      />
    </Container>
  );
};

export default UserDonDatBan;

import React, { useEffect, useState } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { fetchAllMonAn } from "../../services/MonAnService";
import { themMon } from "../../services/HoaDonService";
import { toast } from "react-toastify";

const ThemMonAn = (props) => {
  const { handleCloseForm, show, idHoaDon } = props;
  const [monans, setMonAn] = useState([]);
  const [filteredMonans, setFilteredMonAn] = useState([]); // Thêm state để lưu dữ liệu đã lọc
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (show) {
      listMonAn();
    }
  }, [show]);

  function listMonAn() {
    fetchAllMonAn()
      .then((response) => {
        setMonAn(response.data);
        setFilteredMonAn(response.data); // Khởi tạo dữ liệu đã lọc bằng dữ liệu gốc
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleRadioChange = (item) => {
    setSelectedItem(item);
    setError("");
  };

  const handleThemMon = async () => {
    if (!selectedItem) {
      setError("Please select food");
      return;
    }

    const id_monAn = selectedItem.id_mon;
    const id_hoaDon = idHoaDon;

    console.log("ID food:", id_monAn);
    console.log("ID bill:", id_hoaDon);

    const data = { id_hoaDon, id_monAn };

    try {
      let res = await themMon(data);
      if (res) {
        toast.success("Add food successfully");
        handleCloseForm();
      } else {
        toast.error("Error");
      }
    } catch (error) {
      setError("Unable to add food. Please try again.");
    }
  };

  const columns = [
    {
      name: "Select",
      cell: (row) => (
        <input
          type="radio"
          name="selectedItem"
          checked={selectedItem && selectedItem.id_mon === row.id_mon}
          onChange={() => handleRadioChange(row)}
        />
      ),
      center: true,
    },
    {
      name: "No",
      selector: (row, index) => index + 1,
      center: true,
    },
    {
      name: "Food Name",
      selector: (row) => row.tenMon,
      center: true,
    },
    {
      name: "Food Category",
      selector: (row) => row.loaiMonAn.tenLoai,
      center: true,
    },
    {
      name: "Price",
      selector: (row) => row.giaTien,
      center: true,
    },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === "") {
      setFilteredMonAn(monans); // Khôi phục dữ liệu gốc khi thanh tìm kiếm trống
    } else {
      const filteredData = monans.filter((item) =>
        item.tenMon.toLowerCase().includes(value)
      );
      setFilteredMonAn(filteredData);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseForm}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="text-center">
              <strong>Add food</strong>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <DataTable
            columns={columns}
            data={filteredMonans} // Sử dụng dữ liệu đã lọc
            noHeader
            striped
            highlightOnHover
            pagination
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search for food"
                className="form-control"
                onChange={handleSearch}
              />
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseForm}>
            Close
          </Button>
          <Button variant="primary" onClick={handleThemMon}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ThemMonAn;

import { useEffect, useState } from "react";
import { themMonAn } from "../../services/MonAnService";
import { toast, ToastContainer } from "react-toastify";
import { Button, Form, Modal } from "react-bootstrap";
import { fetchAllDanhMuc } from "../../services/DanhMucService";

const ThemMonAnComponent = (props) => {
  const { handleClose, show, listMonAn } = props;
  const [danhmucs, setDanhMuc] = useState([]);
  const [tenMon, setTenMon] = useState("");
  const [hinhAnh, setHinhAnh] = useState(null);
  const [giaTien, setGiaTien] = useState(0);
  const [loaiMonAn, settendanhmuc] = useState("");
  const [moTa, setMoTa] = useState("");
  useEffect(() => {
    listDanhMuc();
  }, []);

  function listDanhMuc() {
    fetchAllDanhMuc()
      .then((response) => {
        setDanhMuc(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSaveMonAn = async () => {
    console.log("Image" + hinhAnh);
    if (!(hinhAnh instanceof File)) {
      setHinhAnh(null);
    }
    try {
      if (hinhAnh.type === "image/jpeg" || hinhAnh.type === "image/png") {
        console.log(loaiMonAn);
        if (loaiMonAn !== "") {
          const monans = { tenMon, giaTien, loaiMonAn, moTa };
          console.log(monans);
          if (giaTien >= 0 && giaTien < 100000000) {
            try {
              let res = await themMonAn(monans, hinhAnh);

              if (res) {
                handleClose();
                listMonAn();
                settendanhmuc("");
                setTenMon("");
                setHinhAnh(null);
                setGiaTien(0);
                toast.success("Food added successfully");
              } else {
                toast.error("Add failed item");
              }
            } catch (error) {
              window.alert("Error adding item");
            }
          } else {
            window.alert("Please double-check the amount");
          }
        } else {
          window.alert("Select category");
        }
      } else {
        window.alert("Select Image");
      }
    } catch (e) {
      window.alert("Select Image");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label className="form-label">Food Name</label>
              <input
                value={tenMon}
                className="form-control"
                onChange={(event) => setTenMon(event.target.value)}
                type="text"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image:</label>
              <input
                className="form-control"
                onChange={(event) => setHinhAnh(event.target.files[0])}
                type="file"
                accept=".jpg, .jpeg, .png"
              />

              <div className="mb-3">
                <label className="form-label">Type of Category: </label>
                <Form.Select
                  className="form-control"
                  aria-label="Default select example"
                  onChange={(event) => settendanhmuc(event.target.value)}
                >
                  <option value="">Select Type of Category</option>
                  {danhmucs.map((x, index) => (
                    <option key={index} value={x.id_Loai}>
                      {x.tenLoai}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="mb-3">
                <label className="form-label">Price: </label>
                <input
                  value={giaTien}
                  className="form-control"
                  onChange={(event) => {
                    const value = Math.min(
                      Math.max(Number(event.target.value), 0),
                      10000000
                    );
                    setGiaTien(value);
                  }}
                  type="number"
                  min={0}
                  max={10000000}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  value={moTa}
                  className="form-control"
                  onChange={(event) => setMoTa(event.target.value)}
                  type="text-area"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <ToastContainer />
          <Button variant="primary" onClick={handleSaveMonAn}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ThemMonAnComponent;

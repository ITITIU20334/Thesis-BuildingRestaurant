import { useEffect, useState } from "react";
import { fetchAllDanhMuc, updateDanhMuc } from "../../services/DanhMucService";
import { Button, Form, Modal } from "react-bootstrap";
import { suaMonAn } from "../../services/MonAnService";
import { toast } from "react-toastify";
const UpdateMonAnComponent = (props) => {
  const { handleClose, show, listMonAn, dataUpdate } = props;
  const [tenMon, setTenMonAn] = useState("");
  const [giaTien, setGiaTien] = useState("");
  const [loaiMonAn, setLoaiMonAn] = useState("");
  const [hinhAnh, setHinhAnh] = useState(null);
  const [ImageMonAn, setImageMonAn] = useState(null);
  const [danhmucs, setDanhMuc] = useState([]);

  useEffect(() => {
    listDanhMuc();
  }, []);

  function listDanhMuc() {
    fetchAllDanhMuc()
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDanhMuc(response.data);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (show && dataUpdate) {
      setTenMonAn(dataUpdate.tenMon || "");
      setGiaTien(dataUpdate.giaTien || "");
      setLoaiMonAn(dataUpdate.loaiMonAn?.id_Loai || "");
      setHinhAnh(dataUpdate.hinhAnh || null);
      setImageMonAn(dataUpdate.hinhAnh || null);
    }
  }, [dataUpdate, show]);
  const handleUpdate = async () => {
    console.log("Image");

    if (loaiMonAn !== "") {
      if (giaTien > 0 && giaTien < 100000000) {
        const monans = { tenMon, giaTien, loaiMonAn };
        console.log(monans.tenMon, monans.giaTien, monans.loaiMonAn);
        console.log(hinhAnh);
        try {
          let res = await suaMonAn(
            dataUpdate.id_mon,
            monans,
            ImageMonAn,
            hinhAnh
          );
          if (res) {
            handleClose();
            listMonAn();
            setTenMonAn("");
            setGiaTien("");
            setLoaiMonAn("");
            setHinhAnh(null);
            console.log("Success");
          }
        } catch (error) {
          toast.error("Fail");
        }
      }
    } else {
      window.alert("Please select category");
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
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label className="form-label">Food Name</label>
              <input
                value={tenMon}
                className="form-control"
                onChange={(event) => setTenMonAn(event.target.value)}
                type="text"
              />
            </div>

            <div className="mb-3">
              <label className="form-label ">Image: </label>
              <div className="">
                <img
                  src={hinhAnh}
                  alt=""
                  style={{ width: "150px", height: "auto" }}
                />
              </div>
              <input
                className="form-control"
                onChange={(event) => setHinhAnh(event.target.files[0])}
                type="file"
                accept=".jpg, .jpeg, .png"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Type of Category: </label>
              <Form.Select
                className="form-control"
                aria-label="Default select example"
                value={loaiMonAn}
                onChange={(event) => setLoaiMonAn(event.target.value)}
              >
                <option value="">Select Type of Category</option>
                {danhmucs.map((x, index) => (
                  <option key={index} value={x.id_Loai}>
                    {x.tenLoai}
                  </option>
                ))}
              </Form.Select>
            </div>

            <label className="form-label ">Price: </label>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdate()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateMonAnComponent;

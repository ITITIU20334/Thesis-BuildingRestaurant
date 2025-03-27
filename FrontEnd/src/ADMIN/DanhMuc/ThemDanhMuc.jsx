import { useState } from "react";
import { themDanhMuc } from "../../services/DanhMucService";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const ThemDanhMucComponent = (props) => {
  const { handleClose, show, listDanhMuc } = props;
  const [tenLoai, setTenDanhMuc] = useState("");
  const handleSaveDanhMuc = async () => {
    console.log("Name Category:", tenLoai);
    const danhmucs = { tenLoai };
    console.log("Data send to API:", danhmucs);
    let res = await themDanhMuc(danhmucs);
    if (res) {
      handleClose();
      listDanhMuc();
      setTenDanhMuc("");
      toast.success("Add Category Successfully!");
    } else {
      toast.error("Failed");
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
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label className="form-label">Name Category:</label>
              <input
                value={tenLoai}
                className="form-control"
                onChange={(event) => setTenDanhMuc(event.target.value)}
                type="text"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveDanhMuc()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ThemDanhMucComponent;

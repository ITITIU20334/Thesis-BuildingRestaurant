import { useState } from "react";
import { themBan } from "../../services/BanService";
import { Button, Modal, Toast } from "react-bootstrap";
import { toast } from "react-toastify";

const ThemBanComponent = (props) => {
  const { handleClose, show, listBan } = props;
  const [tenBan, setTenBan] = useState("");
  const [viTri, setViTri] = useState("");
  const [soNguoi, setSoNguoi] = useState("");

  const handleSaveBan = async () => {
    if (tenBan === "" || viTri === "" || soNguoi === "") {
      toast.error("Please Complete Information");
      return;
    } else {
      const bans = { tenBan, viTri, soNguoi };
      let res = await themBan(bans);
      if (res) {
        handleClose();
        listBan();
        setTenBan("");
        setSoNguoi("");
        setViTri("");
        toast.success("New Table added successfully!");
      } else {
        toast.error("Add table failed!!!");
      }
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
          <Modal.Title>Add Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label className="form-label">Name Table:</label>
              <input
                value={tenBan}
                className="form-control"
                onChange={(event) => setTenBan(event.target.value)}
                type="text"
              />
            </div>

            <div class="mb-3">
              <label className="form-label" for="viTri">
                Position
              </label>
              <select
                className="form-control"
                id="viTri"
                value={viTri}
                onChange={(event) => setViTri(event.target.value)}
                defaultValue="Ngoài sân"
              >
                <option>Choose Position</option>
                <option value="Ngoài sân">Outside</option>
                <option value="Trong nhà">Inside</option>
                <option value="Trên lầu">Upstairs</option>
              </select>
            </div>
            <div class="form-group">
              <label for="thoiGian2">Number of Customers:</label>
              <select
                class="form-control"
                id="thoiGian2"
                value={soNguoi}
                onChange={(e) => setSoNguoi(e.target.value)}
              >
                <option>Customer Count</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveBan()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ThemBanComponent;

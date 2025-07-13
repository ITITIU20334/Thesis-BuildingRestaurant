import React, { useEffect, useState } from "react";
import { updateBan } from "../../services/BanService";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

export const SuaBanComponent = (props) => {
  const { handleClose, show, listBan, dataUpdate } = props;
  const [tenBan, setTenBan] = useState("");
  const [viTri, setVitri] = useState("");
  const [soNguoi, setSoNguoi] = useState("");

  const handleUpdate = async () => {
    const bans = { tenBan, viTri, soNguoi };
    console.log(bans);
    let res = await updateBan(dataUpdate.idBan, bans);
    if (res) {
      handleClose();
      listBan();
      setTenBan("");
      setVitri("");
      setSoNguoi("");
      toast.success("Success");
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    if (show) {
      setTenBan(dataUpdate.tenBan);
      setVitri(dataUpdate.viTri);
      setSoNguoi(dataUpdate.soNguoi !== null ? dataUpdate.soNguoi : "");
    }
  }, [dataUpdate, show]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label className="form-label">Name Table</label>
              <input
                value={tenBan}
                type="text"
                className="form-control"
                onChange={(event) => setTenBan(event.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="mb-3">
              <label className="form-label" htmlFor="viTri">
                Position
              </label>
              <select
                className="form-control"
                id="viTri"
                value={viTri}
                onChange={(event) => setVitri(event.target.value)}
                defaultValue={viTri}
              >
                <option value="Outside">Outside</option>
                <option value="Inside">Inside</option>
                <option value="Upstairs">Upstairs</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="soNguoi">Number of Customers:</label>
              <select
                className="form-control"
                id="soNguoi"
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
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SuaBanComponent;

import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { updateProfile } from "../../services/ProfileService";
import { toast } from "react-toastify";

const UpdateProfile = (props) => {
  const { handleClose, show, dataupdate, reload } = props;
  const [hoTen, setHoTen] = useState("");
  const [soDT, setSoDT] = useState("");
  useEffect(() => {
    if (show) {
      setHoTen(dataupdate.hoTen);
      setSoDT(dataupdate.soDT);
    }
  }, [dataupdate]);

  const handleUpdate = async () => {
    const data = { hoTen, soDT };
    let res = await updateProfile(dataupdate.username, data);
    if (res) {
      if (reload) {
        reload();
      }
      handleClose();
      toast.success("Update Successfully");
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
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                value={hoTen}
                type="text"
                className="form-control"
                onChange={(event) => setHoTen(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                value={soDT}
                type="text"
                className="form-control"
                onChange={(event) => setSoDT(event.target.value)}
              />
            </div>
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

export default UpdateProfile;

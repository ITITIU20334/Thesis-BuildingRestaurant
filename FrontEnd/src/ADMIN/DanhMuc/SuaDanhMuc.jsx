import { useEffect, useState } from "react";
import { updateDanhMuc } from "../../services/DanhMucService";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const UpdateDanhMucComponent = (props) => {
  const { handleClose, show, listDanhMuc, dataUpdate } = props;
  const [tenLoai, setTenLoai] = useState("");

  const handleUpdate = async () => {
    const ten = { tenLoai };
    let res = await updateDanhMuc(dataUpdate.id_Loai, ten);

    if (res) {
      handleClose();
      listDanhMuc();
      setTenLoai("");
      toast.success("Update Successfully");
    } else {
      toast.error("Failed");
    }

    //console.log(lop);
  };
  //console.log("check props "+ dataUpdate.malop);

  useEffect(() => {
    if (show) {
      setTenLoai(dataUpdate.tenLoai);
    }
  }, [dataUpdate]);

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
              <label className="form-label">Name</label>
              <input
                value={tenLoai}
                type="text"
                className="form-control"
                onChange={(event) => setTenLoai(event.target.value)}
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

export default UpdateDanhMucComponent;

import React, { useState } from "react";
import AdminPage from "../Template/AdminDash";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { InBaoCaoCuoiNgay } from "../../services/HoaDonService";

const InBaoCaoNgay = () => {
  const [selectedDate, setSelectedDate] = useState("");

  // Hàm xử lý khi nhấn nút In
  const handlePrintReport = async () => {
    if (!selectedDate) {
      alert("Please Select Date!");
      return;
    }

    const dateWithoutTime = new Date(selectedDate);
    dateWithoutTime.setHours(0, 0, 0, 0);

    const formattedDate = dateWithoutTime.toLocaleDateString("en-CA");
    console.log("Print Report For The Day:", formattedDate);

    try {
      let res = await InBaoCaoCuoiNgay(formattedDate);
      if (res) {
        toast.success("Print Successfully!");
      } else {
        toast.error("Failed Print");
      }
    } catch (error) {
      console.error("Error in printing report:", error);
      toast.error("Failed Print");
    }
  };

  return (
    <>
      <AdminPage />
      <div className="container my-5">
        <h1 className="text-center mb-4">Report for The Day</h1>

        <Form className="d-flex justify-content-center">
          <Form.Group className="me-3" controlId="date-picker">
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="form-control"
              placeholder="Choose Date"
            />
          </Form.Group>

          <Button
            variant="success"
            onClick={handlePrintReport}
            className="align-self-center"
          >
            Print
          </Button>
        </Form>
      </div>
    </>
  );
};

export default InBaoCaoNgay;

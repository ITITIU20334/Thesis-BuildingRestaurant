import React, { useState } from "react";
import NavigationBar from "../common/NavigationBar";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { saveDonDatBan, UserDatBan } from "../../services/DonDatBanService";
import { toast } from "react-toastify";
import { useNavigate, useNavigation } from "react-router-dom";
import { getBanTrongTime } from "../../services/BanService";
import BanCard from "../common/BanCard";
import Footer from "../common/Footer";

const FormDatBan = () => {
  const [viTri, setViTri] = useState("");
  const [ngayDat, setNgayDat] = useState("");
  const [thoiGian, setThoiGian] = useState("");
  const [soNguoi, setSoNguoi] = useState("");
  const [banTrong, setBanTrong] = useState([]);
  const [dataDatBan, setDataDatBan] = useState();
  const getAvailableTimes = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const times = [
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
    ];
    return times.filter((time) => parseInt(time.split(":")[0]) > currentHour);
  };

  const availableTimes = getAvailableTimes();
  const handleSearch = async () => {
    if (ngayDat === "" || soNguoi === "" || thoiGian === "" || soNguoi === "") {
      toast.error("Please Enter Information");
      return;
    } else {
      try {
        console.log(ngayDat, thoiGian, soNguoi);
        const data2 = { ngayDat, thoiGian, soNguoi };
        setDataDatBan(data2);
        console.log(dataDatBan);
        const data = await getBanTrongTime(ngayDat, thoiGian, soNguoi);

        setBanTrong(data);
      } catch (error) {
        console.error("Format Failed:");
      }
    }
  };
  return (
    <div>
      <NavigationBar />
      <div style={{ marginTop: "100px", marginBottom: "200px" }}>
        <h2>Find Empty Table</h2>
        <div class="container mt-3">
          <div class="form-group">
            <label for="ngayDat">Time Booked:</label>
            <input
              type="date"
              class="form-control"
              id="ngayDat"
              value={ngayDat}
              onChange={(e) => setNgayDat(e.target.value)}
              min={
                new Date(new Date().setDate(new Date().getDate() + 1))
                  .toISOString()
                  .split("T")[0]
              }
            />
          </div>
          <div class="container mt-3">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="thoiGian1">Time:</label>
                  <select
                    class="form-control"
                    id="thoiGian1"
                    value={thoiGian}
                    onChange={(e) => setThoiGian(e.target.value)}
                  >
                    <option>Select Time</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="thoiGian2">Number of Customers:</label>
                  <select
                    class="form-control"
                    id="thoiGian2"
                    value={soNguoi}
                    onChange={(e) => setSoNguoi(e.target.value)}
                  >
                    <option>Số khách</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button class="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div>
          {banTrong.length > 0 ? (
            <BanCard banTrong={banTrong} dataDatBan={dataDatBan} />
          ) : (
            <p>No Table Found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FormDatBan;

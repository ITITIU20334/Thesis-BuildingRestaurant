import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import AdminPage from "./AdminDash";
import { fetchAllBan } from "../../services/BanService";
import {
  DuyetDon,
  fetchAllDonDatBan,
  HuyDon,
} from "../../services/DonDatBanService";
import DataTable from "react-data-table-component";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axios from "axios";
import { doanhThu } from "../../services/HoaDonService";
import { monDaBan } from "../../services/MonAnService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminHome = () => {
  const [tongBan, setTongBan] = useState(0);
  const [tongMonAn, setTongMonAn] = useState(0);
  const [tongDonDatBan, setTongDonDatBan] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dondatbans, setDonDatBan] = useState([]);
  const [doanhThuThang, setDoanhThuThang] = useState([]);
  const [monDaBans, setMonDaBan] = useState([]);

  useEffect(() => {
    listDonDatBan();
    listDoanhThu();
    listMonDaBan();
  }, []);
  const listMonDaBan = () => {
    monDaBan()
      .then((response) => {
        setMonDaBan(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const listDoanhThu = () => {
    doanhThu()
      .then((response) => {
        setDoanhThuThang(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const listDonDatBan = () => {
    fetchAllDonDatBan()
      .then((response) => {
        setDonDatBan(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(doanhThuThang);

  useEffect(() => {
    const getBanData = async () => {
      const banData = await fetchAllBan();

      console.log(banData.length);
    };
    getBanData();
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/ban/tongban")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to get data from server!");
        }
        return response.json();
      })
      .then((data) => {
        setTongBan(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/api/monan/tongmonan")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to get data from server!");
        }
        return response.json();
      })
      .then((data) => {
        setTongMonAn(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/api/dondatban/tongdondatban")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to get data from server!");
        }
        return response.json();
      })
      .then((data) => {
        setTongDonDatBan(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Date",
      selector: (row) => row.ngayDat,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.thoiGian.substring(0, 5),
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.hoTen,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.soDT,
    },
    {
      name: "Status",
      selector: (row) => row.trangThai,
      sortable: true,
    },
    {
      name: "Note",
      selector: (row) => row.ghiChu,
    },
    {
      name: "Table",
      selector: (row) => row.idBan?.tenBan || "Not Determined",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            className="btn btn-success btn-sm me-2"
            onClick={() => DuyetDon(row.id)}
          >
            Accept
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => HuyDon(row.id)}
          >
            Cancel
          </button>
        </>
      ),
    },
  ];

  const barData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Revenue",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: doanhThuThang,
      },
    ],
  };

  const barDataMonAn = {
    labels: monDaBans.map((item, index) => item.tenMon),
    datasets: [
      {
        label: "Food",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: monDaBans.map((item, index) => item.soLuong),
      },
    ],
  };

  return (
    <div>
      <AdminPage />
      <Container>
        <h1 className="mb-4 text-start">Home Page</h1>
        <Row>
          <Col md={3}>
            <Card className="mb-4 shadow-sm h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-primary">Total Tables</Card.Title>
                <Card.Text className="display-4 mt-auto">{tongBan}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4 shadow-sm h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-success">Total Dishes</Card.Title>
                <Card.Text className="display-4 mt-auto">{tongMonAn}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="mb-4 shadow-sm h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-danger">
                  Pending Table Bookings
                </Card.Title>
                <Card.Text className="display-4 mt-auto">
                  {tongDonDatBan}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div style={{ height: "50px" }}></div>
        <Row>
          <Col md={6}>
            <Card className="mb-4 shadow-sm h-100">
              <Card.Body>
                <Card.Title>Monthly Revenue</Card.Title>
                <Bar
                  data={barData}
                  options={{
                    title: {
                      display: true,
                      text: "Monthly Revenue",
                      fontSize: 20,
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4 shadow-sm h-100">
              <Card.Body>
                <Card.Title>Best Seller</Card.Title>
                <Bar
                  data={barDataMonAn}
                  options={{
                    title: {
                      display: true,
                      text: "Best Seller",
                      fontSize: 20,
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container>
        <h2 className="mt-4 text-start">New Reservation List</h2>
        <div className="border rounded p-3 shadow-sm">
          <DataTable
            columns={columns}
            data={dondatbans}
            pagination
            highlightOnHover
            responsive
            striped
          />
        </div>
      </Container>
    </div>
  );
};

export default AdminHome;

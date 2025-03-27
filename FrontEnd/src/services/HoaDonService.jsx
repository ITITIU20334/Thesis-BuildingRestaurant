import axios from "axios";

const URL_BASE = "http://localhost:8080/api/hoadon";

const fetchAllHoaDon = () => {
  return axios.get(URL_BASE);
};
const fetchHoaDonKhach = (username) => {
  return axios.get(URL_BASE + "/khach/" + username);
};

const saveHoaDon = (x) => {
  return axios.post(URL_BASE, x);
};
const chiTietHD = (id) => {
  return axios.get(URL_BASE + "/chitiet/ban/" + id);
};
const themMon = (x) => {
  return axios.post(URL_BASE + "/themmon", x);
};
const deleteMon = (id) => {
  return axios.delete(URL_BASE + "/" + id);
};
const hoanThanh = (id, phuongThucTT) => {
  return axios.put(
    URL_BASE + "/hoanthanh/" + id,
    {
      phuongThucTT: phuongThucTT,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
const taoHoaDon = (x) => {
  return axios.post(URL_BASE + "/tao-hoa-don", x);
};
const doanhThu = () => {
  return axios.get(URL_BASE + "/baocaothang");
};
const InHoaDon = async (id) => {
  try {
    const response = await axios.get(URL_BASE + `/in-hoa-don/${id}`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "bill.pdf");
    document.body.appendChild(link);
    link.click();
    return true;
  } catch (error) {
    console.error("Failed To Load Bill", error);
    return false;
  }
};
const InBaoCaoCuoiNgay = async (ngayTao) => {
  try {
    const formattedDate = encodeURIComponent(ngayTao);
    console.log("Date", formattedDate);

    const response = await axios.get(
      `${URL_BASE}/in-bao-cao?ngayTao=${formattedDate}`,
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.pdf");
    document.body.appendChild(link);
    link.click();

    return true;
  } catch (error) {
    console.error("Failed To Load Report", error);
    return false;
  }
};

export {
  fetchAllHoaDon,
  saveHoaDon,
  chiTietHD,
  themMon,
  deleteMon,
  hoanThanh,
  InHoaDon,
  taoHoaDon,
  fetchHoaDonKhach,
  doanhThu,
  InBaoCaoCuoiNgay,
};

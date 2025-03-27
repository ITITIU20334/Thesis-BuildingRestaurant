import axios from "axios";
const URL_BASE = "http://localhost:8080/api/ban";

const fetchAllBan = () => {
  return axios.get(URL_BASE);
};

const themBan = (ban) => {
  return axios.post(URL_BASE, ban);
};

const fetchAllBanTrong = async (ngayDat, thoiGian) => {
  try {
    const response = await api.get("/api/ban/bantrong", {
      params: { ngayDat, thoiGian },
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving available table", error);
    throw error;
  }
};
const deleteBan = async (id) => {
  return await axios.delete(URL_BASE + "/" + id);
};
const capNhatBan = (id) => {
  return axios.put(URL_BASE + "/trangthaiban/" + id);
};
const updateBan = (id, ban) => {
  return axios.put(URL_BASE + "/" + id, ban);
};
const getViTriBan = () => {
  return axios.get(URL_BASE + "/vitri");
};

const getBanByViTri = (viTri) => {
  return axios.get(URL_BASE + "/vitri/" + viTri);
};
const api = axios.create({ baseURL: "http://localhost:8080" });
const getBanTrongTime = async (ngayDat, thoiGian, soNguoi) => {
  try {
    const response = await api.get("/api/ban/timbantrong", {
      params: { ngayDat, thoiGian, soNguoi },
    });
    return response.data;
  } catch (error) {
    console.error("Error Service");
  }
};

export {
  fetchAllBan,
  getViTriBan,
  getBanByViTri,
  fetchAllBanTrong,
  deleteBan,
  themBan,
  updateBan,
  getBanTrongTime,
  capNhatBan,
};

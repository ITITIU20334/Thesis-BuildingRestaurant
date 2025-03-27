import axios from "axios";

const URL_BASE = "http://localhost:8080/api/monan";

const fetchAllMonAn = () => {
  return axios.get(URL_BASE);
};
const fetchMonNgauNhien = () => {
  return axios.get(URL_BASE + "/rand_mon");
};
const timKiemMonAn = (tim) => {
  return axios.get(URL_BASE + "/timkiem/" + tim);
};
const fetchMonAnByLoai = (id_loai) => {
  return axios.get(URL_BASE + "/loai/" + id_loai);
};
const themMonAn = (monan, hinhAnh) => {
  const formData = new FormData();
  formData.append("monAn", JSON.stringify(monan));
  formData.append("hinhAnh", hinhAnh);
  return axios.post(URL_BASE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const suaMonAn = (id, monan, ImageMonAn, hinhAnh) => {
  const formData = new FormData();
  formData.append("monAn", JSON.stringify(monan));
  if (hinhAnh) {
    formData.append("hinhAnh", hinhAnh);
  } else {
    formData.append("hinhAnh", null);
  }
  formData.append("ImageMonAn", ImageMonAn);
  return axios.put(URL_BASE + "/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const fetchMonAnById = (id) => {
  return axios.get(URL_BASE + "/" + id);
};
const deleteMonAn = (id) => {
  return axios.delete(URL_BASE + "/" + id);
};
const monDaBan = () => {
  return axios.get(URL_BASE + "/monyeuthich");
};
export {
  fetchAllMonAn,
  themMonAn,
  suaMonAn,
  deleteMonAn,
  fetchMonAnByLoai,
  fetchMonAnById,
  timKiemMonAn,
  fetchMonNgauNhien,
  monDaBan,
};

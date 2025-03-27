import axios from "axios";

const URL_BASE = "http://localhost:8080/api/danhmuc";

const fetchAllDanhMuc = () => {
  return axios.get(URL_BASE);
};

const themDanhMuc = (danhmuc) => {
  return axios.post(URL_BASE, danhmuc);
};
const deleteDanhMuc = (id) => {
  return axios.delete(URL_BASE + "/" + id);
};
// const deleteDanhMuc = async (id) => {
//   try {
//     const response = await axios.delete(`${URL_BASE}/${id}`);
//     if (response.status === 204) {
//       return response;
//     }
//     throw new Error("Xóa thất bại, trạng thái không mong muốn");
//   } catch (error) {
//     throw error;
//   }
// };

const updateDanhMuc = (id, danhmuc) => {
  return axios.put(URL_BASE + "/" + id, danhmuc);
};
const getDanhMucById = (id) => {
  return axios.get(URL_BASE + "/" + id);
};
export {
  fetchAllDanhMuc,
  deleteDanhMuc,
  themDanhMuc,
  updateDanhMuc,
  getDanhMucById,
};

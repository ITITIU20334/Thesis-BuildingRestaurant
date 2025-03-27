import axios from "axios";
const URL_BASE = "http://localhost:8080/api/profile";

const getProfile = (username) => {
  try {
    console.log("Account loaded successfully");
    return axios.get(URL_BASE + "/" + username);
  } catch (error) {
    console.error("Failed to fetch account", error);
    throw error;
  }
};
const updateProfile = (username, khachHang) => {
  try {
    console.log("Account updated successfully");
    return axios.put(URL_BASE + "/" + username, khachHang);
  } catch (error) {
    console.error("Failed to update account", error);
    throw error;
  }
};
const changePassword = (data) => {
  try {
    console.log("Update password successfully");
    return axios.put(URL_BASE + "/doimatkhau", data);
  } catch (error) {
    console.error("Failed to change password", error);
    throw error;
  }
};
const fetchAllAdmin = () => {
  return axios.get(URL_BASE + "/getAdmin");
};
const fetchAllKhach = () => {
  return axios.get(URL_BASE + "/getKhachHang");
};
const xoaUser = (id) => {
  return axios.put(URL_BASE + "/xoaUser/" + id);
};
export {
  getProfile,
  updateProfile,
  fetchAllKhach,
  changePassword,
  xoaUser,
  fetchAllAdmin,
};

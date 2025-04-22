import axios from "axios";

const URL_BASE = "http://localhost:8080/api/dondatban";

const fetchAllDonDatBan = () => {
  return axios.get(URL_BASE + "/danhsach");
};
const fetchDonDatBanByKhach = (username) => {
  return axios.get(URL_BASE + "/don/" + username);
};
const fetchLichSuDon = () => {
  return axios.get(URL_BASE + "/lichsu");
};
const saveDonDatBan = (dondatban) => {
  return axios.post(URL_BASE, dondatban);
};
const DuyetDon = (id) => {
  return axios.put(URL_BASE + "/duyet/" + id);
};
const HoanThanh = (id) => {
  return axios.put(URL_BASE + "/hoan-thanh/" + id);
};
const HuyDon = (id) => {
  return axios.put(URL_BASE + "/huy/" + id);
};
const ChonBanService = (x) => {
  return axios.put(URL_BASE + "/chonban", x);
};
const UserDatBan = (dondatbans) => {
  return axios.post(URL_BASE + "/request", dondatbans);
};
const UpdateDonDatBan = (id, dondatban) => {
  return axios.put(URL_BASE + "/" + id, dondatban);
};

export {
  fetchAllDonDatBan,
  ChonBanService,
  UserDatBan,
  saveDonDatBan,
  DuyetDon,
  HuyDon,
  UpdateDonDatBan,
  fetchLichSuDon,
  HoanThanh,
  fetchDonDatBanByKhach,
};

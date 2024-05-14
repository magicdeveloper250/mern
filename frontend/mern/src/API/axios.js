import axios from "axios";

export const publicAxios = axios.create({
  baseURL: "http://localhost:3500",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export const privateAxios = axios.create({
  baseURL: "http://localhost:3500",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

import axios from "axios";
const customAxios = axios.create({
  // baseURL: "https://bookheaven.onrender.com/api",
  baseURL: "http://35.181.200.114:8000/api",
  timeout: 10000,
});
customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default customAxios;

import axios from "axios";

import { tokenHandler } from "./token-handler";
import { BASE_URL } from "constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-API-KEY": import.meta.env.VITE_API_KEY,
  },
});

axiosInstance.interceptors.request.use((config) => {
  config.headers["Authorization"] = tokenHandler.getToken();

  return config;
});

axios.interceptors.response.use((res) => {
  if (res.status === 403) {
    tokenHandler.deleteToken();
    window.location.href = "/login";
  }

  return res;
});

export { axiosInstance as axios };

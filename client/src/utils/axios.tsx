import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "X-API-KEY": import.meta.env.VITE_API_KEY,
  },
});

export { axiosInstance as axios };

import axios from "axios";

const client = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/4-7/",
});

client.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;

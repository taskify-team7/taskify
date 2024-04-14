import axios from "axios";

const token = "test";
const client = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/4-7/",
  headers: { Authorization: "Bearer " + token },
});

export default client;

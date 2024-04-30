import axios, { AxiosError } from "axios";
import * as Sentry from "@sentry/react";

export const API_BASE_URL = process.env.REACT_APP_API_ROOT;

const client = axios.create({
  baseURL: API_BASE_URL,
});

client.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 500에러 발생시 센트리로 에러 전송
client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 500) {
      Sentry.withScope((scope) => {
        scope.setTag("api", "Network500Error"); // 태그 설정
        scope.setLevel("fatal"); // 레벨 설정
      });
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export default client;

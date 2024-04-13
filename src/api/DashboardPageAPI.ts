import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU2NywidGVhbUlkIjoiNC03IiwiaWF0IjoxNzEyOTc1Mzg1LCJpc3MiOiJzcC10YXNraWZ5In0.JbySU7CpyGsD39v9AV8fsHykF4TwHPHsnv4CJC4T5-s";

const dashboard = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/4-7/dashboards",
  headers: {
    Authorization: `Bearer ${token}`,
    accept: "application/json",
  },
});

interface ApiPrameterType {
  navigationMethod: string;
  cursorId: number;
  page: number;
  size: number;
}

export const getDashboardList = async (params: ApiPrameterType) => {
  const { data } = await dashboard.get("", {
    params: {
      navigationMethod: params.navigationMethod,
      cursorId: params.cursorId,
      page: params.page,
      size: params.size,
    },
  });

  return data;
};

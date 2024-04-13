import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU2NywidGVhbUlkIjoiNC03IiwiaWF0IjoxNzEyOTkxMjYwLCJpc3MiOiJzcC10YXNraWZ5In0.ySFKJKOBoOAeZ03WNwjChgzf6DuxsNZ8Ke0DZ0TVV1o";

const dashboard = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/4-7/",
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
  const { data } = await dashboard.get("dashboards", {
    params: {
      navigationMethod: params.navigationMethod,
      cursorId: params.cursorId,
      page: params.page,
      size: params.size,
    },
  });

  return data;
};

export const getInviteList = async () => {
  const { data } = await dashboard.get("invitations", {
    params: {
      size: 6,
    },
  });

  return data;
};

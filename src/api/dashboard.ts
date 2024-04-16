import client from "./axios";

interface ApiPrameterType {
  navigationMethod: string;
  cursorId: number | null;
  page: number | null;
  size: number | null;
}

export const getDashboardList = async (params: ApiPrameterType) => {
  const { data } = await client.get("dashboards", {
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
  const { data } = await client.get("invitations", {
    params: {
      size: 6,
    },
  });

  return data;
};


export const createDashboard = async (title: string, color: string) => {
  const { data } = await client.post("dashboards", {
    title: title,
    color: color,
  });


export const getDashboard = async (id: string) => {
  const { data } = await client.get(`dashboards/${id}`);

  return data;
};

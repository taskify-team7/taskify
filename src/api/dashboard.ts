import client from "./axios";

interface ApiPrameterType {
  navigationMethod: string;
  cursorId: number;
  page: number;
  size: number;
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

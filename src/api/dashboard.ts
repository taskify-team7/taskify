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
};

export const getDashboard = async (id: string) => {
  const { data } = await client.get(`dashboards/${id}`);
  return data;
};

export const getColumns = async (id: string) => {
  const { data } = await client.get("columns", { params: { dashboardId: id } });
  return data.data;
};

export const getCards = async (id: string) => {
  const { data } = await client.get("cards", {
    params: { columnId: id, size: 10 },
  });
  return data.cards;
};

export const changeCard = async (id: string, body: object) => {
  try {
    const res = await client.put(`cards/${id}`, body);
    return res;
    // console.log(res);
  } catch (err) {
    console.log(err);
  }
};

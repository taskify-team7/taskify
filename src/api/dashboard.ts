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

export const getMembers = async (id: string) => {
  const { data } = await client.get("members", { params: { dashboardId: id } });
  return data.members;
};

export const createColumn = async (title: string, dashboardId: number) => {
  const { data } = await client.post(`columns`, {
    title: title,
    dashboardId: dashboardId,
  });

  return data;
};

export const dashboardModify = async (title: string, color: string, dashboardId: number) => {
  const {data} = await client.put(`dashboards/${dashboardId}`, {
    title: title,
    color: color,
  })
  return data;
};

export const dashboardInvite = async (email: string, dashboardId: number) => {
  const { data } = await client.post(`dashboards/${dashboardId}/invitations`, {
    email: email,
  });

  return data;
};

export const getColumns = async (id: string) => {
  const { data } = await client.get("columns", { params: { dashboardId: id } });
  return data.data;
};

export const getCards = async (id: string) => {
  const { data } = await client.get("cards", {
    params: { columnId: id, size: 100 },
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

export const createCard = async (
  cardData: any,
  dashboardId: number,
  columnId: number
) => {
  try {
    const res = await client.post(`cards/`, {
      assigneeUserId: 1567,
      dashboardId: dashboardId,
      columnId: columnId,
      title: cardData.title,
      description: cardData.description,
      dueDate: cardData.dueDate,
      tags: [...cardData.tags],
      imageUrl: cardData.imageUrl,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const changeColumnImageURL = async (
  imageFile: File,
  columnId: number
) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await client.post(`columns/${columnId}/card-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.imageUrl;
  } catch (e: any) {
    console.log(e);
  }
};

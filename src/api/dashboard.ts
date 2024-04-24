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

export const updateInvitations = async (
  invitationId: number,
  inviteAccepted: boolean
) => {
  const { data } = await client.put(`invitations/${invitationId}`, {
    inviteAccepted: inviteAccepted,
  });
  return data;
};

export const createDashboard = async (title: string, color: string) => {
  const { data } = await client.post("dashboards", {
    title: title,
    color: color,
  });
  return data;
};

export const getDashboard = async (id: string) => {
  const { data } = await client.get(`dashboards/${id}`);
  return data;
};

export const createColumn = async (title: string, dashboardId: number) => {
  const { data } = await client.post(`columns`, {
    title: title,
    dashboardId: dashboardId,
  });

  return data;
};

export const getColumns = async (id: string) => {
  const { data } = await client.get("columns", { params: { dashboardId: id } });
  return data.data;
};

export const deleteColumn = async (columnId: number) => {
  const { data } = await client.delete(`columns/${columnId}`);
  return data;
};

export const updateColumn = async (columnId: number, newTitle: string) => {
  console.log(newTitle);
  const { data } = await client.put(`columns/${columnId}`, { title: newTitle });
  return data;
};

export const getMembers = async (id: string) => {
  const { data } = await client.get("members", { params: { dashboardId: id } });
  return data.members;
};

export const dashboardInvite = async (email: string, dashboardId: number) => {
  const { data } = await client.post(`dashboards/${dashboardId}/invitations`, {
    email: email,
  });

  return data;
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

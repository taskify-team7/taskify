import client from "./axios";
import { toast } from "react-toastify";

interface ApiPrameterType {
  navigationMethod: string;
  cursorId: number | null;
  page: number | null;
  size: number | null;
}

export const getDashboardList = async (params: ApiPrameterType) => {
  try {
    const { data } = await client.get("dashboards", {
      params: {
        navigationMethod: params.navigationMethod,
        cursorId: params.cursorId,
        page: params.page,
        size: params.size,
      },
    });

    return data;
  } catch (e: any) {
    console.log(e);
  }
};

export const getInviteList = async () => {
  try {
    const { data } = await client.get("invitations", {
      params: {
        size: 6,
      },
    });
    return data;
  } catch (e: any) {
    console.log(e);
  }
};

export const updateInvitations = async (
  invitationId: number,
  inviteAccepted: boolean
) => {
  try {
    const { data } = await client.put(`invitations/${invitationId}`, {
      inviteAccepted: inviteAccepted,
    });
    return data;
  } catch (e: any) {
    console.log(e);
    toast.error(e.response.data.message);
  }
};

export const createDashboard = async (title: string, color: string) => {
  try {
    const result = await client.post("dashboards", {
      title: title,
      color: color,
    });
    if (result.status === 201) {
      toast.success("새로운 대시보드가 생성되었습니다.");
      return result.data;
    }
  } catch (e: any) {
    console.log(e);
    toast.error(e.response.data.message);
  }
};

export const getDashboard = async (id: string) => {
  try {
    const { data } = await client.get(`dashboards/${id}`);
    return data;
  } catch (e: any) {
    console.log(e);
  }
};

export const createColumn = async (title: string, dashboardId: number) => {
  try {
    const result = await client.post(`columns`, {
      title: title,
      dashboardId: dashboardId,
    });

    if (result.status === 201) {
      toast.success("새로운 컬럼이 생성되었습니다.");
      return result.data;
    }
  } catch (e: any) {
    console.log(e);
    toast.error(e.response.data.message);
  }
};

export const getColumns = async (id: string) => {
  try {
    const { data } = await client.get("columns", {
      params: { dashboardId: id },
    });
    return data.data;
  } catch (e: any) {
    console.log(e);
  }
};

export const deleteColumn = async (columnId: number) => {
  try {
    const { data } = await client.delete(`columns/${columnId}`);

    return data;
  } catch (e: any) {
    console.log(e);
    toast.error(e.response.data.message);
  }
};

export const updateColumn = async (columnId: number, newTitle: string) => {
  try {
    const result = await client.put(`columns/${columnId}`, {
      title: newTitle,
    });
    if (result.status === 200) {
      toast.success("컬럼이 수정되었습니다.");
    }

    return result.data;
  } catch (e: any) {
    console.log(e);
    toast.error(e.response.data.message);
  }
};

export const getMembers = async (id: string) => {
  try {
    const { data } = await client.get("members", {
      params: { dashboardId: id },
    });
    return data.members;
  } catch (e: any) {
    console.log(e);
  }
};

export const dashboardInvite = async (email: string, dashboardId: number) => {
  try {
    const result = await client.post(`dashboards/${dashboardId}/invitations`, {
      email: email,
    });

    if (result.status === 201) {
      toast.success("초대가 완료되었습니다.");
    }

    return result.data;
  } catch (e: any) {
    console.log(e);
    toast.error(e.response.data.message);
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

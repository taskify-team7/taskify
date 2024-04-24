import client from "./axios";
import { toast } from "react-toastify";

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

import client from "./axios";

export const createColumn = async (title: string, dashboardId: number) => {
  try {
    const result = await client.post(`columns`, {
      title: title,
      dashboardId: dashboardId,
    });

    return result.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
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
    return e.response.data.message;
  }
};

export const updateColumn = async (columnId: number, newTitle: string) => {
  try {
    const result = await client.put(`columns/${columnId}`, {
      title: newTitle,
    });

    return result.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
};

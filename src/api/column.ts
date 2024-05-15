import client from "./axios";
import baseHttpClient from "./baseHttpClient";
import { CreateColumnsRequestbody } from "./schema/requestType";
import { ColumnListResponse, ColumnResponse } from "./schema/responseType";

const httpClient = baseHttpClient();

export const createColumn = async (title: string, dashboardId: number) => {
  const response = await httpClient.post<
    ColumnListResponse,
    CreateColumnsRequestbody
  >(`columns`, {
    title: title,
    dashboardId: dashboardId,
  });

  return response;
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
  const response = await httpClient.delete(`columns/${columnId}`);

  return response;
};

export const updateColumn = async (columnId: number, newTitle: string) => {
  const response = await httpClient.put<ColumnResponse, { title: string }>(
    `columns/${columnId}`,
    {
      title: newTitle,
    }
  );

  return response;
};

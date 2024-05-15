import client from "./axios";
import baseHttpClient from "./baseHttpClient";
import { CreateCommentRequestbody } from "./schema/requestType";
import { CommentnResponse } from "./schema/responseType";

const httpClient = baseHttpClient();

export const createComment = async (
  content: string,
  cardId: number,
  columnId: number,
  dashboardId: number
) => {
  const response = await httpClient.post<
    CommentnResponse,
    CreateCommentRequestbody
  >("comments", {
    content: content,
    cardId: cardId,
    columnId: columnId,
    dashboardId: dashboardId,
  });
  return response;
};

export const getComments = async (
  size = 10,
  cursorId: number | null,
  columnId: number,
  cardId: number
) => {
  const { data } = await client.get("comments", {
    params: {
      size: size,
      cursorId: cursorId,
      columnId: columnId,
      cardId: cardId,
    },
  });

  return data;
};

export const deleteComment = async (commentId: number) => {
  const response = await httpClient.delete(`/comments/${commentId}`);

  return response;
};

export const updateComment = async (commentId: number, content: string) => {
  const response = await httpClient.put<CommentnResponse, { content: string }>(
    `/comments/${commentId}`,
    {
      content: content,
    }
  );

  return response;
};

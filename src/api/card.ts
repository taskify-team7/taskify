import client from "./axios";

export const createComment = async (
  content: string,
  cardId: number,
  columnId: number,
  dashboardId: number
) => {
  const { data } = await client.post("comments", {
    content: content,
    cardId: cardId,
    columnId: columnId,
    dashboardId: dashboardId,
  });

  return data;
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
  const { data } = await client.delete(`/comments/${commentId}`);

  return data;
};

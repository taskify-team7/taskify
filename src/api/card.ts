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

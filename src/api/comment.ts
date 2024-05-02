import client from "./axios";

export const createComment = async (
  content: string,
  cardId: number,
  columnId: number,
  dashboardId: number
) => {
  try {
    const result = await client.post("comments", {
      content: content,
      cardId: cardId,
      columnId: columnId,
      dashboardId: dashboardId,
    });
    return result.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
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
  try {
    const result = await client.delete(`/comments/${commentId}`);

    return result;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
};

export const updateComment = async (commentId: number, content: string) => {
  try {
    const result = await client.put(`/comments/${commentId}`, {
      content: content,
    });

    return result.data;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
};

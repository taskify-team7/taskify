import client from "./axios";
import { toast } from "react-toastify";

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
    if (result.status === 201) {
      toast.success("댓글이 생성되었습니다.");
      return result.data;
    }
  } catch (e: any) {
    console.log(e);
    toast.error(e.response.data.message);
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

    if (result.status === 204) {
      toast.success("댓글이 삭제되었습니다.");
      return result.data;
    }
  } catch (e: any) {
    console.log(e);
    toast.error(e.response.data.message);
  }
};

export const updateComment = async (commentId: number, content: string) => {
  try {
    const result = await client.put(`/comments/${commentId}`, {
      content: content,
    });
    if (result.status === 200) {
      toast.success("댓글이 삭제되었습니다.");
      return result.data;
    }
  } catch (e: any) {
    console.log(e);
    toast.error(e.response.data.message);
  }
};

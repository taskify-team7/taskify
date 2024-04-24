import client from "./axios";

export const getCards = async (id: string) => {
  const { data } = await client.get("cards", {
    params: { columnId: id, size: 100 },
  });
  return data.cards;
};

export const changeCard = async (id: string, body: object) => {
  try {
    const res = await client.put(`cards/${id}`, body);
    return res;
    // console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const createCard = async (
  cardData: any,
  dashboardId: number,
  columnId: number
) => {
  try {
    const requestData: any = {
      assigneeUserId: parseInt(cardData.assigneeUserId),
      dashboardId: dashboardId,
      columnId: columnId,
      title: cardData.title,
      description: cardData.description,
      dueDate: cardData.dueDate,
      tags: [...cardData.tags],
    };

    // imageUrl 값이 존재하고 string 타입인 경우에만 imageUrl 속성을 추가합니다.
    if (cardData.imageUrl && typeof cardData.imageUrl === "string") {
      requestData.imageUrl = cardData.imageUrl;
    }
    const res = await client.post(`cards/`, requestData);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCard = async (cardId: number) => {
  try {
    const res = await client.delete(`cards/${cardId}`);
    return res;
  } catch (e: any) {
    console.log(e);
  }
};

export const updateCard = async (
  cardData: any,
  columnId: number,
  cardId: number
) => {
  try {
    const requestData: any = {
      assigneeUserId: parseInt(cardData.assigneeUserId),
      columnId: columnId,
      title: cardData.title,
      description: cardData.description,
      dueDate: cardData.dueDate,
      tags: [...cardData.tags],
    };
    // imageUrl 값이 존재하고 string 타입인 경우에만 imageUrl 속성을 추가합니다.
    if (cardData.imageUrl && typeof cardData.imageUrl === "string") {
      requestData.imageUrl = cardData.imageUrl;
    }
    const res = await client.put(`cards/${cardId}`, {
      ...requestData,
    });
    return res;
  } catch (e: any) {
    console.log(e);
  }
};

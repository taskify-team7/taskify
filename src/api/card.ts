import client from "./axios";
import baseHttpClient from "./baseHttpClient";
import { CardResponse } from "./schema/responseType";
import {
  ChangeCardRequestbody,
  CreateCardRequestbody,
} from "./schema/requestType";

interface CardDataType {
  assigneeUserId: string;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
}

const httpClient = baseHttpClient();

export const getCards = async (id: string) => {
  try {
    const { data } = await client.get("cards", {
      params: { columnId: id, size: 100 },
    });
    return data.cards;
  } catch (e: any) {
    console.log(e);
  }
};

export const changeCard = async (id: string, body: ChangeCardRequestbody) => {
  const response = await httpClient.put<CardResponse, ChangeCardRequestbody>(
    `cards/${id}`,
    body
  );
  return response;
};

export const createCard = async (
  cardData: CardDataType,
  dashboardId: number,
  columnId: number
) => {
  const requestData: CreateCardRequestbody = {
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
  const response = await httpClient.post<CardResponse, CreateCardRequestbody>(
    `cards/`,
    requestData
  );

  return response;
};

export const deleteCard = async (cardId: number) => {
  const response = await httpClient.delete(`cards/${cardId}`);

  return response;
};

export const updateCard = async (
  cardData: CardDataType,
  columnId: number,
  cardId: number
) => {
  const requestData: ChangeCardRequestbody = {
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
  const response = await client.put<CardResponse, ChangeCardRequestbody>(
    `cards/${cardId}`,
    {
      ...requestData,
    }
  );

  return response;
};

// 카드 URL 생성 API
export const changeColumnImageURL = async (
  imageFile: File,
  columnId: number
) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await httpClient.post<{ imageUrl: string }, {}>(
    `columns/${columnId}/card-image`,
    formData,
    "multipart/form-data"
  );
  return response.imageUrl;
};

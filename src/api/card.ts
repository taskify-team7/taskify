import client from "./axios";
import * as Sentry from "@sentry/react";

interface CardDataType {
  assigneeUserId: string;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
}

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

export const changeCard = async (id: string, body: object) => {
  try {
    const res = await client.put(`cards/${id}`, body);
    return res;
  } catch (e: any) {
    console.log(e);
    const { method, url } = e.config; // axios의 error객체
    const { status } = e.response;
    Sentry.withScope((scope) => {
      scope.setTag("api", "signUp"); // 태그 설정
      scope.setLevel("warning"); // 레벨 설정
      scope.setFingerprint([method, status, url]);
      Sentry.captureException(new Error(e.response.data.message));
    });
    return e.response.data.message;
  }
};

export const createCard = async (
  cardData: CardDataType,
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
  } catch (e: any) {
    console.log(e);
    const { method, url } = e.config; // axios의 error객체
    const { status } = e.response;
    Sentry.withScope((scope) => {
      scope.setTag("api", "signUp"); // 태그 설정
      scope.setLevel("warning"); // 레벨 설정
      scope.setFingerprint([method, status, url]);
      Sentry.captureException(new Error(e.response.data.message));
    });
    return e.response.data.message;
  }
};

export const deleteCard = async (cardId: number) => {
  try {
    const res = await client.delete(`cards/${cardId}`);

    return res;
  } catch (e: any) {
    console.log(e);
    const { method, url } = e.config; // axios의 error객체
    const { status } = e.response;
    Sentry.withScope((scope) => {
      scope.setTag("api", "signUp"); // 태그 설정
      scope.setLevel("warning"); // 레벨 설정
      scope.setFingerprint([method, status, url]);
      Sentry.captureException(new Error(e.response.data.message));
    });
    return e.response.data.message;
  }
};

export const updateCard = async (
  cardData: CardDataType,
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
    const { method, url } = e.config; // axios의 error객체
    const { status } = e.response;
    Sentry.withScope((scope) => {
      scope.setTag("api", "signUp"); // 태그 설정
      scope.setLevel("warning"); // 레벨 설정
      scope.setFingerprint([method, status, url]);
      Sentry.captureException(new Error(e.response.data.message));
    });
    return e.response.data.message;
  }
};

import client from "./axios";
import * as Sentry from "@sentry/react";

export const createColumn = async (title: string, dashboardId: number) => {
  try {
    const result = await client.post(`columns`, {
      title: title,
      dashboardId: dashboardId,
    });

    return result.data;
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

export const updateColumn = async (columnId: number, newTitle: string) => {
  try {
    const result = await client.put(`columns/${columnId}`, {
      title: newTitle,
    });

    return result.data;
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

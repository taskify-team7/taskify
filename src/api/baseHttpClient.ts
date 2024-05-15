import client from "./axios";
import * as Sentry from "@sentry/react";

export const baseHttpClient = () => {
  // T: response data type
  // P: API 통신시 필요한 Body data type

  async function get<T>(url: string) {
    try {
      const response = await client.get<T>(url);
      return response.data;
    } catch (e) {
      const { method, url } = e.config; // axios의 error객체
      const { status } = e.response;
      Sentry.withScope((scope) => {
        scope.setTag("api", "get"); // 태그 설정
        scope.setLevel("warning"); // 레벨 설정
        scope.setFingerprint([method, status, url]);
        Sentry.captureException(new Error(e.response.data.message));
      });
      return e.response.data.message;
    }
  }

  async function post<T, P>(url: string, data: P, headers?: string) {
    try {
      const response = await client.post<T>(url, data, {
        headers: {
          "Content-Type": headers,
        },
      });
      return response.data;
    } catch (e) {
      const { method, url } = e.config; // axios의 error객체
      const { status } = e.response;
      Sentry.withScope((scope) => {
        scope.setTag("api", "post"); // 태그 설정
        scope.setLevel("warning"); // 레벨 설정
        scope.setFingerprint([method, status, url]);
        Sentry.captureException(new Error(e.response.data.message));
      });
      return e.response.data.message;
    }
  }

  async function put<T, P>(url: string, data: P) {
    try {
      const response = await client.put<T>(url, data);
      return response.data;
    } catch (e) {
      const { method, url } = e.config; // axios의 error객체
      const { status } = e.response;
      Sentry.withScope((scope) => {
        scope.setTag("api", "put"); // 태그 설정
        scope.setLevel("warning"); // 레벨 설정
        scope.setFingerprint([method, status, url]);
        Sentry.captureException(new Error(e.response.data.message));
      });
      return e.response.data.message;
    }
  }

  async function del<T>(url: string) {
    try {
      const response = await client.delete<T>(url);
      return response.data;
    } catch (e) {
      const { method, url } = e.config; // axios의 error객체
      const { status } = e.response;
      Sentry.withScope((scope) => {
        scope.setTag("api", "delete"); // 태그 설정
        scope.setLevel("warning"); // 레벨 설정
        scope.setFingerprint([method, status, url]);
        Sentry.captureException(new Error(e.response.data.message));
      });
      return e.response.data.message;
    }
  }

  return {
    get,
    post,
    put,
    delete: del,
  };
};
export default baseHttpClient;

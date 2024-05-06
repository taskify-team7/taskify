import client from "./axios";
import * as Sentry from "@sentry/react";

interface ApiPrameterType {
  navigationMethod: string;
  cursorId: number | null;
  page: number | null;
  size: number | null;
}

export const getDashboardList = async (params: ApiPrameterType) => {
  try {
    const { data } = await client.get("dashboards", {
      params: {
        navigationMethod: params.navigationMethod,
        cursorId: params.cursorId,
        page: params.page,
        size: params.size,
      },
    });

    return data;
  } catch (e: any) {
    console.log(e);
  }
};

// 대시보드 생성 API
export const createDashboard = async (title: string, color: string) => {
  try {
    const result = await client.post("dashboards", {
      title: title,
      color: color,
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

// 대시보드 수정 API
export const updateDashboard = async (
  title: string,
  color: string,
  dashboardId: number
) => {
  try {
    const { data } = await client.put(`dashboards/${dashboardId}`, {
      title: title,
      color: color,
    });
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

// 대시보드 삭제 API
export const deleteDashboard = async (dashboardId: number) => {
  try {
    const response = await client.delete(`dashboards/${dashboardId}`);

    const result = response.data;

    return result;
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

// 대시보드 정보를 가져오는 API
export const getDashboard = async (id: string) => {
  try {
    const { data } = await client.get(`dashboards/${id}`);
    return data;
  } catch (e: any) {
    console.log(e);
  }
};

export const getMembers = async (id: string) => {
  try {
    const { data } = await client.get("members", {
      params: { dashboardId: id },
    });
    return data.members;
  } catch (e: any) {
    console.log(e);
  }
};

// 대시보드 멤버 목록 조회 및 삭제 기능
export const getMemberList = async (
  id: string,
  page?: number | null,
  size?: number | null
) => {
  const { data } = await client.get("members", {
    params: { dashboardId: id, page, size },
  });
  return data;
};

export const deleteMember = async (id: number) => {
  try {
    const response = await client.delete(`/members/${id}`);

    return response;
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

// 초대를 받은 리스트 가져오는 API와 수락 및 거절하는 API
export const getInviteList = async () => {
  try {
    const { data } = await client.get("invitations", {
      params: {
        size: 6,
      },
    });
    return data;
  } catch (e: any) {
    console.log(e);
  }
};

export const updateInvitations = async (
  invitationId: number,
  inviteAccepted: boolean
) => {
  try {
    const { data } = await client.put(`invitations/${invitationId}`, {
      inviteAccepted: inviteAccepted,
    });
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

// 자신의 대시보드에 초대한 멤버 리스트 불러오는 API
export const getDashboardInvite = async (
  dashboardId: number,
  page: number = 1,
  size: number = 10
) => {
  const { data } = await client.get(`dashboards/${dashboardId}/invitations`, {
    params: { page, size },
  });
  return data;
};

// 자신의 대시보드에 초대한 요청을 취소하는 취소하는 API
export const deleteInvite = async (dashboardId: number, id: number) => {
  try {
    const response = await client.delete(
      `dashboards/${dashboardId}/invitations/${id}`
    );
    return response;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
};

// 자신의 대시보드에 멤버 초대 요청 API
export const dashboardInvite = async (email: string, dashboardId: number) => {
  try {
    const result = await client.post(`dashboards/${dashboardId}/invitations`, {
      email: email,
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

// 프로필 이미지 URL 생성 API
export const changeColumnImageURL = async (
  imageFile: File,
  columnId: number
) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await client.post(`columns/${columnId}/card-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.imageUrl;
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
  }
};

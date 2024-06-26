import baseHttpClient from "./baseHttpClient";
import {
  DashboardListResponse,
  DashboardResponse,
  Invutations,
  MemberListResponse,
  MyDashboardInvitationsResponse,
  MyInvitationsResponse,
} from "./schema/responseType";
import { CreateDashBoardRequestbody } from "./schema/requestType";

interface ApiPrameterType {
  navigationMethod: string;
  cursorId: number | null;
  page: number | null;
  size: number | null;
}

const httpClient = baseHttpClient();

export const getDashboardList = async (params: ApiPrameterType) => {
  const response = await httpClient.get<DashboardListResponse, ApiPrameterType>(
    "dashboards",
    {
      navigationMethod: params.navigationMethod,
      cursorId: params.cursorId,
      page: params.page,
      size: params.size,
    }
  );

  return response;
};

// 대시보드 생성 API
export const createDashboard = async (title: string, color: string) => {
  const response = await httpClient.post<
    DashboardResponse,
    CreateDashBoardRequestbody
  >("dashboards", {
    title: title,
    color: color,
  });

  return response;
};

// 대시보드 수정 API
export const updateDashboard = async (
  title: string,
  color: string,
  dashboardId: number
) => {
  console.log(title);
  const response = await httpClient.put<
    DashboardResponse,
    CreateDashBoardRequestbody
  >(`dashboards/${dashboardId}`, {
    title: title,
    color: color,
  });
  return response;
};

// 대시보드 삭제 API
export const deleteDashboard = async (dashboardId: number) => {
  const response = await httpClient.delete(`dashboards/${dashboardId}`);

  return response;
};

// 대시보드 정보를 가져오는 API
export const getDashboard = async (id: string) => {
  const response = await httpClient.get<DashboardResponse, any>(
    `dashboards/${id}`
  );
  return response;
};

export const getMembers = async (id: string) => {
  const response = await httpClient.get<
    MemberListResponse,
    { dashboardId: string }
  >("members", { dashboardId: id });
  return response.members;
};

// 대시보드 멤버 목록 조회 및 삭제 기능
export const getMemberList = async (
  id: string,
  page?: number | null,
  size?: number | null
) => {
  const response = await httpClient.get<MemberListResponse, {}>("members", {
    dashboardId: id,
    page: page,
    size: size,
  });
  return response;
};

export const deleteMember = async (id: number) => {
  const response = await httpClient.delete(`/members/${id}`);

  return response;
};

// 초대를 받은 리스트 가져오는 API와 수락 및 거절하는 API
export const getInviteList = async () => {
  const response = await httpClient.get<
    MyInvitationsResponse,
    { size: number }
  >("invitations", {
    size: 6,
  });
  return response;
};

export const updateInvitations = async (
  invitationId: number,
  inviteAccepted: boolean
) => {
  const response = await httpClient.put<
    Invutations,
    { inviteAccepted: boolean }
  >(`invitations/${invitationId}`, {
    inviteAccepted: inviteAccepted,
  });
  return response;
};

// 자신의 대시보드에 초대한 멤버 리스트 불러오는 API
export const getDashboardInvite = async (
  dashboardId: number,
  page: number = 1,
  size: number = 10
) => {
  const response = await httpClient.get<
    MyDashboardInvitationsResponse,
    { page: number; size: number }
  >(`dashboards/${dashboardId}/invitations`, { page, size });
  return response;
};

// 자신의 대시보드에 초대한 요청을 취소하는 취소하는 API
export const deleteInvite = async (dashboardId: number, id: number) => {
  const response = await httpClient.delete(
    `dashboards/${dashboardId}/invitations/${id}`
  );
  return response;
};

// 자신의 대시보드에 멤버 초대 요청 API
export const dashboardInvite = async (email: string, dashboardId: number) => {
  const response = await httpClient.post<Invutations, { email: string }>(
    `dashboards/${dashboardId}/invitations`,
    {
      email: email,
    }
  );

  return response;
};

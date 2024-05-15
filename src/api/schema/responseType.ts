export interface ColumnListResponse {
  result: string;
  data: [
    {
      id: number;
      title: string;
      teamId: string;
      dashboardId: number;
      createdAt: string;
      updatedAt: string;
    }
  ];
}

export interface ColumnResponse {
  result: string;
  data: [
    {
      id: number;
      title: string;
      teamId: string;
      createdAt: string;
      updatedAt: string;
    }
  ];
}

export interface CardListResponse {
  cards: [
    {
      id: number;
      title: string;
      description: string;
      tags: string[];
      dueDate: string;
      assignee?: {
        id: number;
        nickname: string;
        profileImageUrl?: string;
      };
      imageUrl?: string;
      teamId: string;
      dashboardId: number;
      columnId: number;
      createdAt: string;
      updatedAt: string;
    }
  ];
  totalCount: number;
  cursorId: number;
}

export interface CardResponse {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardDetailResponse {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  createdByMe: boolean;
}

export interface MemberListResponse {
  members: [
    {
      id: number;
      email: string;
      nickname: string;
      profileImageUrl?: string;
      createdAt: string;
      updatedAt: string;
      isOwner: boolean;
      userId: number;
    }
  ];
  totalCount: number;
}

export interface DashboardListResponse {
  dashboards: [
    {
      id: number;
      title: string;
      color: string;
      userId: number;
      createdAt: string;
      updatedAt: string;
      createdByMe: boolean;
    }
  ];
  totalCount: number;
  cursorId: any;
}

export interface DashboardResponse {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

export interface UserInfoResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: any;
  createdAt: string;
  updatedAt: string;
}

export interface UserLoginResponse {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: any;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}

export interface CommentnResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

export interface Invutations {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: true;
  createdAt: string;
  updatedAt: string;
}

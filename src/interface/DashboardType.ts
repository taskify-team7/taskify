export interface UserType {
  id: number;
  email: string;
  nickname: string;
}

export interface InviteDataType {
  id: number;
  inviter: UserType;
  teamId: string;
  dashboard: {
    id: number;
    title: string;
  };
  invitee: UserType;
  inviteAccepted?: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface InviteListDataType {
  invitations: InviteDataType[];
  cursorId?: any;
}

export interface DashboardList {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

export interface DashBoardsDataType {
  cursorId: number | null;
  totalCount: number;
  dashboards: DashboardList[];
}

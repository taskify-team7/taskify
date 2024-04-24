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

export interface DashBoardType {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

export interface DashBoardsType {
  cursorId: number | null;
  totalCount: number;
  dashboards: DashBoardType[];
}
export interface ColumnType {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CardType {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
  };
  imageUrl: string;
  teamId: string;
  dashboardId: number;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashBoardMember {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

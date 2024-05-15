export interface LoginRequestbody {
  email: string;
  password: string;
}

export interface SignUpRequestbody {
  email: string;
  nickname: string;
  password: string;
  confirmPassword?: string;
}

export interface ChangePasswordRequestbody {
  password: string;
  newPassword: string;
}

export interface ChangeMyInfoRequestbody {
  nickname: string;
  profileImageUrl?: string;
}

export interface ChangeCardRequestbody {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags?: string[];
  imageUrl?: string;
}

export interface CreateCardRequestbody {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
}

export interface CreateColumnsRequestbody {
  title: string;
  dashboardId: number;
}

export interface CreateCommentRequestbody {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export interface CreateDashBoardRequestbody {
  title: string;
  color: string;
}

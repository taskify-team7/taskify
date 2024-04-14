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

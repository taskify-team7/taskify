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

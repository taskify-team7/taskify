import { UserInfoResponse, UserLoginResponse } from "./schema/responseType";
import baseHttpClient from "./baseHttpClient";
import {
  ChangeMyInfoRequestbody,
  ChangePasswordRequestbody,
  LoginRequestbody,
  SignUpRequestbody,
} from "./schema/requestType";

const httpClient = baseHttpClient();

export async function signUp(data: SignUpRequestbody) {
  const response = await httpClient.post<UserInfoResponse, SignUpRequestbody>(
    "/users/",
    data
  );
  return response;
}

export async function logIn(data: LoginRequestbody) {
  const response = await httpClient.post<UserLoginResponse, LoginRequestbody>(
    "/auth/login",
    data
  );
  return response;
}

export async function changePassword(data: ChangePasswordRequestbody) {
  const response = await httpClient.put<
    UserInfoResponse,
    ChangePasswordRequestbody
  >("/auth/password", data);
  return response;
}

export async function getMyInfo() {
  const response = await httpClient.get<UserInfoResponse, any>("/users/me");
  return response;
}

export async function changeMyInfo(data: ChangeMyInfoRequestbody) {
  const response = await httpClient.put<
    UserInfoResponse,
    ChangeMyInfoRequestbody
  >("/users/me", data);
  return response;
}

export const changeImageURL = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await httpClient.post(
    "users/me/image",
    formData,
    "multipart/form-data"
  );

  return response.profileImageUrl;
};

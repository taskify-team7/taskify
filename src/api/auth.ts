import client from "./axios";
import { toast } from "react-toastify";

export async function signUp(data: object) {
  try {
    const response = await client.post("/users/", data);
    const result = response.data;
    return result;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
}

export async function logIn(data: object) {
  try {
    const response = await client.post("/auth/login", data);
    const result = response.data;
    return result;
  } catch (e: any) {
    console.log(e);
    return e.response.data.message;
  }
}

export async function changePassword(data: object) {
  try {
    const response = await client.put("/auth/password", data);
    if (response.status === 204) {
      toast.success("비밀번호가 변경되었습니다.");
      const result = response.data;
      return result;
    }
  } catch (e: any) {
    console.log(e);
    toast.error(e.response.data.message);
  }
}

export async function getMyInfo() {
  try {
    const response = await client.get("/users/me");
    const result = response.data;
    return result;
  } catch (e: any) {
    console.log(e);
  }
}

export async function changeMyInfo(data: object) {
  try {
    const response = await client.put("/users/me", data);
    if (response.status === 200) {
      toast.success("회원정보가 변경되었습니다.");
      const result = response.data;
      return result;
    }
  } catch (e: any) {
    console.log(e);
    toast.error(e.response.data.message);
  }
}

export async function uploadMyImage(data: object) {
  const response = await client.post("/users/me/image", data);
  const result = response.data;
  return result;
}

export const changeImageURL = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await client.post("users/me/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.profileImageUrl;
  } catch (e: any) {
    console.log(e);
  }
};

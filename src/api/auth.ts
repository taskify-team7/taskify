import client from "./axios";

export async function signUp(data: object) {
  const response = await client.post("/users/", data);
  const result = response.data;
  return result;
}

export async function logIn(data: object) {
  const response = await client.post("/auth/login", data);
  const result = response.data;
  return result;
}

export async function changePassword(data: object) {
  const response = await client.put("/auth/password", data);
  const result = response.data;
  return result;
}

export async function getMyInfo() {
  const response = await client.get("/users/me");
  const result = response.data;
  return result;
}

export async function changeMyInfo(data: object) {
  const response = await client.put("/users/me", data);
  const result = response.data;
  return result;
}

export async function uploadMyImage(data: object) {
  const response = await client.post("/users/me/image", data);
  const result = response.data;
  return result;
}
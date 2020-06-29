import request from "@/utils/request";

export async function fakeAccountLogin(params) {
  return request("login", {
    method: "POST",
    data: params
  });
}

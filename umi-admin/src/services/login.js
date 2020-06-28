import request from "umi-request";
import { apiUrl } from "@/utils/utils";

export async function fakeAccountLogin(params) {
  return request(`${apiUrl()}/login`, {
    method: "POST",
    params
  });
}

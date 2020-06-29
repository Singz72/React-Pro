import request from "@/utils/request";

export async function queryRule(params) {
  return request("views", {
    method: "GET"
  });
}

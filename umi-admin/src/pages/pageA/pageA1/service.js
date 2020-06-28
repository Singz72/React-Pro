import request from "@/utils/request";
// import request from 'umi-request';

export async function queryRule(params) {
  return request("pagea1", {
    method: "GET",
    params: {
      data: params
    }
  });
}

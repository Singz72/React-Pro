import request from "@/utils/request";
// import request from 'umi-request';

export async function queryRule(params) {
  return request("pageb1", {
    method: "GET",
    params: {
      data: params
    }
  });
}

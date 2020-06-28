import request from "@/utils/request";

export async function queryRule(params) {
  return request("db.product.dbProductGetProductCountApiService", {
    method: "GET",
    params: {
      data: params
    }
  });
}

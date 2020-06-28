import request from "@/utils/request";

export async function queryRule(params) {
  return request("vpmall.buyer.vpmallBuyerViewGetVipListApiService", {
    method: "GET",
    params: {
      data: params
    }
  });
}
export async function queryLevel() {
  return request("vpmall.buyer.vpmallBuyerLevelGetBuyerLevelListApiService");
}
export async function act(params) {
  return request("vpmall.buyer.vpmallBuyerViewAddOrUpdareVipApiService", {
    method: "POST",
    params: {
      data: params
    }
  });
}
export async function del() {
  return request();
}
export async function search(params) {
  return request("vpmall.buyer.vpmallBuyerViewGetBuyerIdListApiService", {
    method: "GET",
    params: {
      data: params
    }
  });
}

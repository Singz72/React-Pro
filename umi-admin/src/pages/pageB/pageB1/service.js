import request from "@/utils/request";

export async function queryRule(params) {
  return request("vpmall.buyer.vpmallBuyerGetBuyerListApiService", {
    method: "GET",
    params: {
      data: params
    }
  });
}
export async function search(params) {
  return request("vpmall.buyer.vpmallBuyerGetVipBuyerIdListApiService", {
    method: "GET",
    params: {
      data: params
    }
  });
}
export async function act(params) {
  return request("vpmall.buyer.vpmallBuyerUpdateAgentBuyerApiService", {
    method: "POST",
    params: {
      data: params
    }
  });
}
export async function add(params) {
  return request("vpmall.buyer.vpmallBuyerAddVpmallBuyerApiService", {
    method: "POST",
    params: {
      data: params
    }
  });
}

import request from "@/utils/request";

export async function queryRule(params) {
  return request("db.company.dbUserGetEmployeeListApiService", {
    method: "GET",
    params: {
      data: params
    }
  });
}
export async function getDepartment() {
  return request("db.company.dbCompanyGetDepaprtmentListApiService");
}
export async function getRole(params) {
  return request("db.company.dbRoleGetCompanyRoleListApiService", {
    method: "GET",
    params: {
      data: params
    }
  });
}
export async function getInfo(params) {
  return request("db.company.dbUserGetEmployeeApiService", {
    method: "GET",
    params: {
      data: params
    }
  });
}
export async function add(params) {
  return request("db.company.dbUserAddOrUpdateEmployeeApiService", {
    method: "POST",
    params: {
      data: params
    }
  });
}
export async function act(params) {
  return request("db.company.dbUserOperateEmployeeApiService", {
    method: "POST",
    params: {
      data: params
    }
  });
}

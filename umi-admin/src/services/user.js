import request from "@/utils/request";
import user from "@/assets/images/user.png";

export async function query() {
  return request("/api/users");
}
export async function queryCurrent() {
  const userName = localStorage.getItem("userName");
  const userid = localStorage.getItem("userId");
  return {
    name: userName || "用户",
    avatar: user,
    userid: userid || "00000001"
  };
}
export async function queryNotices() {
  return request("/api/notices");
}

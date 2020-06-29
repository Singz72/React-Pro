import Mock from "mockjs";

export default {
  "GET /api/views": Mock.mock({
    views: 12,
    success: true,
    msg: ""
  })
};

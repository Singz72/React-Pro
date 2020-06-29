import Mock from "mockjs";
var Random = Mock.Random;

export default {
  "GET /api/pageb1": Mock.mock({
    "list|1-4": [
      {
        "id|+1": 100001,
        series: "xAx-01-12",
        date: Random.date()
      }
    ]
  })
};

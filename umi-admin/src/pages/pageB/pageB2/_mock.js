export default {
  "GET /api/list": (req, res) => {
    res.status(200).send({
      data: [
        {
          id: "1",
          username: "10000000",
          name: "海绵宝宝",
          level: "钻石会员",
          levelcode: "1",
          code: "0000",
          createtime: "2019-10-10"
        },
        {
          id: "2",
          username: "10000001",
          name: "派大星",
          level: "钻石会员",
          levelcode: "1",
          code: "0001",
          createtime: "2019-10-11"
        },
        {
          id: "3",
          username: "10000002",
          name: "章鱼哥",
          level: "钻石会员",
          levelcode: "1",
          code: "0002",
          createtime: "2019-10-12"
        }
      ]
    });
  },
  "GET /api/levels": (req, res) => {
    res.status(200).send({
      data: [
        {
          label: "钻石会员",
          value: "1"
        },
        {
          label: "铂金会员",
          value: "2"
        },
        {
          label: "黄金会员",
          value: "3"
        }
      ]
    });
  }
};

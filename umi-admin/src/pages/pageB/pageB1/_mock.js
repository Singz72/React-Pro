export default {
  "GET /api/member": (req, res) => {
    res.status(200).send({
      data: {
        list: [
          {
            username: "123456789",
            uid: "123456789",
            name: "海绵宝宝",
            sexy: "男",
            avatar: "http://singz72.com/images/other/hai.jpeg",
            mobile: "10000010086",
            address: "菠萝屋",
            createtime: "2019-12-06",
            recommender: "蟹老板",
            code: "9527"
          },
          {
            username: "123456788",
            uid: "123456788",
            name: "派大星",
            sexy: "男",
            avatar: "http://singz72.com/images/other/pai.jpg",
            mobile: "10000010085",
            address: "石头屋",
            createtime: "2019-12-06",
            recommender: "蟹老板",
            code: "9527"
          },
          {
            username: "123456787",
            uid: "123456787",
            name: "章鱼哥",
            sexy: "男",
            avatar: "http://singz72.com/images/other/zhang.jpeg",
            mobile: "10000010084",
            address: "章鱼堡",
            createtime: "2019-12-06",
            recommender: "蟹老板",
            code: "9527"
          }
        ],
        total: 3,
        pages: 1,
        pageNum: 1,
        pageSize: 10
      }
    });
  }
};

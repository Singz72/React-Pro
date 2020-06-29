export default {
  "POST /api/login": (req, res) => {
    const { inputpass, userName } = req.body;

    if (inputpass === "123" && userName === "admin") {
      res.send({
        status: "ok",
        currentAuthority: "admin",
        userName,
        nick: "海绵宝宝",
        avatar: "http://singz72.com/blogImage/haimianbb.jpeg",
        userid: "00000001",
        token: "xxxxxx111xxxxxx"
      });
      return;
    }

    if (inputpass === "123" && userName === "user") {
      res.send({
        status: "ok",
        currentAuthority: "user",
        userName,
        nick: "派大星",
        avatar: "http://singz72.com/blogImage/paidaxing.jpg",
        userid: "00000002",
        token: "xxxxxx111xxxxxx"
      });
      return;
    }

    res.send({
      status: "error",
      currentAuthority: "guest"
    });
  },
  "POST /api/register": (req, res) => {
    res.send({
      status: "ok",
      currentAuthority: "user"
    });
  },
  "GET /api/500": (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: "error",
      message: "error",
      path: "/base/category/list"
    });
  },
  "GET /api/404": (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: "Not Found",
      message: "No message available",
      path: "/base/category/list/2121212"
    });
  },
  "GET /api/403": (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: "Unauthorized",
      message: "Unauthorized",
      path: "/base/category/list"
    });
  },
  "GET /api/401": (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: "Unauthorized",
      message: "Unauthorized",
      path: "/base/category/list"
    });
  }
};

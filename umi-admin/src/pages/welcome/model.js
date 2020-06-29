import { message } from "antd";
import { queryRule } from "./service";

const Model = {
  namespace: "welcome",
  state: {
    views: 0,
    nick: ""
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryRule);
      if (response.success) {
        yield put({
          type: "save",
          payload: {
            views: response.views
          }
        });
      } else {
        message.error(response.msg);
      }
    },
    *getUser(_, { put }) {
      const user = JSON.parse(localStorage.getItem("_user"));
      yield put({
        type: "save",
        payload: {
          nick: user.nick
        }
      });
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
export default Model;

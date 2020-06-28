import { message } from "antd";
import { queryRule } from "./service";

const Model = {
  namespace: "welcome",
  state: {
    data: 0,
    userName: ""
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryRule);
      if (response.success) {
        yield put({
          type: "save",
          payload: {
            data: response.data
          }
        });
      } else {
        message.error(response.msg);
      }
    },
    *getUser(_, { put }) {
      const user = JSON.parse(sessionStorage.getItem("_user"));
      yield put({
        type: "save",
        payload: {
          userName: user.userName
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

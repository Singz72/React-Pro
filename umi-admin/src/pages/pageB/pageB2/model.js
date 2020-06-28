import { message } from "antd";
import { queryRule, queryLevel, act, del, search } from "./service";

const Model = {
  namespace: "memberMgt",
  state: {
    list: [],
    level: [],
    total: 0,
    pages: 0,
    pageNum: 0,
    pageSize: 10,
    size: 0,
    dataSource: []
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload.data);
      if (response.success) {
        yield put({
          type: "save",
          payload: response.data
        });
      } else {
        message.error(response.msg);
      }
    },
    *fetchLevel({ payload }, { call, put }) {
      const response = yield call(queryLevel, payload.data);
      if (response.success) {
        yield put({
          type: "save",
          payload: {
            level: response.data
          }
        });
      } else {
        message.error(response.msg);
      }
    },
    *act({ payload }, { call }) {
      const response = yield call(act, payload.data);
      if (response.success) {
        message.success("操作成功！");
        payload.callback();
      } else {
        message.error(response.msg);
      }
    },
    *del({ payload }, { call }) {
      const response = yield call(del, payload.data);
      if (response.success) {
        message.success("删除成功！");
        payload.callback();
      } else {
        message.error(response.msg);
      }
    },
    *search({ payload }, { call, put }) {
      const response = yield call(search, payload.data);
      if (response.success) {
        const arr = response.data.reduce(
          (acc, cur) => [...acc, { text: cur.name, value: cur.id }],
          []
        );
        yield put({
          type: "save",
          payload: {
            dataSource: arr
          }
        });
      } else {
        message.error(response.msg);
      }
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
export default Model;

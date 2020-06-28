import { message } from "antd";
import { queryRule, search, act, add } from "./service";

const Model = {
  namespace: "customerMgt",
  state: {
    list: [],
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
        message.info(response.msg);
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
    *add({ payload }, { call }) {
      const response = yield call(add, payload.data);
      if (response.success) {
        message.success("添加成功！");
        payload.callback();
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

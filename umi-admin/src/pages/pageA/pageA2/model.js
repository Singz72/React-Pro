import { message } from "antd";
import {
  queryRule,
  getDepartment,
  getRole,
  add,
  act,
  getInfo
} from "./service";

const Model = {
  namespace: "employee",
  state: {
    list: [],
    selectOptions: [],
    checkboxOptions: [],
    pageNum: 1,
    pageSize: 10,
    total: 0
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      if (response.success) {
        yield put({
          type: "save",
          payload: response.data
        });
      } else {
        message.error(response.msg);
      }
    },
    *getDepartment({ payload }, { call, put }) {
      const response = yield call(getDepartment, payload);
      if (response.success) {
        const obj = response.data.map(cur => ({
          label: cur.departmentName,
          value: cur.id
        }));
        yield put({
          type: "save",
          payload: {
            selectOptions: obj
          }
        });
      } else {
        message.error(response.msg);
      }
    },
    *getRole({ payload }, { call, put }) {
      const response = yield call(getRole, payload.data);
      if (response.success) {
        const obj = response.data.map(cur => ({
          label: cur.name,
          value: String(cur.id)
        }));
        yield put({
          type: "save",
          payload: {
            checkboxOptions: obj
          }
        });
      } else {
        message.error(response.msg);
      }
    },
    *getInfo({ payload }, { call }) {
      const response = yield call(getInfo, payload.data);
      if (response.success) {
        payload.callback(response.data);
      } else {
        message.error(response.msg);
      }
    },
    *add({ payload }, { call, select }) {
      const response = yield call(add, payload.data);
      if (response.success) {
        const { pageNum } = yield select(_ => _.employee);
        message.success("更新成功！");
        payload.callback(pageNum);
        payload.handleCancel();
      } else {
        message.error(response.msg);
        payload.handleCancel();
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
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
export default Model;

import { queryRule } from "./service";

const Model = {
  namespace: "pagea1",
  state: {
    list: []
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload.data);
      yield put({
        type: "save",
        payload: response
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

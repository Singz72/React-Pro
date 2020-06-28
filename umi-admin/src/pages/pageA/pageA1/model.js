import { queryRule } from "./service";

const Model = {
  namespace: "originRole",
  state: {
    list: []
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload.data);
      console.log(response);
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

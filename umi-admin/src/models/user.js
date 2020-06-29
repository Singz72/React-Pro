import { message } from "antd";
import { getParseJwt } from "@/utils/utils";

const UserModel = {
  namespace: "user",
  state: {
    currentUser: {}
  },
  effects: {
    *fetchCurrent(_, { put }) {
      const jwt = getParseJwt();
      if (!jwt) {
        yield put({
          type: "login/logout"
        });
      } else {
        yield put({
          type: "saveCurrentUser",
          payload: jwt
        });
      }
    }
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {}
      },
      action
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount
        }
      };
    }
  }
};
export default UserModel;

import { message } from "antd";
import { checkToken } from "@/utils/utils";
import { queryLangs } from "@/services/user";
import userImg from "@/assets/images/user.png";

const getParseJwt = () => {
  const token = checkToken();
  if (!token) {
    return false;
  }
  const user = JSON.parse(sessionStorage.getItem("_user"));
  return {
    ...user,
    avatar: userImg,
    token
  };
};

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
    },
    *queryLangs({ payload }, { call }) {
      const response = yield call(queryLangs);
      if (response.success) {
        if (payload.callback) {
          payload.callback(response.data);
        }
      } else {
        message.error("多语言数据获取失败！", 4);
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

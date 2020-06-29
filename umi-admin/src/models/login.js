import { routerRedux } from "dva/router";
import { stringify } from "querystring";
import { message } from "antd";
import { fakeAccountLogin } from "@/services/login";
import { setAuthority } from "@/utils/authority";
import { getPageQuery } from "@/utils/utils";

const Model = {
  namespace: "login",
  state: {
    status: undefined
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, {
        inputpass: payload.data.inputpass,
        userName: payload.data.userName
      });
      if (response.status === "ok") {
        localStorage.setItem(
          "_user",
          JSON.stringify({
            userName: response.userName,
            nick: response.nick,
            avatar: response.avatar,
            userid: response.userid
          })
        );
        localStorage.setItem("_token", JSON.stringify(response.token));
        yield put({
          type: "changeLoginStatus",
          payload: response
        });
        // Login successfully
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length + 9);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf("#") + 1);
            }
          } else {
            window.location.href = "/";
            return;
          }
        }
        yield put(routerRedux.replace(redirect || "/"));
      } else {
        message.error(response.error);
      }
    },

    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect

      if (window.location.pathname !== "/user/login" && !redirect) {
        setAuthority([]); // [] or ['guest']
        localStorage.clear();
        yield put(
          routerRedux.replace({
            pathname: "/user/login",
            search: stringify({
              redirect: window.location.href
            })
          })
        );
      }
    }
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    }
  }
};
export default Model;

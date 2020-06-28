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
      const data = yield call(fakeAccountLogin, {
        inputpass: payload.data.inputpass,
        username: payload.data.username,
        ckcode: "123"
      });
      if (data.success) {
        const d = data.data;
        let auth = "";
        if (data.data.userInfo.roleNames.slice(-1) === ",") {
          auth = data.data.userInfo.roleNames.slice(0, -1).split(",");
        } else {
          auth = data.data.userInfo.roleNames.split(",");
        }
        const response = {
          status: "ok",
          type: payload.data.type,
          currentAuthority: auth,
          userName: d.userInfo.name,
          userId: d.userInfo.userId,
          token: d.token
        };
        sessionStorage.setItem(
          "_user",
          JSON.stringify({
            userName: response.userName,
            userId: response.userId
          })
        );
        sessionStorage.setItem("mat", response.token);
        yield put({
          type: "changeLoginStatus",
          payload: response
        }); // Login successfully
        // const urlParams = new URL(window.location.href);
        // const params = getPageQuery();
        // let { redirect } = params;

        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);
        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length + 3);
        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //   } else {
        //     window.location.href = '/';
        //     return;
        //   }
        // }

        // 重新登录后直接回首页
        // yield put(routerRedux.replace(redirect || '/'));
        yield put(routerRedux.replace("/"));
      } else {
        message.error(data.msg);
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

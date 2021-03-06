import React from "react";
import { connect } from "dva";
import { Redirect } from "umi";
import { stringify } from "querystring";
import PageLoading from "@/components/PageLoading";
import { getParseJwt } from "../utils/utils";

class SecurityLayout extends React.Component {
  state = {
    isReady: false
  };

  componentDidMount() {
    this.setState({
      isReady: true
    });
  }

  render() {
    const { isReady } = this.state;
    const { children, loading } = this.props;
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = getParseJwt().token;
    const queryString = stringify({
      redirect: window.location.href
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!isLogin) {
      return <Redirect to={`/user/login?${queryString}`}></Redirect>;
    }

    return children;
  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user
}))(SecurityLayout);

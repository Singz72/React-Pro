import { Alert } from "antd";
import React, { Component } from "react";
// import Link from 'umi/link';
import { connect } from "dva";
import LoginComponents from "./components/Login";
import styles from "./style.less";

const { UserName, Password, Submit } = LoginComponents;

@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects["login/login"]
}))
class Login extends Component {
  loginForm = undefined;

  state = {
    type: "account"
    // autoLogin: true,
  };

  // changeAutoLogin = () => {
  // this.setState({
  //   autoLogin: e.target.checked,
  // });
  // };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: "login/login",
        payload: {
          data: {
            username: values.userName,
            inputpass: values.password,
            type
          }
        }
      });
    }
  };

  // onTabChange = type => {
  //   this.setState({
  //     type,
  //   });
  // };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(["mobile"], {}, async (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;

          try {
            const success = await dispatch({
              type: "login/getCaptcha",
              payload: values.mobile
            });
            resolve(!!success);
          } catch (error) {
            reject(error);
          }
        }
      });
    });

  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          // onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={form => {
            this.loginForm = form;
          }}
        >
          <div>
            {status === "error" &&
              loginType === "account" &&
              !submitting &&
              this.renderMessage("账户或密码错误")}
            <UserName
              name="userName"
              placeholder="用户名"
              rules={[
                {
                  required: true,
                  message: "请输入用户名!"
                }
              ]}
            />
            <Password
              name="password"
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: "请输入密码！"
                }
              ]}
              onPressEnter={e => {
                e.preventDefault();

                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </div>
          {/* <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            <a
              style={{
                float: 'right',
              }}
              href=""
            >
              忘记密码
            </a>
          </div> */}
          <Submit loading={submitting}>登录</Submit>
          {/* <div className={styles.other}>
            其他登录方式
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
              注册账户
            </Link>
          </div> */}
        </LoginComponents>
      </div>
    );
  }
}

export default Login;

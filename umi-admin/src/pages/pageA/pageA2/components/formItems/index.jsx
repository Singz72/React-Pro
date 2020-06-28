import { Form, Input, Select, Checkbox, Button, message } from "antd";
import Link from "umi/link";
import React, { Component } from "react";

const { Item } = Form;
const { Option } = Select;
const formFields = [
  "loginName",
  "password",
  "rePassword",
  "name",
  "phone",
  "departmentId",
  "roleId"
];

class FormItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: "",
      loading: false
    };
  }

  componentDidMount() {}

  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;

    if (form) {
      form.validateFields(formFields, (err, values) => {
        if (err) {
          return;
        }
        const { password } = values;
        if (password.indexOf(" ") > -1) {
          message.error("不能含有空格！");
          return;
        }
        if (password.length < 6) {
          message.error("密码至少包含六位数！");
          return;
        }
        if (onSubmit) {
          this.setState({
            loading: true
          });
          const vals = values;
          if (values.password === "如需改动请输入新密码") {
            vals.password = "";
            vals.rePassword = "";
          }
          onSubmit(vals, () => {
            this.setState({
              loading: false
            });
          });
        }
      });
    }
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次输入密码不一致");
    } else {
      callback();
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
      formData,
      selectOptions,
      checkboxOptions
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 4
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
    return (
      <div>
        <Form onSubmit={this.handleSubmit} {...formItemLayout}>
          <Item label="用户名">
            {getFieldDecorator("loginName", {
              initialValue: formData.loginName ? formData.loginName : "",
              rules: [
                {
                  required: true,
                  message: "请输入用户名！"
                }
              ]
            })(<Input />)}
          </Item>
          <Item label="密码">
            {getFieldDecorator("password", {
              initialValue: formData.id ? "如需改动请输入新密码" : "",
              rules: [
                {
                  required: true,
                  message: "请输入密码！"
                }
              ]
            })(<Input.Password />)}
          </Item>
          <Item label="确认密码" hasFeedback>
            {getFieldDecorator("rePassword", {
              initialValue: formData.id ? "如需改动请输入新密码" : "",
              rules: [
                {
                  required: true,
                  message: "两次输入密码不一致！"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Item>
          <Item label="姓名">
            {getFieldDecorator("name", {
              initialValue: formData.name ? formData.name : "",
              rules: [
                {
                  required: true,
                  message: "请输入姓名！"
                }
              ]
            })(<Input />)}
          </Item>
          <Item label="手机号">
            {getFieldDecorator("phone", {
              initialValue: formData.phone ? formData.phone : "",
              rules: [{ required: true, message: "请输入手机号！" }]
            })(
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            )}
          </Item>
          <Item label="所属部门">
            {getFieldDecorator("departmentId", {
              initialValue: formData.departmentId ? formData.departmentId : "",
              rules: [
                {
                  required: true,
                  message: "请选择所属部门！"
                }
              ]
            })(
              <Select placeholder="请选择部门">
                {selectOptions.map(cur => (
                  <Option value={cur.value} key={cur.value}>
                    {cur.label}
                  </Option>
                ))}
              </Select>
            )}
          </Item>
          {checkboxOptions.length > 0 ? (
            <Item label="赋予角色">
              {getFieldDecorator("roleId", {
                initialValue: formData.roleId
                  ? formData.roleId.slice(1, -1).split(", ")
                  : [],
                rules: [
                  {
                    required: true,
                    message: "请选择赋予角色！"
                  }
                ]
              })(<Checkbox.Group options={checkboxOptions} />)}
            </Item>
          ) : (
            <Item label="赋予角色">
              {getFieldDecorator("roleId", {
                initialValue: formData.roleId
                  ? formData.roleId.slice(1, -1).split(", ")
                  : [],
                rules: [
                  {
                    required: true,
                    message: "请选择赋予角色！"
                  }
                ]
              })(<Link to="/companyMgt/roleMgt">请先设置员工角色</Link>)}
            </Item>
          )}
          <Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
            >
              确认
            </Button>
          </Item>
        </Form>
      </div>
    );
  }
}

export default FormItems;

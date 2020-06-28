import React, { Component } from "react";
import { Modal, Input, Form } from "antd";
import style from "./index.less";

const { Item } = Form;
const formFields = ["en", "es", "ar"];

class TranslationModal extends Component {
  onOk = () => {
    const { onOk, form } = this.props;
    if (onOk) {
      if (form) {
        form.validateFields(formFields, (err, values) => {
          if (err) {
            return;
          }
          onOk(values);
        });
      }
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
      cn = "",
      langs = "",
      visible = false,
      title = "多语言编辑",
      onCancel = () => {},
      required = true
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
    return (
      <Modal
        visible={visible}
        title={title}
        onCancel={onCancel}
        onOk={this.onOk}
      >
        <Form {...formItemLayout}>
          <Item label="中文">
            <div className={style.formText}>{cn}</div>
          </Item>
          {langs.indexOf("en") > -1 ? (
            <Item label="英语">
              {getFieldDecorator("en", {
                rules: [
                  {
                    required,
                    message: "请正确输入英语",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Item>
          ) : null}
          {langs.indexOf("es") > -1 ? (
            <Item label="西班牙语">
              {getFieldDecorator("es", {
                rules: [
                  {
                    required,
                    message: "请正确输入西班牙语",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Item>
          ) : null}
          {langs.indexOf("ar") > -1 ? (
            <Item label="阿拉伯语">
              {getFieldDecorator("ar", {
                rules: [
                  {
                    required,
                    message: "请正确输入阿拉伯语",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Item>
          ) : null}
        </Form>
      </Modal>
    );
  }
}

export default Form.create({
  mapPropsToFields(props) {
    return props.data
      ? {
          en: Form.createFormField({
            value: props.data.en
          }),
          es: Form.createFormField({
            value: props.data.es
          }),
          ar: Form.createFormField({
            value: props.data.ar
          })
        }
      : {};
  }
})(TranslationModal);

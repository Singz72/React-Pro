import React, { Component } from "react";
import {
  Card,
  Table,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Button,
  AutoComplete,
  Icon
} from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import debounce from "lodash/debounce";
import { connect } from "dva";
import { handleDate, validatePhone, validateEmail } from "@/utils/utils";
import style from "./index.less";
import defaultUser from "@/assets/images/defaultUser.png";

const { Item } = Form;
const formFields = ["username", "agentBuyerName"];
const addFormFields = ["user", "nickname"];
const gender = ["默认", "男", "女"];

@connect(({ customerMgt, loading }) => ({
  customerMgt,
  loading: loading.models.customerMgt
}))
class Comp extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      addModalVisible: false,
      username: "",
      agentBuyerName: "",
      rows: {},
      selectMember: ""
    };
    this.onSearch = debounce(this.onSearch, 200);
  }

  componentDidMount() {
    this.getDetails(1);
  }

  getDetails = (
    pageNum = this.props.customerMgt.pageNum,
    pageSize = this.props.customerMgt.pageSize
  ) => {
    const { dispatch } = this.props;
    const { username, agentBuyerName } = this.state;
    dispatch({
      type: "customerMgt/fetch",
      payload: {
        data: {
          select: username,
          agentBuyerName,
          pageNum,
          pageSize
        }
      }
    });
  };

  onChange = pageNum => {
    const { dispatch } = this.props;
    dispatch({
      type: "customerMgt/save",
      payload: {
        pageNum
      }
    });
    this.getDetails(pageNum);
  };

  showSizeChange = (_, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: "customerMgt/save",
      payload: {
        pageNum: 1,
        pageSize
      }
    });
    this.getDetails(1, pageSize);
  };

  showModal = rows => {
    this.setState({
      visible: true,
      rows,
      selectMember: rows.agentBuyerId
    });
  };

  handleCancel = () => {
    this.setState({
      rows: {},
      visible: false,
      selectMember: ""
    });
    const { form } = this.props;
    form.resetFields(["member"]);
  };

  handleOk = () => {
    const { dispatch } = this.props;
    const { rows, selectMember } = this.state;
    const { getDetails, handleCancel } = this;
    dispatch({
      type: "customerMgt/act",
      payload: {
        data: {
          id: rows.id,
          agentBuyerName: selectMember
        },
        callback() {
          handleCancel();
          getDetails();
        }
      }
    });
  };

  showAddModal = () => {
    this.setState({
      addModalVisible: true
    });
  };

  handleAddModalCancel = () => {
    this.setState({
      addModalVisible: false
    });
    const { form } = this.props;
    form.resetFields(addFormFields);
  };

  handleAddModalOk = () => {
    const { form, dispatch } = this.props;
    if (form) {
      form.validateFields(addFormFields, (err, values) => {
        if (err) {
          return;
        }
        const { getDetails, handleAddModalCancel } = this;
        dispatch({
          type: "customerMgt/add",
          payload: {
            data: {
              username: values.user,
              nickname: values.nickname
            },
            callback() {
              handleAddModalCancel();
              getDetails();
            }
          }
        });
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    if (form) {
      form.validateFields(formFields, (err, values) => {
        this.setState(
          {
            agentBuyerName: values.agentBuyerName,
            username: values.username
          },
          () => this.getDetails(1)
        );
      });
    }
  };

  onSearch = name => {
    const { dispatch } = this.props;
    dispatch({
      type: "customerMgt/search",
      payload: {
        data: {
          name
        }
      }
    });
  };

  onSelect = (_, o) => {
    this.setState({
      selectMember: o.props.children
    });
  };

  handleReset = () => {
    const { form } = this.props;
    form.resetFields(formFields);
    this.setState(
      {
        username: "",
        agentBuyerName: ""
      },
      () => this.getDetails(1)
    );
  };

  render() {
    const {
      customerMgt: { list, total, pageNum, pageSize, dataSource },
      form: { getFieldDecorator }
    } = this.props;
    const { visible, rows, addModalVisible } = this.state;
    const columns = [
      {
        title: "用户名",
        dataIndex: "loginName",
        width: 120,
        fixed: "left"
      },
      {
        title: "uid",
        dataIndex: "id",
        width: 120,
        fixed: "left"
      },
      {
        title: "姓名",
        dataIndex: "name"
      },
      {
        title: "性别",
        dataIndex: "gender",
        width: 50,
        render: text => <span>{gender[+text]}</span>
      },
      {
        title: "用户头像",
        dataIndex: "headPic",
        render: text => (
          <img src={text || defaultUser} alt="头像" className={style.avatar} />
        )
      },
      {
        title: "昵称",
        dataIndex: "nickName",
        width: 100
      },
      {
        title: "手机号",
        dataIndex: "phone"
      },
      {
        title: "邮箱",
        dataIndex: "email"
      },
      // {
      //   title: '收货地址',
      //   dataIndex: 'address',
      //   render: text => {
      //     if (text) {
      //       return <span>{text}</span>;
      //     }
      //     return <span>无</span>;
      //   },
      // },
      {
        title: "注册时间",
        dataIndex: "createTime",
        width: 100,
        render: text => <span>{handleDate(text)}</span>
      },
      {
        title: "所属推荐会员",
        dataIndex: "agentBuyerName",
        render: text => {
          if (text) {
            return <span>{text}</span>;
          }
          return <span>无</span>;
        }
      },
      {
        title: "邀请码",
        dataIndex: "inviteCode"
      },
      {
        title: "操作",
        width: 50,
        fixed: "right",
        render: tags => <a onClick={() => this.showModal(tags)}>修改</a>
      }
    ];
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={style.btnTool}>
            <Form onSubmit={this.handleSubmit} layout="inline">
              <Row justify="start" type="flex">
                <Col>
                  <Item label="用户名/姓名">
                    {getFieldDecorator("username")(
                      <Input placeholder="请输入用户名或姓名" />
                    )}
                  </Item>
                </Col>
                <Col>
                  <Item label="所属推荐会员">
                    {getFieldDecorator("agentBuyerName", {
                      getValueFromEvent(v, o) {
                        return o.props.children;
                      }
                    })(
                      <AutoComplete
                        placeholder="请输入推荐会员检索"
                        dataSource={dataSource}
                        onSearch={this.onSearch}
                      >
                        <Input
                          suffix={<Icon type="search" className={style.icon} />}
                        />
                      </AutoComplete>
                    )}
                  </Item>
                </Col>
                <Col>
                  <Item>
                    <Row gutter={8}>
                      <Col span={12}>
                        <Button type="primary" htmlType="submit">
                          搜索
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button onClick={this.handleReset}>重置</Button>
                      </Col>
                    </Row>
                  </Item>
                </Col>
              </Row>
            </Form>
            <Button type="primary" onClick={() => this.showAddModal()}>
              添加客户
            </Button>
          </div>
          <Table
            dataSource={list}
            columns={columns}
            rowKey="id"
            size="middle"
            scroll={{ x: 1300 }}
            pagination={{
              total,
              onChange: this.onChange,
              current: pageNum,
              pageSize,
              showQuickJumper: true,
              showSizeChanger: true,
              onShowSizeChange: this.showSizeChange,
              showTotal: t => `共${t}条`
            }}
          ></Table>
        </Card>
        <Modal
          visible={visible}
          title="所属推荐会员修改"
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          width={400}
        >
          <Form {...formItemLayout}>
            <Item label="会员姓名:">
              {getFieldDecorator("member", {
                initialValue: rows.agentBuyerName || ""
              })(
                <AutoComplete
                  placeholder="请输入手机号或姓名检索"
                  dataSource={dataSource}
                  onSearch={this.onSearch}
                  onChange={this.onSelect}
                >
                  <Input
                    suffix={<Icon type="search" className={style.icon} />}
                  />
                </AutoComplete>
              )}
            </Item>
          </Form>
        </Modal>
        <Modal
          visible={addModalVisible}
          title="添加客户"
          onCancel={this.handleAddModalCancel}
          onOk={this.handleAddModalOk}
          // width={400}
        >
          <Form {...formItemLayout}>
            <Item label="用户名:">
              {getFieldDecorator("user", {
                rules: [
                  {
                    required: true,
                    // message: '请正确输入用户名',
                    validator(r, v, c) {
                      if (v && !validatePhone(v) && !validateEmail(v)) {
                        c("请正确输入用户名");
                      }
                      c();
                    }
                  }
                ]
              })(<Input placeholder="请输入手机号或邮箱" />)}
            </Item>
            <Item label="昵称:">
              {getFieldDecorator("nickname", {
                rules: [
                  {
                    required: true,
                    message: "请输入昵称",
                    whitespace: true
                  }
                ]
              })(<Input placeholder="请输入昵称" />)}
            </Item>
          </Form>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(Comp);

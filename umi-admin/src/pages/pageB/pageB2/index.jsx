import React, { Component } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Form,
  Modal,
  Select,
  AutoComplete,
  Icon
} from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import { handleDate } from "@/utils/utils";
import style from "./index.less";

const { Item } = Form;
const { Search } = Input;
const { Option } = Select;
const FormItem = ["level", "username"];

@connect(({ memberMgt, loading }) => ({
  memberMgt,
  loading: loading.models.memberMgt
}))
class Comp extends Component {
  constructor() {
    super();
    this.state = {
      select: "",
      modalTitle: "新增会员",
      visible: false,
      rows: {},
      username: ""
    };
  }

  componentDidMount() {
    this.getDetails(1);
    this.getLevels();
  }

  getDetails = (
    pageNum = this.props.memberMgt.pageNum,
    pageSize = this.props.memberMgt.pageSize
  ) => {
    const { dispatch } = this.props;
    const { select } = this.state;
    dispatch({
      type: "memberMgt/fetch",
      payload: {
        data: { select, pageNum, pageSize }
      }
    });
  };

  getLevels = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "memberMgt/fetchLevel",
      payload: {
        data: {}
      }
    });
  };

  search = val => {
    this.setState(
      {
        select: val
      },
      () => this.getDetails(1)
    );
  };

  showModal = () => {
    this.setState({
      visible: true,
      modalTitle: "新增会员"
    });
  };

  handleCancel = () => {
    const { form } = this.props;
    this.setState({
      visible: false,
      rows: {},
      username: ""
    });
    form.resetFields(FormItem);
  };

  act = () => {
    const { dispatch, form } = this.props;
    if (form) {
      form.validateFields(FormItem, (err, values) => {
        if (err) {
          return;
        }
        const { handleCancel, getDetails } = this;
        const { username } = this.state;
        dispatch({
          type: "memberMgt/act",
          payload: {
            data: {
              id: username,
              buyerLevelId: values.level
            },
            callback() {
              getDetails();
              handleCancel();
            }
          }
        });
      });
    }
  };

  edit = tags => {
    this.setState({
      visible: true,
      rows: tags,
      modalTitle: "编辑会员",
      username: tags.id
    });
  };

  del = id => {
    const { dispatch } = this.props;
    const { getDetails } = this;
    dispatch({
      type: "memberMgt/del",
      payload: {
        data: {
          id
        },
        callback() {
          getDetails();
        }
      }
    });
  };

  onChange = pageNum => {
    const { dispatch } = this.props;
    dispatch({
      type: "memberMgt/save",
      payload: {
        pageNum
      }
    });
    this.getDetails(pageNum);
  };

  showSizeChange = (_, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: "memberMgt/save",
      payload: {
        pageNum: 1,
        pageSize
      }
    });
    this.getDetails(1, pageSize);
  };

  onSearch = name => {
    const { dispatch } = this.props;
    dispatch({
      type: "memberMgt/search",
      payload: {
        data: {
          name
        }
      }
    });
  };

  onSelect = username => {
    this.setState({
      username
    });
  };

  render() {
    const {
      memberMgt: { list, total, pageNum, pageSize, level, dataSource },
      form: { getFieldDecorator }
    } = this.props;
    const { visible, rows, modalTitle } = this.state;
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
    const columns = [
      {
        title: "用户名",
        dataIndex: "loginName"
      },
      {
        title: "姓名",
        dataIndex: "name"
      },
      {
        title: "会员等级",
        dataIndex: "levelName"
      },
      {
        title: "会员邀请码",
        dataIndex: "inviteCode"
      },
      {
        title: "开通时间",
        dataIndex: "openTime",
        render: text => <span>{handleDate(text)}</span>
      },
      {
        title: "操作",
        render: tags => (
          <span>
            <a onClick={() => this.edit(tags)} style={{ marginRight: 6 }}>
              编辑
            </a>
            {/* <Popconfirm
              title="确认删除么？"
              onConfirm={() => this.del(tags.id)}
              onCancel={() => {}}
              okText="确认"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm> */}
          </span>
        )
      }
    ];
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={style.tool}>
            <div className={style.search}>
              <Search
                placeholder="请输入用户名或姓名搜索"
                enterButton="搜索"
                onSearch={this.search}
              />
            </div>
            <Button type="primary" onClick={() => this.showModal()}>
              新增会员
            </Button>
          </div>
          <Table
            dataSource={list}
            columns={columns}
            rowKey="id"
            size="middle"
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
          title={modalTitle}
          visible={visible}
          onCancel={this.handleCancel}
          onOk={this.act}
          width={400}
        >
          <Form {...formItemLayout}>
            <Item label="用户名">
              {getFieldDecorator("username", {
                initialValue: rows.phone ? rows.phone : "",
                rules: [
                  {
                    required: true,
                    message: "请输入姓名检索"
                  }
                ]
              })(
                <AutoComplete
                  placeholder="请输入姓名检索"
                  dataSource={dataSource}
                  onSearch={this.onSearch}
                  onSelect={this.onSelect}
                >
                  <Input
                    suffix={<Icon type="search" className={style.icon} />}
                  />
                </AutoComplete>
              )}
            </Item>
            <Item label="等级名称">
              {getFieldDecorator("level", {
                initialValue: rows.levelName ? rows.levelName : "",
                rules: [
                  {
                    required: true,
                    message: "请选择会员级别"
                  }
                ]
              })(
                <Select placeholder="请选择会员级别">
                  {level.length > 0
                    ? level.map(cur => (
                        <Option value={cur.id} key={cur.id}>
                          {cur.levelName}
                        </Option>
                      ))
                    : null}
                </Select>
              )}
            </Item>
          </Form>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(Comp);

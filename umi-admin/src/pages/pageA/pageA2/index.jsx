/* eslint-disable prefer-rest-params */
import React, { Component } from "react";
import { Button, Input, Table, Popconfirm, Modal, Form, Card, Tag } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import { handleDate } from "@/utils/utils";
import style from "./index.less";
import FormItems from "./components/formItems";

const { Search } = Input;
const STATUS = {
  1: "正常",
  0: "停用",
  6: "删除"
};

@connect(({ employee, loading }) => ({
  employee,
  loading: loading.models.employee
}))
class Comp extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      select: "",
      visible: false,
      forms: {},
      modalTitle: ""
    };
  }

  componentDidMount() {
    this.fetch(1);
    this.getDepartment();
    this.getRole();
  }

  fetch = (pageNum, pageSize = this.props.employee.pageSize) => {
    const { dispatch } = this.props;
    const { select } = this.state;
    dispatch({
      type: "employee/fetch",
      payload: { select, pageNum, pageSize }
    });
  };

  getDepartment = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "employee/getDepartment"
    });
  };

  getRole = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "employee/getRole",
      payload: {
        data: {
          companyId: ""
        }
      }
    });
  };

  search = val => {
    this.setState(
      {
        select: val
      },
      () => this.fetch(1)
    );
  };

  act = (id, status) => {
    const {
      dispatch,
      employee: { pageNum }
    } = this.props;
    const { fetch } = this;
    dispatch({
      type: "employee/act",
      payload: {
        data: {
          id,
          status
        },
        callback() {
          fetch(pageNum);
        }
      }
    });
  };

  onChange = pageNum => {
    const { dispatch } = this.props;
    dispatch({
      type: "employee/save",
      payload: {
        pageNum
      }
    });
    this.fetch(pageNum);
  };

  handleCancel = () => {
    const { form } = this.props;
    this.setState(
      {
        visible: false,
        forms: []
      },
      () => form.resetFields()
    );
  };

  showEditModal = tags => {
    this.setState({
      visible: true,
      modalTitle: "编辑员工信息"
    });
    this.handleSubmit = this.addOrEdit.bind(this, tags.id);
    const that = this;
    const { dispatch } = this.props;
    dispatch({
      type: "employee/getInfo",
      payload: {
        data: {
          id: tags.id
        },
        callback(res) {
          that.setState({
            forms: {
              ...tags,
              roleId: res.roleId
            }
          });
        }
      }
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
      modalTitle: "新增员工"
    });
    this.handleSubmit = this.addOrEdit.bind(this, "");
  };

  handleSubmit = () => {};

  addOrEdit = (id, values, cb = () => {}) => {
    const { dispatch } = this.props;
    const { handleCancel, fetch } = this;
    dispatch({
      type: "employee/add",
      payload: {
        data: {
          ...values,
          id,
          roleId: values.roleId.join(",")
        },
        callback(pageNum) {
          fetch(pageNum);
          handleCancel();
        },
        handleCancel() {
          cb();
        }
      }
    });
  };

  showSizeChange = (_, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: "employee/save",
      payload: {
        pageNum: 1,
        pageSize
      }
    });
    this.fetch(1, pageSize);
  };

  render() {
    const {
      list,
      selectOptions,
      checkboxOptions,
      total,
      pageSize,
      pageNum
    } = this.props.employee;
    const { visible, forms, modalTitle } = this.state;

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
        title: "手机号",
        dataIndex: "phone"
      },
      {
        title: "角色",
        dataIndex: "roleNameList",
        render: text => {
          if (text.length > 0) {
            return (
              <span>
                {text.map(cur => (
                  <span key={cur}>
                    <Tag>{cur}</Tag>
                    <br />
                  </span>
                ))}
              </span>
            );
          }
          return <span>无</span>;
        }
      },
      {
        title: "所属部门",
        dataIndex: "department"
      },
      {
        title: "状态",
        dataIndex: "status",
        render: text => <span>{STATUS[text]}</span>
      },
      {
        title: "开通时间",
        dataIndex: "createTime",
        render: text => <span>{handleDate(text)}</span>
      },
      {
        title: "操作",
        key: "do",
        render: tags => (
          <span>
            <Popconfirm
              title="确认停用么？"
              onConfirm={() => this.act(tags.id, Number(!+tags.status))}
              onCancel={() => {}}
              okText="确认"
              cancelText="取消"
            >
              {tags.status === "1" ? <a className={style.do}>停用</a> : null}
              {tags.status === "0" ? <a className={style.do}>启用</a> : null}
            </Popconfirm>
            <a onClick={() => this.showEditModal(tags)} className={style.do}>
              编辑
            </a>
            <Popconfirm
              title="确认删除么？"
              onConfirm={() => this.act(tags.id, 6)}
              onCancel={() => {}}
              okText="确认"
              cancelText="取消"
            >
              <a className={style.do}>删除</a>
            </Popconfirm>
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
                placeholder="请输入用户名或手机号搜索"
                enterButton="搜索"
                onSearch={this.search}
              />
            </div>
            <Button type="primary" onClick={() => this.showModal()}>
              新增员工
            </Button>
          </div>
          <div>
            <Table
              dataSource={list}
              columns={columns}
              rowKey="id"
              size="middle"
              total={total}
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
            />
          </div>
          <Modal
            title={modalTitle}
            visible={visible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <FormItems
              onSubmit={this.handleSubmit}
              formData={forms}
              form={this.props.form}
              selectOptions={selectOptions}
              checkboxOptions={checkboxOptions}
            />
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(Comp);

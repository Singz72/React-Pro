import React, { Component } from "react";
import { Table, Card } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import "./index.less";

const columns = [
  {
    title: "角色名称",
    dataIndex: "name"
  },
  {
    title: "功能说明",
    dataIndex: "description"
  }
];

@connect(
  ({ originRole }) => ({
    originRole
  }),
  dispatch => ({
    getDetails(payload) {
      dispatch({ type: "originRole/fetch", payload });
    }
  })
)
class Comp extends Component {
  componentDidMount() {
    const { getDetails } = this.props;
    getDetails({
      data: {
        companyId: 0
      }
    });
  }

  render() {
    const { list } = this.props.originRole;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Table
            columns={columns}
            dataSource={list}
            rowKey="id"
            pagination={false}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Comp;

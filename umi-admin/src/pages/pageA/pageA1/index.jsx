import React, { Component } from "react";
import { Table, Card } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import "./index.less";

const columns = [
  {
    title: "id",
    dataIndex: "id"
  },
  {
    title: "系列",
    dataIndex: "series"
  },
  {
    title: "时间",
    dataIndex: "date"
  }
];

@connect(
  ({ pagea1 }) => ({
    pagea1
  }),
  dispatch => ({
    getDetails(payload) {
      dispatch({ type: "pagea1/fetch", payload });
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
    const { list } = this.props.pagea1;
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

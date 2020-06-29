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
  ({ pageb1 }) => ({
    pageb1
  }),
  dispatch => ({
    getDetails(payload) {
      dispatch({ type: "pageb1/fetch", payload });
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
    const { list } = this.props.pageb1;
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

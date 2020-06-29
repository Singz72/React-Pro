import React, { Component } from "react";
import { Statistic, Row, Col, Card } from "antd";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import { handleDate } from "@/utils/utils";
import style from "./index.less";

@connect(({ welcome, loading }) => ({
  welcome,
  loading: loading.models.welcome
}))
class Comp extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "welcome/fetch"
    });
    dispatch({
      type: "welcome/getUser"
    });
  }

  render() {
    const { views, nick } = this.props.welcome;

    const PageHeaderContent = () => (
      <div className={style.pageHeaderContent}>
        <div className={style.content}>
          <div className={style.contentTitle}>
            欢迎管理员：
            {nick}
            ，祝你开心每一天！
          </div>
          <div>当前时间：{handleDate(new Date())}</div>
        </div>
      </div>
    );

    return (
      <PageHeaderWrapper content={<PageHeaderContent />}>
        <Card bordered={false} title="数据统计">
          <div className={style.numbox}>
            <div className={style.num}>
              <Row gutter={24}>
                <Col span={24}>
                  <Statistic title="访问量" value={views} />
                </Col>
              </Row>
            </div>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Comp;

import React, { Component } from "react";

import Tabs from 'antd/lib/tabs';

import PoolContainer from "../PoolContainer/index.jsx";
import ChatContainer from "../ChatContainer/index.jsx";

import "./index.less";

const { TabPane } = Tabs;

export default class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div className="my-dashboard">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Pool" key="1">
                  <PoolContainer />
                </TabPane>
                <TabPane tab="Chat" key="2">
                  <ChatContainer />
                </TabPane>
              </Tabs>
            </div>
        );
    }
}

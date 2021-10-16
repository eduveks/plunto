import React, { useEffect, useState } from "react";

import Tabs from 'antd/lib/tabs';
import Spin from 'antd/lib/spin';
import Alert from 'antd/lib/alert';

import _ws from '@netuno/ws-client';

import PoolContainer from "../PoolContainer/index.jsx";
import RoomsContainer from "../RoomsContainer/index.jsx";

import "./index.less";

const { TabPane } = Tabs;

export default ({})=> {
    const [connected, setConnected] = useState(false);
    const [closed, setClosed] = useState(false);

    useEffect(()=> {
        _ws.config({
            url: `${netuno.ws.endpoints.pool}/`,
            servicesPrefix: '/services',
            connect: (event) => {
                setConnected(true);
                setClosed(false);
            },
            close: (event) => {
                setConnected(false);
                setClosed(true);
            }
        });
        _ws.connect();
    }, []);

    if (!connected && !closed) {
        return (
            <div className="loading"><Spin/></div>
        );
    }
    if (closed) {
        return (
            <div className="offline">
              <Alert
                message="Offline"
                description="Unable to connect to the server, check your internet connection or try again later. If the situation persists, please contact support."
                type="error" />
            </div>
        );
    }
    return (
        <div className="my-dashboard">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Pool" key="1">
              <PoolContainer />
            </TabPane>
            { /*<TabPane tab="Chat" key="2">
              <RoomsContainer />
            </TabPane> */ }
          </Tabs>
        </div>
    );
};

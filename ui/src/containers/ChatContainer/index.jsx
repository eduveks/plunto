import React, { useEffect, useState } from "react";
import _ws from '@netuno/ws-client';

import Spin from 'antd/lib/spin';
import Alert from 'antd/lib/alert';
import Input from 'antd/lib/input';

import MessagesContainer from './MessagesContainer/index.jsx';
import SendContainer from './SendContainer/index.jsx';

import "./index.less";

export default ({})=> {
    const room = {
        uid: '7066757f-358c-4d72-a62f-348f7d2f8099'
    };
    const [connected, setConnected] = useState(false);
    const [closed, setClosed] = useState(false);
    useEffect(()=> {
        let protocol = 'ws:';
        if (window.location.protocol == 'https:') {
            protocol = 'wss:';
        }
        _ws.config({
            url: `${netuno.ws.endpoints.room}${room.uid}`,
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
        <div>
          <MessagesContainer room={room}/>
          <SendContainer room={room}/>
        </div>
    );
};

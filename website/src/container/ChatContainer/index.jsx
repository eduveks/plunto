import React, { useEffect, useState } from "react";
import _ws from '@netuno/ws-client';

import { Spin, Alert, Typography, Input } from 'antd';

import MessagesContainer from './MessagesContainer/index.jsx';
import SendContainer from './SendContainer/index.jsx';

import config from '../../config.json';

import "./index.less";

const { Title } = Typography;

export default ({room, participant, collapsed})=> {
    const [connected, setConnected] = useState(false);
    const [closed, setClosed] = useState(false);
    useEffect(()=> {
        _ws.config({
            url: `${config.websocket.endpoint}${room.uid}/${participant.uid}`,
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
        <div className={ `chat ${collapsed ? 'chat--collapsed' : ''}` }>
          <Title level={3}  style={{textAlign: 'center'}}>{room.name}</Title>
          <MessagesContainer room={room}/>
          <SendContainer room={room}/>
        </div>
    );
};

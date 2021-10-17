import React, { useEffect, useState } from "react";

import { Layout, Menu, Breadcrumb, Typography, Button, Spin } from 'antd';

import { MenuUnfoldOutlined, MenuFoldOutlined, GithubOutlined, WechatOutlined, UserOutlined } from '@ant-design/icons';

import _service from '@netuno/service-client';

import ChatContainer from './container/ChatContainer';
import ParticipantLoginContainer from './container/ParticipantLoginContainer';

import logo from './logo.svg';

import './App.less';

const { Header, Content, Footer, Sider } = Layout;

const { Title } = Typography;

const { SubMenu } = Menu;

export default ({})=> {
    const [ collapsed, setCollapsed ] = useState(false);
    const [ participant, setParticipant ] = useState(null);
    const [ rooms, setRooms ] = useState([]);
    const [ roomsLoading, setRoomsLoading ] = useState(false);
    const [ room, setRoom ] = useState(null);
    useEffect(() => {
        setRoomsLoading(true);
        _service({
            url: "rooms",
            success: (response) => {
                if (response.json) {
                    setRoomsLoading(false);
                    if (response.json.length > 0) {
                        setRooms(response.json);
                        setRoom(response.json[0]);
                    }
                }
            },
            fail: (e) => {
                setRoomsLoading(false);
                console.log("Rooms Service Error", e);
            }
        });
    }, []);
    const onLogged = (participant) => {
        setParticipant(participant);
    };
    return (
        <Layout className="layout">
          { !collapsed &&
            <Sider
              width={225}
              style={{
                  overflow: 'auto',
                  height: '100vh',
                  position: 'fixed',
                  left: 0,
                  padding: '0 10px',
              }}
            >
              <div className="logo"><img src={logo}/></div>
              <div className="participant">{participant && <><UserOutlined /> {participant.name}</>}</div>
              <Button type="primary" onClick={()=> setCollapsed(!collapsed) } style={{ marginBottom: 16, marginTop: 20 }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
              </Button>
              <div className="menu">
                <Title level={4}><WechatOutlined /> Rooms:</Title>
                {roomsLoading && <Spin/>}
                <Menu defaultSelectedKeys={room ? [room.uid] : null} inlineCollapsed={collapsed}>
                  {
                      rooms.map(
                          (room)=>
                              <Menu.Item key={room.uid} onClick={()=> setRoom(room)}>
                                {room.name}
                              </Menu.Item>
                      )
                  }
                </Menu>
              </div>
            </Sider>
          }
          <Layout className="site-layout" style={{ marginLeft: collapsed ? 0 : 225 }}>
            { collapsed &&
              <Header style={{padding: '0 10px'}}>
                <div className="logo"><img src={logo}/></div>
                <div className="participant">{participant && <><UserOutlined /> {participant.name}</>}</div>
                <Button type="primary" className="menu-toggle" onClick={()=> setCollapsed(!collapsed) } style={{ marginBottom: 16 }}>
                  {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
              </Header>
            }
            <Content style={{ overflow: 'initial' }}>
              {participant == null && <ParticipantLoginContainer onLogged={onLogged} />}
              {participant != null && room && <ChatContainer room={room} participant={participant} collapsed={collapsed} />}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              <Button type="link" href="https://github.com/eduveks/plunto"><GithubOutlined /> Source Code</Button>
            </Footer>
          </Layout>
        </Layout>
    );
}

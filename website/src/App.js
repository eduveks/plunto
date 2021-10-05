import React, { useEffect, useState } from "react";

import { Layout, Menu, Breadcrumb, Typography, Button, Spin } from 'antd';

import { MenuUnfoldOutlined, MenuFoldOutlined, GithubOutlined } from '@ant-design/icons';

import _service from '@netuno/service-client';

import ChatContainer from './container/ChatContainer';

import logo from './logo.svg';

import './App.less';

const { Header, Content, Footer, Sider } = Layout;

const { Title } = Typography;

const { SubMenu } = Menu;

export default ({})=> {
    const [ collapsed, setCollapsed ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ rooms, setRooms ] = useState([]);
    const [ room, setRoom ] = useState(null);
    useEffect(() => {
        _service({
            url: "rooms",
            success: (response) => {
                if (response.json) {
                    setRooms(response.json);
                    if (response.json.length > 0) {
                        setRoom(response.json[0]);
                    }
                }
            },
            fail: (e) => {
                console.log("Rooms Service Error", e);
            }
        });
    }, []);
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
              <Button type="primary" onClick={()=> setCollapsed(!collapsed) } style={{ marginBottom: 16, marginTop: 20 }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
              </Button>
              <div>
                Choose your room:
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
                <Button type="primary" className="menu-toggle" onClick={()=> setCollapsed(!collapsed) } style={{ marginBottom: 16 }}>
                  {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
              </Header>
            }
            <Content style={{ overflow: 'initial' }}>
              {loading && <Spin/>}
              {room && <ChatContainer room={room} />}
            </Content>
            <Footer style={{ textAlign: 'center' }}><a href="https://github.com/eduveks/plunto"><GithubOutlined /> Source Code</a></Footer>
          </Layout>
        </Layout>
    );
}

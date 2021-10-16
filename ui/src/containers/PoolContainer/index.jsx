import React, { useEffect, useState } from "react";

import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import moment from 'moment';

import _service from '@netuno/service-client';
import _ws from '@netuno/ws-client';

import { DeleteOutlined } from '@ant-design/icons';

import Message from './Message/index.jsx';

import "./index.less";

export default ()=> {
    const [ list, setList ] = useState([]);
    useEffect(()=> {
        const refListenerPoolList = _ws.addListener({
            service: `pool/list`,
            success: (data) => {
                const { content } = data;
                if (data.method.toUpperCase() == 'DELETE') {
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].message.uid == content.uid) {
                            list.splice(i, 1);
                        }
                    }
                } else {2
                    content.time = moment().format('HH:mm:ss');
                    list.unshift(content);
                }
                setList([...list]);
            },
            fail: (error)=> {
                console.error('WS :: message listener', error);
            }
        });
        return ()=> {
            _ws.removeListener(refListenerPoolList);
        };
    }, []);
    return (
        <div className="pool__list">
          { list.map((item)=> {
              return (
                  <Message {...item} key={item.message.uid} />
              );
          })}
        </div>
    );
}

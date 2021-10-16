import React, { useEffect, useState, useRef } from "react";
import moment from 'moment';
import _ws from '@netuno/ws-client';

import './index.less';

export default ({})=> {
    const [ messages, setMessages ] = useState([]);
    const refMessages = useRef();
    const scrollDown = () => {
        if (refMessages.current) {
            refMessages.current.scrollTop = refMessages.current.scrollHeight - refMessages.current.offsetHeight;
        }
    };
    useEffect(()=> {
        const refListenerMessage = _ws.addListener({
            service: "message",
            success: (data) => {
                const { content } = data;
                if (data.method.toUpperCase() == 'DELETE') {
                    for (let i = 0; i < messages.length; i++) {
                        if (messages[i].uid == content.uid) {
                            messages.splice(i, 1);
                        }
                    }
                } else {
                    content.time = moment().format('HH:mm:ss');
                    messages.push(content);
                }
                console.log({
                    scrollTop: refMessages.current.scrollTop,
                    scrollHeight: refMessages.current.scrollHeight,
                    offsetHeight: refMessages.current.offsetHeight
                });
                const autoScrollDown = refMessages.current.scrollTop >= (refMessages.current.scrollHeight - refMessages.current.offsetHeight - 50);
                setMessages([...messages]);
                if (autoScrollDown) {
                    scrollDown();
                }
            },
            fail: (error)=> {
                console.error('_ws.service.messages', error);
            }
        });
        scrollDown();
        return ()=> {
            _ws.removeListener(refListenerMessage);
        };
    }, []);
    return (
        <div ref={refMessages} className="chat__messages">
          {messages.map((message)=> {
              return (
                  <div key={message.uid}>
                    <div>{message.name}</div>
                    {message.content}
                    <div>{message.time}</div>
                  </div>
              );
          })}
        </div>
    );
};

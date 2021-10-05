import React, { useEffect, useState } from "react";
import _ws from '@netuno/ws-client';

export default ({})=> {
    const [ messages, setMessages ] = useState([]);
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
                    messages.push(content);
                }
                setMessages([...messages]);
            },
            fail: (error)=> {
                console.error('WS :: message listener', error);
            }
        });
        return ()=> {
            _ws.removeListener(refListenerMessage);
        };
    }, []);
    return (
        <div>
          {messages.map((message)=> {
              return (
                  <div key={message.uid}>
                    {message.content}
                  </div>
              );
          })}
        </div>
    );
};

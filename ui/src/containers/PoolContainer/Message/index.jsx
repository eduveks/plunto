import React, { useEffect, useState } from "react";

import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import _service from '@netuno/service-client';

import { DeleteOutlined } from '@ant-design/icons';

import "./index.less";

export default ({room, participant, message, time})=> {
    const [ deleting, setDeleting ] = useState(false);
    const onDelete = (uid) => {
        setDeleting(true);
        _service({
            method: 'DELETE',
            url: "pool/list",
            data: {uid: message.uid},
            success: (response) => {
                if (response.json) {
                    setDeleting(false);
                }
            },
            fail: (e) => {
                setDeleting(false);
                console.log("Pool List Delete Service Error", e);
            }
        });
    };
    return (
        <div>
          <Row>
            <Col xs={22}>
              <div><i>{time}</i> - <b>{participant.name}@{room.name}</b></div>
              {message.content}
            </Col>
            <Col xs={2}>
              <Button type="primary" shape="circle" icon={<DeleteOutlined />} onClick={ () => onDelete(message.uid) } />
            </Col>
          </Row>
        </div>
    );
}

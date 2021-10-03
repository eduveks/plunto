import React, { useEffect, useState } from "react";
import _ws from '@netuno/ws-client';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

const { TextArea } = Input;

export default ({room})=> {
    const onFinish = (values) => {
        const { message } = values;
        _ws.sendService({
            method: 'POST',
            service: 'send',
            data: {
                room,
                message: {
                    content: message
                }
            }
        });
    };
    return (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please input your message!' }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
    );
};

import React, { useEffect, useState } from "react";
import _ws from '@netuno/ws-client';

import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

export default ({room})=> {
    const [form] = Form.useForm();
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
        form.resetFields();
    };
    return (
        <Form
          form={form}
          name="basic"
          initialValues={{ }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please input your message!' }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
    );
};

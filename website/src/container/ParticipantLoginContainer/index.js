import React, { useEffect, useState } from "react";

import { Form, Input, Button } from 'antd';

import _service from '@netuno/service-client';

export default ({onLogged})=> {
    const onFinish = (values) => {
        const { name } = values;
        _service({
            url: "/participant/login",
            method: 'POST',
            data: { name },
            success: (response) => {
                if (response.json) {
                    if (onLogged) {
                        const { uid } = response.json;
                        onLogged({ uid, name });
                    }
                }
            },
            fail: (e) => {
                console.error("_service/participant/login.post", e);
            }
        });
    };
    return (
          <Form
            name="basic"
            initialValues={{ }}
            onFinish={onFinish}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Start
              </Button>
            </Form.Item>
          </Form>
    );
};

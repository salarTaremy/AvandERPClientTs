import React from "react";
import * as Ant from "antd";

const Contacts = () => {
  const [form] = Ant.Form.useForm();
  return (
    <>
      <Ant.Form form={form} layout="vertical">
        <Ant.Row gutter={[16, 16]}>
          <Ant.Col lg={12} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              name="حاخدث"
              label={"نام برند"}
              rules={[{ required: true }]}
            >
              <Ant.Input allowClear showCount maxLength={200} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col lg={6} md={12} sm={12} xs={24}>
            <h1>djkfgsjdfhdgfhjgdhfg</h1>
          </Ant.Col>
          <Ant.Col lg={6} md={12} sm={12} xs={24}></Ant.Col>
        </Ant.Row>
      </Ant.Form>
    </>
  );
};

export default Contacts;

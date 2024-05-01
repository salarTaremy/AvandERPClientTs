import React from "react";
import * as Ant from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

//====================================================================
//                        Component
//====================================================================
const Contacts = () => {
  return (
    <>
      <Ant.Form.List name="phoneNumberList">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Ant.Space key={key} style={{ display: "unset" }}>
                <Ant.Row gutter={[16, 8]}>
                  <Ant.Col lg={10} md={24} sm={24} xs={24}>
                    <Ant.Form.Item
                      {...restField}
                      rules={[
                        {
                          required: true,
                          message: "لطفا شماره تماس را درست وارد کنید",
                        },
                      ]}
                      name={[name, "phoneNumber"]}
                      label="شماره تماس"
                    >
                      <Ant.Input className="mx-2" />
                    </Ant.Form.Item>
                  </Ant.Col>

                  <Ant.Col lg={4} md={24} sm={24} xs={24}>
                    <Ant.Form.Item
                      label={"شماره تماس اصلی"}
                      {...restField}
                      name={[name, "isMainPhoneNumber"]}
                      rules={[{ required: false }]}
                      valuePropName="checked"
                    >
                      <Ant.Switch  className="mx-2" />
                    </Ant.Form.Item>
                  </Ant.Col>
                  <Ant.Col lg={8} md={24} sm={24} xs={24}>
                    <Ant.Button
                      className="text-red-600 mt-4"
                      type="text"
                      onClick={() => remove(name)}
                      icon={<DeleteOutlined />}
                    />
                  </Ant.Col>
                  <Ant.Col lg={4} md={24} sm={24} xs={24}></Ant.Col>
                </Ant.Row>
              </Ant.Space>
            ))}
            <Ant.Form.Item>
              <Ant.Button
                className="text-green-600 border-green-600"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                اضافه کردن
              </Ant.Button>
            </Ant.Form.Item>
          </>
        )}
      </Ant.Form.List>
    </>
  );
};
export default Contacts;

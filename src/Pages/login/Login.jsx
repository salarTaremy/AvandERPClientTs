import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { Col, Row, Card, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import logo from "@/assets/images/logos/Iranavandfar.png";
import { Layout } from "antd";
import { usePostWithHandler } from "@/api";
import { toast } from "react-toastify";
import * as url from "@/api/url";

const { Content } = Layout;
const style1 = {
  height: "100%",
  borderStartStartRadius: "40px",
  borderStartEndRadius: "0px",
  borderEndStartRadius: "0px",
  borderEndEndRadius: "0px",
  overflow: "hidden",
};

const style2 = {
  height: "100%",
  borderStartStartRadius: "0px",
  borderStartEndRadius: "0px",
  borderEndStartRadius: "0px",
  borderEndEndRadius: "40px",
  overflow: "hidden",
};
const userNameRole = [
  { required: true, message: "نام کاربری را وارد کنید" },
  { max: 15, message: "فکر نمیکنید طول نام کاربری شما زیاد باشد؟" },
  { min: 3, message: " طول نام کاربری کمتر از حد مجاز" },
];

const Login = () => {
  const dispatch = useDispatch();
  const [data, loading, error, ApiCall] = usePostWithHandler();
  useEffect(() => {
    if (data) {
      const autUser = data.data.user;
      const autToken = data.data.token;
      localStorage.setItem("autToken", autToken);
      toast.info(`خوش آمدید ${autUser.userName}`);
      dispatch({ type: "set", autUser: autUser });
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      error?.errors?.map((item) => {
        toast.error(item.message);
      });
    }
  }, [error]);
  const onFinish = async (values) => {
    await ApiCall(url.AUTH_LOGIN, values);
  };

  const onFinishFailed = (errorInfo) => {
    console.warn("Failed:", errorInfo);
  };
  return (

      <Content className="flex h-screen justify-center items-center">
        <Row>
          <Col>
            <Card style={style1}>
              <div>
                <img src={logo} alt="Logo" />
              </div>
              <br></br>
              {data && <p>{JSON.stringify(data.data.user.userName)}</p>}
              <Form
                // disabled={loading}
                name="normal_login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item name="userName" rules={userNameRole}>
                  <Input prefix={<UserOutlined />} placeholder="نام کاربری" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "کلمه عبور را وارد کنید" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="کلمه عبور"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>{"مرا به خاطر بسپار"}</Checkbox>
                  </Form.Item>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    {"ورود به حساب کاربری "}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col>
            <Card style={style2} className="bg-blue-800 text-slate-50 ">
              <Row>
                <div>
                  <h4>{"ورود به سیستم ERP"}</h4>
                  <br></br>
                  <p>
                    {
                      "کلمه عبور شامل حروف واعداد وحساس به حروف کوچک و بزرگ میباشد."
                    }
                  </p>
                  <p>{" قبل از ورود اطلاعات وضعیت CapsLock را چک کنید."}</p>
                  <p>{"نام کاربری فقط شامل حروف انگلیسی میباشد."}</p>
                </div>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>

  );
};

export default Login;

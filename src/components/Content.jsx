import React from "react";
import { Layout, theme, Card } from "antd";
const { Content } = Layout;
import Home from './../Pages/Home'
const ContentComponent = () => {

  return (
    <>
      <Content className="content">
        <Card>
          <Home/>
          <p>{"محتوای صفحه اصلی"}</p>
          <p>{"محتوای صفحه اصلی"}</p>
          <p>{"محتوای صفحه اصلی"}</p>
        </Card>
      </Content>
    </>
  );
};
export default ContentComponent;

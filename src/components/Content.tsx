import React from "react";
import { Layout, theme, Card } from "antd";
const { Content } = Layout;
const ContentComponent = () => {
  for (let i = 0; i < 3; i++) {
    <p>sdfds</p>;
  }

  return (
    <>
      <Content className="content">
        <Card>
          <p>{"محتوای صفحه اصلی"}</p>
          <p>{"محتوای صفحه اصلی"}</p>
          <p>{"محتوای صفحه اصلی"}</p>
        </Card>
      </Content>
    </>
  );
};
export default ContentComponent;

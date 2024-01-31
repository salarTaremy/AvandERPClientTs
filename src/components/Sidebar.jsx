import React, { useState } from "react";
import {
  AppstoreOutlined,
  SettingOutlined,
  BellOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import * as Ant from 'antd'
import logo from "./../assets/images/logos/Logo2.png";
import logoFlat from "./../assets/images/logos/LogoIcon128_Flat.png";
import logoShadow from "./../assets/images/logos/LogoIcon128_Shadow.png";
import PropTypes from "prop-types";
import { Layout, Menu, Image } from "antd";

const { Sider } = Layout;

const sliderStyle = {
  overflowX: "auto",
  height: "100vh",
  right: 0,
  top: 0,
  bottom: 0,
};

//====================================================================
//                        Component
//====================================================================
const AppSidebar = (props) => {
  const { showImageSider, collapsedSider, items } = props;
  // const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = Ant.theme.useToken();

  return (
    <>
      <Sider
        width={280}
        className="sidebar desktop-only"
        style={sliderStyle}
        collapsed={collapsedSider}
        items={items}
      >
        {!showImageSider && (
          <Image
            preview={false}
            style={{ margin: "20px 30px 20px 20px", textAlign: "center" }}
            width={200}
            src={logo}
          />
        )}
        <Image
          className={!showImageSider ? "hidden" : ""}
          preview={false}
          style={{ margin: "5px 10px ", textAlign: "center" }}
          width={60}
          src={logoFlat}
        />
        {/* <Image
          className={!showImageSider ? "visibility" : ""}
          preview={false}
          style={{ textAlign: "center" }}
          width={80}
          src={logoShadow}
          /> */}

          {/* <Ant.Input.Search style={{ width: 200 ,textAlign:"center" }}/> */}

        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
    </>
  );
};
export default AppSidebar;
AppSidebar.propTypes = {
  showImageSider: PropTypes.bool,
  collapsedSider: PropTypes.bool,
  items: PropTypes.array,
};

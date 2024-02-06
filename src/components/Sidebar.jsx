import React, { useEffect, useState } from "react";
import { AppstoreOutlined, FileOutlined } from "@ant-design/icons";
import * as Ant from "antd";
import logo from "./../assets/images/logos/Logo2.png";
import logoFlat from "./../assets/images/logos/LogoIcon128_Flat.png";
import logoShadow from "./../assets/images/logos/LogoIcon128_Shadow.png";
import PropTypes from "prop-types";
import { Layout, Menu, Image, Skeleton } from "antd";
import { useFetch, useFetchWithHandler } from "../api";
import * as api from "../api";
import * as url from "../api/url";
import useRequestManager from "../hooks/useRequestManager";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const sliderStyle = {
  overflowX: "auto",
  height: "100vh",
  right: 0,
  backgroundColor: "transparent",
  top: 0,
  bottom: 0,


};

//====================================================================
//                        Component
//====================================================================
const AppSidebar = (props) => {
  const [data, loading, error, apiCall] = useFetchWithHandler();
  const [items, setItems] = useState([]);
  const { showImageSider, collapsedSider } = props;
  useRequestManager({ error });
  //============================================================
  const processNavMenu = (menu) => {
    if (!menu) {
      return null;
    }
    return menu.map((item) => {
      if (item.componentName === "CNavTitle") {
        item.type = "group";
        delete item.iconName;
      } else {
        item.icon = <AppstoreOutlined />;
      }
      if (item.children) {
        delete item.type;
        delete item.to;
        item.children = processNavMenu(item.children);
      }
      item.label =
        (item.to && <Link to={item.to}>{item.title}</Link>) || item.title;
      return { ...item };
    });
  };
  const processSubMenu = (menu) => {
    if (!menu) {
      return null;
    }
    return menu.map((child) => {
      child.icon = <FileOutlined />;
      child.label =
        (child.to && <Link to={child.to}>{child.title}</Link>) || child.title;
      if (child.children) {
        delete child.type;
        delete child.to;
        child.children = processSubMenu(child.children);
      }
      return { ...child };
    });
  };
  //============================================================
  useEffect(() => {
    const NavMnu = data?.data[0]?.children;
    if (NavMnu) {
      const newVal = processNavMenu(NavMnu);
      setItems(newVal);
    }
  }, [data?.data]);

  useEffect(() => {
    apiCall(url.NAV_MENU_TREE);
  }, []);
  //============================================================
  return (
    <>
      <Sider
        width={280}
        className="sidebar desktop-only"
        style={sliderStyle}
        collapsed={collapsedSider}
        items={items}
      >
        <Ant.Affix className="sticky top-0 bg-slate-50  z-10">

          {!showImageSider && (
            <Image
              preview={false}
              style={{ margin: "20px 30px 20px 20px", textAlign: "center" }}
              width={200}
              src={logo}
            />
          )}

        </Ant.Affix>
        {showImageSider && (
          <Image
            preview={false}
            style={{ margin: "5px 10px ", textAlign: "center" }}
            width={60}
            src={logoFlat}
          />
        )}
        {loading || <Menu mode="inline" items={items} />}
        {loading && <Ant.Card loading style={{ height: "100%" }} />}
      </Sider>
    </>
  );
};

export default AppSidebar;
AppSidebar.propTypes = {
  showImageSider: PropTypes.bool,
  collapsedSider: PropTypes.bool,
};

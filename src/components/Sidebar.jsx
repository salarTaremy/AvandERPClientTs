import React, { useEffect, useState } from "react";
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
import * as AntIcons from "@ant-design/icons";
import { AppstoreOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const sliderStyle = {
  overflow: "auto", //For Auto Hide Scroll Set To => hidden
  height: "84vh",

  backgroundColor: "transparent",

};

const AppSidebar = (props) => {
  const [data, loading, error, apiCall] = useFetchWithHandler();
  const [items, setItems] = useState([]);
  const { showImageSider, collapsedSider } = props;
  useRequestManager({ error });
  //====================================================================
  //                        Consts
  //====================================================================
  const Salar = ({ Ic }) => {
    return (
      <AntIcons.WindowsOutlined />
      // <>{Ic}</>
    )
  }

  const processNavMenu = (menu) => {
    if (!menu) {
      return null;
    }
    return menu.map((item) => {
      if (item.componentName === "CNavTitle") {
        item.type = "group";
        if (collapsedSider) {
          return null
        } else {
          delete item.iconName;
        }

      } else {
        item.icon = <Salar Ic={'AppstoreOutlined'} />;
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
      child.icon = <AntIcons.FileOutlined />;
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
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    const NavMnu = data?.data[0]?.children;
    if (NavMnu) {
      const newVal = processNavMenu(NavMnu);
      setItems(newVal);
    }
  }, [data?.data, collapsedSider]);

  useEffect(() => {
    apiCall(url.NAV_MENU_TREE_FOR_USER);
  }, []);
  //====================================================================
  //                        Child Components
  //====================================================================
  const Searchbox = (
    <>
      <div className="flex justify-center ">
        <div className="w-11/12">
          <Ant.Flex align="center" justify="center">
            <Ant.Space align="center">
              <Ant.Input.Search />
              <Ant.Button type="text">
                <AntIcons.SettingOutlined />
              </Ant.Button>
            </Ant.Space>
          </Ant.Flex>
          <Ant.Divider className="mb-0"></Ant.Divider>
        </div>
      </div>
    </>
  );
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Sider
        width={280}
        className="sidebar hidden lg:block"
        collapsed={collapsedSider}
        items={items}
      >

        {!showImageSider && (
          <Image
            className="mr-11 my-2.5"
            preview={false}
            width={200}
            src={logo}
          />
        )}
        {showImageSider && (
          <Image
            preview={false}
            className="my-1 mx-2.5"
            width={60}
            src={logoFlat}
          />
        )}
        {!showImageSider && Searchbox}
        <div style={sliderStyle} className="flex justify-center  ">
          {loading || (
            <Menu
              mode="inline"
              items={items}
              style={{ backgroundColor: "transparent" }}
            />
          )}
          {loading && (
            <Ant.Skeleton loading={true} active className="w-11/12 h-full " />
          )}
        </div>


      </Sider>
    </>
  );
};

export default AppSidebar;
AppSidebar.propTypes = {
  showImageSider: PropTypes.bool,
  collapsedSider: PropTypes.bool,
};

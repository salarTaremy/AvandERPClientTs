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
import { SearchOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const sliderStyle = {
  overflow: "auto", //For Auto Hide Scroll Set To => hidden
  height: "84vh",

  backgroundColor: "transparent",
};

const AppSidebar = (props) => {
  const [data, loading, error, apiCall] = useFetchWithHandler();
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState();
  const { showImageSider, collapsedSider } = props;
  useRequestManager({ error });
  //====================================================================
  //                        Consts
  //====================================================================

  const transformDataToTree = (data) => {
    const map = new Map();
    // Create a map of nodes
    data.forEach((item) => {
      map.set(item.id, { ...item, children: [] });
    });

    const tree = [];
    // Populate children and build the tree
    data.forEach((item) => {
      if (item.parentId === 0) {
        tree.push(map.get(item.id));
      } else {
        const parent = map.get(item.parentId);
        if (parent) {
          parent.children.push(map.get(item.id));
        }
      }
    });
    return tree;
  };

  const boldText = (text, search) => {
    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <Ant.Typography.Text mark key={index}>
          {part}
        </Ant.Typography.Text>
      ) : (
        part
      ),
    );
  };

  const formatTree = (tree) => {
    return tree.map((node) => {
      let formattedNode = {
        // ...node,

        componentName: node.componentName,
        id: node.id,
        danger: false,
        disabled: false,
        name: node.name,
        // label:node.name,
        key: node.id.toString(),
        // roleHasAccess: false,
        //title:node.name,
        //title: <strong className="text-red-600">{node.name}</strong> ,
        title:
          (searchKeyword && boldText(node.name, searchKeyword)) || node.name,
        // menuOrder: node.nodeLevel + 1,
        icon: node.iconName || "WindowsOutlined",
      };

      if (node.componentName === "CNavGroup" && node.children.length) {
        formattedNode.children = formatTree(node.children);
      } else if (node.componentName === "CNavItem") {
        formattedNode.to = node.to || "";
      }
      // delete formattedNode.componentName
      return formattedNode;
    });
  };

  const filterTreeByTitle = (tree, keyword) => {
    if (!keyword) {
      return tree;
    }
    if (!tree || !Array.isArray(tree)) return [];

    return tree.reduce((filtered, node) => {
      // جستجو در عنوان
      const isMatch =
        node.name &&
        !node.children &&
        node.name.toLowerCase().includes(keyword.toLowerCase());

      // جستجو در فرزندان
      const children = node.children
        ? filterTreeByTitle(node.children, keyword)
        : [];

      // اضافه کردن نود به خروجی اگر عنوان مطابق باشد یا فرزندانی مطابق باشند
      if (isMatch || children.length > 0) {
        filtered.push({
          ...node,
          children: children.length > 0 && children, // فقط فرزندان فیلتر شده اضافه می‌شوند
        });
      }

      return filtered;
    }, []);
  };

  const processNavMenu = (menu) => {
    if (!menu) {
      return null;
    }
    return menu.map((item) => {
      if (item.componentName === "CNavTitle") {
        item.type = "group";
        if (collapsedSider) {
          return null;
        } else {
          delete item.icon;
        }
      } else {
        item.icon = <AntIcons.WindowsOutlined />;
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

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    //const NavMnu = data?.data[0]?.children;

    const result = data?.data && formatTree(transformDataToTree(data?.data));
    const NavMnu = filterTreeByTitle(result, searchKeyword);

    if (NavMnu) {
      const newVal = processNavMenu(NavMnu);
      setItems(newVal);
    }
  }, [data?.data, collapsedSider, searchKeyword]);

  useEffect(() => {
    apiCall(url.NAV_MENU);
    //apiCall(url.NAV_MENU_TREE_FOR_USER);
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
              <Ant.Badge color="" dot={searchKeyword}>
                <Ant.Input
                  placeholder="جستجو ..."
                  prefix={<SearchOutlined />}
                  allowClear
                  onChange={(val) => setSearchKeyword(val.target.value)}
                />
              </Ant.Badge>
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
              // defaultOpenKeys={['22','21','0']}
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

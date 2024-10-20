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
import getSidebarIcon from "./getSidebarIcon";
import * as Fa from "react-icons/fa";

const { Sider } = Layout;
const sliderStyle = {
  overflow: "auto", //For Auto Hide Scroll Set To => hidden
  height: "84vh",

  backgroundColor: "transparent",
};

const AppSidebar = (props) => {
  const [data, loading, error, apiCall] = useFetchWithHandler();
  const [items, setItems] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
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
    // return text
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

        componentname: node.componentName,
        id: node.id,
        // danger: false,
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
      setOpenKeys([]); // Reset openKeys when there is no keyword
      return tree;
    }

    if (!tree || !Array.isArray(tree)) return [];

    const filteredTree = tree.reduce((filtered, node) => {
      // جستجو در عنوان
      const isMatch =
        node.name &&
        node.name.toLowerCase().includes(keyword.toLowerCase());

      // جستجو در فرزندان
      const children = node.children
        ? filterTreeByTitle(node.children, keyword)
        : [];

      if (isMatch || children.length > 0) {
        // اگر نود با جستجو منطبق باشد یا فرزندان مطابق باشند، نود را اضافه کن
        filtered.push({
          ...node,
          children: isMatch ? node.children : children, // فقط فرزندان فیلتر شده اضافه می‌شوند
        });
      }

      if (children.length > 0) {
        // اگر فرزندان مطابق هستند، کلید parent را به openKeys اضافه کن
        setOpenKeys((prevKeys) => [...prevKeys, node.key]);
      }

      return filtered;
    }, []);

    return filteredTree;
  };

  const processNavMenu = (menu) => {
    if (!menu) {
      return null;
    }
    return menu.map((item) => {
      if (item.componentname === "CNavTitle") {
        item.type = "group";
        if (collapsedSider) {
          return null;
        } else {
          delete item.icon;
        }
      } else {
        item.icon = getSidebarIcon(item.icon)

      }
      if (item.children) {
        delete item.type;
        delete item.to;
        item.children = processNavMenu(item.children);
      }
      if (item.componentname === "CNavTitle") {
        item.label =
          // <Ant.Divider
          //   orientation="left"
          //   orientationMargin="0"
          //   plain={false}
          //   style={{ borderColor: 'purple', margin:0 }}
          //   >
          //   {item.title}
          // </Ant.Divider>
        (item.to && <Link to={item.to}>{item.title}</Link>) || item.title;

      } else {
        item.label =
          (item.to && <Link to={item.to}>{item.title}</Link>) || item.title;
      }


      return { ...item };
    });
  };

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
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
      {/* {'showImageSider:'}
    {JSON.stringify(showImageSider)}
    <br></br>
    {'collapsedSider:'}
    {JSON.stringify(collapsedSider)} */}
      <Sider
        width={280}
        className="sidebar hidden lg:block"
        collapsed={collapsedSider}
      // items={items}
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
              // defaultOpenKeys={defaultOpenKeys}
              openKeys={openKeys}
              onOpenChange={(openKeys) => setOpenKeys(openKeys)}
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

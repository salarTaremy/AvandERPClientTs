import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  BellOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import Footer from "./Footer";
import Header from "./Header";
import SidebarMobile from "./SidebarMobile";
import Sidebar from "./Sidebar";
import Content from "./Content";
import { Layout } from "antd";
import * as api from "../api";
import * as url from "../api/url";
import { useFetch, useFetchWithHandler } from "../api";
import useRequestManager from "../hooks/useRequestManager";

const initItems = [
  {
    label: "طرف Large Screen ها1",
    key: "grp1",
    type: "group",
  },
  { label: "مديريت طرف حساب ها1", key: "20", icon: <AppstoreOutlined /> },
  {
    label: "طرف حساب ها2",
    key: "grp2",
    type: "group",
  },
  { label: "مديريت طرف حساب ها2", key: "19", icon: <AppstoreOutlined /> },
  {
    label: "طرف حساب ها3",
    key: "grp3",
    type: "group",
  },
  { label: "مديريت طرف حساب ها3", key: "18", icon: <AppstoreOutlined /> },
  {
    label: "طرف حساب ها",
    key: "grp4",
    type: "group",
  },
  { label: "مديريت طرف حساب ها", key: "14", icon: <AppstoreOutlined /> },
  ,
  {
    label: "پروه",
    key: "grp1",
    type: "group",
  },
  {
    label: "اطلاعات پايه طرف حساب ها",
    key: "sub2",
    icon: <AppstoreOutlined />,
    children: [
      { label: "سرفصل حسابها", key: "2", icon: <BellOutlined /> },
      { label: "گروه هاي تفصيلي", key: "3", icon: <FileOutlined /> },
      {
        label: "حساب هاي تفصيلي",
        key: "4",
        icon: <PieChartOutlined />,
        children: [
          { label: "ساب 1", key: "21", icon: <BellOutlined /> },
          { label: "ساب 2", key: "31", icon: <FileOutlined /> },
        ],
      },
    ],
  },
];
//====================================================================
//                        Component
//====================================================================
const LayoutComponent = () => {
  const [data, loading, error, apiCall] = useFetchWithHandler();
  const [collapsed, setCollapsed] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initItems);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleButtonClick = () => {
    setShowImage(!showImage);
    setCollapsed(!collapsed);
  };
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
        item.children = processNavMenu(item.children);
      }
      item.label = item.title;
      return { ...item };
    });
  };
  const processSubMenu = (menu) => {
    if (!menu) {
      return null;
    }
    return menu.map((child) => {
      child.icon = <FileOutlined />;
      child.label = child.title;
      if (child.children) {
        delete child.type;
        child.children = processSubMenu(child.children);
      }
      return { ...child };
    });
  };
  // const processSubSubMenu = (menu) => {
  //   if (!menu) {
  //     return null;
  //   }
  //   return menu.map((sub) => {
  //     sub.icon = <AppstoreOutlined />;
  //     sub.label = sub.title;
  //     return { ...sub };
  //   });
  // };
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
  // useEffect(() => {
  //   apiCall(url.NAV_MENU_TREE);
  // }, []);
  // useEffect(() => {
  //   const NavMnu = data?.data[0]?.children;
  //   if (NavMnu) {
  //     const newVal = NavMnu.map((item) => {
  //       if (item.componentName == "CNavTitle") {
  //         item.type = "group";
  //         delete item.iconName;
  //       } else {
  //         item.icon = <BellOutlined />;
  //       }
  //       if (item.children) {
  //         delete item.type;
  //         item.children.map((child) => {
  //           child.icon = <FileOutlined />;
  //           child.label = child.title;
  //           if (child.children) {
  //             delete child.type;
  //             child.children.map((sub) => {
  //               sub.icon = <AppstoreOutlined />;
  //               sub.label = sub.title;

  //               return { ...sub };
  //             });
  //           }
  //           return { ...child };
  //         });
  //       }
  //       item.label = item.title;
  //       // delete item.id
  //       // delete item.name
  //       // delete item.componentName
  //       // delete item.iconName
  //       return { ...item };
  //     });
  //     setItems(newVal);
  //   }
  // }, [data?.data]);
  // useEffect(() => {
  //   collapsed &&
  //     setItems([...initItems.filter((item) => item.type != "group")]);
  //   !collapsed && setItems([...initItems]);
  // }, [collapsed]);
  //============================================================
  return (
    <>
      <div className="wrapper">
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sidebar
            items={items}
            collapsedSider={collapsed}
            showImageSider={showImage}
          />
          <Layout>
            <Header
              collapsed={collapsed}
              showDrawer={showDrawer}
              handleClickSidebar={handleButtonClick}
            />
            <pre>
              <>{JSON.stringify(items, null, 2)}</>
            </pre>
            <Content />

            <Footer />
          </Layout>
        </Layout>
        <SidebarMobile openSide={open} onCloseSide={onClose} />
      </div>
    </>
  );
};
export default LayoutComponent;

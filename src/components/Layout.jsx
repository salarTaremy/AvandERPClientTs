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

//====================================================================
//                        Component
//====================================================================
const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [open, setOpen] = useState(false);

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
            collapsedSider={collapsed}
            showImageSider={showImage}
          />
          <Layout>
            <Header
              collapsed={collapsed}
              showDrawer={showDrawer}
              handleClickSidebar={handleButtonClick}
            />
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

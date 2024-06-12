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

  //============================================================
  return (
    <>
      <div className="wrapper container mx-auto">
        <Layout  hasSider>
          <Sidebar collapsedSider={collapsed} showImageSider={showImage} />
          <SidebarMobile
            openSide={open}
            onCloseSide={onClose}
            closeItemMenu={onClose}
          />
          <Layout >
            <Header
              collapsed={collapsed}
              showDrawer={showDrawer}
              handleClickSidebar={handleButtonClick}
            />
            <Content />
            <Footer />

          </Layout>
        </Layout>


      </div>

    </>
  );
};
export default LayoutComponent;

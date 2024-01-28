import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  BellOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import * as Ant from "antd";
import Footer from "./Footer";
import Header from "./Header";
import SidebarMobile from "./SidebarMobile";
import Sidebar from "./Sidebar";
import Content from "./Content";
import { Layout } from "antd";

const initItems = [
  {
    label: "طرف حساب ها1",
    key: "grp1",
    type: "group",
  },
  { label: "مديريت طرف حساب ها1", key: "20", icon: <AppstoreOutlined /> },
  {
    label: "طرف حساب ها2",
    key: "grp1",
    type: "group",
  },
  { label: "مديريت طرف حساب ها2", key: "19", icon: <AppstoreOutlined /> },
  {
    label: "طرف حساب ها3",
    key: "grp1",
    type: "group",
  },
  { label: "مديريت طرف حساب ها3", key: "18", icon: <AppstoreOutlined /> },
  {
    label: "طرف حساب ها",
    key: "grp1",
    type: "group",
  },
  { label: "مديريت طرف حساب ها", key: "17", icon: <AppstoreOutlined /> },
  {
    label: "طرف حساب ها",
    key: "grp1",
    type: "group",
  },
  { label: "مديريت طرف حساب ها", key: "16", icon: <AppstoreOutlined /> },
  {
    label: "طرف حساب ها",
    key: "grp1",
    type: "group",
  },
  { label: "مديريت طرف حساب ها", key: "15", icon: <AppstoreOutlined /> },
  {
    label: "طرف حساب ها",
    key: "grp1",
    type: "group",
  },
  { label: "مديريت طرف حساب ها", key: "14", icon: <AppstoreOutlined /> },
  ,
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
  const [collapsed, setCollapsed] = useState(false);
  const [showImage, setShowImage] = useState(false);
  // const [filteredItems, setFilteredItems] = useState([])
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

  useEffect(() => {
    collapsed &&
      setItems([...initItems.filter((item) => item.type != "group")]);
    !collapsed && setItems([...initItems]);
  }, [collapsed]);

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

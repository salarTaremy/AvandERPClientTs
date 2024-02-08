import React, { useState } from "react";
import * as Ant from "antd";
import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { CiLight } from "react-icons/ci";
import {
  MdOutlineNightlight,
  MdOutlineLightMode,
  MdLaptop,
} from "react-icons/md";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  DashboardOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import pic from "../assets/images/avatars/1.png";
import { Link } from "react-router-dom";
const { Header } = Layout;
//====================================================================
//                        Declaration
//====================================================================

const options = [
  {
    value: "dark",
    icon: <MdOutlineNightlight />,
  },
  {
    value: "light",
    icon: <MdOutlineLightMode />,
  },
  {
    value: "compact",
    icon: <MdLaptop />,
  },
];
const HeaderComponent = (props) => {
  const { showDrawer, handleClickSidebar, collapsed } = props;
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const autUser = useSelector((state) => state.autUser);

  const handleMenuClick = ({ key }) => {
    if (key === "exit") {
      dispatch({ type: "set", autUser: null });
      dispatch({ type: "set", autToken: null });
    }
  };
  //====================================================================
  //                        Functions
  //====================================================================
  const items = [
    {
      key: "profile",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          {"حساب کاربری"}
        </a>
      ),
    },
    {
      key: "setting",
      label: "تنظیمات",
    },
    {
      key: "devider",
      label: <Ant.Divider />,
    },
    {
      key: "exit",
      danger: true,
      label: "خروج از سیستم",
      // label: <Ant.Button type="text" danger block >{"خروج از سیستم"}</Ant.Button>,
      disabled: false,
    },
  ];
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Header className="header">
        <Ant.Flex gap="middle" align="start" vertical>
          <Ant.Flex
            style={{
              width: "100%",
            }}
            justify="space-between"
          >
            <Ant.Col>
              <Ant.Space>
                <Ant.Button
                  className="hidden xxl:block lg:block"
                  type="text"
                  icon={
                    collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />
                  }
                  onClick={handleClickSidebar}
                />
                <Ant.Button
                  className=" lg:hidden xxl:hidden"
                  type="text"
                  onClick={showDrawer}
                >
                  <MenuUnfoldOutlined />
                </Ant.Button>
                <Link to={"/"}>
                  <Ant.Button type="link" icon={<HomeOutlined />} />
                </Link>
                <Link to={"permissions/menuPermissions"}>
                  <Ant.Button type="link" icon={<SettingOutlined />} />
                </Link>
                <Link to={"dashboard"}>
                  <Ant.Button type="link" icon={<DashboardOutlined />} />
                </Link>
                <Ant.Segmented
                  defaultValue={theme}
                  options={options}
                  onChange={(val) => dispatch({ type: "set", theme: val })}
                />
                {/* <Ant.Input.Search style={{ width: 200, textAlign: "center" }} /> */}
              </Ant.Space>
            </Ant.Col>
            <Ant.Col>
              <Ant.Dropdown
                menu={{
                  items,
                  onClick: handleMenuClick,
                }}
              >
                <Ant.Space>
                  <a>{`کاربر:${autUser.userName}`}</a>
                  <UserOutlined />
                </Ant.Space>
              </Ant.Dropdown>
            </Ant.Col>
          </Ant.Flex>
        </Ant.Flex>
      </Header>
    </>
  );
};
export default HeaderComponent;
HeaderComponent.propTypes = {
  showDrawer: PropTypes.func,
  collapsed:PropTypes.any,
  handleClickSidebar: PropTypes.func,
};

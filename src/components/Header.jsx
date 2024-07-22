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
  PrinterOutlined
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
  const menuList = [
    {
      label: <a href="/"></a>,
      key: "1",
      icon: <HomeOutlined  className="relative right-1" />,
    },
    {
      label: <a href="permissions/menuPermissions"></a>,
      key: "2",
      icon: <SettingOutlined className="relative right-1" />,
    },
    {
      label: <a href="dashboard"></a>,
      key: "3",
      icon: <DashboardOutlined className="relative right-1" />,
    },
  ];
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
      <Header className="p-0">
        <Ant.Row>
          <Ant.Col span={12}>
            <Ant.Space className="item-end">
              <Ant.Button
                className="hidden xxl:block lg:block"
                type="text"
                icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                onClick={handleClickSidebar}
              />
              <Ant.Button
                className="lg:hidden xxl:hidden"
                type="text"
                onClick={showDrawer}
              >
                <MenuUnfoldOutlined />
              </Ant.Button>

              <Link className="hidden xxl:block lg:block" to={"/"}>
                <Ant.Button type="link" icon={<HomeOutlined />} />
              </Link>
              <Link
                className="hidden xxl:block lg:block"
                to={"permissions/menuPermissions"}
              >
                <Ant.Button type="link" icon={<SettingOutlined />} />
              </Link>
              <Link className="hidden xxl:block lg:block" to={"dashboard"}>
                <Ant.Button type="link" icon={<DashboardOutlined />} />
              </Link>
              <Link className="hidden xxl:block lg:block" to={"reports/desighner"} target="_blank">
                <Ant.Button type="link" icon={<PrinterOutlined />} />
              </Link>

              <Ant.Dropdown
               placement="bottom"
                className="lg:hidden xxl:hidden"
                menu={{
                  items: menuList,
                  onClick: () => {},
                }}
              >
                <Ant.Button
                  size="small"
                  icon={<SettingOutlined />}
                ></Ant.Button>
              </Ant.Dropdown>
              <Ant.Segmented
                defaultValue={theme}
                options={options}
                onChange={(val) => dispatch({ type: "set", theme: val })}
              />
            </Ant.Space>
          </Ant.Col>
          <Ant.Col span={12} className="text-end pl-4">
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
        </Ant.Row>
      </Header>
    </>
  );
};
export default HeaderComponent;
HeaderComponent.propTypes = {
  showDrawer: PropTypes.func,
  collapsed: PropTypes.any,
  handleClickSidebar: PropTypes.func,
};

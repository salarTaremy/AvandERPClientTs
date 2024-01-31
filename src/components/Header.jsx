import React, { useState } from "react";
import * as Ant from "antd";
import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BgColorsOutlined,
  HighlightFilled,
  BehanceOutlined,
  SettingOutlined,
  DashboardOutlined,
  HomeOutlined,
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
    icon: <BgColorsOutlined />,
  },
  {
    value: "light",
    icon: <HighlightFilled />,
  },
  {
    value: "compact",
    icon: <BehanceOutlined />,
  },
];
const HeaderComponent = (props) => {
  const { showDrawer, handleClickSidebar, collapsed } = props;
  // const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = Ant.theme.useToken();

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const autUser = useSelector((state) => state.autUser);

  //====================================================================
  //                        Functions
  //====================================================================
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          {'پروفایل'}
        </a>
      ),
    },
    {
      key: "4",
      danger: true,
      label: "خروج از سیستم",
      disabled: false,
    },
  ];
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Header
        className="header"
        style={{
          padding: 10,
          background: colorBgContainer,
        }}
      >
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
                  className="desktop-only"
                  type="text"
                  icon={
                    collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />
                    // collapsed ? <>d</> : <>ds</>
                  }
                  onClick={handleClickSidebar}
                />
                <Ant.Button
                  className="mobile-only"
                  type="text"
                  onClick={showDrawer}
                >
                  <MenuUnfoldOutlined />
                </Ant.Button>

                <Link to={"/"}>
                  <Ant.Button type="link" icon={<HomeOutlined />} />
                </Link>
                <Ant.Button
                  icon={<SettingOutlined />}
                  type="link"
                  onClick={() => {
                    alert("Ok setting");
                  }}
                />
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
                }}
              >
                <Ant.Space>
                  <a>{"Hover me"}</a>
                  <DashboardOutlined />
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
  handleClickSidebar: PropTypes.func,
};

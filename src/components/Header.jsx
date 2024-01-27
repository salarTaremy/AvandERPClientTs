import React, { useState,useContext } from "react";
import * as Ant from "antd";
import { Layout } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BgColorsOutlined,
  HighlightFilled,
  BehanceOutlined,
  SettingOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import pic from "../assets/images/avatars/1.png";

const { Header } = Layout;

//====================================================================
//                        Declaration
//====================================================================
const itemList = [
  {
    key: "SubMenu",
    icon: <Ant.Avatar src={pic} />,
    children: [
      {
        type: "group",
        // label: 'Item 1',
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
    ],
  },
];

const options = [
  {
    value: "Lisdarkt",
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
  const { showDrawer, handleClickSidebar } = props;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = Ant.theme.useToken();

  //====================================================================
  //                        Functions
  //====================================================================

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
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
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
                <Ant.Button type="text">کاربر:{'Admin'}</Ant.Button>
                <Ant.Button
                  icon={<SettingOutlined />}
                  onClick={() => {
                  
                    alert('theme');
                  }}
                />
                <Ant.Button icon={<DashboardOutlined />} />

                <Ant.Segmented options={options} />
              </Ant.Space>
            </Ant.Col>

            <Ant.Col>
              <Ant.Menu
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={itemList}
              />
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

import React, { useState, useContext } from "react";
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
  const { showDrawer, handleClickSidebar } = props;
  const [collapsed, setCollapsed] = useState(false);
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
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),

      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
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
                <Ant.Button type="text">کاربر:{autUser}</Ant.Button>
                <p>{theme}</p>
                <Ant.Button
                  icon={<SettingOutlined />}
                  type="link"
                  onClick={() => {
                    alert("theme");
                  }}
                />
                <Ant.Button type="link" icon={<DashboardOutlined />} />
                <Ant.Segmented
                  options={options}
                  onChange={(val) => dispatch({ type: "set", theme: val })}
                />
              </Ant.Space>
            </Ant.Col>
            <Ant.Col>
              <Ant.Dropdown
                menu={{
                  items,
                }}
              >
              
                  <Ant.Space>
                    Hover me
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

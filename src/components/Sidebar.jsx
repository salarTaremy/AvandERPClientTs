import React, { useState } from 'react'
import {
  AppstoreOutlined,
  SettingOutlined,
  BellOutlined,
  FileOutlined,
  PieChartOutlined,
} from '@ant-design/icons'
import logo from './../assets/images/logos/Logo2.png'
import PropTypes from 'prop-types'
import { Layout, Menu, Image } from 'antd'
import * as Ant from 'antd'

const { Sider } = Layout

//====================================================================
//                        Component
//====================================================================
const AppSidebar = (props) => {
  const { showImageSider,collapsedSider,items} = props
  // const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = Ant.theme.useToken();

  const sliderStyle = {
    overflowX: 'auto',
    height: '100vh',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor:colorBgContainer
    
  }

  return (
    <>
      <Sider
          width={280}
        className="sidebar desktop-only"
        style={sliderStyle}
        collapsed={collapsedSider}
        items={items}
      >
        {!showImageSider && (
          <Image
            preview={false}
            style={{ margin: '20px 50px 20px 20px', textAlign: 'center' }}
            width={200}
            src={logo}
          />
        )}
        <div className="demo-logo-vertical" />
        <Menu theme="dark"  mode="inline" items={items} />
      </Sider>
    </>
  )
}
export default AppSidebar
AppSidebar.propTypes = {
  showImageSider: PropTypes.bool,
  collapsedSider: PropTypes.bool,
  items: PropTypes.object,
}

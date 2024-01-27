import React, { useState } from 'react'
import {
  AppstoreOutlined,
  SettingOutlined,
  BellOutlined,
  FileOutlined,
  PieChartOutlined,
} from '@ant-design/icons'
import Footer from './Footer'
import Header from './Header'
import SidebarMobile from './SidebarMobile'
import Sidebar from './Sidebar'
import Content from './Content'
import { Layout } from 'antd'

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}

const items = [
  {
    label: 'طرف حساب ها',
    key: 'grp1',
    children: [{ label: 'مديريت طرف حساب ها', key: '20', icon: <AppstoreOutlined /> }],
    type: 'group',
  },
  {
    label: 'طرف حساب ها',
    key: 'grp1',

    children: [{ label: 'مديريت طرف حساب ها', key: '19', icon: <AppstoreOutlined /> }],
    type: 'group',
  },
  {
    label: 'طرف حساب ها',
    key: 'grp1',

    children: [{ label: 'مديريت طرف حساب ها', key: '18', icon: <AppstoreOutlined /> }],
    type: 'group',
  },
  {
    label: 'طرف حساب ها',
    key: 'grp1',

    children: [{ label: 'مديريت طرف حساب ها', key: '17', icon: <AppstoreOutlined /> }],
    type: 'group',
  },
  {
    label: 'طرف حساب ها',
    key: 'grp1',

    children: [{ label: 'مديريت طرف حساب ها', key: '16', icon: <AppstoreOutlined /> }],
    type: 'group',
  },
  {
    label: 'طرف حساب ها',
    key: 'grp1',

    children: [{ label: 'مديريت طرف حساب ها', key: '15', icon: <AppstoreOutlined /> }],
    type: 'group',
  },
  {
    label: 'طرف حساب ها',
    key: 'grp1',

    children: [{ label: 'مديريت طرف حساب ها', key: '14', icon: <AppstoreOutlined /> }],
    type: 'group',
  },

  getItem('اطلاعات پايه طرف حساب ها', 'sub2', <AppstoreOutlined />, [
    getItem('سرفصل حسابها', '2', <BellOutlined />),
    getItem('گروه هاي تفصيلي', '3', <FileOutlined />),
    getItem('حساب هاي تفصيلي', '4', <PieChartOutlined />),
  ]),
  getItem(
    'مالي و حسابداري',
    'grp',
    null,
    [
      getItem('اطلاعات پايه حسابداري', 'sub4', <SettingOutlined />, [
        getItem('سرفصل حسابها', '9'),
        getItem('گروه هاي تفصيلي', '10'),
        getItem('حساب هاي تفصيلي', '11'),
        getItem('انواع سند حسابداري', '12'),
      ]),
    ],

    'group',
  ),
  getItem('اسناد حسابداري', 'sub3', <AppstoreOutlined />, [
    getItem('مديريت اسناد', '8'),
    getItem('ثبت سند جديد', '13'),
  ]),
]
//====================================================================
//                        Component
//====================================================================
const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [filteredItems, setFilteredItems] = useState([{}])
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const handleButtonClick = () => {
    setShowImage(!showImage)
    setCollapsed(!collapsed)
    setFilteredItems(
      items
        .filter((item) => item.type === 'group')
        .map((item) => {
          return { ...item, label: '' }
        }),
    )
    console.log(filteredItems, 'filteredItems')
  }

  return (
    <>
      <div className="wrapper">
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <Sidebar items={items} collapsedSider={collapsed} showImageSider={showImage} />
          <Layout>
            <Header showDrawer={showDrawer} handleClickSidebar={handleButtonClick} />
            <Content />
            <Footer />
          </Layout>
        </Layout>
        <SidebarMobile openSide={open} onCloseSide={onClose} />
      </div>
    </>
  )
}
export default LayoutComponent

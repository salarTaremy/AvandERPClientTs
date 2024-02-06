import React from 'react'
import * as Ant from 'antd'
import logo from './../assets/images/logos/Logo2.png'
import {
  AppstoreOutlined,
  SettingOutlined,
  BellOutlined,
  FileOutlined,
  PieChartOutlined,
} from '@ant-design/icons'
import PropTypes from 'prop-types'


const items = [
  {

    label: 'طرف حساب ها',
    key: 'grp11',

    label: 'طرف mobile ها',
    key: 'grp1',

    children: [{ label: 'مديريت طرف حساب ها', key: '20', icon: <AppstoreOutlined /> }],
    type: 'group',
  },
  {
    label: 'طرف حساب ها',
    key: 'grp2',

    children: [{ label: 'مديريت طرف حساب ها', key: '19', icon: <AppstoreOutlined /> }],
    type: 'group',
  },
  {
    label: 'طرف حساب ها',
    key: 'grp3',

    children: [{ label: 'مديريت طرف حساب ها', key: '18', icon: <AppstoreOutlined /> }],
    type: 'group',
  },
  {
    label: 'طرف حساب ها',
    key: 'grp4',

    children: [{ label: 'مديريت طرف حساب ها', key: '17', icon: <AppstoreOutlined /> }],
    type: 'group',
  },
  {
    label: 'طرف حساب ها',
    key: 'grp5',

    children: [{ label: 'مديريت طرف حساب ها', key: '16', icon: <AppstoreOutlined /> }],
    type: 'group',
  },
  {
    label: 'طرف حساب ها',
    key: 'grp6',

    children: [{ label: 'مديريت طرف حساب ها', key: '15', icon: <AppstoreOutlined /> }],
    type: 'group',
  },
  {
    label: 'طرف حساب ها',
    key: 'grp7',

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
  //                        Functions
  //====================================================================
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}
  //====================================================================
  //====================================================================
const SidebarMobile = (props) => {
  const { onCloseSide, openSide } = props

  return (
    <>
      <Ant.Drawer
        className="mobile-only"

        title={<Ant.Image preview={false} style={{ textAlign: 'center' }} width={200} src={logo} />}
        placement="right"
        onClose={onCloseSide}
        open={openSide}
      >
        <Ant.Menu mode="inline"  items={items} />
      </Ant.Drawer>
    </>
  )
}
export default SidebarMobile
SidebarMobile.propTypes = {
  onCloseSide: PropTypes.func,
  openSide: PropTypes.bool,
}

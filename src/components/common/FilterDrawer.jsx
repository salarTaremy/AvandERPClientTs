import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PropTypes } from 'prop-types'
import * as Ant from 'antd'
import { AppstoreOutlined, BarsOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import * as IconBs from "react-icons/bs";
import { MdFilterAltOff } from 'react-icons/md'
const FilterDrawer = (props) => {
  const dispatch = useDispatch()
  const filterDrawerPlacement = useSelector((store) => store.filterDrawerPlacement) // right , left
  const { open, onClose, onRemoveFilter } = props
  const title = <>{''}</>
  const options = [
    {
      value: 'right',
      icon: <IconBs.BsLayoutSidebarInsetReverse    />,
    },
    {
      value: 'left',
      icon: <IconBs.BsLayoutSidebarInset    />,
    },
  ]

  const changePlacement = (val) => {
    setTimeout(() => {
      dispatch({ type: 'set', filterDrawerPlacement: val })
    }, 300)
  }
  const ExtraBtn = () => {
    return (
      <Ant.Space>
        <Ant.Segmented
          options={options}
          block
          defaultValue={filterDrawerPlacement}
          onChange={changePlacement}
          size='large'
        />
        <Ant.Popconfirm
          title="فیلتر"
          description="برای لغو کلیه فیلتر ها مطمئن هستید؟"
          onConfirm={onRemoveFilter}
        >
          <Ant.Button size="large" icon={<MdFilterAltOff />} className="text-red-600 border-red-600" />
        </Ant.Popconfirm>
      </Ant.Space>
    )
  }

  return (
    <>
      <Ant.Drawer
     width={350}
        extra={<ExtraBtn />}
        title={title}
        placement={filterDrawerPlacement}
        open={open}
        onClose={onClose}
        getContainer={false}
      >
        {props.children}
      </Ant.Drawer>
    </>
  )
}
FilterDrawer.propTypes = {
  children: PropTypes.any,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
}
export default FilterDrawer

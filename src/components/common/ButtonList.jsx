import React from 'react'
import PropTypes from 'prop-types'
import * as style from '@/styles'
import { Button, Space, Tooltip, Dropdown, Menu, Popconfirm, Badge } from 'antd'
import { FaFilter ,FaFolderPlus} from "react-icons/fa6";
import { FiEdit ,FiRefreshCw,FiFilter  } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
//Example For Items:
//const items = [{ icon: <MailOutlined />, className: 'text-danger', onClick: () => {}, children: 'Click Me !' }]

const ButtonBar = (props) => {
  const { items } = props
  const { onAdd, onEdit, onDelete, onFilter ,onRefresh} = props
  const { onDeleteConfirmMessage, filterCount } = props
  const iconOnly = true
  const size = iconOnly ? 'large' : ''
  //backgroundColor: color.green.primary
  //====================================================================
  //                        Child Components
  //====================================================================
  const BtnAdd = () => {
    return (
      onAdd && (
        <Tooltip title={iconOnly && 'ایجاد ایتم جدید'} size={size}>
          <Button onClick={onAdd} size={size} icon={<FaFolderPlus />} className='btn-success'>
            {iconOnly || 'ایتم جدید'}
          </Button>
        </Tooltip>
      )
    )
  }
  const BtnEdit = () => {
    return (
      onEdit && (
        <Tooltip title={iconOnly && 'ویرایش ایتم مورد نظر'} size={size}>
          <Button onClick={onEdit} size={size} icon={<FiEdit />} className='btn-info'>
            {iconOnly || 'ویرایش'}
          </Button>
        </Tooltip>
      )
    )
  }
  const BtnDelete = () => {
    return (
      onDelete && (
        <Tooltip title={iconOnly && 'حذف ایتم'} size={size}>
          <Popconfirm
            title="حذف"
            onConfirm={onDelete}
            description={onDeleteConfirmMessage || 'آیا برای حذف مطمئن هستید؟'}
            okText="بلی"
            cancelText="خیر"
          >
            <Button size={size} icon={<RiDeleteBin6Line />} className='btn-danger'>
              {iconOnly || 'حذف'}
            </Button>
          </Popconfirm>
        </Tooltip>
      )
    )
  }
  const BtnFilter = () => {
    return (
      onFilter && (
        <Tooltip title={iconOnly && 'فیلتر'} size={size}>
          <Badge count={filterCount} color="purple">
            <Button onClick={onFilter} size={size} icon={<FiFilter />} className='btn-filter'>
              {iconOnly || 'فیلتر'}
            </Button>
          </Badge>
        </Tooltip>
      )
    )
  }
  const BtnRefresh = () => {
    return (
      onRefresh && (
        <Tooltip title={iconOnly && 'بازخوانی'} size={size}>
            <Button onClick={onRefresh} size={size} icon={<FiRefreshCw />} className='btn-primary'>
              {iconOnly || 'فیلتر'}
            </Button>
        </Tooltip>
      )
    )
  }
  const MoreBtn = () => {
    return items?.map((item, i) => {
      return (
        <Button key={i} {...item} size={iconOnly && size}>
          {iconOnly || item.children}
        </Button>
      )
    })
  }
  const DropdownBtn = () => {
    return <></>
  }
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Space wrap>
        <BtnAdd />
        <BtnEdit />
        <BtnDelete />
        <BtnFilter />
        <BtnRefresh />
        <MoreBtn />
        {props.children}
        <DropdownBtn />
      </Space>
    </>
  )
}

ButtonBar.propTypes = {
  items: PropTypes.arrayOf(Button),
  children: PropTypes.any,
  onDeleteConfirmMessage: PropTypes.string,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onFilter: PropTypes.func,
  onRefresh: PropTypes.func,
  filterCount: PropTypes.number,
}
export default ButtonBar
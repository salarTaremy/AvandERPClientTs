import React from 'react'
import { useEffect, useState, useRef } from 'react'
import * as url from '@/api/url'
import { Card, Tree, Empty, Divider, Skeleton, Button, message } from 'antd'
import { Space, Tooltip, Dropdown, Menu, Popconfirm, Select } from 'antd'
import { Modal } from 'antd'
import Loading from '@/components/common/Loading'

import {
  useFetchWithHandler,
  usePostWithHandler,
  useDelWithHandler,
  usePutWithHandler,
} from '@/api'
import { FileAddOutlined, EditOutlined, DeleteOutlined, MailOutlined } from '@ant-design/icons'
import { TbRefresh } from 'react-icons/tb'
import ModelForm from '@/components/common/ModalForm'
import  * as styles from '@/styles'
import { Flip, toast } from 'react-toastify'
import FrmEditItem from './FrmEditItem'
import FrmAddtem from './FrmAddtem'
import useRequestManager from '@/hooks/useRequestManager'

const MenuPermissions = () => {
  const [data, loading, error, ApiCall] = useFetchWithHandler()
  const [dataSubmit, loadingSubmit, errorSubmit, doSubmit] = usePostWithHandler()
  const [dataDelete, loadingDelete, errorDelete, doDelete] = useDelWithHandler()
  const [dataEditPosition, loadingEditPosition, errorEditPosition, doEditPosition] = usePutWithHandler()
  useRequestManager({error:error})
  useRequestManager({error:errorSubmit})
  useRequestManager({error:errorDelete})
  useRequestManager({error:errorEditPosition})
  const [treeData, setTreeData] = useState([])
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [disableButtons, setDisableButtons] = useState(false)
  const [expandedKeys, setExpandedKeys] = useState([0])
  const modelFormAdd = useRef()

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    FillTree()
  }, [])
  useEffect(() => {
    modelFormAdd.current.resetFields()
  }, [open])
  useEffect(() => {
    if (selectedItem) {
      setDisableButtons(false)
    } else {
      setDisableButtons(true)
    }
  }, [selectedItem])

  useEffect(() => {
    if (data?.data[0]?.children) {
      data.data[0].title = 'منوی اصلی برنامه'
      data.data[0].key = 0
      setTreeData(data.data)
    }
  }, [data])


  useEffect(() => {
    if (dataSubmit) {
      toast.success(dataSubmit?.message)
      setOpen(false)
      setSelectedItem(null)
      FillTree()
    }
  }, [dataSubmit])
  useEffect(() => {
    if (loadingDelete) {
      setSelectedItem(null)
    }
  }, [loadingDelete])
  useEffect(() => {
    if (dataDelete) {
      toast.success(dataDelete?.message)
      FillTree()
    }
  }, [dataDelete])
  useEffect(() => {
    if (dataEditPosition) {
      toast.success(dataEditPosition?.message)
      FillTree()
    }
  }, [dataEditPosition])

  useEffect(() => {}, [dataEditPosition])
  //====================================================================
  //                        Functions
  //====================================================================
  const FillTree = async () => {
    await ApiCall(url.NAV_MENU_TREE)
  }
  const submitAdd = async (values) => {
    if (selectedItem) {
      values.parentId = selectedItem.id
      setExpandedKeys([0, values.parentId])
      await doSubmit(url.NAV_MENU, values)
    }
  }
  const getParentKey = (key, tree) => {
    let parentKey
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children)
        }
      }
    }
    return parentKey
  }
  //====================================================================
  //                        Events
  //====================================================================
  const onSubmit = (values) => {
    submitAdd(values)
  }
  const onSelect = (selectedKeys, info) => {
    if (selectedKeys.length === 1) {
      setSelectedItem(info.node)
    } else {
      setSelectedItem(null)
    }
  }
  const onDrop = (info) => {
    const parentId = getParentKey(info.node.id, treeData)
    setExpandedKeys([0, parentId])
    //For Old BackEnet
    // const urlEdit = `${url.NAV_MENU_UPDATE_POSITION}/${info.dragNode.id}/${info.node.id}/${
    //   info.dropToGap ? 'true' : 'false'
    // }`
    // doEditPosition(urlEdit, null)
    const modifyData = {
      id: info.dragNode.id,
      destinationId: info.node.id,
      gap: info.dropToGap ? true : false,
    }
    doEditPosition(url.NAV_MENU_UPDATE_POSITION, modifyData)
  }
  const onEditSuccess = () => {
    setOpenEdit(false)
    FillTree()
  }
  const onEditing = (value) => {
    setLoadEdit(value)
  }
  //====================================================================
  //                        Buttons And Props
  //====================================================================
  const confirmDelete = {
    title: 'حذف',
    description: `آیا برای حذف ${selectedItem?.title}  مطمئن هستید؟`,
    okText: 'بلی',
    cancelText: 'خیر',
    onConfirm: () => {
      if (selectedItem?.id) {
        const parentId = getParentKey(selectedItem.id, treeData)
        setExpandedKeys([0, parentId])
        doDelete(`${url.NAV_MENU}/${selectedItem.id}`)
      }
    },
  }
  const btnDelete = {
    loading: false,
    disabled: disableButtons,
    icon: <DeleteOutlined />,
    className: 'text-danger',
    children: 'حذف',
  }
  const btnEdit = {
    loading: false,
    disabled: disableButtons,
    icon: <EditOutlined />,
    className: 'text-info',
    children: 'ویرایش',
    onClick: () => {
      setOpenEdit(true)
    },
  }
  const btnAdd = {
    loading: false,
    disabled: disableButtons,
    onClick: () => {
      setOpen(true)
    },
    icon: <FileAddOutlined />,
    className: 'text-success',
    children: 'افزودن',
  }
  const btnRefresh = {
    loading: false,
    // disabled: disableButtons,
    className: 'text-primary',
    icon: <TbRefresh />,
    onClick: () => {
      FillTree()
    },
    children: 'بازخوانی',
  }

  const treeProps = {
    checkable: false,
    defaultExpandedKeys: expandedKeys,
    onSelect: onSelect,
    onDrop: onDrop,
    // height: configs.TREE_HEIGHT,
    treeData: treeData,
    draggable: true,
    showLine: true,
    showIcon: false,
  }
  //====================================================================
  //                        Main Components
  //====================================================================
  const [loadEdit, setLoadEdit] = useState(false)
  return (
    <>
      <Card title={'حق دسترسی منو ها '} type="inner" >
        <Space wrap>
          <Button {...btnAdd}></Button>
          <Button {...btnEdit}></Button>
          <Popconfirm {...confirmDelete}>
            <Button {...btnDelete}></Button>
          </Popconfirm>
          <Button {...btnRefresh}></Button>
        </Space>
        <Divider orientation="left"></Divider>
        {(loading || loadingDelete || loadingEditPosition) && <Loading />}
        {!(loading || loadingDelete || loadingEditPosition) && data?.data && (
          <Card  style={{ ...styles.CARD_DEFAULT_STYLES }}>
            <Tree {...treeProps} />
          </Card >
        )}
        {loading === false && !data?.data && <Empty />}
      </Card>

      <ModelForm
        ref={modelFormAdd}
        open={open}
        isLoading={loadingSubmit}
        onSubmit={onSubmit}
        onCancel={() => {
          setOpen(false)
        }}
      >
        <FrmAddtem parentId={selectedItem && selectedItem.id} parentName={selectedItem?.name} />
      </ModelForm>
      <Modal
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        footer={null}
        style={{ top: 100 }}
        centered
        closable={!loadEdit}
        maskClosable={!loadEdit}
        keyboard={!loadEdit}
      >
        {selectedItem && (
          <FrmEditItem obj={selectedItem} onSuccess={onEditSuccess} onLoading={onEditing} />
        )}
      </Modal>
    </>
  )
}
export default MenuPermissions
/////////////////////////////////////////////////

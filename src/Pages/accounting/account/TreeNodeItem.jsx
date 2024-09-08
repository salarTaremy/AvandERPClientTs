import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import * as Icons from '@ant-design/icons'
import * as uuid from 'uuid'
import PropTypes from 'prop-types'
import FrmAddAccountGroup from './add/FrmAddAccountGroup'
import { FrmAddAccount } from './add/FrmAddAccount'
import { FrmAddAccountHeader } from './add/FrmAddAccountHeader'
import { useDelWithHandler } from '@/api'
import * as url from '@/api/url'
import useRequestManager from '@/hooks/useRequestManager'
import { BsFillJournalBookmarkFill, BsBook, BsJournalCheck, BsFillLockFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import FrmLinkAccountDetailAccount from './edit/FrmLinkAccountDetailAccount'
import * as defaultValues from "@/defaultValues";
//====================================================================
//                        Declaration
//====================================================================
const TreeNodeItem = (props) => {
  const buttonSize = 'small'
  const { item, onEditClick, onDeleteSuccess, onAddSuccess } = props
  const [isDeleted, setIsDeleted] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [modalState, setModalState] = useState(false)
  const [modalStateLink, setModalStateLink] = useState(false)
  const [delData, delLoading, delError, delApiCall] = useDelWithHandler()
  useRequestManager({ error: delError, loading: delLoading, data: delData })
  //====================================================================
  //                        Functions
  //====================================================================
  const deleteItem = async () => {
    Swal.fire({
      title: ` حذف حساب `,
      text: `بابت حذف حساب ${item.title} اطمینان دارید ؟`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'تایید',
      cancelButtonText: 'انصراف',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let finalUrl = ''
        if (item.level === 1) {
          finalUrl = `${url.ACCOUNT_GROUP}/${item.accountGroupId}`
        }
        if (item.level === 2) {
          finalUrl = `${url.ACCOUNT_HEADER}/${item.accountHeaderId}`
        }
        if (item.level === 3) {
          finalUrl = `${url.ACCOUNT}/${item.accountId}`
        }
        await delApiCall(finalUrl)
      }
    })
  }
  const onSuccess = () => {
    setModalState(false)
    onAddSuccess(item)
  }
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    delData?.isSuccess && onDeleteSuccess && onDeleteSuccess(item)
    delData?.isSuccess && setIsDeleted(true)
  }, [delData])
  useEffect(() => {
    delLoading && setShowBtn(false)
  }, [delLoading])
  return (
    <>
      <Ant.Modal
        open={modalState}
        // key={item.id}
        // key={uuid.v1()}
        centered
        footer={null}
        onCancel={() => {
          setModalState(false)
        }}
        onOk={() => {
          setModalState(false)
        }}
        {...defaultValues.MODAL_PROPS}

      >
        {item.level === 0 && <FrmAddAccountGroup onSuccess={onSuccess} />}
        {item.level === 1 && <FrmAddAccountHeader onSuccess={onSuccess} accountGroupId={item.accountGroupId} />}
        {item.level === 2 && <FrmAddAccount onSuccess={onSuccess} accountHeaderId={item.accountHeaderId} />}
      </Ant.Modal>
      <Ant.Modal
        open={modalStateLink}
        // key={item.id}
        // key={uuid.v1()}
        centered
        {...defaultValues.MODAL_PROPS}
        footer={null}
        onCancel={() => {
          setModalStateLink(false)
        }}
        onOk={() => {
          setModalStateLink(false)
        }}
      >
        {/* <FrmLinkAccountDetailAccount key={uuid.v1()} account={item}/> */}
        <FrmLinkAccountDetailAccount key={item.id} account={item}/>
      </Ant.Modal>
      {isDeleted && <BsFillLockFill style={{ color: 'red' }} />}
      {delLoading && <Ant.Spin />}
      {!delLoading && !isDeleted && (
        <Ant.Row onMouseOver={() => setShowBtn(true)} onMouseOut={() => setShowBtn(false)}>
          <Ant.Col
            span={20}
            onClick={() => {
              onEditClick && onEditClick(item)
            }}
          >
            {item.level === 1 && <BsFillJournalBookmarkFill style={{ color: '#3498db' }} />}
            {item.level === 2 && <BsJournalCheck style={{ color: 'orange' }} />}
            {item.level === 3 && <BsBook style={{ color: 'green' }} />} {item.title}
          </Ant.Col>
          <Ant.Col span={2}>
            {showBtn && item.level >= 0 && item.level <= 2 && (
              <Ant.Button
                onClick={() => {
                  setModalState(true)
                }}
                size={buttonSize}
                type="primary"
                icon={<Icons.FileAddOutlined />}
              ></Ant.Button>
            )}
            {showBtn && item.level >= 3 && item.level <= 3 && (
              <Ant.Button
                onClick={() => {
                  setModalStateLink(true)
                }}
                size={buttonSize}
                // type="primary"
                icon={<Icons.EditOutlined />}
              ></Ant.Button>
            )}
          </Ant.Col>
          <Ant.Col span={2}>
            {showBtn && item.level >= 0 && item.level <= 3 && (
              <Ant.Button
                onClick={deleteItem}
                size={buttonSize}
                danger
                icon={<Icons.DeleteOutlined />}
              />
            )}
          </Ant.Col>
        </Ant.Row>
      )}
    </>
  )
}
TreeNodeItem.propTypes = {
  item: PropTypes.object,
  onEditClick: PropTypes.func,
  onDeleteSuccess: PropTypes.func.isRequired,
  onAddSuccess: PropTypes.func.isRequired,
}

export default TreeNodeItem

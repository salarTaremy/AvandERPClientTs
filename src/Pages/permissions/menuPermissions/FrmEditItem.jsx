import React, { useState, useEffect } from 'react'
import { usePutWithHandler } from '@/api'
import { Form, Input, Button, Select } from 'antd'
import { toast, Flip } from 'react-toastify'
import * as url from '@/api/url'
import PropTypes from 'prop-types'
import { navTypes } from './common'
import { RequestManager } from '@/components/common/RequestManager'

const FrmEditItem = (props) => {
  const [toastId, setToastId] = useState(null)
  const [editData, editLoading, editError, doEdit] = usePutWithHandler()
  const { obj, onSuccess, onCancel, onLoading } = props
  const [form] = Form.useForm()

  useEffect(() => {
    toastId &&
      toast.update(toastId, {
        render: editData?.message,
        type: 'success',
        transition: Flip,
        isLoading: false,
        autoClose: 3000,
      })
    setToastId(null)
    editData && onSuccess(editData)
  }, [editData])


  useEffect(() => {
    onLoading(editLoading)
    if (editLoading) {
      const id = toast.loading('در حال ذخیره تغییرات...')
      setToastId(id)
    } else {
      //else
    }
  }, [editLoading])
  useEffect(() => {
    form.resetFields()
    form.setFieldsValue({ ...obj })
  }, [obj])

  const onFinish = async (values) => {
    const ed = {
      id: values.id,
      name: values.name,
      componentName: values?.componentName,
      to: values.to,
      iconName: values.iconName,
    }
    await doEdit(url.NAV_MENU, ed)
  }

  return (
    <>
      <RequestManager error={editError} />
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="id" label="ID منو">
          <Input />
        </Form.Item>
        <Form.Item
          name="componentName"
          label="نوع کامپوننت"
          initialValue="CNavItem"
          rules={[
            {
              required: true,
              message: 'نوع کامپوننت الزامی است',
            },
          ]}
        >
          <Select placeholder="انتخاب کنید" onChange={() => {}} options={navTypes} />
        </Form.Item>
        <Form.Item
          name="name"
          label="نام منو"
          rules={[
            {
              required: true,
              message: 'نام منو الزامی است',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="to" label="مسیر">
          <Input />
        </Form.Item>
        <Form.Item name="iconName" label="نام ایکون">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={editLoading} block>
            {'تایید'}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
export default FrmEditItem
FrmEditItem.propTypes = {
  obj: PropTypes.any,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  onLoading: PropTypes.func,
}

import React, { useEffect } from 'react'
import { forwardRef, useImperativeHandle } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import ModalHeader from "@/components/common/ModalHeader";
const FormDocumentType = forwardRef((props, ref) => {
  const { obj, onFinish, loading } = props
  const [form] = Ant.Form.useForm()
  useImperativeHandle(ref, () => ({
    resetFields() {
      form.resetFields()
    },
  }))
  useEffect(() => {
    form.resetFields()
    form.setFieldsValue({ ...obj })
  }, [obj])
  return (
    <>
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <ModalHeader title={' نوع سند حسابداری'} />
        <Ant.Form.Item name="name" label={'نوع سند'} rules={[{ required: true }]}>
          <Ant.Input allowClear showCount maxLength={200} />
        </Ant.Form.Item>
        <Ant.Form.Item name="description" label="توضیحات" rules={[{ required: false }]}>
          <Ant.Input.TextArea allowClear showCount maxLength={400} />
        </Ant.Form.Item>
        <Ant.Form.Item>
          <Ant.Button block type="primary" loading={loading} htmlType="submit">
            {'تایید'}
          </Ant.Button>
        </Ant.Form.Item>
      </Ant.Form>
    </>
  )
})

export default FormDocumentType
FormDocumentType.propTypes = {
  onFinish: PropTypes.func,
  obj: PropTypes.any,
  loading: PropTypes.bool,
}

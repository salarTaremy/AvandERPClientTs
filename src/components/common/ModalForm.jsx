import React from 'react'
import { forwardRef, useImperativeHandle } from 'react'
import { useEffect, useState } from 'react'
import { Form, Input, Modal, Button } from 'antd'
import PropTypes from 'prop-types'

const ModelForm = forwardRef((props, ref) => {
  const { open, onSubmit, onCancel, isLoading, children } = props
  const [form] = Form.useForm()
  // useEffect(() => {
  //   form.resetFields()
  // })

  useImperativeHandle(ref, () => ({
    resetFields() {
      form.resetFields()
    },
  }))
  return (
    <>
      <Modal
        {...props}
        open={open}
        confirmLoading={isLoading}
        loading={isLoading}
        cancelButtonProps={{ disabled: isLoading }}
        closable={!isLoading}
        maskClosable={!isLoading}
        keyboard={!isLoading}
        onCancel={onCancel}
        style={{ top: 100 }}
        centered
        cancelText="انصراف"
        okText="تایید"
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              // form.resetFields()
              onSubmit(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })
        }}
      >
        <Form form={form} layout="vertical">
          {children}
        </Form>
      </Modal>
    </>
  )
})
ModelForm.propTypes = {
  open: PropTypes.bool,
  onSubmit: PropTypes.any,
  onCancel: PropTypes.any,
  isLoading: PropTypes.bool,
  children: PropTypes.any,
}

export default ModelForm

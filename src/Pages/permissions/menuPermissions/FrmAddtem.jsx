import React from 'react'
import { useEffect, useState } from 'react'
import * as url from '@/api/url'
import { Form, Input, Select, Button } from 'antd'
import PropTypes from 'prop-types'
import { navTypes } from './common'

const FrmAddtem = (props) => {
  const { parentId } = props
  const { parentName } = props

  return (
    <>
      <h6>
        {'افزودن منوی جدید '}
        {parentName}
        {`(${parentId})`}
      </h6>

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
    </>
  )
}

export default FrmAddtem
FrmAddtem.propTypes = {
  parentId: PropTypes.number,
  parentName: PropTypes.string,
}

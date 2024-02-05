import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Form, Input, InputNumber, Divider } from 'antd'

export const TechnicalSpecificationsStep = ({ form }) => {
  const f1 = (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const f2 = (value) => value.replace(/\$\s?|(,*)/g, '')
  const stl = { width: '100%' }
  const publicProps = {
    // type: 'number',
    min: 0,
    placeholder: 'cm',
    style: stl,
    formatter: f1,
    parser: f2,
  }
  return (
    <>
      <Divider></Divider>
      <Row gutter={[16, 8]}>
        <Col span={24} sm={8}>
          <Form.Item name={'length'} label={'طول'}>
            <InputNumber {...publicProps} />
          </Form.Item>
          <Form.Item name={'width'} label={'عرض'}>
            <InputNumber {...publicProps} />
          </Form.Item>
          <Form.Item name={'height'} label={'ارتفاع'}>
            <InputNumber {...publicProps} />
          </Form.Item>
        </Col>
        <Col span={24} sm={8}>
          <Form.Item name={'weight'} label={'وزن'}>
            <InputNumber {...publicProps} placeholder="gr" />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
TechnicalSpecificationsStep.propTypes = {
  form: PropTypes.any,
}

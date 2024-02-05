import React from 'react'
import { Row, Col, Form, Input } from 'antd'

export const TabBarcodes = () => {
  return (
    <Row gutter={[16, 8]}>
      <Col span={24} sm={8}>
        <Form.Item label={'ایران کد'} rules={[{ required: true }]}>
          <Input placeholder="621XXXXXXXX" />
        </Form.Item>
        <Form.Item label={'Gtin'}>
          <Input placeholder="012345..." />
        </Form.Item>
        <Form.Item label={'شناسه مالیاتی'}>
          <Input placeholder="27XXXXXXXXXXXXXX" />
        </Form.Item>
      </Col>
    </Row>
  )
}

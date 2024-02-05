import React from 'react'
import { Row, Col, Form, Input } from 'antd'

export const TabTechnicalSpecifications = () => {
  return (
    <Row gutter={[16, 8]}>
      <Col span={24} sm={8}>
        <Form.Item
          name={'sdfsss'}
          label={'طول'}
          rules={[{ required: true, message: '${label} is required' }]}
        >
          <Input placeholder="cm" type="number" min={0} />
        </Form.Item>
        <Form.Item label={'عرض'}>
          <Input placeholder="cm" />
        </Form.Item>
        <Form.Item label={'ارتفاع'}>
          <Input placeholder="cm" />
        </Form.Item>
      </Col>
      <Col span={24} sm={8}>
        <Form.Item label={'وزن'}>
          <Input placeholder="gr" />
        </Form.Item>
      </Col>
    </Row>
  )
}

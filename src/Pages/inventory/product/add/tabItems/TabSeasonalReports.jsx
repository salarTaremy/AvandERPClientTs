import React, { useEffect } from 'react'
import { Row, Col, Form, Input, Select, Checkbox } from 'antd'
import { useFetch } from '@/api'
import * as url from '@/api/url'

export const TabSeasonalReports = () => {
  const [data, loading, error] = useFetch(url.PRODUCT_TYPE)
  useEffect(() => {}, [])

  return (
    <>
      <Row gutter={[16, 8]}>
        <Col>
          <Form.Item name="AD" valuePropName="checked">
            <Checkbox>خرید</Checkbox>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="bd" valuePropName="checked">
            <Checkbox>فروش</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col span={24} sm={8}>
          <Form.Item name={'Type'} label="نوع کالا" rules={[{ required: true }]}>
            <Select>
              {data &&
                data.data.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.label}
                  </Select.Option>
                ))}

            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

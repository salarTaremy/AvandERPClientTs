import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
  Tabs,
  Space,
  theme,
  Affix,
  Spin,
  Divider,
  QRCode,
  Upload,
  Checkbox,
} from 'antd'
import * as url from '@/api/url'
import { useFetch } from '@/api'
import { useFetchWithHandler } from '@/api'

export const SeasonalReportsStep = ({ form }) => {
  const [data, loading, error] = useFetch(url.PRODUCT_TYPE)
  useEffect(() => {
    const defaultTypeId = 12
    const typeId = form.getFieldValue('typeId')
    form.setFieldsValue({ typeId: typeId || defaultTypeId })
  }, [])
  const commonOptions = {
    placeholder: 'انتخاب کنید...',
  }
  return (
    <>
      <Divider></Divider>
      <Row gutter={[16, 8]}>
        <Col>
          <Form.Item name="buyable" valuePropName="checked" initialValue={true}>
            <Checkbox>خرید</Checkbox>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="salable" valuePropName="checked" initialValue={true}>
            <Checkbox>فروش</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col span={24} sm={8}>
          <Form.Item name={'typeId'} label="نوع کالا" rules={[{ required: true }]}>
            <Select
              {...commonOptions}
              showSearch
              filterOption={(input, option) => option.name.indexOf(input) >= 0}
              disabled={loading}
              loading={loading}
              options={data?.data}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
SeasonalReportsStep.propTypes = {
  form: PropTypes.any,
}

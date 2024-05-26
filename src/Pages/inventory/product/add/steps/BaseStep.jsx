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
  InputNumber,
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
const { useToken } = theme
const minProductCodeLen = 2
const maxProductCodeLen = 10

export const BaseStep = ({ form }) => {
  const [selectedproductNature, setSelectedProductNature] = useState(null)
  const [productNatureData, productNatureLoading, productNatureError] = useFetch(url.PRODUCT_NATURE)
  const [productNatureDetailData, productNatureDetailLoading, productNatureDetailError, ApiCall] =
    useFetchWithHandler()
  const [qrCode, setQrCode] = useState(null)
  const { token } = useToken()

  useEffect(() => {
    const natureId = form.getFieldValue('natureId')
    natureId && setSelectedProductNature(natureId)
  }, [])

  useEffect(() => {
    ApiCall(url.PRODUCT_NATURE_DETAIL)
  }, [selectedproductNature])

  const handleOnChange = (val, option) => {
    form.setFieldsValue({ natureDetailId: undefined })
    setSelectedProductNature(option.id)
  }

  const commonOptions = {
    placeholder: 'انتخاب کنید...',
  }
  return (
    <>
      <Divider></Divider>
      <Row gutter={[16, 8]}>
        <Col span={24} sm={8}>
          <Form.Item name={'natureId'} label="ماهیت(اصلی) کالا/خدمت" rules={[{ required: true }]}>
            <Select
              {...commonOptions}
              onChange={handleOnChange}
              disabled={productNatureLoading || false}
              loading={productNatureLoading}
              options={productNatureData?.data}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Form.Item>
          <Form.Item
            name={'natureDetailId'}
            label="ماهیت(فرعی) کالا/خدمت"
            rules={[{ required: true }]}
          >
            <Select
              {...{ ...commonOptions }}
              loading={productNatureDetailLoading}
              options={productNatureDetailData?.data?.filter(
                (c) => c.productNatureTypeId === selectedproductNature,
              )}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Form.Item>
          <Form.Item name="name" label={'نام کالا/خدمت'} rules={[{ required: true }]}>
            <Input placeholder="نام کالا/خدمت' به صورت فارسی" allowClear />
          </Form.Item>
        </Col>
        <Col span={24} sm={8}>
          <Form.Item
            name="code"
            label={'کد کالا/خدمت'}
            rules={[
              {
                required: true,
                max: maxProductCodeLen,
                min: minProductCodeLen,
              },
            ]}
          >
            <Input
              maxLength={maxProductCodeLen}
              showCount
              allowClear
              placeholder="کد عددی"
              onChange={(e) => {
                setQrCode(e.target.value)
              }}
            />
          </Form.Item>

          <Form.Item name={'secondCode'} label={'کد دوم کالا'}>
            <Input placeholder="کد دوم کالا'" allowClear />
          </Form.Item>
          <Form.Item name={'secondName'} label={'نام دوم کالا/خدمت'}>
            <Input placeholder="'نام دوم کالا/خدمت'" allowClear />
          </Form.Item>
        </Col>
        <Col span={24} sm={8}>
          <Row gutter={[16, 8]} justify="center">
            <Col>
              <QRCode value={qrCode} color={token.colorInfoText} bgColor={token.colorBgLayout} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col span={24} sm={4}>
          <Form.Item name="buyable" valuePropName="checked" initialValue={true}>
            <Checkbox checked>{'مشمول ارزش افزوده'}</Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
BaseStep.propTypes = {
  form: PropTypes.any,
}

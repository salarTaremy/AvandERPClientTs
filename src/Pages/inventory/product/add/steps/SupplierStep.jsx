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

export const SupplierStep = ({ form }) => {
  const [supplierData, supplierLoading, supplierError] = useFetch(url.SUPPLIER)
  const [brandData, brandLoading, brandError, ApiCall] = useFetchWithHandler()
  const [selectedSupplier, setSelectedSupplier] = useState(null)

  useEffect(() => {
    const supplierId = form.getFieldValue('supplierId')
    supplierId && setSelectedSupplier(supplierId)
  }, [])

  useEffect(() => {
    selectedSupplier && ApiCall(`${url.BRAND}?supplierId=${selectedSupplier}`)
  }, [selectedSupplier])

  useEffect(() => {
    //اگر تأمین کننده فقط یک برند داشته باشد
    if (brandData?.data?.length === 1) {
      form.setFieldsValue({ brandId: brandData?.data[0].id })
    }
    if (brandData?.data?.length > 1) {
      const brandId = form.getFieldValue('brandId')
      brandId && form.setFieldsValue({ brandId: brandId })
    }
  }, [brandData])

  const handleOnChange = (val, option) => {
    form.setFieldsValue({ brandId: undefined })
    setSelectedSupplier(option.id)
  }

  const commonOptions = {
    placeholder: 'انتخاب کنید...',
    showSearch: true,
    filterOption: (input, option) => option.name.indexOf(input) >= 0,
  }
  return (
    <>
      <Divider></Divider>
      <Row gutter={[16, 8]}>
        <Col span={24} sm={8}>
          <Form.Item name={'supplierId'} label="تأمین کننده" rules={[{ required: true }]}>
            <Select
              {...commonOptions}
              onChange={handleOnChange}
              disabled={supplierLoading || false}
              loading={supplierLoading}
              options={supplierData?.data}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Form.Item>
          <Form.Item name={'brandId'} label="برند" rules={[{ required: true }]}>
            <Select
              {...commonOptions}
              disabled={brandLoading || false}
              loading={brandLoading}
              options={brandData?.data}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
SupplierStep.propTypes = {
  form: PropTypes.any,
}

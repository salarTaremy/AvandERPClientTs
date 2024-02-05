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

export const UnitsStep = ({ form }) => {
  const [unitTypeData, unitTypeLoading, unitTypeError] = useFetch(url.PRODUCT_UNIT_TYPE)
  const [unitData, unitLoading, unitError, ApiCall] = useFetchWithHandler()
  const [selectedUnitType, setSelectedUnitType] = useState(null)
  // useEffect(() => {
  //   form.setFieldsValue({ unitTypeId: undefined })
  // }, [])
  useEffect(() => {
    const unitTypeId = form.getFieldValue('unitTypeId')
    unitTypeId && setSelectedUnitType(unitTypeId)
  }, [])

  useEffect(() => {
    selectedUnitType && ApiCall(`${url.PRODUCT_UNIT}?productUnitTypeId=${selectedUnitType}`)
  }, [selectedUnitType])

  const handleOnChange = (val, option) => {
    form.setFieldsValue({ unitId: undefined })
    setSelectedUnitType(option.id)
  }
  const commonOptions = {
    placeholder: 'انتخاب کنید...',
  }
  return (
    <>
      <Divider></Divider>
      <Row gutter={[16, 8]}>
        <Col span={24} sm={8}>
          <Form.Item name={'unitTypeId'} label="(اصلی)نوع واحد" rules={[{ required: true }]}>
            <Select
              {...commonOptions}
              onChange={handleOnChange}
              disabled={unitTypeLoading || false}
              loading={unitTypeLoading}
              options={unitTypeData?.data}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Form.Item>
          <Form.Item name={'unitId'} label="(اصلی)واحد" rules={[{ required: true }]}>
            <Select
              {...commonOptions}
              showSearch
              filterOption={(input, option) =>
                option.name.indexOf(input) >= 0
              }
              disabled={unitLoading || false}
              loading={unitLoading}
              options={unitData?.data}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
UnitsStep.propTypes = {
  form: PropTypes.any,
}

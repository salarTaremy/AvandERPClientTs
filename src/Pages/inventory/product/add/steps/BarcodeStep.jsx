import React, { useEffect, useState } from 'react'
import { SettingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { Row, Col, Form, Input, Divider, Space, Cascader, Select } from 'antd'
//import ReactCountryFlag from 'react-country-flag'
import { GS1PrefixCodeToCountryCode } from 'gs1-prefix-code-to-country-code'

export const BarcodeStep = ({ form }) => {
  const [countryInfo, setCountryInfo] = useState(null)
  const maxLenGS1 = 13
  const maxLenGTIN = 16
  const maxLenTaxId = 13

  const isValidIrCode = async (e, value) => {
    setCountryInfo(null)
    if (value?.length >= 3) {
      const preFixInfo = GS1PrefixCodeToCountryCode(value.substring(0, 3))
      preFixInfo && setCountryInfo(preFixInfo)
    }

    // if (!value || value?.length === 0) {
    //   return Promise.reject('این فیلد نمی‌تواندخالی باشد')
    // }

    // if (!value?.startsWith('626')) {
    //   return Promise.reject('فرمت نا معتبر')
    // }
    return Promise.resolve()
  }

  return (
    <>
      <Divider></Divider>
      <Row gutter={[16, 8]}>
        <Col span={24} sm={8}>
          <Form.Item
            name={'irCode'}
            label={'ایران کد / (GS1)'}
            rules={[
              { validator: isValidIrCode },
              {
                required: true,
                len: maxLenGS1,
              },
            ]}
          >
            <Input
              maxLength={maxLenGS1}
              showCount
              placeholder="626XXXXXXXX"
              // addonAfter={
              //   <ReactCountryFlag
              //     countryCode={countryInfo?.alpha2}
              //     svg
              //     title={countryInfo?.name}
              //     style={{
              //       width: '2em',
              //       height: '2em',
              //     }}
              //   />
              // }
            />
          </Form.Item>
          <Form.Item name={'gtin'} label={'Gtin'} rules={[{ len: maxLenGTIN }]}>
            <Input placeholder="216012345..." maxLength={maxLenGTIN} showCount />
          </Form.Item>
          <Form.Item name={'stuffId'} label={'شناسه مالیاتی'} rules={[{ len: maxLenTaxId }]}>
            <Input placeholder="27XXXXXXXXXXXXXX" maxLength={maxLenTaxId} showCount />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
BarcodeStep.propTypes = {
  form: PropTypes.any,
}

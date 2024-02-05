import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Divider, Badge, Descriptions, Spin, Row, Col } from 'antd'
import { useFetch } from '@/api'
import * as url from '@/api/url'

export const FinalStep = ({ form }) => {
  const brandId = form.getFieldValue('brandId')
  const name = form.getFieldValue('name')
  const height = form.getFieldValue('height')
  const length = form.getFieldValue('length')
  const weight = form.getFieldValue('weight')
  const width = form.getFieldValue('width')
  const code = form.getFieldValue('code')
  const seccondCode = form.getFieldValue('seccondCode')
  const irCode = form.getFieldValue('irCode')
  const gtin = form.getFieldValue('gtin')
  const stuffId = form.getFieldValue('stuffId')
  const natureDetailId = form.getFieldValue('natureDetailId')
  const natureId = form.getFieldValue('natureId')
  const unitTypeId = form.getFieldValue('unitTypeId')
  const unitId = form.getFieldValue('unitId')

  const [brandData, brandLoading, brandError] = useFetch(`${url.BRAND}/${brandId}`)
  const [unitData, unitLoading, unitError] = useFetch(`${url.PRODUCT_UNIT}/${unitId}`)
  const [unitTypeData, unitTypeLoading, unitTypeError] = useFetch(
    `${url.PRODUCT_UNIT_TYPE}/${unitTypeId}`,
  )
  const [natureData, natureLoading, natureError] = useFetch(`${url.PRODUCT_NATURE}/${natureId}`)
  const [natureDetailData, natureDetailLoading, natureDetailError] = useFetch(
    `${url.PRODUCT_NATURE_DETAIL}/${natureDetailId}`,
  )

  const items = [
    {
      key: '1',
      label: 'کد/نام محصول',
      span: 2,
      children: `${name}(${code})`,
    },
    {
      key: '2',
      label: 'تأمین کننده/برند',
      span: 2,
      children:
        (brandLoading && <Spin />) ||
        (brandData &&
          `${brandData?.data?.supplierName}(${brandData?.data?.supplierId})/${brandData?.data?.name}(${brandData?.data?.id})`),
    },
    {
      key: '3',
      label: 'ماهیت',
      span: 2,
      children:
        ((natureLoading || natureDetailLoading) && <Spin />) ||
        (natureData &&
          natureDetailData &&
          `${natureData?.data?.name}/${natureDetailData?.data?.name}`),
    },
    {
      key: '4',
      label: 'واحد کالا/خدمت',
      span: 2,
      children:
        ((unitLoading || unitTypeLoading) && <Spin />) ||
        (unitData && unitTypeData && `${unitTypeData?.data?.name}/${unitData?.data?.name}`),
    },
    {
      key: '5',
      label: 'مشخصات فیزیکی/فنی',
      children: `h: ${height || 0} L: ${length || 0} w: ${width || 0} `,
    },
    {
      key: '6',
      label: 'وزن',
      children: `W: ${weight || ''} ${(weight && 'gr') || ''} `,
    },
    {
      key: '7',
      label: 'شناسه ها و بارکد ها',
      children: (
        <>
          {code && `کد کالا/خدمت : ${code}`}
          <br />
          {irCode && `ایران کد : ${irCode}`}
          <br />
          {gtin && `شناسه (gtin) : ${gtin}`}
          <br />
          {stuffId && `شناسه مالیاتی : ${stuffId}`}
          <br />
          {seccondCode && `کد دوم : ${seccondCode}`}
          <br />
        </>
      ),
    },
  ]

  return (
    <>
      <Divider />
      <Row gutter={[16, 8]}>
        <Col span={24}>
          <Descriptions title="بازبینی نهایی" layout="vertical" bordered items={items} />
        </Col>
      </Row>
      <br />
    </>
  )
}
FinalStep.propTypes = {
  form: PropTypes.any,
}

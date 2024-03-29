import React from 'react'
import { PropTypes } from 'prop-types'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import useRequestManager from '@/hooks/useRequestManager'

const DetailProductListDescription = (props) => {
  const { id } = props
  const [data, loading, error] = api.useFetch(`${url.PRODUCT}/${id}`)
  useRequestManager({ error: error })
  const borderedItems = [
    {
      key: '1',
      label: 'شناسه',
      children: data?.data?.id,

    },
    {
      key: '2',
      label: 'کد',
      children: data?.data?.code,

    },
    {
      key: '3',
      label: 'کد دوم',
      children: data?.data?.seccondCode,

    },
    {
      key: '4',
      label: 'شناسه نوع',
      children: data?.data?.typeId,

    },
    {
      key: '5',
      label: 'شناسه جزئیات ماهیت',
      children: data?.data?.natureDetailId,

    },
    {
      key: '6',
      label: 'شناسه برند',
      children: data?.data?.brandId,

    },
    {
      key: '7',
      label: 'نام کالا',
      children: data?.data?.name,

    }, {
      key: '8',
      label: 'نام دوم کالا',
      children: data?.data?.seccondName,

    },
  ]
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Skeleton active={true} loading={loading}>
    <Ant.Descriptions
      bordered
      // layout="vertical"
      title={'جزئیات کالا و خدمات '}
      size={'middle'}

      items={borderedItems}
    />
  </Ant.Skeleton>
  )
}

export default DetailProductListDescription
DetailProductListDescription.propTypes = {
  id: PropTypes.number,
}
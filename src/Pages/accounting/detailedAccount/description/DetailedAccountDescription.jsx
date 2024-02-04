import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as styles from '@/styles'
import * as api from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import Loading from '@/components/common/Loading'
//====================================================================
//                        Declaration
//====================================================================
const DetailedAccountDescription = (props) => {
  const { id } = props
  const [data, loading, error] = api.useFetch(`${url.DETAILED_ACCOUNT}/${id}`)
  useRequestManager({ error: error })
  const borderedItems = [
    {
      key: '1',
      label: 'شناسه',
      children: data?.data?.id,
    },
    {
      key: '2',
      label: ' کد کامل',
      children: data?.data?.fullCode,
    },
    {
      key: '3',
      label: 'کد نوع تفصیل',
      children: data?.data?.detailedAccountGroupCode,
    },
    {
      key: '4',
      label: 'وضعیت حساب',
      //children: data?.data?.isActive.toString(),
      span: 3,
      children: (
        <Ant.Badge
          status={
            (loading && 'default') ||
            (data?.data?.isActive && 'success') ||
            (!data?.data?.isActive && 'error')
          }
          text={
            (loading && <Ant.Spin />) ||
            (data?.data?.isActive && 'فعال') ||
            (!data?.data?.isActive && 'غیر فعال')
          }
        />
      ),
    },
    {
      key: '5',
      label: 'نام حساب',
      span: 3,
      children: data?.data?.name,
    },
    {
      key: '6',
      label: 'نام دوم حساب',
      span: 3,
      children: data?.data?.secondName,
    },
    {
      key: '7',
      label: 'نوع تفصیل',
      children: data?.data?.detailedAccountGroupName,
    },
  ]
  //====================================================================
  //                        useEffects
  //====================================================================
  //useEffect(() => {}, [])
  //...
  //====================================================================
  //                        Functions
  //====================================================================
  // const onFinish = async (values) => {
  //   const req = { ...values}
  //   await ApiCall(url.ACCOUNT, req)
  // }
  //...
  //====================================================================
  //                        Child Components
  //====================================================================
  const BlankPage = () => {
    return (
      <>
        <p>{'......'}</p>
        <p>{'......'}</p>
        <p>{'......'}</p>
        <p>{'......'}</p>
      </>
    )
  }
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Skeleton active={true} loading={loading}>
      <Ant.Descriptions
        bordered
        // layout="vertical"
        title={'جزئیات حساب تفصیل'}
        size={'middle'}
        // extra={<Ant.Button>ok</Ant.Button>}
        items={borderedItems}
      />
    </Ant.Skeleton>
  )
}
export default DetailedAccountDescription
DetailedAccountDescription.propTypes = {
  id: PropTypes.number,
}

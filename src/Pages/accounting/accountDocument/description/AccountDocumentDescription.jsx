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
const AccountDocumentDescription = (props) => {
  const { id } = props
  console.log(id,"id")
  const [data, loading, error] = api.useFetch(`${url.ACCOUNT_DOCUMENT}/${id}`)
  useRequestManager({ error: error })
  const borderedItems = [
    {
      key: '1',
      label: 'شناسه',
      children: data?.data?.id,
    },
    {
      key: '2',
      label: 'شماره عطف',
      children: data?.data?.inflectionNumber,
    },
    {
      key: '3',
      label: 'شماره فرعی',

      children: data?.data?.subNumber,
    },
    {
      key: '4',
      label: 'شماره روزانه',

      children: data?.data?.dailyNumber,
    },
    {
      key: '5',
      label: 'بدهکار',


      children: data?.data?.debtor.toLocaleString(),
    },
    {
      key: '6',
      label: 'بستانکار',
      children: data?.data?.creditor.toLocaleString(),
    },
    {
      key: '7',
      label: 'وضعیت حساب',
      //children: data?.data?.isActive.toString(),

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
      key: '8',
      label: 'نام شعبه',
      span: 3,
      children: data?.data?.branchName,
    },
    {
      key: '9',
      label: 'نام وضعیت ',
      span: 3,
      children: data?.data?.stateName,
    },
    {
      key: '10',
      label: 'نوع سند',
      span: 3,
      children: data?.data?.typeName,
    },
    {
      key: '11',
      label: 'تاریخ',
      span: 3,
      children: data?.data?.persianDateTilte,
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
export default AccountDocumentDescription
AccountDocumentDescription.propTypes = {
  id: PropTypes.number,
}


import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import { MdDescription } from "react-icons/md";

//====================================================================
//                        Declaration
//====================================================================
const SupplierDescription = (props) => {
  const { id } = props
  const [data, loading, error] = api.useFetch(`${url.SUPPLIER}/${id}`)
  useRequestManager({ error: error })
  const borderedItems = [
    {
      key: '1',
      label: 'شناسه',
      children: data?.data?.id,

    },
    {
      key: '2',
      label: ' کد ',
      children: data?.data?.code,

    },
    {
      key: '3',
      label: 'نام ',
      span: 3,
      children: data?.data?.name,
    },
,
  ]


  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Skeleton active={true} loading={loading}>
      <ModalHeader title= {'جزئیات تأمین کننده'} icon={<MdDescription />}/>
      <Ant.Descriptions
        bordered
        items={borderedItems}
      />
    </Ant.Skeleton>
  )
}
export default SupplierDescription
SupplierDescription.propTypes = {
  id: PropTypes.number,
}





import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as styles from '@/styles'
import * as api from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import useAllLoading from '@/hooks/useAllLoading '
import CoustomContent from '@/components/common/CoustomContent'
//====================================================================
//                        Declaration
//====================================================================
const EditSaleDoc = (props) => {
  const { id } = props
  const pageTitle = 'شرح صفحه'
  // const [Data, Loading, Error, ApiCall] = api.useFetchWithHandler()
  // useRequestManager({ error: Error })
  //...
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
       <Ant.Space direction='vertical'>
        
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}
       {id}

       </Ant.Space>
      </>
    )
  }
  //====================================================================
  //                        Component
  //====================================================================
  return (

    <CoustomContent  height={400} bordered  >
      <BlankPage />
      
    </CoustomContent>

  )
}

export default EditSaleDoc

import React,{useEffect,useState} from 'react'
import { PropTypes } from 'prop-types'
import * as Ant from 'antd'
import qs from "qs";
import * as defaultValues from "@/defaultValues";
import * as url from '@/api/url'
import * as styles from '@/styles'
import * as api from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import useAllLoading from '@/hooks/useAllLoading '

// import ProductKardexList from "../../inventory/wareHouse/reports/productKardex/ProductKardexList"
//====================================================================
//                        Declaration
//====================================================================
const BlankPage = (props) => {
  const {id} = props
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

      <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} loading={false} title={pageTitle} type='inner' >
        <BlankPage/>
        {/* Write Code Here */}
        {/* <ProductKardexList productId={1} BatchNumberId={2} /> */}
      </Ant.Card>

  )
}

export default BlankPage
BlankPage.propTypes = {
  id: PropTypes.any,
}

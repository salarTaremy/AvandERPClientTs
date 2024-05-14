
import React,{useEffect,useState} from 'react'
import { PropTypes } from 'prop-types'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as styles from '@/styles'
import * as api from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import useAllLoading from '@/hooks/useAllLoading '
//====================================================================
//                        Declaration
//====================================================================
const CitySelector = (props) => {
  const {id} = props
  const pageTitle = 'شرح صفحه'
  const [CityData, CityLoading, CityError, CityApiCall] = api.useFetchWithHandler()
  // useRequestManager({ error: Error })
  //...
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(async () => {

    await CityApiCall(url.CITY_TREE)
  }, [])
  //====================================================================
  //                        Functions
  //====================================================================

  //====================================================================
  //                        Child Components
  //====================================================================
  const CitySelector = () => {
    return (
      <>
        <p>{CityLoading && 'Loading'}</p>
        <p>{CityData && CityData && JSON.stringify() }</p>
        <p>{CityData?.isSuccess == true  && JSON.stringify(CityData?.data[0].children[0],null,1,1 ) }</p>
      </>
    )
  }
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Card Card title={pageTitle} type="inner" style={{ ...styles.CARD_DEFAULT_STYLES }} loading={false}>
        <CitySelector/>
    </Ant.Card>
  )
}

export default CitySelector
CitySelector.propTypes = {
  id: PropTypes.any,
}

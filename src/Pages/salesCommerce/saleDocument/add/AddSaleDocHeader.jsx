import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import { Col, Row } from 'antd';
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as defaultValues from "@/defaultValues";


//====================================================================
//                        Declaration
//====================================================================
const AddSaleDocHeader = (props) => {
    const { id } = props;
  return (
    <div>AddSaleDocHeader{id}</div>

  )
}
export default AddSaleDocHeader
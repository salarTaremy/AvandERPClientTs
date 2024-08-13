import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import { Col, Row } from 'antd';
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as defaultValues from "@/defaultValues";
import qs from "qs";
import * as styles from "@/styles";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import useAllLoading from "@/hooks/useAllLoading ";
import CoustomContent from "@/components/common/CoustomContent";
import SaleDocumentHeaderInfo from "../header/SaleDocumentHeaderInfo";
import ModalHeader from '@/components/common/ModalHeader';
//====================================================================
//                        Declaration
//====================================================================
const EditSaleDocHeader = (props) => {
    const { id } = props;
  return (
    <div>EditSaleDocHeader{id}</div>
  )
}
export default EditSaleDocHeader

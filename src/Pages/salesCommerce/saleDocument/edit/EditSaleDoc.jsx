
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
const EditSaleDoc = (props) => {
  const { id } = props;
  const [dataSource, setDataSource] = useState([
    { id: 1, name: "salar" },
    { id: 2, name: "salar2" },
  ]);
  const [itemsData, itemsLoading, itemsError, itemsApiCall] =
    api.useFetchWithHandler();
  useRequestManager({ error: itemsError });
  //...
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    fillGrid();
  }, [id]);
  useEffect(() => {
    setDataSource(itemsData?.data);
  }, [itemsData]);
  //====================================================================
  //                        Functions
  //====================================================================
  const fillGrid = async () => {
    const queryString = qs.stringify({
      saleDocumentHeaderId: props.id,
    });
    await itemsApiCall(`${url.SALE_DOCUMENT_DETAIL}?${queryString}`);
  };
  // const onFinish = async (values) => {
  //   const req = { ...values}
  //   await ApiCall(url.ACCOUNT, req)
  // }
  //...
  //====================================================================
  //                        Child Components
  //====================================================================

  //====================================================================
  //                        Component
  //====================================================================
  const c = [{
    title: "productCode",
    dataIndex: "productCode",
    width: 100
  }, {
    title: "productName",
    dataIndex: "productName",
    width: 500
  }
    , {
    title: "productUnitId",
    dataIndex: "productUnitId",
    width: 100
  }, {
    title: "productUnitName",
    dataIndex: "productUnitName",
    width: 100
  }, {
    title: "batchNumber",
    dataIndex: "batchNumber",
    width: 100
  }, {
    title: "quantity",
    dataIndex: "quantity",
    width: 100
  }, {
    title: "unitPrice",
    dataIndex: "unitPrice",
    width: 100
  }, {
    title: "discount",
    dataIndex: "discount",
    width: 100
  }, {
    title: "taxTotal",
    dataIndex: "taxTotal",
    width: 100
  }, {
    title: "consumerPrice",
    dataIndex: "consumerPrice",
    width: 100
  }

  ]

  return (
    <>
      <ModalHeader title={`برگه فروش ${id}`}/>


      <Row align="middle"
        gutter={[16, 16]}>
        <Col sm={24}>
          <CoustomContent bordered  >
            {'نام مشتری'} <br />{'نام مشتری'}<br />{'نام مشتری'}
          </CoustomContent>
        </Col>
        <Col sm={24}>
          <Ant.Table
            {...defaultValues.TABLE_PROPS}
            columns={c}
            loading={itemsLoading}
            dataSource={dataSource} />
        </Col>

        <Col sm={24} lg={12} xl={12}>
          <CoustomContent bordered height={100}>
            {'مبلغ:18,000,000'}<br></br>{'تخفیف:1,000,000'}<br></br>{'مالیات:17,000,000'}<br></br>{'درصد تخفیف:'}<br></br>{'مبلغ نهایی:'}

          </CoustomContent>
        </Col>
        <Col span={24} md={12} >
          <CoustomContent bordered>
            {'جمع'}
          </CoustomContent>
        </Col>
      </Row>

    </>
  );
};

export default EditSaleDoc;

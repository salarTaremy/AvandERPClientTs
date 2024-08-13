
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
//====================================================================
//                        Declaration
//====================================================================
const EditSaleDoc = (props) => {
  const { id } = props;
  const pageTitle = "شرح صفحه";
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
      <CoustomContent height={700}   >
        <Row gutter={[16, 16]} >
          <Col span={24}>
            <CoustomContent bordered  >
              {'نام مشتری'} {'نام مشتری'}
              <br />
              {'نام مشتری'}
              {/* <pre> {dataSource && JSON.stringify(dataSource[0], null, "\t")} </pre> */}
            </CoustomContent>
          </Col>
          <Col span={24}>
            <Ant.Table
              {...defaultValues.TABLE_PROPS}
              columns={c}
              loading={itemsLoading}
              dataSource={dataSource} />
          </Col>
        </Row>
        <Row align="middle"
        gutter={[16, 16]}
      className='absolute inset-x-0 bottom-0'
        >
          <Col sm={24} lg={12} xl={12}>
            <CoustomContent bordered   >
              {'مبلغ:'}<br></br>{'تخفیف:'}<br></br>{'مالیات'}<br></br>{'درصد تخفیف'}<br></br>{'مبلغ نهایی'}
            </CoustomContent>
          </Col>
          <Col span={24} md={12} >
            <CoustomContent bordered   >
              {'جمع'}
            </CoustomContent>
          </Col>
        </Row>
      </CoustomContent>
    </>
  );
};

export default EditSaleDoc;

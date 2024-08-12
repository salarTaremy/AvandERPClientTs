import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
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
  const c = [
    {
      title: "productCode",
      dataIndex: "productCode",
      width: 100,
    },
    {
      title: "productName",
      dataIndex: "productName",
      width: 100,
    },
    {
      title: "productUnitId",
      dataIndex: "productUnitId",
      width: 100,
    },
    {
      title: "productUnitName",
      dataIndex: "productUnitName",
      width: 100,
    },
    {
      title: "batchNumber",
      dataIndex: "batchNumber",
      width: 100,
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      width: 100,
    },
    {
      title: "unitPrice",
      dataIndex: "unitPrice",
      width: 100,
    },
    {
      title: "discount",
      dataIndex: "discount",
      width: 100,
    },
    {
      title: "taxTotal",
      dataIndex: "taxTotal",
      width: 100,
    },
    {
      title: "consumerPrice",
      dataIndex: "consumerPrice",
      width: 100,
    },
  ];

  return (
    <>
      <CoustomContent height={700}>
        <CoustomContent bordered>
          {"نام مشتری"}
          <br />
          {"نام مشتری"}
          {/* <pre>
    {dataSource && JSON.stringify(dataSource[0], null, "\t")}
  </pre> */}
        </CoustomContent>

        <Ant.Table
          className=""
          {...defaultValues.TABLE_PROPS}
          columns={c}
          loading={itemsLoading}
          dataSource={dataSource}
        />
        <CoustomContent className="absolute bottom-0" bordered>
          <div>
            <p>{"جمع"}</p>
          </div>
        </CoustomContent>
      </CoustomContent>
    </>
  );
};

export default EditSaleDoc;

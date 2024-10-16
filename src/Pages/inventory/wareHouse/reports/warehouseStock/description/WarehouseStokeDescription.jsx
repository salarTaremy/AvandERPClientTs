import React, { useEffect, useState } from "react";
import qs from "qs";
import PropTypes from "prop-types";
import * as Ant from "antd";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import * as defaultValues from "@/defaultValues";
import * as url from "@/api/url";
import ModalHeader from "@/components/common/ModalHeader";
import CustomContent from "@/components/common/CustomContent";
//====================================================================
//                        Declaration
//====================================================================
const WarehouseStokeDescription = (props) => {
  const { productId, warehouseId, batchNumberId, id } = props;
  const [dataSource, setDataSource] = useState(null);
  const [
    productKardexData,
    productKardexLoading,
    productKardexError,
    ProductKardexApiCall,
  ] = useFetchWithHandler();
  useRequestManager({ error: productKardexError });
  const getDocumentTypeProp = (documentTypeNature) => {
    switch (documentTypeNature) {
      case 1:
        return {
          color: "green",
          title: "وارده",
          className: "text-green-600",
          operator: " +",
        };
      case -1:
        return {
          color: "red",
          title: "صادره",
          className: "text-red-600",
          operator: " -",
        };
      default:
        return { color: "blue", title: "خنثی", className: "", operator: "" };
    }
  };

  const columns = [
    {
      title: "شماره سند",
      dataIndex: "documentNumber",
      key: "documentNumber",
      align: "center",
      width: 80,
    },
    {
      title: "تاریخ و زمان صدور",
      dataIndex: "issueDate",
      key: "issueDate",
      width: 200,
      align: "center",
      render: (text, record) =>
        `${record.issueTime.substr(0, 8)} - ${record.issueDate} `,
    },
    {
      title: "شرح",
      dataIndex: "inventoryDocumentTypeName",
      key: "inventoryDocumentTypeName",
      width: 200,
      className: "text-xs sm:text-sm",
      render: (text, record, index) => {
        return (
          <>
            {record?.inventoryDocumentTypeName}{" "}
            {record?.isReserve && (
              <Ant.Tag bordered={false} color={"orange"}>
                {"رزرو"}
              </Ant.Tag>
            )}
          </>
        );
      },
    },
    {
      title: "تعداد",
      dataIndex: "quantity",
      key: "quantity",
      width: 80,
      className: "text-xs sm:text-sm",
      render: (text, record, index) => {
        return (
          <>
            <Ant.Typography.Text
              className={
                getDocumentTypeProp(record?.documentTypeNature).className
              }
            >
              {record.quantity}
              {getDocumentTypeProp(record?.documentTypeNature).operator}
            </Ant.Typography.Text>
          </>
        );
      },
    },
    {
      title: "مانده",
      dataIndex: "balance",
      key: "balance",
      width: 80,
      className: "text-xs sm:text-sm",
      render: (text, record, index) => {
        return (
          <>
            <Ant.Typography.Text className="text-blue-600">
              {record.balance}
            </Ant.Typography.Text>
          </>
        );
      },
    },
  ];

  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {
    getAllProductKardex();
  }, []);

  useEffect(() => {
    setDataSource(
      (productKardexData?.isSuccess && productKardexData?.data) || null,
    );
  }, [productKardexData]);

  //====================================================================
  //                        Functions
  //====================================================================

  const getAllProductKardex = async () => {
    const queryString = {
      productId: productId,
      warehouseId: warehouseId,
      batchNumberId: batchNumberId,
    };
    console.log(queryString, "queryString");
    await ProductKardexApiCall(
      `${url.PRODUCT_KARDEX}?${qs.stringify(queryString)}`,
    );
  };

  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <ButtonList
        filterCount={filterCount}
        onFilter={() => {
          setOpenFilter(true);
        }}
      />
    );
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"جزئیات موجودی انبار"} />
      <CustomContent>
        <Ant.Table
          {...defaultValues.TABLE_PROPS}
          // title={title}
          columns={columns}
          dataSource={dataSource}
          loading={productKardexLoading}
        />
      </CustomContent>
    </>
  );
};

export default WarehouseStokeDescription;
WarehouseStokeDescription.propTypes = {
  productId: PropTypes.any.isRequired,
  warehouseId: PropTypes.any.isRequired,
  BatchNumberId: PropTypes.any,
};

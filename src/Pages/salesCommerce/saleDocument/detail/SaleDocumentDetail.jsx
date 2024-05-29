import React, { useState, useEffect } from "react";
import * as Ant from "antd";
import qs from "qs";
import * as api from "@/api";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { columns } from "./column";
import DetailProductListDescription from "../../../inventory/product/description/DetailProductListDescription";
import PriceCircularHeaderDescription from "../../priceCircular/priceCircularHeader/description/PriceCircularHeaderDescription";
import SaleDocumentDetailEffectiveFactor from "../effectiveFactor/SaleDocumentDetailEffectiveFactor";
import useRequestManager from "@/hooks/useRequestManager";

//====================================================================
//                        Declaration
//====================================================================
const SaleDocumentDetail = (props) => {
  const { saleDocumentHeaderId } = props;
  const [listData, listLoading, listError, listApiCall] =
    api.useFetchWithHandler();
  const [dataSource, setDataSource] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [modalOpenState, setModalOpenState] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  useRequestManager({ error: listError });
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    fillGrid();
  }, [saleDocumentHeaderId]);

  useEffect(() => {
    setDataSource(listData?.data);
  }, [listData]);
  //====================================================================
  //                        Functions
  //====================================================================
  const fillGrid = async () => {
    const queryString = qs.stringify({
      saleDocumentHeaderId: props.saleDocumentHeaderId,
    });
    await listApiCall(`${url.SALE_DOCUMENT_DETAIL}?${queryString}`);
  };
  const onDelete = (id) => {
    console.log("onDelete: " + id);
  };
  const onEdit = (id) => {
    console.log("onEdit: " + id);
  };
  const onView = (id) => {
    console.log("onView: " + id);
  };
  const onProductView = (productId) => {
    setModalContent(<DetailProductListDescription id={productId} />);
    setModalOpenState(true);
  };
  const onPriceCircularView = (priceCircularId) => {
    setModalContent(
      <PriceCircularHeaderDescription
        priceCircularDetailId={priceCircularId}
      />,
    );
    setModalOpenState(true);
  };
  const onEffectiveFactorDetailView = (
    saleDocDetailId,
    effectiveFactorNature,
  ) => {
    setModalContent(
      <SaleDocumentDetailEffectiveFactor
        saleDocumentDetailId={saleDocDetailId}
        effectiveFactorNature={effectiveFactorNature}
      />,
    );
    setModalOpenState(true);
  };
  const handleTableChange = (pagination, filter, sorter) => {
    setPagination(pagination);
  };
  //====================================================================
  //                        Child Components
  //====================================================================
  const Grid = () => {
    return (
      <>
        <Ant.Modal
          open={modalOpenState}
          centered
          {...defaultValues.MODAL_PROPS}
          {...defaultValues.MODAL_LARGE}
          getContainer={null}
          footer={null}
          onCancel={() => setModalOpenState(false)}
          onOk={() => setModalOpenState(false)}
        >
          {modalContent}
        </Ant.Modal>
        <Ant.Skeleton loading={listLoading}>
          <Ant.Table
            columns={columns(
              onDelete,
              onEdit,
              onView,
              onProductView,
              onPriceCircularView,
              onEffectiveFactorDetailView,
            )}
            dataSource={dataSource}
            pagination={pagination}
            {...defaultValues.TABLE_PROPS}
            onChange={handleTableChange}
          />
        </Ant.Skeleton>
      </>
    );
  };
  //====================================================================
  //                        Component
  //====================================================================
  return <Grid />;
};

export default SaleDocumentDetail;

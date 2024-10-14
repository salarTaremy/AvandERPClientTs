import React, { useState, useEffect } from "react";

import * as api from "@/api";
import * as url from "@/api/url";
import qs from "qs";
import * as Ant from "antd";
import { IoTimeOutline } from "react-icons/io5";
import * as defaultValues from "@/defaultValues";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import CustomContent from "@/components/common/CustomContent";
import CounterpartyInformation from "@/Pages/manageCounterParty/description/CounterpartyInformation";
import BatchNumberDescription from "@/Pages/inventory/batchNumber/description/BatchNumberDescription";
import DetailProductListDescription from "@/Pages/inventory/product/description/DetailProductListDescription";
import InventoryDocumentDescription from "@/Pages/inventory/inventoryDocument/description/InventoryDocumentDescription";
import { theme } from "antd";
const { useToken } = theme;
import { CiInboxOut, CiInboxIn } from "react-icons/ci";

//====================================================================
//                        Declaration
//====================================================================
const ProductKardexDescription = (props) => {
  const { token } = useToken();
  const { id } = props;
  const pageTitle = "سری ساخت";
  const [listDetail, setListDetail] = useState([]);
  const [fetchData, fetchLoading, fetchError, fetchApiCall] =
    api.useFetchWithHandler();
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState({ ...defaultValues.MODAL_LARGE });
  useRequestManager({ error: fetchError });

  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {
    getProductKardDetails();
  }, []);
  useEffect(() => {
    fetchData?.isSuccess && setListDetail(fetchData?.data);
  }, [fetchData]);
  //====================================================================
  //                        Functions
  //====================================================================

  const getProductKardDetails = async () => {
    const queryString = qs.stringify({
      InventoryDocumentDetailId: id,
      PageNumber: 1,
      PageSize: 1,
    });
    await fetchApiCall(`${url.PRODUCT_KARDEX_DETAIL}?${queryString}`);
  };

  const getDocumentTypeProp = (inventoryDocumentTypeNature) => {
    console.log(inventoryDocumentTypeNature, "inventoryDocumentTypeNature");
    switch (inventoryDocumentTypeNature) {
      case 1:
        return "green";
      case -1:
        return "red";
      default:
        return "blue";
    }
  };

  const onBatchNumberView = (batchNumberId) => {
    setModalContent(<BatchNumberDescription id={batchNumberId} />);
    setModalState(true);
  };
  const onCounterpartyView = (counterpartyId) => {
    const updateList = { ...defaultValues.MODAL_LARGE };
    setModalSize(updateList);
    setModalContent(<CounterpartyInformation id={counterpartyId} />);
    setModalState(true);
  };
  const onProductView = (productId) => {
    const updateList = { ...defaultValues.MODAL_LARGE };
    setModalSize(updateList);
    setModalContent(<DetailProductListDescription id={productId} />);
    setModalState(true);
  };
  const onDocumentNumberView = (inventoryDocumentId) => {
    const updateList = { ...defaultValues.MODAL_EXTRA_LARGE };
    setModalSize(updateList);
    setModalContent(<InventoryDocumentDescription id={inventoryDocumentId} />);
    setModalState(true);
  };

  //====================================================================
  //                        Component
  //====================================================================
  //
  return (
    <>
      <Ant.Modal
        open={modalState}
        {...defaultValues.MODAL_PROPS}
        {...modalSize}
        footer={null}
        centered
        onCancel={() => {
          setModalState(false);
        }}
        onOk={() => {
          setModalState(false);
        }}
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Skeleton active loading={fetchLoading}>
        {listDetail?.map((item) => (
          <>
            <ModalHeader title={"جزییات کاردکس تعدادی کالا"} />
            <Ant.Badge.Ribbon
              color={getDocumentTypeProp(item?.inventoryDocumentTypeNature)}
              text={` ${item?.inventoryDocumentTypeName}`}
            >
              <CustomContent bordered>
                <Ant.Row>
                  <Ant.Col xs={24} sm={4} md={4} lg={4}>
                    <Ant.Space
                      direction="vertical"
                      align="center"
                      size="middle"
                    >
                      <Ant.Badge
                        color="orange"
                        count={(item.isReserve === true && "رزرو") || ""}
                      >
                        <Ant.Avatar
                          shape="square"
                          size={{
                            xs: 32,
                            sm: 50,
                            md: 64,
                            lg: 64,
                            xl: 64,
                            xxl: 64,
                          }}
                          style={{
                            backgroundColor: getDocumentTypeProp(
                              item?.inventoryDocumentTypeNature,
                            ),
                          }}
                          icon={
                            item?.inventoryDocumentTypeNature == 1 ? (
                              <CiInboxIn />
                            ) : (
                              <CiInboxOut />
                            )
                          }
                        />
                      </Ant.Badge>
                      <Ant.Space direction="horizontal">
                        <Ant.Badge
                          color={(item?.isConfirm && "green") || "red"}
                        />
                        <Ant.Typography.Text type="secondary">
                          {(item?.isConfirm && "تایید شده ") || "تایید نشده"}
                        </Ant.Typography.Text>
                      </Ant.Space>
                    </Ant.Space>
                  </Ant.Col>
                  <Ant.Col xs={24} sm={20} md={20} lg={20}>
                    <Ant.Row gutter={[8, 16]}>
                      <Ant.Col span={24}>
                        <Ant.Typography.Text>
                          {"نام انبار"} : {item?.warehouseName}
                        </Ant.Typography.Text>
                      </Ant.Col>

                      <Ant.Col xs={24} sm={24} md={12} lg={12}>
                        <Ant.Space direction="vertical">
                          <Ant.Typography.Text type="secondary">
                            {"تعداد"}
                            <Ant.Typography.Text className="text-green-600">
                              : {item?.quantity} +
                            </Ant.Typography.Text>
                          </Ant.Typography.Text>
                          <Ant.Typography.Text type="secondary">
                            {"مانده"} :
                            <Ant.Typography.Text>
                              {" "}
                              {item?.balance}
                            </Ant.Typography.Text>
                          </Ant.Typography.Text>
                          <Ant.Typography.Text type="secondary">
                            {"نام طرف حساب"} :
                            <Ant.Typography.Link
                              onClick={() =>
                                onCounterpartyView(item?.counterpartyId)
                              }
                            >
                              {item?.counterpartyName}
                            </Ant.Typography.Link>
                          </Ant.Typography.Text>

                          <Ant.Space direction="horizontal">
                            <Ant.Typography.Text type="secondary">
                              {"تاریخ صدور"} : {item?.issueDate}
                            </Ant.Typography.Text>
                            <Ant.Typography.Text type="secondary">
                              <IoTimeOutline className="text-orange-400" />{item?.issueTime.substr(0, 8)}
                            </Ant.Typography.Text>
                          </Ant.Space>

                          <Ant.Typography.Text type="secondary">
                            {"واحد "} :{item?.productUnitTypeName} {"/"}{" "}
                            {item?.productUnitName}
                          </Ant.Typography.Text>
                          <Ant.Typography.Text type="secondary">
                            {"سری ساخت"} :
                            <Ant.Typography.Link
                              onClick={() =>
                                onBatchNumberView(item?.batchNumberId)
                              }
                            >
                              {item?.batchNumber}
                            </Ant.Typography.Link>
                          </Ant.Typography.Text>
                          <Ant.Typography.Text type="secondary">
                            {"شماره برگه"} :
                            <Ant.Typography.Link
                              onClick={() =>
                                onDocumentNumberView(item?.inventoryDocumentId)
                              }
                            >
                              {item?.documentNumber}
                            </Ant.Typography.Link>
                          </Ant.Typography.Text>
                        </Ant.Space>
                      </Ant.Col>
                      <Ant.Col xs={24} sm={24} md={12} lg={12}>
                        <Ant.Space direction="vertical">
                          <Ant.Typography.Text type="secondary">
                            {"نام کالا"} :
                            <Ant.Typography.Link
                              onClick={() => onProductView(item?.productId)}
                            >
                              {" "}
                              {item?.productName}
                            </Ant.Typography.Link>
                          </Ant.Typography.Text>
                          <Ant.Typography.Text type="secondary">
                            {"نام دوم کالا"} : {item?.productSecondName}
                          </Ant.Typography.Text>
                          <Ant.Typography.Text type="secondary">
                            {"نام لاتین کالا"} : {item?.productLatinName}
                          </Ant.Typography.Text>
                          <Ant.Typography.Text type="secondary">
                            {" کد کالا"} : {item?.productCode}
                          </Ant.Typography.Text>
                          <Ant.Typography.Text type="secondary">
                            {" کد دوم کالا "} : {item?.productSecondCode}
                          </Ant.Typography.Text>
                        </Ant.Space>
                      </Ant.Col>
                    </Ant.Row>
                  </Ant.Col>
                </Ant.Row>
              </CustomContent>
            </Ant.Badge.Ribbon>
          </>
        ))}
      </Ant.Skeleton>
    </>
  );
};

export default ProductKardexDescription;

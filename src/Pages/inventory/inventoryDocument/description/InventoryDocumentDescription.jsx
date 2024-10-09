import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import * as uuid from "uuid";
import { useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import { IoDocumentTextSharp } from "react-icons/io5";
import { documentDetailColumns } from "../detail/add/documentDetailColumns";
import DetailProductListDescription from "@/Pages/inventory/Product/description/DetailProductListDescription";
import BatchNumberDescription from "@/Pages/inventory/batchNumber/description/BatchNumberDescription";
import CounterpartyInformation from "@/Pages/manageCounterParty/description/CounterpartyInformation";

//====================================================================
//                        Declaration
//====================================================================
const InventoryDocumentDescription = ({ id }) => {
  const [fetchedData, fetchLoading, fetchError] = useFetch(
    `${url.INVENTORY_DOCUMENT}/${id}`,
  );

  const [modalOpenState, setModalOpenState] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [documentDetailDataSource, setDocumentDetailDataSource] = useState([]);

  useRequestManager({
    data: fetchedData,
    loading: fetchLoading,
    error: fetchError,
  });
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    if (fetchedData?.isSuccess) {
      if (fetchedData?.data?.documentDetails) {
        setDocumentDetailDataSource(fetchedData?.data?.documentDetails);
      }
    }
  }, [fetchedData]);
  //====================================================================
  //                        Functions
  //====================================================================
  const onCounterpartyView = () => {
    setModalContent(
      <CounterpartyInformation id={fetchedData?.data?.counterpartyId} />,
    );
    setModalOpenState(true);
  };

  const onProductView = (productId) => {
    setModalContent(
      <DetailProductListDescription id={productId} key={uuid.v1()} />,
    );
    setModalOpenState(true);
  };

  const onBatchNumberView = (batchNumberId) => {
    setModalContent(
      <BatchNumberDescription id={batchNumberId} key={uuid.v1()} />,
    );
    setModalOpenState(true);
  };

  const descriptionItems = [
    {
      label: "شماره عطف",
      children: `${fetchedData?.data?.folioReferenceNumber ?? "-"}`,
    },
    {
      label: "زمان صدور",
      children: `${fetchedData?.data?.issueDate} - ${fetchedData?.data?.issueTime}`,
    },
    {
      label: "انبار",
      children: fetchedData?.data?.warehouseName,
    },
    {
      label: "انبار مقابل",
      children: `${fetchedData?.data?.oppositeWarehouseName ?? "-"}`,
    },
    {
      label: "طرف حساب",
      children:
        (fetchedData?.data?.counterpartyTitle && (
          <Ant.Typography.Link onClick={onCounterpartyView}>
            {fetchedData?.data?.counterpartyTitle}
          </Ant.Typography.Link>
        )) ||
        "-",
    },
    {
      label: "طرف حساب دوم",
      children:
        (fetchedData?.data?.secondCounterpartyTitle && (
          <Ant.Typography.Link>
            {fetchedData?.data?.secondCounterpartyTitle}
          </Ant.Typography.Link>
        )) ||
        "-",
    },
    {
      label: "شرح",
      children: `${fetchedData?.data?.description ?? "-"}`,
    },
  ];
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Skeleton loading={fetchLoading} active>
        <ModalHeader
          title={`${fetchedData?.data?.documentType} شماره ${fetchedData?.data?.documentNumber}`}
          icon={<IoDocumentTextSharp />}
        />
        <Ant.Modal
          centered
          {...defaultValues.MODAL_LARGE}
          open={modalOpenState}
          getContainer={null}
          footer={null}
          onCancel={() => setModalOpenState(false)}
        >
          {modalContent}
        </Ant.Modal>

        <Ant.Row gutter={[4, 16]}>
          <Ant.Col xs={24} sm={24} md={24} lg={24}>
            <Ant.Card>
              <Ant.Descriptions
                items={descriptionItems}
                bordered={false}
                size="small"
                column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 }}
              />
            </Ant.Card>
          </Ant.Col>
          <Ant.Col xs={24} sm={24} md={24} lg={24}>
            <Ant.Card bordered style={{ overflow: "auto", height: "50vh" }}>
              <Ant.Table
                columns={documentDetailColumns(
                  null,
                  onProductView,
                  onBatchNumberView,
                )}
                dataSource={documentDetailDataSource}
                {...defaultValues.TABLE_PROPS}
                size="middle"
                bordered={false}
              />
            </Ant.Card>
          </Ant.Col>
        </Ant.Row>
      </Ant.Skeleton>
    </>
  );
};

InventoryDocumentDescription.propTypes = {
  id: PropTypes.number.isRequired,
};

export default InventoryDocumentDescription;

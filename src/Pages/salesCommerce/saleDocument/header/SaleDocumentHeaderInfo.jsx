import { useEffect, useState } from "react";
import * as Ant from "antd";
import { Typography } from "antd";
import CustomerDescription from "../../../salesCommerce/basicInformation/CustomerManagement/description/CustomerDescription";
import SaleDocumentDescription from "../description/SaleDocumentDescription";
import * as defaultValues from "@/defaultValues";
import ModalHeader from "@/components/common/ModalHeader";
//====================================================================
//                        Declaration
//====================================================================
const SaleDocumentHeaderInfo = (props) => {
  const { id, saleDocumentData, loading, className } = props;
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const title = `${saleDocumentData?.saleDocumentType} شماره ${saleDocumentData?.documentNumber}`;
  const referenceDocumentId = saleDocumentData?.referenceId;
  const referenceDocumentNumber =
    saleDocumentData?.referenceDocumentNumber !== 0 ? (
      <Typography.Link
        onClick={() => {
          onViewReferenceDocument(referenceDocumentId);
        }}
      >
        {`${saleDocumentData?.referenceDocumentType} شماره ${saleDocumentData?.referenceDocumentNumber}`}
      </Typography.Link>
    ) : (
      "-"
    );
  const borderedItems = [
    {
      key: "1",
      label: "شماره سریال",
      children: saleDocumentData?.serialNumber,
    },
    {
      key: "2",
      label: "برگه مرجع",
      children: referenceDocumentNumber,
    },
    {
      key: "3",
      label: "کانال فروش",
      children: saleDocumentData?.saleChannel,
    },
    {
      key: "4",
      label: "نام شعبه",
      children: saleDocumentData?.branchName,
    },
    {
      key: "6",
      label: "مشتری",
      children: (
        <Typography.Link
          onClick={() => onViewCustomer(saleDocumentData.customerId)}
        >
          {saleDocumentData?.customerName}
        </Typography.Link>
      ),
    },
    {
      key: "5",
      label: "زمان صدور",
      children: saleDocumentData?.issueDateTimeString,
    },
  ];

  const onViewCustomer = (id) => {
    setModalContent(<CustomerDescription id={id} />);
    setModalState(true);
  };
  const onViewReferenceDocument = (referenceDocumentId) => {
    setModalContent(<SaleDocumentDescription id={referenceDocumentId} />);
    setModalState(true);
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Modal
        {...defaultValues.MODAL_PROPS}
        {...defaultValues.MODAL_EXTRA_LARGE}
        open={modalState}
        centered
        getContainer={null}
        footer={null}
        onCancel={() => {
          setModalState(false);
        }}
        onOk={() => {
          setModalState(false);
        }}
      >
        {modalContent}
      </Ant.Modal>

      <Ant.Skeleton loading={loading}>
        <ModalHeader title={title} />
        <Ant.Descriptions
          bordered={false}
          layout="horizontal"
          size="small"
          items={borderedItems}
          className={className}
        />
      </Ant.Skeleton>
    </>
  );
};

export default SaleDocumentHeaderInfo;

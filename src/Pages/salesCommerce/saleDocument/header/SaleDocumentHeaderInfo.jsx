import { useEffect, useState } from "react";
import * as Ant from "antd";
import { Typography } from "antd";
import CustomerDescription from "../../../salesCommerce/basicInformation/CustomerManagement/description/CustomerDescription";
import * as defaultValues from "@/defaultValues";
//====================================================================
//                        Declaration
//====================================================================
const SaleDocumentHeaderInfo = (props) => {
  const { id, saleDocumentData, loading, className } = props;
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const title = `${saleDocumentData?.saleDocumentType} شماره ${saleDocumentData?.documentNumber}`;
  const referenceDocumentNumber =
    saleDocumentData?.referenceDocumentNumber !== 0 ? (
      <Typography.Link href="#">{`${saleDocumentData?.referenceDocumentType} شماره ${saleDocumentData?.referenceDocumentNumber}`}</Typography.Link>
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
      ), //customerId
    },
    {
      key: "5",
      label: "زمان صدور",
      children: saleDocumentData?.issueDateTimeString,
    },
  ];

  const onViewCustomer = (id) => {
    console.log(id, "hahahahaj");
    setModalContent(<CustomerDescription id={id} />);

    setModalState(true);
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Modal
        {...defaultValues.MODAL_PROPS}
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
        <Ant.Descriptions
          bordered={false}
          layout="horizontal"
          title={title}
          size="small"
          items={borderedItems}
          className={className}
        />
      </Ant.Skeleton>
    </>
  );
};

export default SaleDocumentHeaderInfo;
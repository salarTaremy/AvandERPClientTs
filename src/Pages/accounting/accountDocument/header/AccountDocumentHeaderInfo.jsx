import React from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import ModalHeader from "@/components/common/ModalHeader";

//====================================================================
//                        Declaration
//====================================================================
const AccountDocumentHeaderInfo = (props) => {
  const { id, accountDocumentData } = props;

  const borderedItems = [
    {
      key: "1",
      label: "شناسه",
      children: accountDocumentData?.data?.id,
    },
    {
      key: "2",
      label: "شماره عطف",
      children: accountDocumentData?.data?.inflectionNumber,
    },
    {
      key: "3",
      label: "شماره فرعی",

      children: accountDocumentData?.data?.subNumber,
    },
    {
      key: "4",
      label: "شماره روزانه",

      children: accountDocumentData?.data?.dailyNumber,
    },
    {
      key: "6",
      label: "نام شعبه",
      children: accountDocumentData?.data?.branchName,
    },
    {
      key: "7",
      label: "نام وضعیت ",
      children: accountDocumentData?.data?.stateName,
    },
    {
      key: "8",
      label: "نوع سند",
      children: accountDocumentData?.data?.typeName,
    },
    {
      key: "9",
      label: "تاریخ",
      children: accountDocumentData?.data?.persianDateTilte,
    },
  ];

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>

      <ModalHeader title={"مشاهده سند حسابداری"} />
      <Ant.Descriptions bordered={false} size="small" items={borderedItems} />
    </>
  );
};
export default AccountDocumentHeaderInfo;
AccountDocumentHeaderInfo.propTypes = {
  id: PropTypes.number,
};

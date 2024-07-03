import React from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import { HiDocumentSearch } from "react-icons/hi";

//====================================================================
//                        Declaration
//====================================================================
const AccountDocumentHeader = (props) => {
  const { id } = props;
  const [data, loading, error] = api.useFetch(`${url.ACCOUNT_DOCUMENT}/${id}`);
  useRequestManager({ error: error });
  const borderedItems = [
    {
      key: "1",
      label: "شناسه",
      children: data?.data?.id,
    },
    {
      key: "2",
      label: "شماره عطف",
      children: data?.data?.inflectionNumber,
    },
    {
      key: "3",
      label: "شماره فرعی",

      children: data?.data?.subNumber,
    },
    {
      key: "4",
      label: "شماره روزانه",

      children: data?.data?.dailyNumber,
    },
    {
      key: "6",
      label: "نام شعبه",
      children: data?.data?.branchName,
    },
    {
      key: "7",
      label: "نام وضعیت ",
      children: data?.data?.stateName,
    },
    {
      key: "8",
      label: "نوع سند",
      children: data?.data?.typeName,
    },
    {
      key: "9",
      label: "تاریخ",
      children: data?.data?.persianDateTilte,
    },
  ];

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Skeleton active={true} loading={loading}>
        <ModalHeader title={"مشاهده سند حسابداری"} icon={<HiDocumentSearch />} />
        <Ant.Descriptions bordered={false} size="small" items={borderedItems} />
      </Ant.Skeleton>
    </>
  );
};
export default AccountDocumentHeader;
AccountDocumentHeader.propTypes = {
  id: PropTypes.number,
};

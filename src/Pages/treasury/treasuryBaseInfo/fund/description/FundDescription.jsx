import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import { MdDescription } from "react-icons/md";

//====================================================================
//                        Declaration
//====================================================================
const FundDescription = (props) => {
  const { id } = props;
  const [data, loading, error] = api.useFetch(`${url.FUND}/${id}`);
  useRequestManager({ error: error });
  const borderedItems = [
    {
      key: "1",
      label: "شناسه",
      span: 4,
      children: data?.data?.id,
    },
    {
      key: "2",
      label: " کد ",
      span: 4,
      children: data?.data?.code,
    },
    {
      key: "3",
      label: "نام ",
      span: 4,
      children: data?.data?.name,
    },
    {
      key: "4",
      label: "نام انگلیسی",
      span: 4,
      children: data?.data?.latinName,
    },
    {
      key: "5",
      label: "حساب",
      span: 4,
      children: data?.data?.accountName,
    },
    {
      key: "6",
      label: "حساب تفصیلی",
      span: 4,
      children: data?.data?.detailedAccountName,
    },
    {
      key: "7",

      label: "مسئول صندوق",
      span: 4,
      children: data?.data?.cashierEmploeeName,
    },
    {
      key: "7",

      label: " تاریخ",
      span: 4,
      children: data?.data?.openingDateTitle,
    },
    ,
  ];

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Skeleton active loading={loading}>
      <ModalHeader title={"جزئیات صندوق"} icon={<MdDescription />} />
      <Ant.Descriptions  bordered items={borderedItems} />
    </Ant.Skeleton>
  );
};
export default FundDescription;
FundDescription.propTypes = {
  id: PropTypes.number,
};

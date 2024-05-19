import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";

//====================================================================
//                        Declaration
//====================================================================
const CustomerDescription = (props) => {
  const { id } = props;
  const [data, loading, error] = api.useFetch(`${url.CUSTOMER}/${id}`);
  useRequestManager({ error: error });
  const borderedItems = [
    {
      key: "1",
      label: "شناسه",
      children: data?.data?.id,
    },
    {
      key: "2",
      label: " کد ",
      children: data?.data?.code,
    },
    {
      key: "3",
      label: "کد دوم",
      children: data?.data?.secondCode,
    },
    {
      key: "4",
      label: " نام ",
      children: data?.data?.firstName,
    },
    {
      key: "5",
      label: "نام خانوادگی",
      children: data?.data?.lastName,
    },
    {
      key: "6",
      label: "طرف حساب های مرتبط",
      children: data?.data?.relatedCounterpartyName,
    },
    {
      key: "7",
      label: " نوع طرف حساب ",
      children: data?.data?.counterpartyTypeTitle,
    },
    {
      key: "8",
      label: " عنوان شرکت ",
      children: data?.data?.companyTitle,
    },
    {
      key: "9",
      label: "نام شعبه",
      children: data?.data?.branchName,
    },
    {
      key: "10",
      label: "نوع فروش ",
      children: data?.data?.typeName,
    },
    {
      key: "11",
      label: "رتبه مشتری",
      children: data?.data?.gradeName,
    },
    {
      key: "12",
      label: "نام گروه",
      children: data?.data?.groupName,
    },

    ,
  ];

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Skeleton active={true} loading={loading}>
      <Ant.Descriptions
        bordered
        // layout="vertical"
        title={"جزئیات مشتری"}
        size={"middle"}
        items={borderedItems}
      />
    </Ant.Skeleton>
  );
};
export default CustomerDescription;
CustomerDescription.propTypes = {
  id: PropTypes.number,
};

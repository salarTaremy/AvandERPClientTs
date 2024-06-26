import React from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";

//====================================================================
//                        Declaration
//====================================================================
const BrandDescription = (props) => {
  const { id } = props;
  const [data, loading, error] = api.useFetch(`${url.BRAND}/${id}`);
  useRequestManager({ error: error });
  const borderedItems = [
    {
      key: "1",
      label: "شناسه",
      span: 3,
      children: data?.data?.id,
    },
    {
      key: "2",
      label: "کد ",
      span: 3,
      children: data?.data?.code,
    },
    {
      key: "3",
      label: "نام برند ",
      span: 3,
      children: data?.data?.name,
    },
    {
      key: "4",
      label: "کد تأمین کننده",
      span: 3,
      children: data?.data?.supplierId,
    },
    {
      key: "5",
      label: "نام تأمین کننده",
      span: 3,
      children: data?.data?.supplierName,
    },
    {
      key: "6",
      label: "تعداد محصولات",
      span: 3,
      children: data?.data?.productCount,
    },
  ];

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Skeleton active={true} loading={loading}>
      <ModalHeader title={"جزئیات برند"} />
      <Ant.Descriptions bordered items={borderedItems} />
    </Ant.Skeleton>
  );
};
export default BrandDescription;
BrandDescription.propTypes = {
  id: PropTypes.number,
};

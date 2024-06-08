import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";

//====================================================================
//                        Declaration
//====================================================================
const DetailedAccountGroupDescription = (props) => {
  const { id } = props;
  const [data, loading, error] = api.useFetch(
    `${url.DETAILED_ACCOUNT_GROUP}/${id}`,
  );
  useRequestManager({ error: error });
  const borderedItems = [
    {
      key: "1",
      label: "شناسه",
      children: data?.data?.id,
    },
    {
      key: "2",
      label: " کد کامل",
      children: data?.data?.code,
    },
    {
      key: "3",
      label: "کد گروه تفصیل",
      children: data?.data?.detailedAccountCount,
    },

    {
      key: "4",
      label: "نام گروه",
      span: 3,
      children: data?.data?.name,
    },
    {
      key: "5",
      label: "نام دوم گروه",
      span: 3,
      children: data?.data?.secondName,
    },
    {
      key: "6",
      label: "توضیحات",
      children: data?.data?.description,
    },
  ];

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Skeleton active={true} loading={loading}>
      <ModalHeader title={"جزئیات گروه تفصیل"} />
      <Ant.Descriptions
        bordered
        // layout="vertical"
        size={"middle"}
        items={borderedItems}
      />
    </Ant.Skeleton>
  );
};
export default DetailedAccountGroupDescription;
DetailedAccountGroupDescription.propTypes = {
  id: PropTypes.number,
};

import React from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import { MdDescription } from "react-icons/md";
const DetailProductListDescription = (props) => {
  const { id } = props;
  const [data, loading, error] = api.useFetch(`${url.PRODUCT}/${id}`);
  useRequestManager({ error: error });
  const borderedItems = [
    {
      key: "1",
      label: "شناسه",
      children: data?.data?.id,
      span: 2,
    },
    {
      key: "2",
      label: "کد",
      children: data?.data?.code,
      span: 2,
    },
    {
      key: "3",
      label: "کد دوم",
      children: data?.data?.secondCode,
      span: 2,
    },
    // {
    //   key: '4',
    //   label: 'شناسه نوع',
    //   children: data?.data?.typeId,
    //   span:2

    // },
    // {
    //   key: '5',
    //   label: 'شناسه جزئیات ماهیت',
    //   children: data?.data?.natureDetailId,
    //   span:6

    // },
    {
      key: "6",
      label: "برند",
      children: data?.data?.brandName,
      span: 6,
    },
    {
      key: "7",
      label: "نام کالا",
      children: data?.data?.name,
      span: 6,
    },
    {
      key: "8",
      label: "نام دوم کالا",
      children: data?.data?.secondName,
      span: 6,
    },
  ];
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Skeleton active  loading={loading}>
      <ModalHeader title={"جزئیات کالا/خدمات"} icon={<MdDescription />}/>
      <Ant.Descriptions bordered items={borderedItems} />
    </Ant.Skeleton>
  );
};

export default DetailProductListDescription;
DetailProductListDescription.propTypes = {
  id: PropTypes.number,
};

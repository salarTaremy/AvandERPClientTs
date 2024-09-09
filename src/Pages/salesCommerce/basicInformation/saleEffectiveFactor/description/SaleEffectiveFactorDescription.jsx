import React from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import { MinusCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons";
import ModalHeader from "@/components/common/ModalHeader";
import { MdDescription } from "react-icons/md";
//====================================================================
//                        Declaration
//====================================================================
const SaleEffectiveFactorDescription = (props) => {
  const { id } = props;
  const [data, loading, error] = api.useFetch(
    `${url.SALE_EFFECTIVE_FACTOR}/${id}`,
  );
  useRequestManager({ error: error });
  const allowEditText = data?.data?.allowEdit ? (
    <Ant.Tag color={"green"} bordered={false}>{"بله"}</Ant.Tag>
  ) : (
    <Ant.Tag color={"red"} bordered={false}>{"خیر"}</Ant.Tag>
  );

  const descriptionItems = [
    {
      key: "1",
      label: "نام ",
      span: 12,
      children: data?.data?.name,
    },
    {
      key: "2",
      label: "نوع",
      span: 12,
      children: (
        <>
          <Ant.Space>
            {data?.data?.saleEffectiveOperativeTypeNature == 1 && (
              <PlusCircleTwoTone twoToneColor="#52c41a" />
            )}
            {data?.data?.saleEffectiveOperativeTypeNature == -1 && (
              <MinusCircleTwoTone twoToneColor="#eb2f96" />
            )}
            <span>{data?.data?.saleEffectiveOperativeType}</span>
          </Ant.Space>
        </>
      ),
    },
    {
      key: "3",
      label: "مقدار درصدی",
      span: 6,
      children: data?.data?.percentage,
    },
    {
      key: "4",
      label: "مقدار ریالی",
      span: 6,
      children: data?.data?.amount,
    },
    {
      key: "5",
      label: "توضیحات",
      span: 6,
      children: data?.data?.description,
    },
    {
      key: "6",
      label: "مجاز به ویرایش",
      span: 6,
      children: allowEditText,
    },
  ];

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Skeleton active  loading={loading}>
      <ModalHeader title={"جزئیات عامل موثر بر برگه فروش"} icon={<MdDescription />} />
      <Ant.Descriptions bordered layout="horizontal" items={descriptionItems} />
    </Ant.Skeleton>
  );
};
export default SaleEffectiveFactorDescription;
SaleEffectiveFactorDescription.propTypes = {
  id: PropTypes.number,
};

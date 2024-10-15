import React from "react";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import { MdDescription } from "react-icons/md";
import * as defaultValues from "@/defaultValues";
import SupplierDescription from "@/Pages/inventory/supplier/description/SupplierDescription.jsx"
//====================================================================
//                        Declaration
//====================================================================

const BrandDescription = (props) => {
  const { id } = props;
  const [modalContent, setModalContent] = useState();
  const [modalState, setModalState] = useState(false);
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
      label: "برند ",
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

      children: (
        <Ant.Typography.Link
          onClick={() => onViewSupplier(data?.data?.supplierId)}
        >
          {data?.data?.supplierName}
        </Ant.Typography.Link>
      ),
    },
    {
      key: "6",
      label: "تعداد محصولات",
      span: 3,
      children: data?.data?.productCount,
    },
  ];

  //====================================================================
  //                        Functions
  //====================================================================

  const onViewSupplier = (brandId) => {
    setModalContent(<SupplierDescription id={brandId} />);
    setModalState(true);
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Modal
        open={modalState}
        {...defaultValues.MODAL_PROPS}
        footer={null}
        centered
        onCancel={() => {
          setModalState(false);
        }}
        onOk={() => {
          setModalState(false);
        }}
      >
        {modalContent}
      </Ant.Modal>

      <Ant.Skeleton active loading={loading}>
        <ModalHeader title={"جزئیات برند"} icon={<MdDescription />} />
        <Ant.Descriptions bordered items={borderedItems} />
      </Ant.Skeleton>
    </>
  );
};
export default BrandDescription;
BrandDescription.propTypes = {
  id: PropTypes.number,
};

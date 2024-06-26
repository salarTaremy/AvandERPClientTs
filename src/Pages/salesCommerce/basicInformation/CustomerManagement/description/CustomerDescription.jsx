import React, { useState } from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import * as uuid from "uuid";
import { Typography } from "antd";
import { useFetchWithHandler } from "@/api";
import * as defaultValues from "@/defaultValues";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import HeaderCounterParty from "@/Pages/manageCounterParty/description/HeaderCounterParty";
import FormEditCounterParty from "@/Pages/manageCounterParty/edit/FormEditCounterParty";

//====================================================================
//                        Declaration
//====================================================================
const CustomerDescription = (props) => {
  const { id,onSuccess } = props;
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState({ ...defaultValues.MODAL_LARGE });
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
      children: (
        <Typography.Link
          onClick={() => onViewCounterparty(data?.data?.relatedCounterpartyName)}
        >
          {data?.data?.relatedCounterpartyName}
        </Typography.Link>
      ),
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
  ];

  const onSuccessEdit = () => {
    setModalState(false);
    onSuccess()
  };

  const onHeaderEdit = (data) => {
    setModalContent(
      <FormEditCounterParty
        onSuccess={onSuccessEdit}
        key={uuid.v1()}
        id={(data.counterpartyId)}
      />
    );
    setModalState(true);
  }

  const onViewCounterparty = () => {
    setModalContent(<HeaderCounterParty data={data} onHeaderEdit={onHeaderEdit} />);
    setModalState(true);
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Modal
        open={modalState}
        handleCancel={() => setModalState(false)}
        onCancel={() => {
          setModalState(false);
        }}
        footer={null}
        {...defaultValues.MODAL_PROPS}
        {...modalSize}
      >
        {modalContent}
      </Ant.Modal>
      <ModalHeader title={"جزئیات مشتری"} />
      <Ant.Skeleton active={true} loading={loading}>
        <Ant.Descriptions
          bordered
          layout="vertical"
          size={"middle"}
          items={borderedItems}
        />
      </Ant.Skeleton>
    </>
  );
};
export default CustomerDescription;
CustomerDescription.propTypes = {
  id: PropTypes.number,
};

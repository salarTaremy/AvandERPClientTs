import React, { useState } from "react";
import * as Ant from "antd";
import * as defaultValues from "@/defaultValues";
import ModalHeader from "@/components/common/ModalHeader";
import ButtonList from "@/components/common/ButtonList";

const HeaderCounterParty = ({ data, onHeaderEdit, id }) => {
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();
  const borderedItems = [
    {
      key: "1",
      label: "کد",
      children: data?.data?.code,
    },
    {
      key: "2",
      label: "نام",
      children: data?.data?.firstName,
    },
    {
      key: "3",
      label: "نام خانوادگی",
      children: data?.data?.lastName,
    },
    {
      key: "4",
      label: "نام پدر",
      children: data?.data?.fatherName,
    },
    {
      key: "5",
      label: "نام حساب تفصیل",
      children: data?.data?.detailedAccountName,
    },
    {
      key: "6",
      label: "کد ملی",
      children: data?.data?.nationalCode,
    },
    {
      key: "6",
      label: "شماره شناسنامه",
      children: data?.data?.birthCertificateNumber,
    },
    {
      key: "7",
      label: "تاریخ تولد",
      children: data?.data?.birthDate,
    },
    {
      key: "8",
      label: "کد اقتصادی",
      children: data?.data?.economicCode,
    },
    {
      key: "8",
      label: "شناسه ملی",
      children: data?.data?.legalEntityIdentity,
    },
    {
      key: "9",
      label: " ایمیل",
      children: data?.data?.email,
    },
  ];

  return (
    <>

      <ModalHeader title={"جزئیات طرف حساب"} />
      <Ant.Modal
        {...defaultValues.MODAL_PROPS}
        open={modalState}
        handleCancel={() => setModalState(false)}
        onCancel={() => {
          setModalState(false);
        }}
        footer={null}
        centered
      >
        {modalContent}
      </Ant.Modal>
      <ButtonList
        className='mt-2'
        editTooltip='ویرایش طرف حساب'
        onEdit={() => {
          onHeaderEdit(data?.data)
        }}
      >

      </ButtonList>

      {data?.data == null ? (
        <Ant.Skeleton loading={true} className="w-11/12 h-full " />
      ) : (
        <Ant.Descriptions
          bordered
          layout="vertical"
          size={"middle"}
          items={borderedItems}
          className="mt-4"
        />
      )}
    </>
  );
};
export default HeaderCounterParty;

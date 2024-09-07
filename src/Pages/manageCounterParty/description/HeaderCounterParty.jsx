import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as defaultValues from "@/defaultValues";
import ModalHeader from "@/components/common/ModalHeader";
import ButtonList from "@/components/common/ButtonList";
import { MdDescription } from "react-icons/md";
import { useFetchWithHandler } from '@/api'
import qs from "qs";
import * as url from '@/api/url'
import useRequestManager from "@/hooks/useRequestManager";
const HeaderCounterParty = ({ id, onHeaderEdit ,sendDataToParent }) => {
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();

  const [counterpartyListData, counterpartyLoadingData, counterpartyError, counterpartyApiCall] = useFetchWithHandler();
  useRequestManager({ error: counterpartyError });

  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {
    handleCounterParty()
  }, [id])


  useEffect(() => {

    counterpartyListData?.isSuccess &&
    sendDataToParent (counterpartyListData?.data)
  }, [counterpartyListData]);

  //====================================================================
  //                        Functions
  //======================================================================
  const handleCounterParty = async () => {
    await counterpartyApiCall(`${url.COUNTER_PARTY}/${id}`);
  };

  const borderedItems = [
    {
      key: "1",
      label: "کد",
      children: counterpartyListData?.data?.code,
    },
    {
      key: "2",
      label: "نام",
      children: counterpartyListData?.data?.firstName,
    },
    {
      key: "3",
      label: "نام خانوادگی",
      children: counterpartyListData?.data?.lastName,
    },
    {
      key: "4",
      label: "نام پدر",
      children: counterpartyListData?.data?.fatherName,
    },
    {
      key: "5",
      label: "نام حساب تفصیل",
      children: counterpartyListData?.data?.detailedAccountName,
    },
    {
      key: "6",
      label: "کد ملی",
      children: counterpartyListData?.data?.nationalCode,
    },
    {
      key: "6",
      label: "شماره شناسنامه",
      children: counterpartyListData?.data?.birthCertificateNumber,
    },
    {
      key: "7",
      label: "تاریخ تولد",
      children: counterpartyListData?.data?.birthDate,
    },
    {
      key: "8",
      label: "کد اقتصادی",
      children: counterpartyListData?.data?.economicCode,
    },
    {
      key: "8",
      label: "شناسه ملی",
      children: counterpartyListData?.data?.legalEntityIdentity,
    },
    {
      key: "9",
      label: " ایمیل",
      children: counterpartyListData?.data?.email,
    },
  ];

  return (
    <>

      <ModalHeader title={"جزئیات طرف حساب"} icon={<MdDescription />} />
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
          onHeaderEdit(counterpartyListData?.data)
        }}
      >

      </ButtonList>

      {counterpartyListData?.data == null ? (
        <Ant.Skeleton loading={counterpartyLoadingData} className="w-11/12 h-full " />
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


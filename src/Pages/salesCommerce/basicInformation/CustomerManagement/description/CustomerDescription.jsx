import React, { useEffect, useState } from "react";
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
import { MdDescription } from "react-icons/md";

//====================================================================
//                        Declaration
//====================================================================

const CustomerDescription = (props) => {
  const { id, onSuccess } = props;
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
          onClick={() =>
            onViewCounterparty(data?.data?.relatedCounterpartyName)
          }
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
    onSuccess();
  };

  const onHeaderEdit = (data) => {
    setModalContent(
      <FormEditCounterParty
        onSuccess={onSuccessEdit}
        key={uuid.v1()}
        id={data?.id}
      />,
    );
    setModalState(true);
  };

  const onViewCounterparty = () => {
    setModalContent(
      <HeaderCounterParty
        id={data?.data?.counterpartyId}
        onHeaderEdit={onHeaderEdit}
      />,
    );
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
        centered
      >
        {modalContent}
      </Ant.Modal>
      <ModalHeader title={"جزئیات مشتری"} icon={<MdDescription />} />
      <Ant.Skeleton active loading={loading}>
        {/* <Ant.Descriptions
          bordered
          layout="vertical"
          size={"middle"}
          items={borderedItems}
        /> */}
        <Ant.Space
          direction="vertical"
          size={12}
          style={{
            width: "100%",
          }}
        >
          <Ant.Card bordered={true} className="bg-indigo-50 border-indigo-100">
            <Ant.Flex justify="space-between" align="center">
              <Ant.Typography.Text>
                <strong>شناسه </strong>
                {` : ${data?.data?.id}`}
              </Ant.Typography.Text>
              <Ant.Typography.Text>
                <strong>کد </strong>
                {` : ${data?.data?.code}`}
              </Ant.Typography.Text>
              <Ant.Typography.Text>
                <strong>کد دوم </strong>
                {` : ${data?.data?.secondCode}`}
              </Ant.Typography.Text>
            </Ant.Flex>
          </Ant.Card>
          <Ant.Card bordered={true} className="bg-indigo-50 border-indigo-100">
            <Ant.Flex justify="space-between" align="center">
              <Ant.Typography.Text>
                <strong>نام </strong>
                {` : ${data?.data?.firstName}`}
              </Ant.Typography.Text>
              <Ant.Typography.Text>
                <strong>نام خانوادگی </strong>
                {` :  ${data?.data?.lastName}`}
              </Ant.Typography.Text>

              <Ant.Typography.Text>
                <strong> نام گروه  </strong>
                {` : ${data?.data?.groupName}`}
              </Ant.Typography.Text>
              {/* <strong>نام :{data?.data?.firstName}</strong>
              <strong>نام خانوادگی :{data?.data?.lastName}</strong>
              <strong>
                طرف حساب های مرتبط :
                <Typography.Link
                  onClick={() =>
                    onViewCounterparty(data?.data?.relatedCounterpartyName)
                  }
                >
                  {data?.data?.relatedCounterpartyName}
                </Typography.Link>
              </strong> */}
            </Ant.Flex>
          </Ant.Card>
          <Ant.Card bordered={true} className="bg-indigo-50 border-indigo-100">
            <Ant.Flex justify="space-between" align="center">
              {/* <strong>نوع طرف حساب :{data?.data?.counterpartyTypeTitle}</strong>
              <strong> عنوان شرکت :{data?.data?.companyTitle}</strong>
              <strong> نام شعبه :{data?.data?.branchName}</strong> */}

              <Ant.Typography.Text>
                <strong >نوع طرف حساب </strong>
                {` : ${data?.data?.counterpartyTypeTitle}`}
              </Ant.Typography.Text>
              <Ant.Typography.Text>
                <strong>عنوان شرکت </strong>
                {` : ${data?.data?.companyTitle}`}
              </Ant.Typography.Text>
              <Ant.Typography.Text>
                <strong>نام شعبه </strong>
                {` : ${data?.data?.branchName}`}
              </Ant.Typography.Text>
            </Ant.Flex>
          </Ant.Card>
          <Ant.Card bordered={true} className="bg-indigo-50 border-indigo-100">
            <Ant.Flex justify="space-between" align="center">
              {/* <strong>نوع فروش :{data?.data?.typeName}</strong>
              <strong>رتبه مشتری :{data?.data?.gradeName}</strong>
              <strong> نام گروه :{data?.data?.groupName}</strong> */}
              <Ant.Typography.Text>
                <strong>نوع فروش </strong>
                {` : ${data?.data?.typeName}`}
              </Ant.Typography.Text>
              <Ant.Typography.Text>
                <strong>رتبه مشتری </strong>
                {` : ${data?.data?.gradeName}`}
              </Ant.Typography.Text>
              <Ant.Typography.Text>
                <strong> طرف حساب های مرتبط </strong>
                <Typography.Link
                  onClick={() =>
                    onViewCounterparty(data?.data?.relatedCounterpartyName)
                  }
                >
                  : {data?.data?.relatedCounterpartyName}
                </Typography.Link>
              </Ant.Typography.Text>
            </Ant.Flex>
          </Ant.Card>
        </Ant.Space>
      </Ant.Skeleton>
    </>
  );
};
export default CustomerDescription;
CustomerDescription.propTypes = {
  id: PropTypes.number,
};

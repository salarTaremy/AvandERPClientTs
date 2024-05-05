import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as styles from "@/styles";
import MyDatePicker from "@/components/common/MyDatePicker";
import useRequestManager from "@/hooks/useRequestManager";
import * as url from "@/api/url";
import {
  useFetch,
  useFetchWithHandler,
  usePostWithHandler,
  usePutWithHandler,
} from "@/api";
import Address from "./Address";
import Contacts from "./Contacts";
import BankBranchInfo from "./BankBranchInfo";
import HeaderEditCounterParty from "./HeaderEditCounterParty";
import Informationccounts from "./Informationccounts";
import * as api from "@/api";
import { useParams } from "react-router-dom";

const FormEditCounterParty = () => {
  const params = useParams();
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  const [counterpartyTypeList, counterpartyTypeLoading, counterpartyTypeError] =
    useFetch(url.COUNTER_PARTY_TYPE);
  const [cityList, cityLoading, cityError] = useFetch(url.CITY);
  useRequestManager({ error: cityError });

  useRequestManager({ error: counterpartyTypeError });
  useRequestManager({ error: editError, loading: editLoading, data: editData });
  const [form] = Ant.Form.useForm();
  const { TabPane } = Ant.Tabs;

  const [
    listDataHeader,
    listLoadingHeader,
    listErrorHeader,
    listApiCallHeader,
  ] = api.useFetchWithHandler();

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    onEditHeader();
  }, []);

  useEffect(() => {
    const list = form.getFieldsValue();

    console.log(list, "list");
  }, []);

  useEffect(() => {
    console.log(listDataHeader?.data?.addressList, "addressList");
    form.setFieldsValue({ ...(listDataHeader?.data || null) });
    // form.setFieldsValue({ cityId: undefined });
  }, [listDataHeader]);

  //====================================================================
  //                        Functions
  //====================================================================
  const onEditHeader = async () => {
    await listApiCallHeader(`${url.COUNTER_PARTY}/${params.id}`);
  };

  const onFinish = async (value) => {
    const list = form.getFieldsValue();
    let newBirthDateCalendarId = list?.birthDateCalendarId
      ?.toString()
      .replace(/\//g, "");

    console.log(newBirthDateCalendarId, "newBirthDateCalendarId");
    const dataList = {
      ...value,
      id: parseInt(params.id),
      birthDateCalendarId: parseInt(newBirthDateCalendarId),
      addressList: Array(0),
      phoneNumberList: Array(0),
      bankAccountList: Array(0),
    };
    dataList.addressList = value.addressList ? value.addressList : Array(0);
    dataList.phoneNumberList = value.phoneNumberList
      ? value.phoneNumberList
      : Array(0);
    dataList.bankAccountList = value.bankAccountList
      ? value.bankAccountList
      : Array(0);

    console.log(dataList, "dataListEdit");
    // const data = {
    //   counterpartyTypeId: list?.counterpartyTypeId,
    //   code: list.code === undefined ? null : list.code,
    //   firstName: list.firstName === undefined ? null : list.firstName,
    //   lastName: list.lastName === undefined ? null : list.lastName,
    //   fatherName: list.fatherName === undefined ? null : list.fatherName,
    //   nationalCode: String(
    //     list.nationalCode === undefined ? null : list.nationalCode,
    //   ),
    //   birthDateCalendarId: parseInt(
    //     newBirthDateCalendarId ? newBirthDateCalendarId : null,
    //   ),
    //   birthCertificateNumber:
    //     list.birthCertificateNumber === undefined
    //       ? null
    //       : list.birthCertificateNumber,
    //   birthCertificatePlaceOfIssueCityId:
    //     list.birthCertificatePlaceOfIssueCityId === undefined
    //       ? null
    //       : list.birthCertificatePlaceOfIssueCityId,
    //   companyTitle: list.companyTitle === undefined ? null : list.companyTitle,
    //   companyRegistrationNumber:
    //     list.companyRegistrationNumber === undefined
    //       ? null
    //       : list.companyRegistrationNumber,
    //   companyRegistrationPlaceCityId:
    //     list.companyRegistrationPlaceCityId === undefined
    //       ? null
    //       : list.companyRegistrationPlaceCityId,
    //   legalEntityIdentity:
    //     list.legalEntityIdentity === undefined
    //       ? null
    //       : list.legalEntityIdentity,
    //   economicCode: list.economicCode == undefined ? null : list.economicCode,
    //   nationalIdentity:
    //     list.nationalIdentity === undefined ? null : list.nationalIdentity,
    //   email: list.email === undefined ? null : list.email,
    //   isActive: list.isActive === undefined ? true : list.isActive,
    //   longitude: list?.longitude,
    //   latitude: list?.latitude,
    //   addressList: dataFromChildAddress ? dataFromChildAddress : Array(0),
    //   phoneNumberList: dataFromChildContact ? dataFromChildContact : Array(0),
    //   bankAccountList: dataFromChildBankBranchInfo
    //     ? dataFromChildBankBranchInfo
    //     : Array(0),
    // };
    await editApiCall(url.COUNTER_PARTY, dataList);
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <div>
      <Ant.Card
        style={{ ...styles.CARD_DEFAULT_STYLES }}
        title={"ویرایش طرف حساب"}
        type="inner"
      >
        <Ant.Form form={form} layout="vertical" onFinish={onFinish}>
          <HeaderEditCounterParty form={form} />
          <Ant.Flex className="items-end " vertical>
            <Ant.Button
              className="px-6"
              type="primary"
              htmlType="submit"
              onClick={() => {
                form.submit();
              }}
            >
              {"تایید"}
            </Ant.Button>
          </Ant.Flex>

          <Ant.Tabs type="card" defaultActiveKey="1">
            <TabPane tab="اطلاعات تماس " key="1">
              <Contacts />
            </TabPane>
            <TabPane tab="آدرس" key="2">
              <Address form={form} />
            </TabPane>
            <TabPane tab="اطلاعات حساب های بانکی" key="3">
              <BankBranchInfo />
            </TabPane>
            <TabPane tab="اطلاعات تکمیلی طرف حساب ها" key="4">
              <Informationccounts />
            </TabPane>
          </Ant.Tabs>
        </Ant.Form>
      </Ant.Card>
    </div>
  );
};
export default FormEditCounterParty;

import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as styles from "@/styles";
import MyDatePicker from "@/components/common/MyDatePicker";
import useRequestManager from "@/hooks/useRequestManager";
import * as url from "@/api/url";
import { useFetch, useFetchWithHandler, usePostWithHandler } from "@/api";
import Address from "./Address";
import Contacts from "./Contacts";
import BankBranchInfo from "./BankBranchInfo";
import HeaderEditCounterParty from "./HeaderEditCounterParty";
import * as api from "@/api";
import { useParams } from "react-router-dom";
const FormEditCounterParty = () => {
  const params = useParams();
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
  const [counterpartyTypeList, counterpartyTypeLoading, counterpartyTypeError] =
    useFetch(url.COUNTER_PARTY_TYPE);
  const [cityList, cityLoading, cityError] = useFetch(url.CITY);
  useRequestManager({ error: cityError });
  const [selectedValueType, setSelectedValueType] = useState("");
  useRequestManager({ error: counterpartyTypeError });
  useRequestManager({ error: addError, loading: addLoading, data: addData });
  const [form] = Ant.Form.useForm();
  const { TabPane } = Ant.Tabs;
  const [dataFromChildContact, setDataFromChildContact] = useState("");
  const [dataFromChildAddress, setDataFromChildAddress] = useState("");
  const [dataFromChildBankBranchInfo, setDataFromChildBankBranchInfo] =
    useState("");
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
    form.resetFields();
  }, [form]);

  useEffect(() => {
    const list = form.getFieldsValue();
    console.log(list, "list");
  }, []);
  useEffect(() => {
    console.log(listDataHeader?.data?.addressList, "addressList");
    form.setFieldsValue({ ...(listDataHeader?.data || null) });
  }, [listDataHeader]);

  //====================================================================
  //                        Functions
  //====================================================================
  const onEditHeader = async () => {
    await listApiCallHeader(`${url.COUNTER_PARTY}/${params.id}`);
  };

  const onChange = (key) => {
    console.log(key);
  };
  const updateDataContacts = (newData) => {
    console.log("contactds", newData);
    setDataFromChildContact(newData);
  };
  const updateDataAddress = (newData) => {
    console.log("Address", newData);
    setDataFromChildAddress(newData);
  };
  const updateBankBranchInfo = (newData) => {
    console.log("bank", newData);
    setDataFromChildBankBranchInfo(newData);
  };

  const onFinish = async () => {
    const list = form.getFieldsValue();
    console.log(list, "list222");
    debugger;
    let newBirthDateCalendarId = list?.birthDateCalendarId
      ?.toString()
      .replace(/\//g, "");

    console.log(newBirthDateCalendarId, "newBirthDateCalendarId");
    const data = {
      counterpartyTypeId: list?.counterpartyTypeId,
      code: list.code === undefined ? null : list.code,
      firstName: list.firstName === undefined ? null : list.firstName,
      lastName: list.lastName === undefined ? null : list.lastName,
      fatherName: list.fatherName === undefined ? null : list.fatherName,
      nationalCode: String(
        list.nationalCode === undefined ? null : list.nationalCode,
      ),
      birthDateCalendarId: parseInt(
        newBirthDateCalendarId ? newBirthDateCalendarId : null,
      ),
      birthCertificateNumber:
        list.birthCertificateNumber === undefined
          ? null
          : list.birthCertificateNumber,
      birthCertificatePlaceOfIssueCityId:
        list.birthCertificatePlaceOfIssueCityId === undefined
          ? null
          : list.birthCertificatePlaceOfIssueCityId,
      companyTitle: list.companyTitle === undefined ? null : list.companyTitle,
      companyRegistrationNumber:
        list.companyRegistrationNumber === undefined
          ? null
          : list.companyRegistrationNumber,
      companyRegistrationPlaceCityId:
        list.companyRegistrationPlaceCityId === undefined
          ? null
          : list.companyRegistrationPlaceCityId,
      legalEntityIdentity:
        list.legalEntityIdentity === undefined
          ? null
          : list.legalEntityIdentity,
      economicCode: list.economicCode == undefined ? null : list.economicCode,
      nationalIdentity:
        list.nationalIdentity === undefined ? null : list.nationalIdentity,
      email: list.email === undefined ? null : list.email,
      isActive: list.isActive === undefined ? true : list.isActive,
      longitude: list?.longitude,
      latitude: list?.latitude,
      addressList: dataFromChildAddress ? dataFromChildAddress : Array(0),
      phoneNumberList: dataFromChildContact ? dataFromChildContact : Array(0),
      bankAccountList: dataFromChildBankBranchInfo
        ? dataFromChildBankBranchInfo
        : Array(0),
    };
    console.log(data, "hhhhhhhh");
    await addApiCall(url.COUNTER_PARTY, data);
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

          <Ant.Tabs onChange={onChange} type="card" defaultActiveKey="1">
            <TabPane tab="اطلاعات تماس " key="1">
              <Contacts form={form} sendDataToParent={updateDataContacts} />
            </TabPane>
            <TabPane tab="آدرس" key="2">
              <Address sendDataToParent={updateDataAddress} form={form} />
            </TabPane>
            <TabPane tab="اطلاعات حساب های  بانکی" key="3">
              <BankBranchInfo
                sendDataToParent={updateBankBranchInfo}
                form={form}
              />
            </TabPane>
          </Ant.Tabs>
        </Ant.Form>
      </Ant.Card>
    </div>
  );
};
export default FormEditCounterParty;

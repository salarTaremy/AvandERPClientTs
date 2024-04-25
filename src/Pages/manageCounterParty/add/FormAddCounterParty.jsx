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
import HeaderAddCounterParty from "./HeaderAddCounterParty";
const FormAddCounterParty = () => {
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
  const [counterpartyTypeList, counterpartyTypeLoading, counterpartyTypeError] =
    useFetch(url.COUNTER_PARTY_TYPE);
  const [cityList, cityLoading, cityError] = useFetch(url.CITY);
  useRequestManager({ error: cityError });
  const [selectedValueType, setSelectedValueType] = useState("");
  useRequestManager({ error: counterpartyTypeError });
  useRequestManager({ error: addError, loading: addLoading, data: addData });

  const { TabPane } = Ant.Tabs;
  const [dataFromHeaderList, setDataFromHeaderList] = useState("");
  const [dataFromChildContact, setDataFromChildContact] = useState("");
  const [dataFromChildAddress, setDataFromChildAddress] = useState("");
  const [dataFromChildBankBranchInfo, setDataFromChildBankBranchInfo] =
    useState("");
  const [form] = Ant.Form.useForm();

  //====================================================================
  //                        useEffects
  //====================================================================

  //====================================================================
  //                        Functions
  //====================================================================

  const onChange = (key) => {
    console.log(key);
  };

  // const handleSubmit = async (contact, address, bankbranch) => {
  //   alert("jjjjjj")
  //   debugger
  //   console.log("contact", contact);
  //   console.log("address", address);
  //   console.log("bankbranch", bankbranch);

  //   setDataFromChildContact(contact);
  //   setDataFromChildAddress(address);
  //   setDataFromChildBankBranchInfo(bankbranch);

  // };
;

  const onFinish = async (value) => {
    alert("gggggg");
    console.log(value, "value");


    let newBirthDateCalendarId = value?.birthDateCalendarId
      ?.toString()
      .replace(/\//g, "");

    console.log(newBirthDateCalendarId, "newBirthDateCalendarId");
    // const data = { ...value, birthDateCalendarId: newBirthDateCalendarId };
    const data = {
      counterpartyTypeId: value?.counterpartyTypeId,
      code: value.code === undefined ? null : value.code,
      firstName: value.firstName === undefined ? null : value.firstName,
      lastName: value.lastName === undefined ? null : value.lastName,
      fatherName: value.fatherName === undefined ? null : value.fatherName,
      nationalCode: String(
        value.nationalCode === undefined ? null : value.nationalCode,
      ),
      birthDateCalendarId: parseInt(
        newBirthDateCalendarId ? newBirthDateCalendarId : null,
      ),
      birthCertificateNumber:
        value.birthCertificateNumber === undefined
          ? null
          : value.birthCertificateNumber,
      birthCertificatePlaceOfIssueCityId:
        value.birthCertificatePlaceOfIssueCityId === undefined
          ? null
          : value.birthCertificatePlaceOfIssueCityId,
      companyTitle:
        value.companyTitle === undefined ? null : value.companyTitle,
      companyRegistrationNumber:
        value.companyRegistrationNumber === undefined
          ? null
          : value.companyRegistrationNumber,
      companyRegistrationPlaceCityId:
        value.companyRegistrationPlaceCityId === undefined
          ? null
          : value.companyRegistrationPlaceCityId,
      legalEntityIdentity:
        value.legalEntityIdentity === undefined
          ? null
          : value.legalEntityIdentity,
      economicCode: value.economicCode == undefined ? null : value.economicCode,
      nationalIdentity:
        value.nationalIdentity === undefined ? null : value.nationalIdentity,
      email: value.email === undefined ? null : value.email,
      isActive: value.isActive === undefined ? value.isActive=true : value.isActive,
      longitude: value?.longitude,
      latitude: value?.latitude,
      addressList: value.addressList ? value.addressList : Array(0),
      phoneNumberList: value.phoneNumberList ? value.phoneNumberList : Array(0),
      bankAccountList: value.bankAccountList
        ? value.bankAccountList
        : Array(0),
    };

    console.log(data, "sssss");
    await addApiCall(url.COUNTER_PARTY, data);
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <div>
      <Ant.Card
        style={{ ...styles.CARD_DEFAULT_STYLES }}
        title={"ایجاد طرف حساب"}
        type="inner"
      >
        <Ant.Form layout="vertical" onFinish={onFinish}>
          <HeaderAddCounterParty />
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
              <Contacts />
            </TabPane>
            <TabPane tab="آدرس" key="2">
              <Address />
            </TabPane>
            <TabPane tab="اطلاعات حساب بانکی" key="3">
              <BankBranchInfo />
            </TabPane>
          </Ant.Tabs>
        </Ant.Form>
      </Ant.Card>
    </div>
  );
};
export default FormAddCounterParty;

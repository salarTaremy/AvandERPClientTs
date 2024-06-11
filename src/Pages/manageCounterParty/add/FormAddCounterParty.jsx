import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as styles from "@/styles";
import MyDatePicker from "@/components/common/MyDatePicker";
import useRequestManager from "@/hooks/useRequestManager";
import * as url from "@/api/url";
import { useFetch, useFetchWithHandler, usePostWithHandler } from "@/api";
import Address from "./Address";
// import Contacts from "./Contacts";
import CounterpartyAddressList from "../counterpartyContactInfo/address/list/CounterpartyAddressList";
import BankBranchInfo from "./BankBranchInfo";
import CounterpartyBasicInfoAdd from "./CounterpartyBasicInfoAdd";
import Informationccounts from "./Informationccounts";
import ModalHeader from "@/components/common/ModalHeader";
const FormAddCounterParty = ({onSuccess}) => {
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
  useFetch(url.COUNTER_PARTY_TYPE);
  useRequestManager({ error: addError, loading: addLoading, data: addData });

  const { TabPane } = Ant.Tabs;
  const [form] = Ant.Form.useForm();

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    addData?.isSuccess && onSuccess();
  }, [addData]);
  //====================================================================
  //                        Functions
  //====================================================================

  const onFinish = async (value) => {
    let newBirthDateCalendarId = value?.birthDateCalendarId
      ?.toString()
      .replace(/\//g, "");

    const dataList = {
      ...value,
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

    console.log(dataList, "sssss");
    await addApiCall(url.COUNTER_PARTY, dataList);
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>

       <ModalHeader title={'ایجاد طرف حساب '} />
        <Ant.Form form={form} layout="vertical" onFinish={onFinish}>
          <Ant.Tabs type="card" defaultActiveKey="1">
            <TabPane tab="اطلاعات پایه " key="1">
              {/* <HeaderAddCounterParty form={form} /> */}
              <CounterpartyBasicInfoAdd form={form}/>
            </TabPane>
            <TabPane tab="اطلاعات تماس " key="2">
              {/* <Contacts /> */}
              <CounterpartyAddressList />
            </TabPane>
            {/* <TabPane tab="آدرس" key="3">
              <Address form={form} />
            </TabPane> */}
            <TabPane tab="اطلاعات حساب های بانکی" key="4">
              <BankBranchInfo />
            </TabPane>
            {/* <TabPane tab="اطلاعات تکمیلی طرف حساب ها" key="5">
              <Informationccounts />
            </TabPane> */}
          </Ant.Tabs>
        </Ant.Form>
        <Ant.Flex className="items-end " vertical>
          <Ant.Button
            className="px-6"
            type="primary"
            htmlType="submit"
            style={{ width: 150 }}
            onClick={() => {
              form.submit();
            }}
          >
            {"تایید"}
          </Ant.Button>
        </Ant.Flex>

    </>
  );
};
export default FormAddCounterParty;

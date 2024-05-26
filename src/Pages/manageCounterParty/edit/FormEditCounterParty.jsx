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

const FormEditCounterParty = ({ onSuccess, id }) => {
  const params = useParams();
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  const [form] = Ant.Form.useForm();
  const { TabPane } = Ant.Tabs;
  const [
    listDataHeader,
    listLoadingHeader,
    listErrorHeader,
    listApiCallHeader,
  ] = api.useFetchWithHandler();
  useRequestManager({ error: listErrorHeader });
  useRequestManager({ error: editData });
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    onEditHeader();
  }, []);

  useEffect(() => {
    console.log(listDataHeader?.data?.addressList, "addressList");
    form.setFieldsValue({ ...(listDataHeader?.data || null) });
  }, [listDataHeader]);

  useEffect(() => {
    editData?.isSuccess && onSuccess();
  }, [editData]);

  //====================================================================
  //                        Functions
  //====================================================================
  const onEditHeader = async () => {
    await listApiCallHeader(`${url.COUNTER_PARTY}/${id}`);
  };

  const onFinish = async (value) => {
    const list = form.getFieldsValue();
    let newBirthDateCalendarId = list?.birthDateCalendarId
      ?.toString()
      .replace(/\//g, "");


    const dataList = {
      ...value,
      id: id,
      birthDateCalendarId: parseInt(newBirthDateCalendarId),
    };
    dataList.addressList = value.addressList ? value.addressList : Array(0);
    dataList.phoneNumberList = value.phoneNumberList
      ? value.phoneNumberList
      : Array(0);
    dataList.bankAccountList = value.bankAccountList
      ? value.bankAccountList
      : Array(0);


    await editApiCall(url.COUNTER_PARTY, dataList);
  };

  // Fix Bug


  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <br />
      <Ant.Card
        style={{ ...styles.CARD_DEFAULT_STYLES }}
        title={"ویرایش طرف حساب"}
        type="inner"
      >
        <Ant.Form form={form} layout="vertical" onFinish={onFinish}>
          <Ant.Tabs type="card" defaultActiveKey="1">
            <TabPane forceRender={true} tab="اطلاعات تماس " key="1">
              <HeaderEditCounterParty form={form} />
            </TabPane>
            <TabPane forceRender={true} tab="اطلاعات تماس " key="2">
              <Contacts />
            </TabPane>
            <TabPane forceRender={true} tab="آدرس" key="3">
              <Address form={form} />
            </TabPane>
            <TabPane forceRender={true} tab="اطلاعات حساب های بانکی" key="4">
              <BankBranchInfo />
            </TabPane>
            <TabPane
              forceRender={true}
              tab="اطلاعات تکمیلی طرف حساب ها"
              key="4"
            >
              <Informationccounts />
            </TabPane>
          </Ant.Tabs>
          <Ant.Flex className="items-end " vertical>
            <Ant.Button className="px-6" type="primary" htmlType="submit" style={{ width: 150 }}>
              {"ذخیره"}
            </Ant.Button>
          </Ant.Flex>
        </Ant.Form>
      </Ant.Card >
    </>
  );
};
export default FormEditCounterParty;

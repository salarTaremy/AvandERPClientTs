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
  const [counterpartyTypeList, counterpartyTypeLoading, counterpartyTypeError] =
    useFetch(url.COUNTER_PARTY_TYPE);
  const [cityList, cityLoading, cityError] = useFetch(url.CITY);
  useRequestManager({ error: cityError });
  const [selectedValueType, setSelectedValueType] = useState("");
  useRequestManager({ error: counterpartyTypeError });
  const [form] = Ant.Form.useForm();
  const { TabPane } = Ant.Tabs;

  const [formData, setFormData] = useState(null);

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {

    const list = form.getFieldsValue();
    console.log(list, "list");
  }, []);
  //====================================================================
  //                        Functions
  //====================================================================

  // const handleSelectChange = (value) => {
  //   setSelectedValueType(value);
  // };

  const onChange = (key) => {
    console.log(key);
  };
  // const onChangeAccount = (value, key) => {
  //   console.log(value, "dadadadadd");
  // };
  // const sub = () => {
  //   alert("dsdsdsd")

  // };

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
        <HeaderAddCounterParty form={form} />
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
            <Contacts form={form} />
          </TabPane>
          <TabPane tab="آدرس" key="2">
            <Address form={form} />
          </TabPane>
          <TabPane tab="اطلاعات حساب بانکی" key="3">
            <BankBranchInfo form={form} />
          </TabPane>
        </Ant.Tabs>
      </Ant.Card>
    </div>
  );
};
export default FormAddCounterParty;

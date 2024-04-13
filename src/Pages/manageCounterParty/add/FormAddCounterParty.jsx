import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as styles from "@/styles";
import MyDatePicker from "@/components/common/MyDatePicker";
import useRequestManager from "@/hooks/useRequestManager";
import * as url from "@/api/url";
import { useFetch, useFetchWithHandler, usePostWithHandler } from "@/api";
import Address from "./Address";
import Contacts from "./Contacts";
import BankBccountInformation from "./BankBccountInformation";
const FormAddCounterParty = () => {
  const [counterpartyTypeList, counterpartyTypeLoading, counterpartyTypeError] =
    useFetch(url.COUNTER_PARTY_TYPE);
  const [selectedValueType, setSelectedValueType] = useState("");
  useRequestManager({ error: counterpartyTypeError });
  const [form] = Ant.Form.useForm();
  const { TabPane } = Ant.Tabs;
  const itemsTab = [
    {
      key: "1",
      label: "اطلاعات تماس",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "آدرس",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "اطلاعات حساب بانکی",
      children: "Content of Tab Pane 3",
    },
  ];

  //====================================================================
  //                        useEffects
  //====================================================================

  //====================================================================
  //                        Functions
  //====================================================================
  const handleSelectChange = (value) => {
    console.log(value, "vvvvv");
    setSelectedValueType(value);
  };

  const onChange = (key) => {
    console.log(key);
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
        <Ant.Form form={form} layout="vertical" onFinish Failed={null}>
          <Ant.Row gutter={[16, 16]}>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                name={"branchId"}
                label="نوع"
              >
                <Ant.Select
                  onChange={handleSelectChange}
                  allowClear={true}
                  disabled={counterpartyTypeLoading || false}
                  loading={counterpartyTypeLoading}
                  options={counterpartyTypeList?.data}
                  fieldNames={{ label: "name", value: "id" }}
                  placeholder={"انتخاب کنید..."}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                name={"AccountingDocumentTypeId"}
                label="کد"
              >
                <Ant.InputNumber min={0} style={{ width: "100%" }} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                name={"name"}
                label="نام"
              >
                <Ant.Input />
              </Ant.Form.Item>
            </Ant.Col>

            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                name={"family"}
                label="نام خانوادگی"
              >
                <Ant.Input />
              </Ant.Form.Item>
            </Ant.Col>

            <Ant.Col
              className={selectedValueType === 2 ? "hidden" : ""}
              lg={8}
              md={12}
              sm={12}
              xs={24}
            >
              <Ant.Form.Item name={"calendarId"} label="کدملی">
                <Ant.InputNumber min={0} style={{ width: "100%" }} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col
              className={selectedValueType === 2 ? "hidden" : ""}
              lg={8}
              md={12}
              sm={12}
              xs={24}
            >
              <Ant.Form.Item
                name={"nationalId"}
                label="شناسه شناسنامه"
                rules={[{ required: false }]}
              >
                <Ant.InputNumber min={0} style={{ width: "100%" }} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col
              className={selectedValueType === 2 ? "hidden" : ""}
              lg={8}
              md={12}
              sm={12}
              xs={24}
            >
              <Ant.Form.Item
                name={"nationalId"}
                label="تاریخ تولد"
                rules={[{ required: false }]}
              >
                <MyDatePicker />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col
              className={selectedValueType === 2 ? "hidden" : ""}
              lg={8}
              md={12}
              sm={12}
              xs={24}
            >
              <Ant.Form.Item
                name={"nationalId"}
                label=" محل صدور"
                rules={[{ required: false }]}
              >
                <Ant.Input />
              </Ant.Form.Item>
            </Ant.Col>

            <>
              <Ant.Col
                className={selectedValueType === 2 ? "" : "hidden"}
                lg={8}
                md={12}
                sm={12}
                xs={24}
              >
                <Ant.Form.Item name={"companyTitle"} label="عنوان شرکت/سازمان">
                  <Ant.Input min={0} style={{ width: "100%" }} />
                </Ant.Form.Item>
              </Ant.Col>
              <Ant.Col
                className={selectedValueType === 2 ? "" : "hidden"}
                lg={8}
                md={12}
                sm={12}
                xs={24}
              >
                <Ant.Form.Item
                  name={"registerNumber_"}
                  label="شماره ثبت شرکت/سازمان"
                  rules={[{ required: false }]}
                >
                  <Ant.InputNumber min={0} style={{ width: "100%" }} />
                </Ant.Form.Item>
              </Ant.Col>

              <Ant.Col
                className={selectedValueType === 2 ? "" : "hidden"}
                lg={8}
                md={12}
                sm={12}
                xs={24}
              >
                <Ant.Form.Item
                  name={"nationalId"}
                  label="محل ثبت شرکت/سازمان"
                  rules={[{ required: false }]}
                >
                  <Ant.Input min={0} style={{ width: "100%" }} />
                </Ant.Form.Item>
              </Ant.Col>
              <Ant.Col
                className={selectedValueType === 2 ? "" : "hidden"}
                lg={8}
                md={12}
                sm={12}
                xs={24}
              >
                <Ant.Form.Item
                  name={"nationalId"}
                  label="شناسه ملی"
                  rules={[{ required: false }]}
                >
                  <Ant.InputNumber min={0} style={{ width: "100%" }} />
                </Ant.Form.Item>
              </Ant.Col>
              <Ant.Col
                className={selectedValueType === 2 ? "" : "hidden"}
                lg={8}
                md={12}
                sm={12}
                xs={24}
              >
                <Ant.Form.Item
                  name={"nationalId"}
                  label="کداقتصادی"
                  rules={[{ required: false }]}
                >
                  <Ant.InputNumber min={0} style={{ width: "100%" }} />
                </Ant.Form.Item>
              </Ant.Col>
              <Ant.Col
                className={selectedValueType === 2 ? "" : "hidden"}
                lg={8}
                md={12}
                sm={12}
                xs={24}
              >
                <Ant.Form.Item
                  name={"nationalId"}
                  label="شناسه مالیاتی"
                  rules={[{ required: false }]}
                >
                  <Ant.InputNumber min={0} style={{ width: "100%" }} />
                </Ant.Form.Item>
              </Ant.Col>
            </>

            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                name={"email"}
                label="ایمیل"
                rules={[{ required: false }]}
              >
                <Ant.Input />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item name={"status"} label="وضعیت ">
                <Ant.Switch defaultChecked />
              </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>
        </Ant.Form>
        <Ant.Tabs onChange={onChange} type="card" defaultActiveKey="1">
          <TabPane tab="اطلاعات تماس " key="1">
            <Contacts />
          </TabPane>
          <TabPane tab="آدرس" key="2">

            <Address />
          </TabPane>
          <TabPane tab="اطلاعات حساب بانکی" key="3">
            <BankBccountInformation />
          </TabPane>
        </Ant.Tabs>
      </Ant.Card>
    </div>
  );
};
export default FormAddCounterParty;

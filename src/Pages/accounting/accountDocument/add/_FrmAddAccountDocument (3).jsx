import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import MyDatePicker from "@/components/common/MyDatePicker";
import { useFetch, usePostWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import TBL from "./Table";
import { useNavigate } from "react-router-dom";
export const FrmAddAccountDocument = () => {
  const [accTypeData, accTypeLoading, accTypeError] = useFetch(
    url.ACCOUNTING_DOCUMENT_TYPE,
  );
  const [branchData, branchLoading, branchError] = useFetch(url.BRANCH);
  const [accStateData, accStateLoading, accStateError] = useFetch(
    url.ACCOUNT_DOCUMENT_STATE,
  );
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
  const [form] = Ant.Form.useForm();
  useRequestManager({ error: accStateError });
  useRequestManager({ error: addError, loading: addLoading, data: addData });
  useRequestManager({ error: accTypeError });
  useRequestManager({ error: branchError });
  const [dataSource, setDataSource] = useState([]);
  const [dataDetailObject, setDataDetailObject] = useState();
  const [sumDebtor, setSumDebtor] = useState(0);
  const [sumCreditor, setSumCreditor] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    form.resetFields();
  }, [form]);

  //====================================================================
  //
  //====================================================================

  //====================================================================
  //                        Functions
  //====================================================================
  const updateDebtor = (debtor) => {
    setSumDebtor(debtor);
  };
  const updateCreditor = (creditor) => {
    setSumCreditor(creditor);
  };

  const onFinish = async (values) => {
    let valueHeader = form.getFieldsValue();
    const header = {
      documentNumber: 0,
      branchId: valueHeader.branchId,
      accountingDocumentTypeId: valueHeader.AccountingDocumentTypeId,
      accountingDocumentStateId: valueHeader.accountingDocumentStateId,
      calendarId: parseInt(
        valueHeader?.calendarId?.toString().replace(/\//g, ""),
      ),
      subNumber: valueHeader.subNumber,
    };
    const detailsList = [];

    for (let key in values) {
      if (typeof values[key] === "object") {
        detailsList.push(values[key]);
      }
    }
    const filteredAnyObj = detailsList.filter(
      (obj) => Object.keys(obj).length > 0,
    );
    delete header.details;
    const dto = {
      header,
      details: filteredAnyObj,
    };

    await addApiCall(url.ACCOUNT_DOCUMENT, dto);
    navigate("/accounting/accountDocument");
  };

  //====================================================================
  //                        Child Components
  //====================================================================
  const FooterContent = () => {
    return (
      <>
        <Ant.Row gutter={[16, 8]}>
          <Ant.Col className="mt-1" lg={12} md={12} sm={12} xs={24}>
            <Ant.Button
              htmlType="submit"
              type="primary"
              style={{ width: 150 }}
              onClick={() => {
                form.submit();
              }}
            >
              {"تایید"}
            </Ant.Button>
          </Ant.Col>
          <Ant.Col className="text-end" lg={12} md={12} sm={12} xs={24}>
            جمع کل بدهکار: {sumDebtor.toLocaleString() || 0}
            <br />
            جمع کل بستانکار: {sumCreditor.toLocaleString() || 0}
          </Ant.Col>
        </Ant.Row>
      </>
    );
  };

  //====================================================================
  //                        Component
  //====================================================================

  return (
    <>
      <ModalHeader title= {'ایجاد سند حسابداری'} />
      <Ant.Form form={form} layout="vertical" onFinish Failed={null}>
        <Ant.Row gutter={[16, 8]}>
          <Ant.Col lg={6} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              rules={[{ required: true }]}
              name={"branchId"}
              label="شعبه سند"
            >
              <Ant.Select
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                disabled={branchLoading || false}
                loading={branchLoading}
                options={branchData?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col lg={6} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              rules={[{ required: true }]}
              name={"AccountingDocumentTypeId"}
              label="نوع سند"
            >
              <Ant.Select
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                disabled={accTypeLoading || false}
                loading={accTypeLoading}
                options={accTypeData?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col lg={6} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              rules={[{ required: true }]}
              name={"accountingDocumentStateId"}
              label="وضعیت "
            >
              <Ant.Select
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                disabled={accStateLoading || false}
                loading={accStateLoading}
                options={
                  accStateData?.data && [
                    ...accStateData?.data?.filter((c) => c.id <= 2),
                  ]
                }
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col lg={6} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              rules={[{ required: true }]}
              name={"subNumber"}
              label="شماره فرعی"
            >
              <Ant.InputNumber min={0} style={{ width: "100%" }} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col lg={6} md={12} sm={12} xs={24}>
            <Ant.Form.Item name={"calendarId"} label="تاریخ">
              <MyDatePicker />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col lg={18} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              name={"description"}
              label="توضیحات"
              rules={[{ required: false }]}
            >
              <Ant.Input.TextArea allowClear showCount maxLength={400} />
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>
      </Ant.Form>

      <TBL
        updateDebtor={updateDebtor}
        updateCreditor={updateCreditor}
        footer={FooterContent}
        dataObject={dataDetailObject}
        onSubmit={onFinish}
      />
    </>
  );
};
export default FrmAddAccountDocument;

import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import MyDatePicker from "@/components/common/MyDatePicker";
import { useFetch, usePostWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import PropTypes from "prop-types";

import { HiDocumentPlus } from "react-icons/hi2";
const FrmAddAccountDocument = (props) => {
  const { onSuccess } = props;
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



  //====================================================================
  //                       useEffects
  //====================================================================
  useEffect(() => {
    addData?.isSuccess && onSuccess();
  }, [addData]);
  useEffect(() => {
    form.resetFields();
  }, [form]);

  //====================================================================
  //                        Functions
  //====================================================================

  const onFinish = async (values) => {

    const dto = {
      ...values,
      documentNumber: 0,
      calendarId: parseInt(values?.calendarId?.toString().replace(/\//g, "")),
    };
    await addApiCall(url.ACCOUNT_DOCUMENT, dto);

  };

  //====================================================================
  //                        Component
  //====================================================================

  return (
    <>
      <ModalHeader title={"ایجاد سند حسابداری"} icon={<HiDocumentPlus />} />
      <Ant.Form form={form} layout="vertical" onFinish={onFinish} Failed={null}>
        <Ant.Row gutter={[8, 8]}>
          <Ant.Col lg={16}>
            <Ant.Form.Item name={"calendarId"} label="تاریخ">
              <MyDatePicker />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col lg={8}>
            <Ant.Form.Item
              rules={[{ required: true }]}
              name={"subNumber"}
              label="شماره فرعی"
            >
              <Ant.InputNumber min={0} style={{ width: "100%" }} />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col span={24}>
            <Ant.Form.Item
              rules={[{ required: true }]}
              name={"branchId"}
              label="شعبه سند"
            >
              <Ant.Select
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                disabled={branchLoading}
                loading={branchLoading}
                options={branchData?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24}>
            <Ant.Form.Item
              rules={[{ required: true }]}
              name={"AccountingDocumentTypeId"}
              label="نوع سند"
            >
              <Ant.Select
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                disabled={accTypeLoading}
                loading={accTypeLoading}
                options={accTypeData?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24}>
            <Ant.Form.Item
              rules={[{ required: true }]}
              name={"accountingDocumentStateId"}
              label="وضعیت "
            >
              <Ant.Select
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                disabled={accStateLoading}
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

          <Ant.Col span={24}>
            <Ant.Form.Item
              name={"description"}
              label="توضیحات"
              rules={[{ required: false }]}
            >
              <Ant.Input.TextArea allowClear showCount maxLength={400} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24}>
            <Ant.Form.Item>
              <Ant.Button
                type="primary"
                onClick={() => {
                  form.submit();
                }}
                block
              >
                {"تایید"}
              </Ant.Button>
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>
      </Ant.Form>
    </>
  );
};
export default FrmAddAccountDocument;
FrmAddAccountDocument.propTypes = {
  onSuccess: PropTypes.func,
};

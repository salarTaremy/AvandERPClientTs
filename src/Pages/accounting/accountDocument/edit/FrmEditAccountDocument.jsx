import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import MyDatePicker from "@/components/common/MyDatePicker";
import { useFetch, usePutWithHandler } from "@/api";
import PropTypes from "prop-types";
import useRequestManager from "@/hooks/useRequestManager";
import * as api from "@/api";
import ModalHeader from "@/components/common/ModalHeader";
import { MdEditDocument } from "react-icons/md";
export const FrmEditAccountDocument = (props) => {
  const { onSuccess, id, myKey } = props;
  const [accTypeData, accTypeLoading, accTypeError] = useFetch(
    url.ACCOUNTING_DOCUMENT_TYPE,
  );
  const [branchData, branchLoading, branchError] = useFetch(url.BRANCH);
  const [accStateData, accStateLoading, accStateError] = useFetch(
    url.ACCOUNT_DOCUMENT_STATE,
  );
  const [
    listDataHeader,
    listLoadingHeader,
    listErrorHeader,
    listApiCallHeader,
  ] = api.useFetchWithHandler();

  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();

  const [form] = Ant.Form.useForm();

  useRequestManager({ error: editError, loading: editLoading, data: editData });
  useRequestManager({ error: accStateError });
  useRequestManager({ error: listErrorHeader });
  useRequestManager({ error: accTypeError });
  useRequestManager({ error: branchError });

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    editData?.isSuccess && onSuccess();
  }, [editData]);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  useEffect(() => {
    onEditHeader();
  }, []);

  useEffect(() => {
    form.resetFields();
    listDataHeader?.isSuccess &&
      form.setFieldsValue({ ...(listDataHeader?.data || null) });
  }, [listDataHeader]);

  //====================================================================
  //                        Functions
  //====================================================================
  const onEditHeader = async () => {
    await listApiCallHeader(`${url.ACCOUNT_DOCUMENT}/${id}`);
  };

  const onFinish = async (values) => {
    // let valueHeader = form.getFieldsValue();
    const dto = {
      ...values,
      documentNumber: 0,
      id: id,
      calendarId: parseInt(
        values?.persianDateTilte?.toString().replace(/\//g, ""),
      ),
    };

    await editApiCall(url.ACCOUNT_DOCUMENT, dto);
  };

  //====================================================================
  //                        Child Components
  //====================================================================

  //====================================================================
  //                        Component
  //====================================================================

  return (
    <>
      <ModalHeader title={"ویرایش سند حسابداری"} icon={<MdEditDocument />} />
      <Ant.Form form={form} layout="vertical" onFinish={onFinish} >
        <Ant.Row gutter={[8, 8]}>
          <Ant.Col lg={16}>
            <Ant.Form.Item name={"persianDateTilte"} label={"تاریخ"}>
              <MyDatePicker />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col lg={8}>
            <Ant.Form.Item
              name={"subNumber"}
              label={"شماره فرعی"}
              rules={[{ required: true }]}
            >
              <Ant.InputNumber min={0} style={{ width: "100%" }} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24}>
            <Ant.Form.Item
              name={"branchId"}
              label={"شعبه سند"}
              rules={[{ required: true }]}
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
              name={"accountingDocumentTypeId"}
              label={"نوع سند "}
            >
              <Ant.Select
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                disabled
                loading={accTypeLoading}
                options={accTypeData?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24}>
            <Ant.Form.Item
              name={"accountingDocumentStateId"}
              label={"وضعیت "}
              rules={[{ required: true }]}
            >
              <Ant.Select
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                disabled
                loading={accStateLoading}
                options={accStateData?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col span={24}>
            <Ant.Form.Item
              name={"description"}
              label={"توضیحات"}
              rules={[{ required: false }]}
            >
              <Ant.Input.TextArea allowClear showCount maxLength={400} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24}>
            <Ant.Form.Item>
              <Ant.Button
                type="primary"
                loading={editLoading}
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
export default FrmEditAccountDocument;
FrmEditAccountDocument.propTypes = {
  onSuccess: PropTypes.func,
  obj: PropTypes.any,
  id: PropTypes.number,
  myKey: PropTypes.number,
};

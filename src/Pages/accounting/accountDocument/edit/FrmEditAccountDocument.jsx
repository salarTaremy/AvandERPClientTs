import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import MyDatePicker from "@/components/common/MyDatePicker";
import { useFetch, usePutWithHandler } from "@/api";
import PropTypes from "prop-types";
import useRequestManager from "@/hooks/useRequestManager";
import TBL from "../../../accounting/accountDocument/add/Table";
import * as api from "@/api";
import ModalHeader from "@/components/common/ModalHeader";
import { MdEditDocument } from "react-icons/md";

import { useParams, useNavigate } from "react-router-dom";
export const FrmEditAccountDocument = (props) => {
  const { onSuccess, id, key } = props;
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
  const navigate = useNavigate();
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  const [dataEditList, setDataEdit] = useState([]);
  const [sumDebtorEdit, setSumDebtorEdit] = useState(0);
  const [sumCreditorEdit, setSumCreditorEdit] = useState(0);
  const [form] = Ant.Form.useForm();
  const params = useParams();
  useRequestManager({ error: editError, loading: editLoading, data: editData });
  useRequestManager({ error: accStateError });
  useRequestManager({ error: listErrorHeader });
  useRequestManager({ error: accTypeError });
  useRequestManager({ error: branchError });

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    form.resetFields();
  }, [form]);

  useEffect(() => {
    onEditHeader();
  }, []);

  useEffect(() => {}, [dataEditList]);

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

  const dataEdit = (data) => {
    setDataEdit(data);
  };
  const updateDebtorEdit = (debtor) => {
    setSumDebtorEdit(debtor);
  };
  const updateCreditorEdit = (creditor) => {
    setSumCreditorEdit(creditor);
  };
  const onFinish = async (values) => {
    // let valueHeader = form.getFieldsValue();
    const header = {
      ...values,
      documentNumber: 0,
      id: id,
      calendarId: parseInt(
        values?.persianDateTilte?.toString().replace(/\//g, ""),
      ),
    };

    // const header = {
    //   id: id,
    //   documentNumber: 0,
    //   branchId: valueHeader.branchId,
    //   calendarId: parseInt(
    //     valueHeader?.persianDateTilte?.toString().replace(/\//g, ""),
    //   ),
    //   subNumber: valueHeader.subNumber,
    //   description: valueHeader.description,
    // };

    // const detailsList = [];

    // for (let key in values) {
    //   if (typeof values[key] === "object") {
    //     detailsList.push(values[key]);
    //   }
    // }

    // delete header.details;
    const dto = {
      header,
      // details: [],
    };

    await editApiCall(url.ACCOUNT_DOCUMENT, dto);
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
            جمع کل بدهکار: {sumDebtorEdit.toLocaleString() || 0}
            <br />
            جمع کل بستانکار: {sumCreditorEdit.toLocaleString() || 0}
          </Ant.Col>
        </Ant.Row>
      </>
    );
  };

  //====================================================================
  //                        Component
  //====================================================================
  const text = (
    <strong className="text-xs sm:text-sm">{"ویرایش سند حسابداری"}</strong>
  );
  return (
    <>
      <ModalHeader title={"ویرایش سند حسابداری"} icon={<MdEditDocument />}/>
      <Ant.Form form={form} layout="vertical" onFinish={onFinish} Failed={null}>
        <Ant.Row gutter={[8, 8]}>
          <Ant.Col lg={16}>
            <Ant.Form.Item name={"persianDateTilte"} label="تاریخ">
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
                disabled={branchLoading || false}
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
              label="نوع سند "
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
              rules={[{ required: true }]}
              name={"accountingDocumentStateId"}
              label="وضعیت "
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

      {/* <TBL
        updateDebtorEdit={updateDebtorEdit}
        updateCreditorEdit={updateCreditorEdit}
        footer={FooterContent}
        dataEdit={dataEdit}
        onSubmit={onFinish}
      /> */}
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

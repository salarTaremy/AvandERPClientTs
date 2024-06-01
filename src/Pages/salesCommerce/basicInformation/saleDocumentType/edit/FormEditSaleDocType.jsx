import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { usePutWithHandler, useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
const FormEditSaleDocumentType = (props) => {
  const { onSuccess, obj, id } = props;
  const [loading, setLoading] = useState(false);
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  const [mappedDocIssueData, mappedDocIssueLoading, mappedDocIssueError] = useFetch(url.TPS_SALE_DOCUMENT_ISSUE);
  useRequestManager({ error: editError, loading: editLoading, data: editData });
  const [form] = Ant.Form.useForm();
  const natureList = [
    {id: 0, title: 'خنثی'},
    {id: 1, title: 'فروش'},
    {id: -1, title: 'مرجوعی'}
  ];

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ ...obj });
  }, [obj]);
  useEffect(() => {
    editData?.isSuccess && onSuccess();
  }, [editData]);
  //=====================================================================
  //                        Functions
  //=====================================================================
  const onFinish = async (values) => {
    setLoading(true);
    const req = { ...values, id: id };
    await editApiCall(url.SALE_DOCUMENT_TYPE, req);
    setLoading(false);
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title=  {"ویرایش نوع برگه های فروش"}/>
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Form.Item name="title" label={"نام"} rules={[{ required: true }]}>
          <Ant.Input allowClear showCount maxLength={100} />
        </Ant.Form.Item>
        <Ant.Form.Item name="natureId" label={"ماهیت"} rules={[{ required: true }]}>
          <Ant.Select
            allowClear
            placeHolder={'انتخاب کنید...'}
            options={natureList}
            fieldNames={{label: 'title', value: 'id'}}/>
        </Ant.Form.Item>
        <Ant.Form.Item name="mappedTaxPayersSystemSaleDocumentIssueId" label={"برگه متناظر در سامانه مودیان"}>
          <Ant.Select
            allowClear={true}
            placeHolder={'انتخاب کنید...'}
            disable={mappedDocIssueLoading || false}
            loading={mappedDocIssueLoading}
            options={mappedDocIssueData?.data}
            fieldNames={{label: 'title', value: 'id'}}
          />
        </Ant.Form.Item>
        <Ant.Form.Item>
          <Ant.Button
            block
            type="primary"
            loading={loading}
            onClick={() => {
              form.submit();
            }}
          >
            {"تایید"}
          </Ant.Button>
        </Ant.Form.Item>
      </Ant.Form>
    </>
  );
};

export default FormEditSaleDocumentType;
FormEditSaleDocumentType.propTypes = {
  onFinish: PropTypes.func,
  onSuccess: PropTypes.func,
  obj: PropTypes.any,
  id: PropTypes.number,
  loading: PropTypes.bool,
};

import React, {useState , useEffect } from "react";
import { forwardRef, useImperativeHandle } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import {usePutWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import * as url from '@/api/url'
const FormEditDocumentType = (props) => {
  const { onSuccess, obj, id } = props;
  const [loading, setLoading] = useState(false);
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  useRequestManager({ error: editError, loading: editLoading, data: editData });
  const [form] = Ant.Form.useForm();
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
    await editApiCall(url.ACCOUNTING_DOCUMENT_TYPE, req);
    setLoading(false);
  };
  return (
    <>
      <ModalHeader title={" ویرایش سند حسابداری"} />
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Form.Item
          name="name"
          label={"نوع سند"}
          rules={[{ required: true }]}
        >
          <Ant.Input allowClear showCount maxLength={200} />
        </Ant.Form.Item>
        <Ant.Form.Item
          name="description"
          label="توضیحات"
          rules={[{ required: false }]}
        >
          <Ant.Input.TextArea allowClear showCount maxLength={400} />
        </Ant.Form.Item>
        <Ant.Form.Item>
          <Ant.Button
            block
            type="primary"

            loading={loading}
            htmlType="submit"
          >
            {"تایید"}
          </Ant.Button>
        </Ant.Form.Item>
      </Ant.Form>
    </>
  );
};

export default FormEditDocumentType;
FormEditDocumentType.propTypes = {
  onFinish: PropTypes.func,
  onSuccess: PropTypes.func,
  obj: PropTypes.any,
  id: PropTypes.number,
  loading: PropTypes.bool,
};

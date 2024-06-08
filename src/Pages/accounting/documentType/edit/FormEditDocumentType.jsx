import React, { useState, useEffect } from "react";
import { forwardRef, useImperativeHandle } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import { usePutWithHandler, useFetchWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import * as url from '@/api/url'
const FormEditDocumentType = (props) => {
  const { onSuccess, id } = props;
  const [loading, setLoading] = useState(false);
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  useRequestManager({ error: editError, loading: editLoading, data: editData });
  const [form] = Ant.Form.useForm();
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getDocumentTypeById()
  }, []);

  useEffect(() => {
    form.resetFields()
    listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
  }, [listData])
  //=====================================================================
  //                        Functions
  //=====================================================================
  const getDocumentTypeById = async () => {
    await ApiCall(`${url.ACCOUNTING_DOCUMENT_TYPE}/${id}`);
  };

  const onFinish = async (values) => {
    setLoading(true);
    const req = { ...values, id: id };
    await editApiCall(url.ACCOUNTING_DOCUMENT_TYPE, req);
    setLoading(false);
    onSuccess()
  };
  return (
    <>
      <ModalHeader title={" ویرایش سند حسابداری"} />
      <Ant.Skeleton loading={loadingData}>
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
      </Ant.Skeleton>
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

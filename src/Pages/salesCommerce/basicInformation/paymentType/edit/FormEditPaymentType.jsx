import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { usePutWithHandler, useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
const FormEditPaymentType = (props) => {
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
    getPaymentTypeById()
  }, []);

  useEffect(() => {
    form.resetFields()
    listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
  }, [listData])
  //=====================================================================
  //                        Functions
  //=====================================================================
  const getPaymentTypeById = async () => {
    await ApiCall(`${url.PAYMENT_TYPE}/${id}`)
  };

  const onFinish = async (values) => {
    setLoading(true);
    const req = { ...values, id: id };
    await editApiCall(url.PAYMENT_TYPE, req);
    setLoading(false);
    onSuccess()
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"ویرایش نوع پرداخت"} />
      <Ant.Skeleton loading={loadingData}>
        <Ant.Form form={form} onFinish={onFinish} layout="vertical">
          <Ant.Form.Item
            name="title"
            label={"عنوان"}
            rules={[{ required: true }]}
          >
            <Ant.Input allowClear showCount maxLength={100} />
          </Ant.Form.Item>
          <Ant.Form.Item
            name={"description"}
            label="توضیحات"
            rules={[{ required: false }]}
          >
            <Ant.Input.TextArea allowClear showCount maxLength={500} />
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
      </Ant.Skeleton>
    </>
  );
};

export default FormEditPaymentType;
FormEditPaymentType.propTypes = {
  onFinish: PropTypes.func,
  onSuccess: PropTypes.func,
  obj: PropTypes.any,
  id: PropTypes.number,
  loading: PropTypes.bool,
};

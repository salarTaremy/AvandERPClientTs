import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { usePostWithHandler, useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import PropTypes from "prop-types";
import * as url from "@/api/url";

const FormAddPaymentType = (props) => {
  const { onSuccess } = props;
  const [loading, setLoading] = useState(false);
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
  useRequestManager({ error: addError, loading: addLoading, data: addData });
  const [form] = Ant.Form.useForm();
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    addData?.isSuccess && onSuccess();
  }, [addData]);
  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = async (values) => {
    setLoading(true);
    const req = { ...values };
    await addApiCall(url.PAYMENT_TYPE, req);
    setLoading(false);
  };
  //====================================================================
  //                        Component
  //====================================================================

  return (
    <>
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Row>
          <Ant.Col span={24}>
            {"ایجاد نوع پرداخت"}
            <Ant.Divider />
          </Ant.Col>
        </Ant.Row>
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
    </>
  );
};

export default FormAddPaymentType;
FormAddPaymentType.propTypes = {
  onSuccess: PropTypes.func,
};

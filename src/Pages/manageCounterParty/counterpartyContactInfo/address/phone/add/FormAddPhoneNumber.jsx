import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { usePostWithHandler, useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import ModalHeader from "@/components/common/ModalHeader";

const FormAddPhoneNumber = (props) => {
  const { onSuccess, addressId } = props;
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
    const req = {
      ...values,
      addressId: addressId,
    };
    console.log('value', req)
    await addApiCall(url.COUNTERPARTY_PHONE_NUMBER, req);
    setLoading(false);
  };
  //====================================================================
  //                        Component
  //====================================================================

  return (
    <>
      <ModalHeader title={"ثبت شماره تماس"} />
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">

        <Ant.Form.Item name="title" label={"عنوان"} rules={[{ required: true }]}>
          <Ant.Input allowClear showCount maxLength={100} />
        </Ant.Form.Item>
        <Ant.Form.Item
          name="phoneNumber"
          label={"شماره تماس"}
          rules={[{ required: true }]}
        >
          <Ant.Input allowClear showCount maxLength={11} />
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

export default FormAddPhoneNumber;
FormAddPhoneNumber.propTypes = {
  onSuccess: PropTypes.func,
};

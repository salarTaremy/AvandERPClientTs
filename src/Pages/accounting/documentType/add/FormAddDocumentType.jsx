import React, { useState ,useEffect } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import { usePostWithHandler } from '@/api'
import * as url from '@/api/url'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import { HiDocumentPlus } from "react-icons/hi2";
const FormAddDocumentType =  (props) => {
  const { onSuccess } = props
  const [loading, setLoading] = useState(false)
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler()
  useRequestManager({ error: addError, loading: addLoading, data: addData })
  const [form] = Ant.Form.useForm();
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
      addData?.isSuccess && onSuccess()
  }, [addData])
      //====================================================================
    //                        Functions
    //====================================================================
    const onFinish = async (values) => {
      setLoading(true)
      const req = { ...values }
      await addApiCall(url.ACCOUNTING_DOCUMENT_TYPE, req)
      setLoading(false)
  }
      //====================================================================
    //                        Component
    //====================================================================
  return (
    <>
      <ModalHeader title={" نوع سند حسابداری"} icon={<HiDocumentPlus />}/>
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
          <Ant.Button block type="primary" loading={loading} htmlType="submit">
            {"تایید"}
          </Ant.Button>
        </Ant.Form.Item>
      </Ant.Form>
    </>
  )
}

export default FormAddDocumentType;
FormAddDocumentType.propTypes = {
  onSuccess: PropTypes.func,
  loading: PropTypes.bool,
};

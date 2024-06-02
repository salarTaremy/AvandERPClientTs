import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { usePostWithHandler, useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import ModalHeader from "@/components/common/ModalHeader";
const FormAddCurrency = (props) => {
  const { onSuccess } = props;
  const [loading, setLoading] = useState(false);
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
  const [mappedDocIssueData, mappedDocIssueLoading, mappedDocIssueError] = useFetch(url.TPS_SALE_DOCUMENT_ISSUE);
  useRequestManager({ error: addError, loading: addLoading, data: addData });
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
    addData?.isSuccess && onSuccess();
  }, [addData]);
  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = async (values) => {
    setLoading(true);
    const req = { ...values };
    await addApiCall(url.SALE_DOCUMENT_TYPE, req);
    setLoading(false);
  };
  //====================================================================
  //                        Component
  //====================================================================

  return (
    <>
                   <ModalHeader title=  {"ایجاد نوع برگه های فروش"}/>
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">

        <Ant.Form.Item name="title" label={"نام"} rules={[{ required: true }]}>
          <Ant.Input allowClear showCount maxLength={100} />
        </Ant.Form.Item>
        <Ant.Form.Item name="nature" label={"ماهیت"} rules={[{ required: true }]}>
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

export default FormAddCurrency;
FormAddCurrency.propTypes = {
  onSuccess: PropTypes.func,
};

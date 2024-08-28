import React, { useEffect, useState } from "react";
import ModalHeader from "@/components/common/ModalHeader";
import * as Ant from "antd";
import { MdGrading } from "react-icons/md";
import useRequestManager from "@/hooks/useRequestManager";

import PropTypes from "prop-types";

import { useFetchWithHandler, useFetch, usePutWithHandler } from "@/api";
import * as url from "@/api/url";

export const FormEditSaleClassification = (props) => {
  const { key, onSuccess, id } = props;
  const [accountList, accountLoading, accountError] = useFetch(url.ACCOUNT);
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  useRequestManager({ error: accountError });
  useRequestManager({ error: dtAccError });
  useRequestManager({ error: editError, loading: editLoading, data: editData });
  const [form] = Ant.Form.useForm();

  const commonOptionsAcc = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) =>
      option.name.toLowerCase().includes(input.toLowerCase()),
  };

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getAllSalesClassiFicationId();
  }, []);
  useEffect(() => {
    form.resetFields();
    listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) });
  }, [listData]);

  useEffect(() => {
    editData?.isSuccess && onSuccess();
  }, [editData]);

  const getAllSalesClassiFicationId = async () => {
    await ApiCall(`${url.SALE_CLASSIFICATION}/${id}`);
  };

  const onFinish = async (values) => {
    console.log(values, "values");
    const req = { ...values ,id:id};
    await editApiCall(url.SALE_CLASSIFICATION, req);
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"ویرایش طبقه بندی فروش"} icon={<MdGrading />} />
      <Ant.Skeleton loading={loadingData}>
        <Ant.Form form={form} onFinish={onFinish} layout="vertical">
          <Ant.Row gutter={[8, 8]}>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name="title"
                label={"نام"}
                rules={[{ required: true }]}
              >
                <Ant.Input allowClear showCount maxLength={200} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item name={"accountId"} label="حساب ">
                <Ant.Select
                  {...commonOptionsAcc}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={accountLoading || false}
                  loading={accountLoading}
                  options={accountList?.data}
                  fieldNames={{ label: "name", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item name={"detailedAccountId"} label="حساب تفصیلی">
                <Ant.Select
                  {...commonOptionsAcc}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={dtAccLoading || false}
                  loading={dtAccLoading}
                  options={dtAccData?.data}
                  fieldNames={{ label: "name", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item>
                <Ant.Button
                  loading={editLoading || false}
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
      </Ant.Skeleton>
    </>
  );
};

export default FormEditSaleClassification;
FormEditSaleClassification.propTypes = {
  onSuccess: PropTypes.func,
  id: PropTypes.number,
};

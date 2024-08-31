import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { usePutWithHandler, useFetchWithHandler,useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import { TbTruckDelivery } from "react-icons/tb";

const FormEditDeliveryType = (props) => {
  const { onSuccess, obj, id } = props;
  const [loading, setLoading] = useState(false);
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  useRequestManager({ error: editError, loading: editLoading, data: editData });

  const [accountList, accountLoading, accountError] = useFetch(url.ACCOUNT);
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [form] = Ant.Form.useForm();
  useRequestManager({ error: accountError });
  useRequestManager({ error: dtAccError });
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
    getDeliveryTypeById();
  }, []);

  useEffect(() => {
    form.resetFields();
    listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) });
  }, [listData]);
  //=====================================================================
  //                        Functions
  //=====================================================================
  const getDeliveryTypeById = async () => {
    await ApiCall(`${url.DELIVERY_TYPE}/${id}`);
  };

  const onFinish = async (values) => {
    setLoading(true);
    const req = { ...values, id: id };
    await editApiCall(url.DELIVERY_TYPE, req);
    setLoading(false);
    onSuccess();
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"ویرایش نوع تحویل"} icon={<TbTruckDelivery />} />
      <Ant.Skeleton active loading={loadingData}>
        <Ant.Form form={form} onFinish={onFinish} layout="vertical">
          <Ant.Row gutter={[8, 8]}>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name="title"
                label={"نام"}
                rules={[{ required: true }]}
              >
                <Ant.Input allowClear showCount maxLength={100} />
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
              <Ant.Form.Item name="description" label={"توضیحات"}>
                <Ant.Input.TextArea allowClear showCount maxLength={400} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
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
            </Ant.Col>
          </Ant.Row>
        </Ant.Form>
      </Ant.Skeleton>
    </>
  );
};

export default FormEditDeliveryType;
FormEditDeliveryType.propTypes = {
  onFinish: PropTypes.func,
  onSuccess: PropTypes.func,
  obj: PropTypes.any,
  id: PropTypes.number,
};

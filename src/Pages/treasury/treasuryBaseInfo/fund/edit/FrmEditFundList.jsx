import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { PiArrowLineDownLeftLight } from "react-icons/pi";
import { usePutWithHandler, useFetchWithHandler, useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import MyDatePicker from "@/components/common/MyDatePicker";
import { RiRefund2Fill } from "react-icons/ri";
const FrmEditFundList = (props) => {
  const { onSuccess, id } = props;

  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] =
    useFetchWithHandler();
  const [accountList, accountLoading, accountError] = useFetch(url.ACCOUNT);
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [employeeList, employeeLoading, employeeError] = useFetch(url.EMPLOYEE);

  useRequestManager({ error: maxCodeError });
  useRequestManager({ error: editError });
  useRequestManager({ error: accountError });
  useRequestManager({ error: dtAccError });
  useRequestManager({ error: employeeError });
  const [form] = Ant.Form.useForm();
  const commonOptions = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) =>  option.name.toLowerCase().includes(input.toLowerCase()),
  };
  const commonOptionsEmployee = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) =>  option.fullName.toLowerCase().includes(input.toLowerCase()),
  };
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    editData?.isSuccess && onSuccess();
  }, [editData]);
  useEffect(() => {
    getAllFund();
  }, []);

  useEffect(() => {
    form.resetFields();
    listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) });
  }, [listData]);
  useEffect(() => {
    maxCodeData?.isSuccess &&
      maxCodeData?.data?.maxCode &&
      form.setFieldsValue({ code: maxCodeData.data.maxCode });
  }, [maxCodeData]);
  //====================================================================
  //                        Functions
  //====================================================================

  const getAllFund = async () => {
    await ApiCall(`${url.FUND}/${id}`);
  };

  const getMaxCode = async () => {
    await maxCodeApiCall(url.FUND_MAX_CODE);
  };

  //====================================================================
  //                        Child Components
  //====================================================================
  const AddonBefore = () => {
    return (
      <Ant.Button
        size="small"
        type="text"
        onClick={getMaxCode}
        loading={maxCodeLoading}
      >
        <PiArrowLineDownLeftLight />
      </Ant.Button>
    );
  };
  //====================================================================
  //                        Component
  //====================================================================
  const onFinish = async (values) => {
    const req = {
      ...values,
      openingDateCalendarId: parseInt(values?.openingDateCalendarId?.toString().replace(/\//g, "")),
      id: id,
    };

    await editApiCall(url.FUND, req);
  };
  return (
    <>
      <Ant.Skeleton active loading={loadingData}>
        <ModalHeader title={"ایجاد صندوق"} icon={<RiRefund2Fill />} />

        <Ant.Form form={form} onFinish={onFinish} layout="vertical">
          <Ant.Row gutter={[8, 8]}>
            <Ant.Col span={24} md={24} lg={16}>
              <Ant.Form.Item
                name={"openingDateTitle"}
                rules={[{ required: true }]}
                label=" تاریخ افتتاح"
              >
                <MyDatePicker />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={8}>
              <Ant.Form.Item
                name={"code"}
                label="کد"
                rules={[{ required: true }]}
              >
                <Ant.Input
                  allowClear
                  addonBefore={<AddonBefore />}
                  style={{ textAlign: "center" }}
                />
              </Ant.Form.Item>
            </Ant.Col>

            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name="name"
                label={"نام"}
                rules={[{ required: true }]}
              >
                <Ant.Input allowClear showCount maxLength={200} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item name="latinName" label={"نام انگلیسی"}>
                <Ant.Input allowClear showCount maxLength={200} />
              </Ant.Form.Item>
            </Ant.Col>

            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name={"accountId"}
                label="حساب "
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Ant.Select
                  {...commonOptions}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={accountLoading }
                  loading={accountLoading}
                  options={accountList?.data}
                  fieldNames={{ label: "name", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name={"detailedAccountId"}
                label="حساب تفصیلی"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Ant.Select
                  {...commonOptions}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={dtAccLoading }
                  loading={dtAccLoading}
                  options={dtAccData?.data}
                  fieldNames={{ label: "name", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>

            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item name={"cashierEmploeeId"} label="مسئول صندوق">
                <Ant.Select
                  {...commonOptionsEmployee}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={employeeLoading }
                  loading={employeeLoading}
                  options={employeeList?.data}
                  fieldNames={{ label: "fullName", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24}>
              <Ant.Form.Item>
                <Ant.Button
                  loading={editLoading}
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
export default FrmEditFundList;
FrmEditFundList.propTypes = {
  onSuccess: PropTypes.func,
  id: PropTypes.number,
};

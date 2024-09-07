import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { PiArrowLineDownLeftLight } from "react-icons/pi";
import { usePostWithHandler, useFetchWithHandler, useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import MyDatePicker from "@/components/common/MyDatePicker";
import { FaBoxOpen } from "react-icons/fa";
import { RiRefund2Fill } from "react-icons/ri";
const FormAddSupplier = (props) => {
  const { onSuccess } = props;
  const [loading, setLoading] = useState(false);
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] =
    useFetchWithHandler();
  const [accountList, accountLoading, accountError] = useFetch(url.ACCOUNT);
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [employeeList, employeeLoading, employeeError] = useFetch(url.EMPLOYEE);

  useRequestManager({ error: maxCodeError });
  useRequestManager({ error: employeeError });
  useRequestManager({ error: dtAccError });
  useRequestManager({ error: accountError });
  useRequestManager({ error: addError });
  const [form] = Ant.Form.useForm();

  const commonOptions = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) =>
      option.name.toLowerCase().includes(input.toLowerCase()),
  };
  const commonOptionsEmployee = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) =>
      option.fullName.toLowerCase().includes(input.toLowerCase()),
  };
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    addData?.isSuccess && onSuccess();
  }, [addData]);
  useEffect(() => {
    maxCodeData?.isSuccess &&
      maxCodeData?.data?.maxCode &&
      form.setFieldsValue({ code: maxCodeData.data.maxCode });
  }, [maxCodeData]);
  //====================================================================
  //                        Functions
  //======================================================================
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
    console.log(values, "values");
    setLoading(true);
    const req = {
      ...values,
      openingDateCalendarId: parseInt(
        values?.openingDateCalendarId?.toString().replace(/\//g, ""),
      ),
    };
    console.log(req, "req");
    await addApiCall(url.FUND, req);
    setLoading(false);
  };
  return (
    <>
      <ModalHeader title={"ایجاد صندوق"} icon={<RiRefund2Fill />} />

      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Row gutter={[8, 8]}>
          <Ant.Col span={24} md={24} lg={16}>
            <Ant.Form.Item
              name={"openingDateCalendarId"}
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
                disabled={accountLoading || false}
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
                disabled={dtAccLoading || false}
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
                disabled={employeeLoading || false}
                loading={employeeLoading}
                options={employeeList?.data}
                fieldNames={{ label: "fullName", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24}>
            <Ant.Form.Item>
              <Ant.Button
                loading={addLoading}
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
    </>
  );
};
export default FormAddSupplier;
FormAddSupplier.propTypes = {
  onSuccess: PropTypes.func,
};

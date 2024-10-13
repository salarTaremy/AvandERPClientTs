import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import PropTypes from "prop-types";
import { usePostWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import { MdPriceChange } from "react-icons/md";
import MyDatePicker from "@/components/common/MyDatePicker";
import { TimePicker } from 'antd';
import * as defaultValues from "@/defaultValues";


const FormAddPriceCircularHeader = (props) => {
  const { onSuccess } = props;
  const [loading, setLoading] = useState(false);
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
  const [selectData, selectLoading, selectError] = api.useFetch(url.CURRENCY);
  const [implementationTime, setImplementationTime] = useState(null)
  useRequestManager({ error: selectError });
  useRequestManager({ error: addError, loading: addLoading, data: addData });
  const [form] = Ant.Form.useForm();

  const commonOptions = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) => option.persianTitle.indexOf(input) >= 0,
  };

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    addData?.isSuccess && onSuccess();
  }, [addData]);
  useEffect(() => {
    form.setFieldValue("isActive", false);
  }, [form]);
  //====================================================================
  //                        Functions
  //======================================================================
  const onFinish = async (values) => {
    setLoading(true);
    const req = {
      ...values,
      startDateCalendarId: values?.startDate?.toString().replace(/\//g, ''),
      endDateCalendarId: values?.endDate?.toString().replace(/\//g, ''),
      implementationDateCalendarId: values?.implementationDate?.toString().replace(/\//g, ''),
      implementationTime: implementationTime
    };
    await addApiCall(url.PRICE_CIRCULAR_HEADER, req);
    setLoading(false);
  };

  const timePickerOnChange = (time, timeString) => {
    setImplementationTime(timeString);
  }

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"ایجاد سربرگ بخشنامه قیمت جدید"} icon={<MdPriceChange />} />
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Form.Item
          name="title"
          label={"عنوان"}
          rules={[{ required: true }]}
        >
          <Ant.Input allowClear showCount maxLength={200} />
        </Ant.Form.Item>
        <Ant.Space>
          <Ant.Form.Item
            name={'startDate'}
            label="تاریخ شروع"
            rules={[{ required: true }]}>
            <MyDatePicker />
          </Ant.Form.Item>
          <Ant.Form.Item
            name={'endDate'}
            label="تاریخ پایان"
          >
            <MyDatePicker />
          </Ant.Form.Item>
        </Ant.Space>
        <Ant.Row gutter={8}>
          <Ant.Col span={12}>
            <Ant.Form.Item
              name={'implementationDate'}
              label="تاریخ اجرا"
              rules={[{ required: true }]}

            >
              <MyDatePicker />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={12}>
            <Ant.Form.Item
              name={'implementationTime'}
              label="ساعت اجرا"
              rules={[{ required: true }]}
            >
              <TimePicker onChange={timePickerOnChange} style={{ width: "100%" }} />
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>
        <Ant.Form.Item
          name={"defaultCurrencyId"}
          label="ارز پیش فرض"
        >
          <Ant.Select
            {...commonOptions}
            allowClear={true}
            placeholder={"انتخاب کنید..."}
            disabled={selectLoading }
            loading={selectLoading}
            options={selectData?.data}
            fieldNames={{ label: "persianTitle", value: "id" }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item
          name="description"
          label={"توضیحات"}
        >
          <Ant.Input.TextArea allowClear showCount maxLength={400} />
        </Ant.Form.Item>
        <Ant.Form.Item
          name="isActive"
          label="فعال"

        >
          <Ant.Switch />
        </Ant.Form.Item>
        <Ant.Form.Item>
          <Ant.Button
            loading={loading}
            type="primary"
            onClick={() => {
              form.submit();
            }}
            block
          >
            {"تایید"}
          </Ant.Button>
        </Ant.Form.Item>
      </Ant.Form>
    </>
  );
};
export default FormAddPriceCircularHeader;
FormAddPriceCircularHeader.propTypes = {
  onSuccess: PropTypes.func,
};


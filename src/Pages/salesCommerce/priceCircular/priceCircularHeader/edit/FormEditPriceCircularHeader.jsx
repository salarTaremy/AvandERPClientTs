import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import * as api from "@/api";
import { MdPriceChange } from "react-icons/md";
import { useFetchWithHandler, usePutWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import MyDatePicker from "@/components/common/MyDatePicker";
import * as defaultValues from "@/defaultValues";
import PriceCircularDetailList from "../../priceCircularDetail/list/PriceCircularDetailList";
import { LuFolderOpen } from "react-icons/lu";
import { TimePicker } from "antd";
import dayjs from "dayjs";

const FormEditPriceCircularHeader = (props) => {
  const { onSuccess, id } = props;
  const [loading, setLoading] = useState(false);
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  const [selectData, selectLoading, selectError] = api.useFetch(url.CURRENCY);
  const [openModalPriceCircularDetail, setOpenModalPriceCircularDetail] =
    useState(false);
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();

  useRequestManager({ error: editError, loading: editLoading, data: editData });
  const [implementationTime, setImplementationTime] = useState(null);
  const [form] = Ant.Form.useForm();
  useRequestManager({ error: selectError });
  useRequestManager({ error: error });

  const commonOptions = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) => option.persianTitle.indexOf(input) >= 0,
  };
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getPriceCircularListById();
  }, []);

  useEffect(() => {
    form.resetFields();
    const timeData = {
      implementationTime: dayjs(listData?.data?.implementationTime, "HH:mm:ss"),
    };
    listData?.isSuccess &&
      form.setFieldsValue({
        ...(listData?.data || null),
        ...(listData?.data ? timeData : null),
      });
    setImplementationTime(listData?.data?.implementationTime);
  }, [listData]);

  //====================================================================
  //                        Functions
  //======================================================================

  const showModalPriceCircularDetail = () => {
    setOpenModalPriceCircularDetail(true);
  };

  const getPriceCircularListById = async () => {
    await ApiCall(`${url.PRICE_CIRCULAR_HEADER}/${id}`);
  };

  const onFinish = async (values) => {
    setLoading(true);
    const req = {
      ...values,
      id: id,
      startDateCalendarId: values?.startDate?.toString().replace(/\//g, ""),
      endDateCalendarId: values?.endDate?.toString().replace(/\//g, ""),
      implementationDateCalendarId: values?.implementationDate
        ?.toString()
        .replace(/\//g, ""),
      implementationTime: implementationTime,
    };
    await editApiCall(url.PRICE_CIRCULAR_HEADER, req);
    setLoading(false);
    onSuccess();
  };

  const timePickerOnChange = (time, timeString) => {
    setImplementationTime(timeString);
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader
        title={`ویرایش بخشنامه قیمت (شناسه: ${id})`}
        icon={<MdPriceChange />}
      />

      <Ant.Modal
        open={openModalPriceCircularDetail}
        centered
        getContainer={null}
        footer={null}
        onCancel={() => {
          setOpenModalPriceCircularDetail(false);
        }}
        {...defaultValues.MODAL_PROPS}
        {...defaultValues.MODAL_EXTRA_LARGE}
        onOk={() => {
          setOpenModalPriceCircularDetail(false);
        }}
      >
        <PriceCircularDetailList priceCircularHeaderId={id} />
      </Ant.Modal>

      <Ant.Skeleton active loading={loadingData}>
        <Ant.Form form={form} onFinish={onFinish} layout="vertical">
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col span={24}>
              <Ant.Form.Item
                name="title"
                label={"عنوان"}
                rules={[{ required: true }]}
              >
                <Ant.Input allowClear showCount maxLength={200} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col md={12} sm={12} xs={24}>
              <Ant.Form.Item
                name={"startDate"}
                label="تاریخ شروع"
                rules={[{ required: true }]}
              >
                <MyDatePicker />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col md={12} sm={12} xs={24}>
              <Ant.Form.Item name={"endDate"} label="تاریخ پایان">
                <MyDatePicker />
              </Ant.Form.Item>
            </Ant.Col>

            <Ant.Col md={12} sm={12} xs={24}>
              <Ant.Form.Item
                name={"implementationDate"}
                label="تاریخ اجرا"
                rules={[{ required: true }]}
              >
                <MyDatePicker />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col md={12} sm={12} xs={24}>
              <Ant.Form.Item
                name={"implementationTime"}
                label="ساعت اجرا"
                rules={[{ required: true }]}
              >
                <TimePicker
                  onChange={timePickerOnChange}
                  style={{ width: "100%" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24}>
              <Ant.Form.Item name={"defaultCurrencyId"} label="ارز پیش فرض">
                <Ant.Select
                  {...commonOptions}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={selectLoading}
                  loading={selectLoading}
                  options={selectData?.data}
                  fieldNames={{ label: "persianTitle", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24}>
              <Ant.Form.Item name="description" label={"توضیحات"}>
                <Ant.Input.TextArea allowClear showCount maxLength={400} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={12}>
              <Ant.Form.Item
                name="isActive"
                label="فعال"
                rules={[{ required: true }]}
              >
                <Ant.Switch />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={12}>
              <Ant.Flex justify="flex-end">
                <Ant.Space align="center">
                  <Ant.Tooltip placement="right" title={"گشایش بخشنامه"}>
                    <Ant.Button
                      onClick={showModalPriceCircularDetail}
                      icon={<LuFolderOpen className="text-purple-600" />}
                    />
                  </Ant.Tooltip>
                </Ant.Space>
              </Ant.Flex>
            </Ant.Col>
            <Ant.Col span={24}>
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
            </Ant.Col>
          </Ant.Row>
        </Ant.Form>
      </Ant.Skeleton>
    </>
  );
};

export default FormEditPriceCircularHeader;
FormEditPriceCircularHeader.propTypes = {
  onSuccess: PropTypes.func,
  obj: PropTypes.any,
  id: PropTypes.number,
  myKey: PropTypes.number,
};

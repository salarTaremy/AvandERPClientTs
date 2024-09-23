import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import qs from "qs";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { useFetch, GetAsync } from "@/api";
import CoustomContent from "@/components/common/CoustomContent";
import ModalHeader from "@/components/common/ModalHeader";
import { FaFileMedical } from "react-icons/fa";
import dayjs from "dayjs";
import MyDatePicker, { FormatDateToPost, FormatDateToDisplay } from "@/components/common/MyDatePicker";
import DebounceSelect from "@/components/common/DebounceSelect";
import ButtonList from "@/components/common/ButtonList";

//====================================================================
//                        Declaration
//====================================================================
const InventoryDocumentEditForm = ({ id, onSuccess, onCancel }) => {
  const [form] = Ant.Form.useForm();
  const [documentTypeData, documentTypeListLoading, documentTypeListError] =
    useFetch(url.INVENTORY_DOCUMENT_TYPE);
  const [warehouseListData, warehouseListLoading, warehouseListError] =
    useFetch(url.WAREHOUSE);

  const [issueTime, setIssueime] = useState("");
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    const currentDate = new Date();
    const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}.${currentDate.getMilliseconds()}`;
    const timeData = dayjs(currentTime, "HH:mm:ss.fff");
    form.setFieldValue("issueDateCalendarId", currentDate);
    form.setFieldValue("issueTime", timeData);
  }, [form]);
  //====================================================================
  //                        Functions
  //====================================================================
  const timePickerOnChange = (time, timeString) => {
    setIssueime(timeString);
  };

  const getCounterpartyForDropDown = async (searchText) => {
    if (searchText) {
      const queryString = qs.stringify({
        counterpartyName: searchText,
      });

      const response = await GetAsync(
        `${url.COUNTER_PARTY_GET_FOR_DROPDOWN}?${queryString}`,
        "",
      );
      if (response?.data) {
        return response?.data.map((item) => ({
          label: `${item.counterpartyName}`,
          value: item.id,
        }));
      }
    }
  };

  const onFinish = () => {};
  const columns = [
    {
      title: "شناسه  ",
      dataIndex: "code",
      key: "code",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 100,
    },
    {
      title: "نام  ",
      dataIndex: "title",
      key: "title",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 400,
    },
    {
      title: "سری ساخت  ",
      dataIndex: "batch",
      key: "batch",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 100,
    },
    {
      title: "تعداد  ",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 100,
    },
    {
      title: "واحد  ",
      dataIndex: "unit",
      key: "unit",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 100,
    },
    {
      title: "مبلغ واحد  ",
      dataIndex: "unitPrice",
      key: "unitPrice",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 150,
    },
    {
      title: "مبلغ کل  ",
      dataIndex: "total",
      key: "total",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 150,
    },
  ];
  const dataTest = [
    {
      code: "1234",
      title: "شامپو بس هتلی",
      batch: "D37323D3",
      quantity: 34,
      unit: "عدد",
      unitPrice: 900,
      total: 5454,
    },
    {
      code: "1235",
      title: "شوینده بس کرمی",
      batch: "D37323D3",
      quantity: 234,
      unit: "عدد",
      unitPrice: 200,
      total: 6561,
    },
    {
      code: "1236",
      title: "شوینده بس کرمی - رایحه سیب",
      batch: "B3423T3",
      quantity: 23,
      unit: "عدد",
      unitPrice: 1200,
      total: 4353,
    },
    {
      code: "1237",
      title: "شوینده بس کرمی - رایحه هلو",
      batch: "B3423T3",
      quantity: 12,
      unit: "عدد",
      unitPrice: 2300,
      total: 5474574,
    },
  ];
  //====================================================================
  //                        Child Component
  //====================================================================
  const tableTitle = () => {
    return <ButtonList onAdd={() => {}} />;
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"ویرایش  برگه انبار"} icon={<FaFileMedical />} />
      <Ant.Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        onFinishFailed={null}
      >
        <Ant.Row gutter={[4, 4]}>
          <Ant.Col xs={24} sm={24} md={24} lg={24}>
            <CoustomContent>
              <Ant.Row gutter={10}>
                <Ant.Col xs={24} sm={24} md={12} lg={5}>
                  <Ant.Form.Item
                    name={"documentNumber"}
                    label="شماره"
                    rules={[{ required: true }]}
                  >
                    <Ant.InputNumber style={{ width: "100%" }} />
                  </Ant.Form.Item>
                </Ant.Col>
                <Ant.Col xs={24} sm={24} md={12} lg={6}>
                  <Ant.Form.Item
                    name={"inventoryDocumentTypeId"}
                    label="نوع برگه"
                    rules={[{ required: true }]}
                  >
                    <Ant.Select
                      placeholder="لطفا انتخاب کنید..."
                      disabled={documentTypeListLoading}
                      loading={documentTypeListLoading}
                      options={documentTypeData?.data}
                      fieldNames={{ label: "title", value: "id" }}
                    />
                  </Ant.Form.Item>
                </Ant.Col>
                <Ant.Col xs={24} sm={24} md={12} lg={5}>
                  <Ant.Form.Item
                    name={"warehouseId"}
                    label="انبار"
                    rules={[{ required: true }]}
                  >
                    <Ant.Select
                      placeholder="لطفا انتخاب کنید..."
                      disabled={warehouseListLoading}
                      loading={warehouseListLoading}
                      options={warehouseListData?.data}
                      fieldNames={{ label: "title", value: "id" }}
                    />
                  </Ant.Form.Item>
                </Ant.Col>
                <Ant.Col xs={24} sm={24} md={6} lg={5}>
                  <Ant.Form.Item
                    name={"issueDateCalendarId"}
                    label="تاریخ  صدور"
                    rules={[{ required: true }]}
                  >
                    <MyDatePicker />
                  </Ant.Form.Item>
                </Ant.Col>
                <Ant.Col xs={24} sm={24} md={6} lg={3}>
                  <Ant.Form.Item name={"issueTime"} label="ساعت صدور">
                    <Ant.TimePicker
                      onChange={timePickerOnChange}
                      style={{ width: "100%" }}
                    />
                  </Ant.Form.Item>
                </Ant.Col>
              </Ant.Row>
              <Ant.Row gutter={10}>
                <Ant.Col xs={24} sm={24} md={12} lg={8}>
                  <Ant.Form.Item name={"counterpartyId"} label="طرف حساب">
                    <DebounceSelect
                      placeholder="بخشی از نام طرف حساب را تایپ کنید..."
                      fetchOptions={getCounterpartyForDropDown}
                    />
                  </Ant.Form.Item>
                </Ant.Col>
                <Ant.Col xs={24} sm={24} md={12} lg={8}>
                  <Ant.Form.Item
                    name={"secondCounterpartyId"}
                    label="طرف حساب دوم"
                  >
                    <DebounceSelect
                      placeholder="بخشی از نام طرف حساب را تایپ کنید..."
                      fetchOptions={getCounterpartyForDropDown}
                    />
                  </Ant.Form.Item>
                </Ant.Col>
                <Ant.Col xs={24} sm={24} md={12} lg={5}>
                  <Ant.Form.Item
                    name={"oppositeWarehouseId"}
                    label="انبار مقابل"
                  >
                    <Ant.Select
                      placeholder="لطفا انتخاب کنید..."
                      disabled={warehouseListLoading}
                      loading={warehouseListLoading}
                      options={warehouseListData?.data}
                      fieldNames={{ label: "title", value: "id" }}
                    />
                  </Ant.Form.Item>
                </Ant.Col>
                <Ant.Col xs={24} sm={24} md={6} lg={3}>
                  <Ant.Form.Item name={"isReserve"} label="رزرو موجودی">
                    <Ant.Switch />
                  </Ant.Form.Item>
                </Ant.Col>
              </Ant.Row>
              <Ant.Row gutter={10}>
                <Ant.Col span={24}>
                  <Ant.Form.Item name={"description"} label="توضیحات">
                    <Ant.Input.TextArea
                      rows={2}
                      style={{ resize: "none" }}
                      showCount
                      maxLength={300}
                    />
                  </Ant.Form.Item>
                </Ant.Col>
              </Ant.Row>
            </CoustomContent>
          </Ant.Col>
          <Ant.Col xs={24} sm={24} md={24} lg={24}>
            <CoustomContent>
              <Ant.Table
                columns={columns}
                dataSource={dataTest}
                title={tableTitle}
                {...defaultValues.TABLE_PROPS}
                size="middle"
                bordered={false}
              />
            </CoustomContent>
          </Ant.Col>
          <Ant.Col xs={24} sm={24} md={12} lg={20}></Ant.Col>
          <Ant.Col xs={24} sm={24} md={6} lg={2}>
            <Ant.Button type="primary" block>
              {"ذخیره"}
            </Ant.Button>
          </Ant.Col>
          <Ant.Col xs={24} sm={24} md={6} lg={2}>
            <Ant.Popconfirm
              title={
                "در صورت خروج از این صفحه، اطلاعات ذخیره نخواهد شد، آیا مطمئن هستید؟"
              }
              onConfirm={onCancel}
            >
              <Ant.Button type="default" block>
                {"انصراف"}
              </Ant.Button>
            </Ant.Popconfirm>
          </Ant.Col>
        </Ant.Row>
      </Ant.Form>
    </>
  );
};

InventoryDocumentEditForm.propTypes = {
  id: PropTypes.number,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

export default InventoryDocumentEditForm;

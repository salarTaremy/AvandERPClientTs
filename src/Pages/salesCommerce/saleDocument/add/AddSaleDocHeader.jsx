import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { Col, Row } from "antd";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import DebounceSelect from "@/components/common/DebounceSelect";
import ModalHeader from "@/components/common/ModalHeader";
import MyDatePicker from "@/components/common/MyDatePicker";
import useRequestManager from "@/hooks/useRequestManager";
import CoustomContent from "@/components/common/CoustomContent";
import { FaFileMedical } from "react-icons/fa";
//====================================================================
//                        Declaration
//====================================================================
const AddSaleDocHeader = () => {
  const [form] = Ant.Form.useForm();
  const [saleChannelData, saleChannelLoading, saleChannelError] = api.useFetch(
    url.SALE_CHANNEL_GET_WITH_PERMISSION,
  );
  const [saleDocTypeData, saleDocTypeLoading, saleDocTypeError] = api.useFetch(
    url.SALE_DOCUMENT_TYPE_GET_WITH_PERMISSION,
  );
  const [branchData, branchLoading, branchError] = api.useFetch(
    url.BRANCH_GET_WITH_PERMISSION,
  );

  useRequestManager({ error: saleChannelError });
  useRequestManager({ error: saleDocTypeError });
  useRequestManager({ error: branchError });
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {}, []);
  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = (values) => {
    console.log(values, "kakakak");
  };
  const getCustomerForDropDown = async (searchText) => {
    const queryString = qs.stringify({
      customerName: searchText,
    });

    const response = await api.GetAsync(
      `${url.SALE_CUSTOMER_GET_FOR_DROPDOWN}?${queryString}`,
      "",
    );
    if (response?.data) {
      return response?.data.map((item) => ({
        label: `${item.customerName}`,
        value: item.id,
      }));
    }
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <CoustomContent height="70vh">
        <ModalHeader title={"افزودن  برگه فروش"} icon={<FaFileMedical />} />
        <Ant.Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          onFinishFailed={null}
        >
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col span={24} md={24} lg={12}>
              <Ant.Form.Item name={"fromIssueDateCalendarId"} label="از تاریخ">
                <MyDatePicker />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={12}>
              <Ant.Form.Item name={"toIssueDateCalendarId"} label="تا تاریخ">
                <MyDatePicker />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item name={"customerId"} label="مشتری">
                <DebounceSelect
                  maxCount={1}
                  placeholder="بخشی از نام مشتری را تایپ کنید..."
                  fetchOptions={getCustomerForDropDown}
                  onChange={(newValue) => {
                    console.log("onChange debounce:" + newValue);
                  }}
                />
              </Ant.Form.Item>
            </Ant.Col>

            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item name={"saleChannelId"} label="کانال فروش">
                <Ant.Select
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disable={saleChannelLoading || false}
                  loading={saleChannelLoading}
                  options={saleChannelData?.data}
                  fieldNames={{ label: "title", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item name={"saleDocumentTypeId"} label="نوع برگه فروش">
                <Ant.Select
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disable={saleDocTypeLoading || false}
                  loading={saleDocTypeLoading}
                  options={saleDocTypeData?.data}
                  fieldNames={{ label: "title", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item name={"branchId"} label="نام شعبه">
                <Ant.Select
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disable={branchLoading || false}
                  loading={branchLoading}
                  options={branchData?.data}
                  fieldNames={{ label: "name", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>

            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item className="text-end">
                <Ant.Button  type="primary" onClick={() => form.submit()}>
                  {"تایید"}
                </Ant.Button>
              </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>
        </Ant.Form>
      </CoustomContent>
    </>
  );
};
export default AddSaleDocHeader;

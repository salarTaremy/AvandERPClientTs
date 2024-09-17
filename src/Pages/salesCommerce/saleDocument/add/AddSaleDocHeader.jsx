import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import qs from "qs";
import * as defaultValues from "@/defaultValues";
import { usePostWithHandler } from "@/api";
import PropTypes from "prop-types";
import DebounceSelect from "@/components/common/DebounceSelect";
import ModalHeader from "@/components/common/ModalHeader";
import MyDatePicker from "@/components/common/MyDatePicker";
import useRequestManager from "@/hooks/useRequestManager";
import CoustomContent from "@/components/common/CoustomContent";
import { FaFileMedical } from "react-icons/fa";
import useAllLoading from "@/hooks/useAllLoading ";
import CustomerDescription from "../../../salesCommerce/basicInformation/CustomerManagement/description/CustomerDescription";
import { GrView } from "react-icons/gr";
//====================================================================
//                        Declaration
//====================================================================
const AddSaleDocHeader = (props) => {
  const { onSuccess } = props;
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
  const [visitorData, visitorLoading, visitorError] = api.useFetch(url.VISITOR);
  const [deliveryTypeData, deliveryTypeLoading, deliveryTypeError] =
    api.useFetch(url.DELIVERY_TYPE);
  const [saleTypeData, saleTypeLoading, saleTypeError] = api.useFetch(
    url.SALETYPE,
  );
  const [paymentTypeData, paymentTypeLoading, paymentTypeError] = api.useFetch(
    url.PAYMENT_TYPE,
  );
  const [
    saleClassificationData,
    saleClassificationLoading,
    saleClassificationError,
  ] = api.useFetch(url.SALE_CLASSIFICATION);
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idCustomer, setIdCustomer] = useState(null);
  const [isDisable, setIsDisable] = useState(true);
  useRequestManager({ error: saleChannelError });
  useRequestManager({ error: saleDocTypeError });
  useRequestManager({ error: saleClassificationError });
  useRequestManager({ error: paymentTypeError });
  useRequestManager({ error: saleTypeError });
  useRequestManager({ error: deliveryTypeError });
  useRequestManager({ error: visitorError });
  useRequestManager({ error: branchError });
  useRequestManager({ error: addError, loading: addLoading, data: addData });
  const commonOptions = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) => option.title.indexOf(input) >= 0,
  };
  const commonOptionsBranch = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) => option.name.indexOf(input) >= 0,
  };
  const commonOptionsVisitor = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) => option.fullName.indexOf(input) >= 0,
  };
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    addData?.isSuccess && onSuccess();
  }, [addData]);
  useEffect(() => {
    form.resetFields();
  }, [form]);
  useEffect(() => {
    idCustomer;
  }, [idCustomer]);
  //====================================================================
  //                        Functions
  //====================================================================

  const getCustomerForDropDown = async (searchText) => {
    if (searchText) {
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
    }
  };

  const getValueCustomer = (val) => {
    setIsDisable(false);
    setIdCustomer(val?.key);
  };
  const onFinish = async (values) => {
    console.log(values, "values");
    const dto = {
      ...values,
      customerId: values?.customerId?.key,
      issueDateCalendarId: parseInt(
        values?.issueDateCalendarId?.toString().replace(/\//g, ""),
      ),
    };
    console.log(dto, "dto");
    await addApiCall(url.SALE_DOCUMENT_Header, dto);
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Modal
        centered
        {...defaultValues.MODAL_PROPS}
        {...defaultValues.MODAL_EXTRA_LARGE}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
      >
        <CustomerDescription id={idCustomer} />
      </Ant.Modal>
      <CoustomContent height="70vh">
        <ModalHeader title={"افزودن  برگه فروش"} icon={<FaFileMedical />} />
        <Ant.Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          onFinishFailed={null}
        >
          <Ant.Row gutter={[8, 8]}>
            <Ant.Col span={24} md={24} lg={12}>
              <Ant.Form.Item
                name={"issueDateCalendarId"}
                rules={[{ required: true }]}
                label=" تاریخ"
              >
                <MyDatePicker />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={12}>
              <Ant.Form.Item
                name={"saleChannelId"}
                rules={[{ required: true }]}
                label="کانال فروش"
              >
                <Ant.Select
                  {...commonOptions}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disable={saleChannelLoading}
                  loading={saleChannelLoading}
                  options={saleChannelData?.data}
                  fieldNames={{ label: "title", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={22} md={22} lg={22}>
              <Ant.Form.Item
                name={"customerId"}
                rules={[{ required: true }]}
                label="مشتری"
              >
                <DebounceSelect
                  maxCount={1}
                  placeholder="بخشی از نام مشتری را تایپ کنید..."
                  fetchOptions={getCustomerForDropDown}
                  onChange={(newValue) => {
                    getValueCustomer(newValue);
                  }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={2} md={2} lg={2}>
              <Ant.Form.Item>
                <Ant.Button
                  disabled={isDisable }
                  onClick={() => setIsModalOpen(true)}
                  className="text-sky-600 mt-8"
                  icon={<GrView />}
                  type="text"
                />
              </Ant.Form.Item>
            </Ant.Col>

            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name={"saleDocumentTypeId"}
                rules={[{ required: true }]}
                label="نوع برگه فروش"
              >
                <Ant.Select
                  {...commonOptions}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disable={saleDocTypeLoading }
                  loading={saleDocTypeLoading}
                  options={saleDocTypeData?.data}
                  fieldNames={{ label: "title", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name={"visitorId"}
                rules={[{ required: true }]}
                label="ویزیتور"
              >
                <Ant.Select
                  {...commonOptionsVisitor}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disable={visitorLoading}
                  loading={visitorLoading}
                  options={visitorData?.data}
                  fieldNames={{ label: "fullName", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name={"paymentTypeId"}
                rules={[{ required: true }]}
                label="نوع پرداخت"
              >
                <Ant.Select
                  {...commonOptions}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disable={paymentTypeLoading }
                  loading={paymentTypeLoading}
                  options={paymentTypeData?.data}
                  fieldNames={{ label: "title", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name={"saleTypeId"}
                rules={[{ required: true }]}
                label="نوع فروش"
              >
                <Ant.Select
                  {...commonOptions}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disable={saleTypeLoading }
                  loading={saleTypeLoading}
                  options={saleTypeData?.data}
                  fieldNames={{ label: "title", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name={"deliveryTypeId"}
                rules={[{ required: true }]}
                label="نوع تحویل"
              >
                <Ant.Select
                  {...commonOptions}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disable={deliveryTypeLoading }
                  loading={deliveryTypeLoading}
                  options={deliveryTypeData?.data}
                  fieldNames={{ label: "title", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name={"saleClassificationId"}
                rules={[{ required: true }]}
                label="طبقه بندی فروش"
              >
                <Ant.Select
                  {...commonOptions}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disable={saleClassificationLoading }
                  loading={saleClassificationLoading}
                  options={saleClassificationData?.data}
                  fieldNames={{ label: "title", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name={"branchId"}
                rules={[{ required: true }]}
                label="نام شعبه"
              >
                <Ant.Select
                  {...commonOptionsBranch}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disable={branchLoading }
                  loading={branchLoading}
                  options={branchData?.data}
                  fieldNames={{ label: "name", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name="description"
                label="توضیحات"
                rules={[{ required: false }]}
              >
                <Ant.Input.TextArea allowClear showCount maxLength={400} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item className="text-end">
                <Ant.Button type="primary" onClick={() => form.submit()}>
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
AddSaleDocHeader.propTypes = {
  onSuccess: PropTypes.func,
};

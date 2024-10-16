import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import qs from "qs";
import * as defaultValues from "@/defaultValues";
import {
  usePostWithHandler,
  useFetchWithHandler,
  usePutWithHandler,
} from "@/api";
import PropTypes from "prop-types";
import DebounceSelect from "@/components/common/DebounceSelect";
import ModalHeader from "@/components/common/ModalHeader";
import MyDatePicker from "@/components/common/MyDatePicker";
import useRequestManager from "@/hooks/useRequestManager";
import CustomContent from "@/components/common/CustomContent";
import CustomerDescription from "../../../salesCommerce/basicInformation/CustomerManagement/description/CustomerDescription";
import { GrView } from "react-icons/gr";
import { BiEdit } from "react-icons/bi";
//====================================================================
//                        Declaration
//====================================================================
const EditSaleDocHeader = (props) => {
  const { onSuccess, id } = props;
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [idCustomer, setIdCustomer] = useState(null);
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
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

  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  useRequestManager({ error: saleChannelError });
  useRequestManager({ error: saleDocTypeError });
  useRequestManager({ error: branchError });
  useRequestManager({ error: saleClassificationError });
  useRequestManager({ error: paymentTypeError });
  useRequestManager({ error: deliveryTypeError });
  useRequestManager({ error: saleTypeError });
  useRequestManager({ error: editError, loading: editLoading, data: editData });

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
    getSaleDocument();
  }, []);

  useEffect(() => {
    editData?.isSuccess && onSuccess();
  }, [editData]);
  useEffect(() => {
    form.resetFields();
    listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) });
    listData?.isSuccess &&
      form.setFieldsValue({
        customerId: {
          label: listData?.data.customerName,
          value: listData?.data.customerId,
        },
      });
  }, [listData]);
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
  const getSaleDocument = async () => {
    await ApiCall(`${url.SALE_DOCUMENT_HEADER}/${id}`);
  };
  const getValueCustomer = (val) => {
    setIsDisable(false);
    setIdCustomer(val?.key);
  };
  const onFinish = async (values) => {
    const dto = {
      ...values,
      id: id,
      customerId: values?.customerId?.value,
      issueDateCalendarId: parseInt(
        values?.issueDateCalendarId?.toString().replace(/\//g, ""),
      ),
    };
    await editApiCall(url.SALE_DOCUMENT_Header, dto);
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
      <ModalHeader title={"ویرایش برگه فروش"} icon={<BiEdit />} />
      <CustomContent height="70vh">
        <Ant.Skeleton active loading={loadingData}>
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
                    allowClear
                    placeholder={"انتخاب کنید..."}
                    disabled={saleChannelLoading}
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
                    disabled={isDisable}
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
                    disabled={saleDocTypeLoading}
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
                    disabled={visitorLoading}
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
                    disabled={paymentTypeLoading}
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
                    disabled={saleTypeLoading}
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
                    allowClear
                    placeholder={"انتخاب کنید..."}
                    disabled={deliveryTypeLoading}
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
                    allowClear
                    placeholder={"انتخاب کنید..."}
                    disabled={saleClassificationLoading}
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
                    allowClear
                    placeholder={"انتخاب کنید..."}
                    disabled={branchLoading}
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
                  <Ant.Button
                    loading={editLoading || false}
                    type="primary"
                    onClick={() => form.submit()}
                  >
                    {"تایید"}
                  </Ant.Button>
                </Ant.Form.Item>
              </Ant.Col>

            </Ant.Row>
          </Ant.Form>
        </Ant.Skeleton>
      </CustomContent>
    </>
  );
};
export default EditSaleDocHeader;
EditSaleDocHeader.propTypes = {
  onSuccess: PropTypes.func,
};

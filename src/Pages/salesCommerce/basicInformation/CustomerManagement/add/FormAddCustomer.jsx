import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as styles from "@/styles";
import {
  useFetch,
  useFetchWithHandler,
  GetAsync,
  usePostWithHandler,
} from "@/api";
import qs from "qs";
import * as url from "@/api/url";
import * as uuid from "uuid";
import DebounceSelect from "@/components/common/DebounceSelect";
import { PiArrowLineDownLeftLight } from "react-icons/pi";
import CounterpartyInformation from "../../../../manageCounterParty/description/CounterpartyInformation";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import FormAddNewCustomerGrup from "../../customerGroup/add/FormAddNewCustomerGrup";
import * as defaultValues from "@/defaultValues";
import FormAddNewCustometType from "../../customerType/add/FormAddNewCustometType";
import FormEditCounterParty from "@/Pages/manageCounterParty/edit/FormEditCounterParty";
import CustomContent from "@/components/common/CustomContent";
import { PlusOutlined } from "@ant-design/icons";
import { FormCounterpartyAdd } from "@/Pages/manageCounterParty/add/FormCounterpartyAdd";
import { FaUserPlus } from "react-icons/fa6";

const FormAddCustomer = ({ onSucces }) => {
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [empty, setEmpty] = useState(undefined);
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] =
    useFetchWithHandler();
  const [
    customerGroupList,
    customerGroupLoading,
    customerGroupError,
    customerGroupApiCall,
  ] = useFetchWithHandler();
  const [
    customerTypeList,
    customerTypeLoading,
    customerTypeError,
    customerTypeApiCall,
  ] = useFetchWithHandler();
  const [customerGradeList, customerGradeLoading, customerGradeError] =
    useFetch(url.CUSTOMER_GRADE);
  const [branchList, branchLoading, branchError] = useFetch(
    url.BRANCH_GET_WITH_PERMISSION,
  );
  const [saleChannelData, saleChannelLoading, saleChannelError] = useFetch(
    url.SALE_CHANNEL_GET_WITH_PERMISSION,
  );
  useRequestManager({ error: addError, loading: addLoading, data: addData });
  useRequestManager({ error: customerGradeError });
  useRequestManager({ error: customerTypeError });
  useRequestManager({ error: customerGroupError });
  useRequestManager({ error: maxCodeError });
  useRequestManager({ error: branchError });
  useRequestManager({ error: saleChannelError });
  const [form] = Ant.Form.useForm();
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

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getCustomerGroup();
    getCustomerType();
  }, []);

  useEffect(() => {
    form.resetFields();
    addData?.isSuccess && onSucces();
  }, [addData]);

  useEffect(() => {
    maxCodeData?.isSuccess &&
      maxCodeData?.data &&
      form.setFieldsValue({ code: maxCodeData.data });
  }, [maxCodeData]);

  //==================================================================
  //                        Functions
  //==================================================================

  const getMaxCode = async () => {
    await maxCodeApiCall(`${url.CUSTOMER_FREE_CODE}`);
  };

  const getCustomerGroup = async () => {
    await customerGroupApiCall(url.CUSTOMER_GROUP_GET_WITH_PERMISSION);
  };

  const getCustomerType = async () => {
    await customerTypeApiCall(url.CUSTOMER_TYPE_GET_WITH_PERMISSION);
  };

  const handleCounterParty = async (val) => {
    setEmpty(val);
    await ApiCall(`${url.COUNTER_PARTY}/${val.key}`);
  };

  const getAllCounterPartyForDropDown = async (inputValue) => {
    if (inputValue) {
      const queryString = qs.stringify({
        counterpartyName: inputValue,
      });

      const response = await GetAsync(
        `${url.COUNTER_PARTY_GET_FOR_DROPDOWN}?${queryString}`,
        "",
      );
      if (response?.data) {
        return response?.data.map((item) => ({
          label: `${item.counterpartyName} `,
          value: item.id,
        }));
      }
    }
  };

  const onFinish = async (values) => {
    const req = { ...values, counterpartyId: values?.counterpartyId?.key };
    await addApiCall(url.CUSTOMER, req);
  };

  //====================================================================
  //                        Child Components
  //===================================================================

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

  const onSuccessAdd = () => {
    setModalState(false);
    getCustomerGroup();
  };

  const onAddGroup = () => {
    setModalContent(
      <FormAddNewCustomerGrup key={uuid.v1()} onSuccess={onSuccessAdd} />,
    );
    setModalState(true);
  };

  const onSuccessAddType = () => {
    setModalState(false);
    getCustomerType();
  };

  const onAddType = () => {
    setModalContent(
      <FormAddNewCustometType key={uuid.v1()} onSuccess={onSuccessAddType} />,
    );
    setModalState(true);
  };

  const onSuccessEdit = () => {
    setModalState(false);
    handleCounterParty();
  };

  const onSuccessAddCounterparty = () => {
    setModalState(false);
  };

  const onAddCounterparty = () => {
    setModalContent(
      <FormCounterpartyAdd
        key={uuid.v1()}
        onSuccess={onSuccessAddCounterparty}
      />,
    );
    setModalState(true);
  };

  //====================================================================
  //                        Component
  //====================================================================

  return (
    <>
      <ModalHeader title={"ایجاد مشتری"} icon={<FaUserPlus />} />
      <Ant.Modal
        {...defaultValues.MODAL_PROPS}
        {...defaultValues.MODAL_LARGE}
        open={modalState}
        centered
        getContainer={null}
        footer={null}
        onCancel={() => {
          setModalState(false);
        }}
        onOk={() => {
          setModalState(false);
        }}
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Row gutter={[16, 8]}>
          <Ant.Col span={24} sm={10}>
            <CustomContent bordered>
              <Ant.Col>
                <Ant.Form.Item
                  rules={[{ required: true }]}
                  name={"counterpartyId"}
                  label="طرف حساب مرتبط"
                >
                  <DebounceSelect
                    onChange={handleCounterParty}
                    placeholder="بخشی از نام طرف حساب را تایپ کنید..."
                    fetchOptions={getAllCounterPartyForDropDown}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Ant.Button
                          onClick={() => {
                            onAddCounterparty();
                          }}
                          block
                          type="primary"
                          icon={<PlusOutlined />}
                        >
                          {"ایجاد طرف حساب جدید"}
                        </Ant.Button>
                      </>
                    )}
                  />
                </Ant.Form.Item>
              </Ant.Col>
              <Ant.Col>
                <Ant.Form.Item
                  rules={[{ required: true }]}
                  name={"code"}
                  label="کد"
                >
                  <Ant.Input
                    allowClear
                    showCount
                    maxLength={20}
                    addonBefore={<AddonBefore />}
                    style={{ textAlign: "center" }}
                  />
                </Ant.Form.Item>
              </Ant.Col>
              <Ant.Col>
                <Ant.Form.Item
                  rules={[{ required: true }]}
                  name={"secondCode"}
                  label="کد دوم"
                >
                  <Ant.Input allowClear showCount maxLength={20} />
                </Ant.Form.Item>
              </Ant.Col>
              <Ant.Col>
                <Ant.Form.Item
                  rules={[{ required: true }]}
                  name={"groupId"}
                  label="گروه"
                >
                  <Ant.Select
                    {...commonOptions}
                    allowClear={true}
                    placeholder={"انتخاب کنید..."}
                    disabled={customerGroupLoading || false}
                    loading={customerGroupLoading}
                    options={customerGroupList?.data}
                    fieldNames={{ label: "title", value: "id" }}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Ant.Button
                          onClick={() => {
                            onAddGroup();
                          }}
                          block
                          type="primary"
                          icon={<PlusOutlined />}
                        >
                          {"ایجاد گروه مشتری جدید"}
                        </Ant.Button>
                      </>
                    )}
                  />
                </Ant.Form.Item>
              </Ant.Col>
              <Ant.Col>
                <Ant.Form.Item
                  rules={[{ required: true }]}
                  name={"typeId"}
                  label="نوع"
                >
                  <Ant.Select
                    {...commonOptions}
                    allowClear={true}
                    placeholder={"انتخاب کنید..."}
                    disabled={customerTypeLoading}
                    loading={customerTypeLoading}
                    options={customerTypeList?.data}
                    fieldNames={{ label: "title", value: "id" }}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Ant.Button
                          onClick={() => {
                            onAddType();
                          }}
                          block
                          type="primary"
                          icon={<PlusOutlined />}
                        >
                          {"ایجاد نوع مشتری جدید"}
                        </Ant.Button>
                      </>
                    )}
                  />
                </Ant.Form.Item>
              </Ant.Col>
              <Ant.Col>
                <Ant.Form.Item
                  rules={[{ required: true }]}
                  name={"branchId"}
                  label="شعبه"
                >
                  <Ant.Select
                    {...commonOptionsBranch}
                    // mode="multiple"
                    allowClear={true}
                    placeholder={"انتخاب کنید..."}
                    disabled={branchLoading}
                    loading={branchLoading}
                    options={branchList?.data}
                    fieldNames={{ label: "name", value: "id" }}
                  />
                </Ant.Form.Item>
              </Ant.Col>
              <Ant.Col>
                <Ant.Form.Item
                  name={"saleChannelIdList"}
                  label="کانال فروش"
                  rules={[{ required: true }]}
                >
                  <Ant.Select
                    mode="multiple"
                    allowClear={true}
                    placeholder={"انتخاب کنید..."}
                    disabled={saleChannelLoading}
                    loading={saleChannelLoading}
                    options={saleChannelData?.data}
                    fieldNames={{ label: "title", value: "id" }}
                  />
                </Ant.Form.Item>
              </Ant.Col>
              <Ant.Col>
                <Ant.Form.Item
                  name={"gradeId"}
                  label="رتبه"
                  rules={[{ required: true }]}
                >
                  <Ant.Select
                    allowClear={true}
                    placeholder={"انتخاب کنید..."}
                    disabled={customerGradeLoading}
                    loading={customerGradeLoading}
                    options={customerGradeList?.data}
                    fieldNames={{ label: "title", value: "id" }}
                  />
                </Ant.Form.Item>
              </Ant.Col>
              <Ant.Col span={24}>
                <Ant.Row justify={"end"} gutter={[8, 16]}>
                  <Ant.Button
                    type="primary"
                    onClick={() => {
                      form.submit();
                    }}
                  >
                    {"تایید"}
                  </Ant.Button>
                </Ant.Row>
              </Ant.Col>
            </CustomContent>
          </Ant.Col>
          <Ant.Col span={24} sm={14}>
            <Ant.Skeleton active loading={loadingData}>
              <CustomContent bordered>
                {empty == undefined ? (
                  <Ant.Empty description={"طرف حساب مربوطه را انتخاب کنید"} />
                ) : (
                  <CounterpartyInformation id={listData?.data?.id} />
                )}
              </CustomContent>
            </Ant.Skeleton>
          </Ant.Col>
        </Ant.Row>
      </Ant.Form>
    </>
  );
};

export default FormAddCustomer;

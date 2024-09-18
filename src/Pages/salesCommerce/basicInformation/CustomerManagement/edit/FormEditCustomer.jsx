import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as styles from "@/styles";
import { useFetch, useFetchWithHandler, usePutWithHandler } from "@/api";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import * as uuid from "uuid";
import { PiArrowLineDownLeftLight } from "react-icons/pi";
import CoustomContent from "@/components/common/CoustomContent";
import HeaderCounterParty from "../../../../manageCounterParty/description/HeaderCounterParty";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import FormAddNewCustomerGrup from "../../customerGroup/add/FormAddNewCustomerGrup";
import FormAddNewCustometType from "../../customerType/add/FormAddNewCustometType";
import FormEditCounterParty from "@/Pages/manageCounterParty/edit/FormEditCounterParty";
import { FaUserPen } from "react-icons/fa6";
import { PlusOutlined } from '@ant-design/icons'

const FormEditCustomer = ({ id, onSuccess }) => {
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [editData, editLoading, editError, editApiCall] = useFetchWithHandler();
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [listSubmitData, submitLoading, submitError, submitApiCall] =
    usePutWithHandler();
  // const [empty, setEmpty] = useState(undefined);
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] =
    useFetchWithHandler();
  const [branchList, branchLoading, branchError] = useFetch(url.BRANCH_GET_WITH_PERMISSION);
  const [saleChannelData, saleChannelLoading, saleChannelError] = useFetch(
    url.SALE_CHANNEL_GET_WITH_PERMISSION,
  );
  const [customerGroupList, customerGroupLoading, customerGroupError, customerGroupApiCall] = useFetchWithHandler()
  const [customerTypeList, customerTypeLoading, customerTypeError, customerTypeApiCall] = useFetchWithHandler()
  const [customerGradeList, customerGradeLoading, customerGradeError] =
    useFetch(url.CUSTOMER_GRADE);
  useRequestManager({ error: error, data: listData, loading: loadingData });
  useRequestManager({ error: editError });
  useRequestManager({ error: customerGradeError });
  useRequestManager({ error: customerTypeError });
  useRequestManager({ error: customerGroupError });
  useRequestManager({ error: maxCodeError });
  useRequestManager({ error: branchError });
  useRequestManager({ error: saleChannelError });
  useRequestManager({ error: submitError, loading: submitLoading, data: listSubmitData });

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
    getCustomerGroup()
    getCustomerType()
  }, [])

  useEffect(() => {
    maxCodeData?.isSuccess &&
      maxCodeData?.data &&
      form.setFieldsValue({ code: maxCodeData.data });
  }, [maxCodeData]);

  useEffect(() => {
    setValue();
  }, []);

  useEffect(() => {
    form.resetFields();
    editData?.isSuccess && form.setFieldsValue({ ...(editData?.data || null) });
    editData?.data?.counterpartyId && handleCounterParty();
  }, [editData]);
  //==================================================================
  //                        Functions
  //==================================================================
  const getMaxCode = async () => {
    await maxCodeApiCall(`${url.CUSTOMER_FREE_CODE}`);
  };

  const getCustomerGroup = async () => {
    await customerGroupApiCall(url.CUSTOMER_GROUP_GET_WITH_PERMISSION)
  }

  const getCustomerType = async () => {
    await customerTypeApiCall(url.CUSTOMER_TYPE_GET_WITH_PERMISSION)
  }

  const handleCounterParty = async () => {
    const counterpartyId = editData?.data?.counterpartyId;
    // setEmpty(counterpartyId);
    await ApiCall(`${url.COUNTER_PARTY}/${counterpartyId}`);
  };

  const setValue = async () => {
    await editApiCall(`${url.CUSTOMER}/${id}`);
  };

  const onFinish = async (values) => {
    const req = {
      ...values,
      counterpartyId: editData?.data?.counterpartyId,
      id: id,
    };
    await submitApiCall(url.CUSTOMER, req);
    onSuccess()
  };

  const onSuccessAdd = () => {
    setModalState(false);
    getCustomerGroup()
  };

  const onAddGroup = () => {
    setModalContent(<FormAddNewCustomerGrup key={uuid.v1()} onSuccess={onSuccessAdd} />);
    setModalState(true);
  };

  const onSuccessAddType = () => {
    setModalState(false);
    getCustomerType()
  };

  const onAddType = () => {
    setModalContent(<FormAddNewCustometType key={uuid.v1()} onSuccess={onSuccessAddType} />);
    setModalState(true);
  }

  const onSuccessEdit = () => {
    setModalState(false);
    handleCounterParty()
  };

  const onHeaderEdit = (data) => {
    setModalContent(
      <FormEditCounterParty
        onSuccess={onSuccessEdit}
        key={uuid.v1()}
        id={(data.id)}
      />
    );
    setModalState(true);
  }

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
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={'ویرایش مشتری'} icon={<FaUserPen />} />
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
      {/* <Ant.Skeleton active  loading={loadingData}> */}
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Row gutter={[16, 8]}>
          <Ant.Col span={24} sm={10}>
            {/* <Ant.Card
                loading={editLoading}
                style={{ ...styles.CARD_DEFAULT_STYLES }}
              > */}
            <CoustomContent bordered loading={editLoading}>
              <Ant.Col>
                <Ant.Form.Item
                  rules={[{ required: true }, { max: 10 }]}
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
                  rules={[{ required: true }, { max: 20 }]}
                  name={"secondCode"}
                  label="کد دوم"
                >
                  <Ant.Input allowClear showCount />
                </Ant.Form.Item>
              </Ant.Col>
              <Ant.Col >
                <Ant.Form.Item
                  rules={[{ required: true }]}
                  name={"groupId"}
                  label="گروه"
                >
                  <Ant.Select
                    {...commonOptions}
                    allowClear={true}
                    placeholder={"انتخاب کنید..."}
                    disabled={customerGroupLoading}
                    loading={customerGroupLoading}
                    options={customerGroupList?.data}
                    fieldNames={{ label: "title", value: "id" }}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Ant.Button
                          onClick={() => { onAddGroup() }}
                          block
                          type="primary"
                          icon={<PlusOutlined />}
                        >
                          {'ایجاد گروه مشتری جدید'}
                        </Ant.Button>
                      </>
                    )}
                  />
                </Ant.Form.Item>
              </Ant.Col>
              <Ant.Col >
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
                          onClick={() => { onAddType() }}
                          block
                          type="primary"
                          icon={<PlusOutlined />}
                        >
                          {'ایجاد نوع مشتری جدید'}
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
                    disabled={branchLoading || false}
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
              <Ant.Col>
                <Ant.Button
                  block
                  type="primary"
                  onClick={() => {
                    form.submit();
                  }}
                >
                  {"تایید"}
                </Ant.Button>
              </Ant.Col>
            </CoustomContent>
            {/* </Ant.Card> */}
          </Ant.Col>
          <Ant.Col span={24} sm={14}>
            {/* <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }}> */}
            <CoustomContent bordered loading={editLoading} >
              {/* {empty == undefined ? (
                  <Ant.Empty loading={editLoading} />
                ) : ( */}
              <HeaderCounterParty id={editData?.data?.counterpartyId} onHeaderEdit={onHeaderEdit} />
              {/* )} */}
            </CoustomContent>
            {/* </Ant.Card> */}
          </Ant.Col>
        </Ant.Row>
      </Ant.Form>
      {/* </Ant.Skeleton> */}
    </>
  );
};

export default FormEditCustomer;

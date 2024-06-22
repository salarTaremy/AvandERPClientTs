import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as styles from "@/styles";
import { useFetch, useFetchWithHandler, Get, usePutWithHandler } from "@/api";
import qs, { stringify } from "qs";
import * as uuid from "uuid";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import DebounceSelect from "@/components/common/DebounceSelect";
import { PiArrowLineDownLeftLight } from "react-icons/pi";
import HeaderCounterParty from "../../../../manageCounterParty/description/HeaderCounterParty";
import useRequestManager from "@/hooks/useRequestManager";
import { useParams, useNavigate } from "react-router-dom";
import ModalHeader from "@/components/common/ModalHeader";
import { data } from "autoprefixer";
import FormAddNewCustomerGrup from "../../customerGroup/add/FormAddNewCustomerGrup";
import FormAddNewCustometType from "../../customerType/add/FormAddNewCustometType";

const FormEditCustomer = ({ id, onSuccess }) => {
  const fieldNamesList = { label: 'label', value: 'value' }
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [editData, editLoading, editError, editApiCall] = useFetchWithHandler();
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [listSubmitData, submitLoading, submitError, submitApiCall] =
    usePutWithHandler();

  const [empty, setEmpty] = useState(undefined);
  const [debounceValue, setDebounceValue] = useState(null);
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] =
    useFetchWithHandler();
  const [branchList, branchLoading, branchError] = useFetch(url.BRANCH);
  const [saleChannelData, saleChannelLoading, saleChannelError] = useFetch(
    url.SALE_CHANNEL,
  );
  const [customerGroupList, customerGroupLoading, customerGroupError, customerGroupApiCall] = useFetchWithHandler()
  const [customerTypeList, customerTypeLoading, customerTypeError, customerTypeApiCall] = useFetchWithHandler()
  const [customerGradeList, customerGradeLoading, customerGradeError] =
    useFetch(url.CUSTOMER_GRADE);
  const params = useParams();
  useRequestManager({ error: editError });
  useRequestManager({ error: customerGradeError });
  useRequestManager({ error: customerTypeError });
  useRequestManager({ error: customerGroupError });
  useRequestManager({ error: maxCodeError });
  useRequestManager({ error: branchError });
  useRequestManager({ error: saleChannelError });
  useRequestManager({
    error: submitError,
    loading: submitLoading,
    data: listSubmitData,
  });

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
    onEdit();
  }, []);

  useEffect(() => {
    form.resetFields();
    editData?.isSuccess && form.setFieldsValue({ ...(editData?.data || null) });
  }, [editData]);

  //==================================================================
  //                        Functions
  //==================================================================
  const getMaxCode = async () => {
    await maxCodeApiCall(`${url.CUSTOMER_FREE_CODE}`);
  };

  const getCustomerGroup = async () => {
    await customerGroupApiCall(url.CUSTOMER_GROUP)
  }

  const getCustomerType = async () => {
    await customerTypeApiCall(url.CUSTOMER_TYPE)
  }

  const handleCounterParty = async () => {
    setEmpty(id);
    console.log(val, "klklk");
    await ApiCall(`${url.COUNTER_PARTY}/${id}`);
  };

  const getAllCounterPartyForDropDown = async (inputValue) => {
    const queryString = qs.stringify({
      counterpartyName: inputValue,
    });

    const response = await Get(
      `${url.COUNTER_PARTY_GET_FOR_DROPDOWN}?${queryString}`,
      "",
    );
    if (response?.data) {
      return response?.data.map((item) => ({
        label: `${item.counterpartyName} `,
        value: item.id,
      }

      ));
    }
  };

  const onEdit = async () => {
    await editApiCall(`${url.CUSTOMER}/${id}`);
  };

  const onFinish = async (values) => {
    const req = {
      ...values,
      counterpartyId: values?.counterpartyId,
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
      <ModalHeader title={'ویرایش مشتری'} />
      <Ant.Modal
        {...defaultValues.MODAL_PROPS}
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
      <Ant.Skeleton loading={loadingData}>
        <Ant.Form form={form} onFinish={onFinish} layout="vertical">
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col span={24} sm={10}>
              <Ant.Card
                loading={editLoading}
                style={{ ...styles.CARD_DEFAULT_STYLES }}
              >

                <Ant.Col>
                  <Ant.Form.Item
                    rules={[{ required: true }]}
                    name={"counterpartyId"}
                    label="طرف حساب مرتبط"
                  >
                    <DebounceSelect
                      onChange={handleCounterParty}
                      // fieldNames={{ label: "counterpartyName", value: "counterpartyId" }}
                      maxCount={1}
                      placeholder="بخشی از نام مشتری را تایپ کنید..."

                      fetchOptions={getAllCounterPartyForDropDown}
                      fieldNames={{ label: "label", value: "value" }}
                    />
                  </Ant.Form.Item>
                </Ant.Col>
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
                <Ant.Row gutter={[10, 8]}>
                  <Ant.Col span={21}>
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
                      />
                    </Ant.Form.Item>
                  </Ant.Col>
                  <Ant.Col >
                    <Ant.Tooltip title={"افزودن"}>
                      <Ant.Button
                        className="mt-8 "
                        onClick={() => { onAddGroup() }}
                      >
                        {"+"}
                      </Ant.Button>
                    </Ant.Tooltip>
                  </Ant.Col>
                </Ant.Row>
                <Ant.Row gutter={[10, 8]}>
                  <Ant.Col span={21}>
                    <Ant.Form.Item
                      rules={[{ required: true }]}
                      name={"typeId"}
                      label="نوع"
                    >
                      <Ant.Select
                        {...commonOptions}
                        allowClear={true}
                        placeholder={"انتخاب کنید..."}
                        disabled={customerTypeLoading || false}
                        loading={customerTypeLoading}
                        options={customerTypeList?.data}
                        fieldNames={{ label: "title", value: "id" }}
                      />
                    </Ant.Form.Item>
                  </Ant.Col>
                  <Ant.Col >
                    <Ant.Tooltip title={"افزودن"}>
                      <Ant.Button
                        className="mt-8 "
                        onClick={() => { onAddType() }}
                      >
                        {"+"}
                      </Ant.Button>
                    </Ant.Tooltip>
                  </Ant.Col>
                </Ant.Row>
                <Ant.Col>
                  <Ant.Form.Item
                    rules={[{ required: true }]}
                    name={"branchId"}
                    label="شعبه"
                  >
                    <Ant.Select
                      {...commonOptionsBranch}
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
                      disable={saleChannelLoading || false}
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
                      disable={customerGradeLoading || false}
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
              </Ant.Card>
            </Ant.Col>
            <Ant.Col span={24} sm={14}>
              <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }}>
                {empty == undefined ? (
                  <Ant.Empty />
                ) : (
                  <HeaderCounterParty data={listData} />
                )}
              </Ant.Card>
            </Ant.Col>
          </Ant.Row>
        </Ant.Form>
      </Ant.Skeleton>
    </>
  );
};

export default FormEditCustomer;

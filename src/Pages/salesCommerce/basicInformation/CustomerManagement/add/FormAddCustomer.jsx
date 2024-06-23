import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as styles from "@/styles";
import { useFetch, useFetchWithHandler, Get, usePostWithHandler } from "@/api";
import qs from "qs";
import * as url from "@/api/url";
import DebounceSelect from "@/components/common/DebounceSelect";
import { PiArrowLineDownLeftLight } from "react-icons/pi";
import HeaderCounterParty from "../../../../manageCounterParty/description/HeaderCounterParty";
import useRequestManager from "@/hooks/useRequestManager";

import ModalHeader from "@/components/common/ModalHeader";
const FormAddCustomer = ({ onSucces }) => {
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();

  const [empty, setEmpty] = useState(undefined);
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] =
    useFetchWithHandler();
  const [customerGroupList, customerGroupLoading, customerGroupError] =
    useFetch(url.CUSTOMER_GROUP);
  const [customerTypeList, customerTypeLoading, customerTypeError] = useFetch(
    url.CUSTOMER_TYPE,
  );
  const [customerGradeList, customerGradeLoading, customerGradeError] =
    useFetch(url.CUSTOMER_GRADE);
  const [branchList, branchLoading, branchError] = useFetch(url.BRANCH);
  const [saleChannelData, saleChannelLoading, saleChannelError] = useFetch(
    url.SALE_CHANNEL,
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
  const handleCounterParty = async (val) => {
    console.log(val,"vvvvvavava")
    setEmpty(val);
    await ApiCall(`${url.COUNTER_PARTY}/${val.key}`);
  };

  const getAllCounterPartyForDropDown = async (inputValue) => {
    console.log(inputValue,"createFatemeh")
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
      }));
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
  //====================================================================
  //                        Component
  //====================================================================

  return (
    <>

<ModalHeader title= {'ایجاد مشتری'}/>
        <Ant.Form form={form} onFinish={onFinish} layout="vertical">
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col span={24} sm={10}>
              <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }}>
                <Ant.Col>
                  <Ant.Form.Item
                    rules={[{ required: true }]}
                    name={"counterpartyId"}
                    label="طرف حساب مرتبط"
                  >
                    <DebounceSelect
                      onChange={handleCounterParty}
                      maxCount={1}
                      placeholder="بخشی از نام طرف حساب را تایپ کنید..."
                      fetchOptions={getAllCounterPartyForDropDown}
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
                      disabled={customerTypeLoading || false}
                      loading={customerTypeLoading}
                      options={customerTypeList?.data}
                      fieldNames={{ label: "title", value: "id" }}
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
                  <Ant.Form.Item name={"gradeId"} label="رتبه">
                    <Ant.Select
                      allowClear={true}
                      placeHolder={"انتخاب کنید..."}
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
              <Ant.Skeleton loading={loadingData}>
                <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }}>
                  {empty == undefined ? (
                    <Ant.Empty description={'طرف حساب مربوطه را انتخاب کنید'} />
                  ) : (
                    <HeaderCounterParty data={listData} />
                  )}
                </Ant.Card>
              </Ant.Skeleton>
            </Ant.Col>
          </Ant.Row>
        </Ant.Form>

    </>
  );
};

export default FormAddCustomer;

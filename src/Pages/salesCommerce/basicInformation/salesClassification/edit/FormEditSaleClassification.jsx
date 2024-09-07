import React, { useEffect, useState } from "react";
import ModalHeader from "@/components/common/ModalHeader";
import * as Ant from "antd";
import { MdGrading } from "react-icons/md";
import useRequestManager from "@/hooks/useRequestManager";

import PropTypes from "prop-types";

import { useFetchWithHandler, useFetch, usePutWithHandler } from "@/api";
import * as url from "@/api/url";
import * as api from "@/api";
export const FormEditSaleClassification = (props) => {
  const { key, onSuccess, id } = props;

  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  const [
    accounGroupTreeData,
    accounGroupTreeLoading,
    accounGroupTreeError,
    accounGroupTreeApicall,
  ] = api.useFetchWithHandler();
  const [options, setOptions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({
    id: null,
    name: "",
  });
  useRequestManager({ error: accounGroupTreeError });
  useRequestManager({ error: editError, loading: editLoading, data: editData });
  const [form] = Ant.Form.useForm();

  const commonOptionsAcc = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) =>
      option.name.toLowerCase().includes(input.toLowerCase()),
  };

  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
        String(option.id).indexOf(inputValue) > -1,
    );


  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getAllSalesClassiFicationId();
  }, []);

  useEffect(() => {
    accounGroupTreeApicall(url.ACCOUNT_TREE);
  }, []);

  useEffect(() => {
    form.resetFields();
    console.log(listData?.data," ...listData?.data,")
    listData?.isSuccess &&
      form.setFieldsValue({
        ...listData?.data,
        // accountId: listData?.data?.accountName,
      });
  }, [listData]);

  useEffect(() => {
    editData?.isSuccess && onSuccess();
  }, [editData]);

  useEffect(() => {
    accounGroupTreeData?.isSuccess && setOptions(accounGroupTreeData?.data);
  }, [accounGroupTreeData]);

  //====================================================================
  //                        Functions
  //====================================================================

  const handleChangeAccount = (value, selectedOptions) => {
    const lastSelectedOption = selectedOptions[selectedOptions.length - 1];

    setSelectedAccount({
      id: lastSelectedOption.id,
      name: lastSelectedOption.name,
    });
  };
  const getAllSalesClassiFicationId = async () => {
    await ApiCall(`${url.SALE_CLASSIFICATION}/${id}`);
  };

  const onFinish = async (values) => {
    console.log(values, "values");
    const req = { ...values, id: id,accountId: selectedAccount.id };
    await editApiCall(url.SALE_CLASSIFICATION, req);
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"ویرایش طبقه بندی فروش"} icon={<MdGrading />} />
      <Ant.Skeleton loading={loadingData}>
        <Ant.Form form={form} onFinish={onFinish} layout="vertical">
          <Ant.Row gutter={[8, 8]}>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name="title"
                label={"نام"}
                rules={[{ required: true }]}
              >
                <Ant.Input allowClear showCount maxLength={200} />
              </Ant.Form.Item>
            </Ant.Col>

            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name={"accountId"}
                label=" حساب "
                rules={[
                  {
                    required: true,
                    message: "فیلد حساب  اجباری است",
                  },
                ]}
              >
                <Ant.Cascader
                  loading={accounGroupTreeLoading}
                  options={options}
                  onChange={handleChangeAccount}
                  placeholder="لطفا انتخاب کنید ..."
                  fieldNames={{
                    label: "name",
                    value: "id",
                    children: "children",
                  }}
                  showSearch={{
                    filter,
                  }}
                  displayRender={(labels, selectedOptions) => {
                    const lastLabel = labels[labels.length - 1];
                    const accountCode =
                      selectedOptions[selectedOptions.length - 1]?.code;

                    return (
                      <span>
                        {lastLabel}
                        {accountCode && <span> (کد: {accountCode})</span>}
                      </span>
                    );
                  }}
                />
              </Ant.Form.Item>
            </Ant.Col>


            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item name={"detailedAccountId"} label="حساب تفصیلی">
                <Ant.Select
                  {...commonOptionsAcc}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={dtAccLoading || false}
                  loading={dtAccLoading}
                  options={dtAccData?.data}
                  fieldNames={{ label: "name", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item>
                <Ant.Button
                  loading={editLoading || false}
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

export default FormEditSaleClassification;
FormEditSaleClassification.propTypes = {
  onSuccess: PropTypes.func,
  id: PropTypes.number,
};

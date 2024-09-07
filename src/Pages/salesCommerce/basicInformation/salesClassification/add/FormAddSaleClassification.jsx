import React, { useEffect, useState } from "react";
import ModalHeader from "@/components/common/ModalHeader";
import * as Ant from "antd";
import { MdGrading } from "react-icons/md";
import useRequestManager from "@/hooks/useRequestManager";

import PropTypes from "prop-types";
import * as api from "@/api";
import { usePostWithHandler, useFetch } from "@/api";
import * as url from "@/api/url";

export const FormAddSaleClassification = (props) => {
  const { key, onSuccess } = props;
  const [accountList, accountLoading, accountError] = useFetch(url.ACCOUNT);
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
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
  useRequestManager({ error: dtAccError });
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
    addData?.isSuccess && onSuccess();
  }, [addData]);

  useEffect(() => {
    accounGroupTreeData?.isSuccess && setOptions(accounGroupTreeData?.data);
  }, [accounGroupTreeData]);

  useEffect(() => {
    accounGroupTreeApicall(url.ACCOUNT_TREE);
  }, []);
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

  const onFinish = async (values) => {
    const req = { ...values, accountId: selectedAccount.id };
    await addApiCall(url.SALE_CLASSIFICATION, req);
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"ایجاد طبقه بندی فروش"} icon={<MdGrading />} />
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Row gutter={[8, 8]}>
          <Ant.Col span={24} md={24} lg={24}>
            <Ant.Form.Item
              name="title"
              label={"نام"}
              rules={[{ required: true }]}
            >
              <Ant.Input allowClear showCount maxLength={150} />
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
                loading={addLoading || false}
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
    </>
  );
};

export default FormAddSaleClassification;
FormAddSaleClassification.propTypes = {
  onSuccess: PropTypes.func,
};

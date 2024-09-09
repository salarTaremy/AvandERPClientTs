import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { usePostWithHandler, useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import ModalHeader from "@/components/common/ModalHeader";

import {
  BsFillJournalBookmarkFill,
  BsBook,
  BsJournalCheck,

} from "react-icons/bs";
import { SiAnytype } from "react-icons/si";
import useAllLoading from "@/hooks/useAllLoading ";
import * as api from "@/api";
const FormAddSaleType = (props) => {
  const { onSuccess } = props;
  const [loading, setLoading] = useState(false);
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
  const [currencyData, currencyLoading, currencyError] = useFetch(url.CURRENCY);
  const [form] = Ant.Form.useForm();

  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [options, setOptions] = useState([]);
  const [
    accounGroupTreeData,
    accounGroupTreeLoading,
    accounGroupTreeError,
    accounGroupTreeApicall,
  ] = api.useFetchWithHandler();
  useRequestManager({ error: accounGroupTreeError });
  useRequestManager({ error: currencyError });
  useRequestManager({ error: dtAccError });
  useRequestManager({ error: addError, loading: addLoading, data: addData });
  const [selectedAccount, setSelectedAccount] = useState({
    id: null,
    name: "",
  });
  const commonOptions = {
    showSearch: true,
    filterOption: (input, option) => option.persianTitle.indexOf(input) >= 0,
  };
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
        String(option.fullCode).indexOf(inputValue) > -1,
    );
  const allLoading = useAllLoading([accounGroupTreeLoading, dtAccLoading]);
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    form.setFieldValue("isActive", true);
  }, [form]);

  useEffect(() => {
    addData?.isSuccess && onSuccess();
  }, [addData]);

  useEffect(() => {
    accounGroupTreeApicall(url.ACCOUNT_TREE);
  }, []);
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
      id: lastSelectedOption.accountId,
      name: lastSelectedOption.name,
    });
  };
  const onFinish = async (values) => {
    setLoading(true);
    const req = { ...values, accountId: selectedAccount.id };
    await addApiCall(url.SALETYPE, req);
    setLoading(false);
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"ایجاد نوع فروش "} icon={<SiAnytype />} />
      <Ant.Skeleton active loading={allLoading}>
        <Ant.Form form={form} onFinish={onFinish} layout="vertical">
          <Ant.Row gutter={[8, 8]}>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name="title"
                label={"عنوان فروش"}
                rules={[{ required: true }]}
              >
                <Ant.Input allowClear showCount maxLength={200} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item name={"defaultCurrencyId"} label="نام ارز">
                <Ant.Select
                  {...commonOptions}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={currencyLoading || false}
                  loading={currencyLoading}
                  options={currencyData?.data}
                  fieldNames={{ label: "persianTitle", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>

            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item
                name={"accountId"}
                label=" حساب "
                rules={[
                  {
                    required: false,
                    message: "فیلد حساب  اجباری است",
                  },
                ]}
              >
                <Ant.Cascader
                  loading={accounGroupTreeLoading}
                  options={options}
                  optionRender={(option) => (
                    <>
                     <Ant.Space >
                      {option.level === 1 && <BsFillJournalBookmarkFill className="text-blue-500" />}
                      {option.level === 2 && <BsJournalCheck className="text-orange-400" />}
                      {option.level === 3 && <BsBook className="text-green-600" />}
                      {option.fullCode}-{option.name}
                      </Ant.Space>
                    </>
                  )}
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
                  block
                  type="primary"
                  loading={loading}
                  onClick={() => {
                    form.submit();
                  }}
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

export default FormAddSaleType;
FormAddSaleType.propTypes = {
  onSuccess: PropTypes.func,
};

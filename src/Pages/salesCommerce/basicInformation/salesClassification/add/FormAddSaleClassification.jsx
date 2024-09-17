import React, { useEffect, useState } from "react";
import ModalHeader from "@/components/common/ModalHeader";

import {
  BsFillJournalBookmarkFill,
  BsBook,
  BsJournalCheck,

} from "react-icons/bs";
import * as Ant from "antd";
import { MdGrading } from "react-icons/md";
import useRequestManager from "@/hooks/useRequestManager";
import PropTypes from "prop-types";
import * as api from "@/api";
import { usePostWithHandler, useFetch } from "@/api";
import * as url from "@/api/url";
import useAllLoading from "@/hooks/useAllLoading ";
export const FormAddSaleClassification = (props) => {
  const { onSuccess } = props;
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
  const [
    accounTreeData,
    accounTreeLoading,
    accounTreeError,
    accounTreeApicall,
  ] = api.useFetchWithHandler();
  const [options, setOptions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({
    id: null,
    name: "",
  });
  useRequestManager({ error: accounTreeError });
  useRequestManager({ error: dtAccError });
  useRequestManager({ error: addError });
  const [form] = Ant.Form.useForm();

  const commonOptionsAcc = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) =>
      option.name.toLowerCase().includes(input.toLowerCase()),
    matching: true,
  };
  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
        String(option.fullCode).indexOf(inputValue) > -1,
    );

  // const filter = (inputValue, path) =>
  //   path.some(
  //     (option) =>
  //       option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
  //       (option.fullCode && option.fullCode.includes(inputValue))
  //   );
  const allLoading = useAllLoading([ accounTreeLoading, dtAccLoading]);
  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {
    addData?.isSuccess && onSuccess();
  }, [addData]);

  useEffect(() => {
    accounTreeData?.isSuccess && setOptions(accounTreeData?.data);
  }, [accounTreeData]);

  useEffect(() => {
    accounTreeApicall(url.ACCOUNT_TREE);
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
    const req = { ...values, accountId: selectedAccount.id };
    await addApiCall(url.SALE_CLASSIFICATION, req);
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"ایجاد طبقه بندی فروش"} icon={<MdGrading />} />
      {/* <Ant.Skeleton active loading={allLoading}> */}
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
                    required: false,
                    message: "فیلد حساب  اجباری است",
                  },
                ]}
              >
                <Ant.Cascader
                  loading={accounTreeLoading}
                  options={options}
                  // optionRender={(option) => <span>{option.fullCode +'-'+ option.name}</span> }
                  // optionRender={(option) => (
                  //   <>

                  //     {option.fullCode}-{option.name}
                  //   </>
                  // )}
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
                  notFoundContent={
                    options.length === 0 ? (
                      <span>داده‌ای موجود نیست</span>
                    ) : null
                  }
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Form.Item name={"detailedAccountId"} label="حساب تفصیلی">
                <Ant.Select
                  {...commonOptionsAcc}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={dtAccLoading }
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
      {/* </Ant.Skeleton> */}
    </>
  );
};

export default FormAddSaleClassification;
FormAddSaleClassification.propTypes = {
  onSuccess: PropTypes.func,
};

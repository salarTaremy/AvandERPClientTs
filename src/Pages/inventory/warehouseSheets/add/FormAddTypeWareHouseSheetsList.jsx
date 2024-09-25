import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import useRequestManager from "@/hooks/useRequestManager";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import * as api from "@/api";
import { FaWarehouse } from "react-icons/fa6";
import ModalHeader from "@/components/common/ModalHeader";
import { usePostWithHandler, useFetch, useFetchWithHandler } from "@/api";
import useAllLoading from "@/hooks/useAllLoading ";
import {
  BsFillJournalBookmarkFill,
  BsBook,
  BsJournalCheck,
} from "react-icons/bs";
const FormAddTypeWareHouseSheetsList = (props) => {
    const { onSuccess } = props;
  const [form] = Ant.Form.useForm();
  const [
    accounTreeData,
    accounTreeLoading,
    accounTreeError,
    accounTreeApicall,
  ] = api.useFetchWithHandler();
  const [selectedAccount, setSelectedAccount] = useState({
    id: null,
    name: "",
  });
  const [options, setOptions] = useState([]);
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
  const [accData, accLoading, accError, accApiCall] = useFetchWithHandler();
  useRequestManager({ error: accError });
  useRequestManager({ error: accounTreeError });
  useRequestManager({ error: dtAccError });
  useRequestManager({ error: addError, loading: addLoading, data: addData });
  const natureList = [
    { id: 0, title: "خنثی" },
    { id: 1, title: "رسید" },
    { id: -1, title: "حواله" },
  ];
  const commonOptionsAcc = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) =>
      option.name.toLowerCase().includes(input.toLowerCase()),
  };
  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option?.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
        String(option?.fullCode).indexOf(inputValue) > -1,
    );
  const allLoading = useAllLoading([accounTreeLoading, dtAccLoading]);
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    accounTreeApicall(url.ACCOUNT_TREE);
  }, []);

  //   useEffect(() => {

  //     if (accounGroupTreeData?.isSuccess) {

  //       const updatedOptions = accounGroupTreeData.data.map((option, index) => ({
  //         ...option,
  //         key: option?.key || index
  //       }));
  //       setOptions(updatedOptions);
  //     }
  //   }, [accounGroupTreeData]);

  // useEffect(() => {
  //     accounTreeData?.isSuccess && setOptions(accounTreeData?.data);
  //     accounTreeData?.isSuccess && listData?.data.accountId &&
  //     accounTreeApicall(`${url.ACCOUNT}/${listData?.data.accountId}`);
  //   }, [accounTreeData]);

  useEffect(() => {
    accounTreeData?.isSuccess && setOptions(accounTreeData?.data);
  }, [accounTreeData]);
  useEffect(() => {
    addData?.isSuccess && onSuccess();
  }, [addData]);
  //====================================================================
  //                        Functions
  //====================================================================

  const handleChangeAccount = (value, selectedOptions) => {
    const lastSelectedOption = selectedOptions[selectedOptions?.length - 1];

    setSelectedAccount({
      id: lastSelectedOption.accountId,
      name: lastSelectedOption.name,
    });
  };
  const onFinish = async (values) => {
    const req = { ...values, accountId: selectedAccount.id };

    await addApiCall(url.INVENTORY_DOCUMENT_TYPE, req);

  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"ایجاد برگه انبار "} icon={<FaWarehouse />} />
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Row gutter={[8, 8]}>
          <Ant.Col span={24} md={24} lg={24}>
            <Ant.Form.Item
              name="title"
              label={"عنوان"}
              rules={[{ required: true }]}
            >
              <Ant.Input allowClear showCount maxLength={100} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24} md={24} lg={24}>
            <Ant.Form.Item
              name="nature"
              label={"ماهیت"}
              rules={[{ required: true }]}
            >
              <Ant.Select
                allowClear
                placeholder={"انتخاب کنید..."}
                options={natureList}
                fieldNames={{ label: "title", value: "id" }}
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
                loading={accounTreeLoading}
                options={options}
                onChange={handleChangeAccount}
                placeholder="لطفا انتخاب کنید ..."
                optionRender={(option) => (
                  <>
                    <Ant.Space key={option.key}>
                      {option.level === 1 && (
                        <BsFillJournalBookmarkFill className="text-blue-500" />
                      )}
                      {option.level === 2 && (
                        <BsJournalCheck className="text-orange-400" />
                      )}
                      {option.level === 3 && (
                        <BsBook className="text-green-600" />
                      )}
                      {option.fullCode}-{option.name}
                    </Ant.Space>
                  </>
                )}
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
                    selectedOptions[selectedOptions.length - 1]?.fullCode;

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
                disabled={dtAccLoading}
                loading={dtAccLoading}
                options={dtAccData?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24} md={24} lg={24}>
            <Ant.Form.Item
              name={"description"}
              label="توضیحات"
              rules={[{ required: false }]}
            >
              <Ant.Input.TextArea allowClear showCount maxLength={300} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24} md={24} lg={24}>
            <Ant.Form.Item>
              <Ant.Button
                block
                type="primary"
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
    </>
  );
};

export default FormAddTypeWareHouseSheetsList;
FormAddTypeWareHouseSheetsList.propTypes = {
  onSuccess: PropTypes.func,
};

import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import useRequestManager from "@/hooks/useRequestManager";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import * as api from "@/api";
import { FaWarehouse } from "react-icons/fa6";
import ModalHeader from "@/components/common/ModalHeader";
import { useFetch, useFetchWithHandler, usePutWithHandler } from "@/api";
import useAllLoading from "@/hooks/useAllLoading ";
import {
  BsFillJournalBookmarkFill,
  BsBook,
  BsJournalCheck,
} from "react-icons/bs";
const FormEditTypeWareHouseSheetsList = (props) => {
  const { onSuccess, id } = props;

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
  const [
    typeWareHouseSheetsByIdData,
    typeWareHouseSheetsByIdloading,
    typeWareHouseSheetsByIderror,
    typeWareHouseSheetsByIdApiCall,
  ] = useFetchWithHandler();
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  const [accData, accLoading, accError, accApiCall] = useFetchWithHandler();
  useRequestManager({ error: typeWareHouseSheetsByIderror });
  useRequestManager({ error: accounTreeError });
  useRequestManager({ error: dtAccError });
  useRequestManager({ error: accError });
  useRequestManager({ error: editError, loading: editLoading, data: editData });
  const [form] = Ant.Form.useForm();
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
  const allLoading = useAllLoading([
    accounTreeLoading,
    dtAccLoading,
    typeWareHouseSheetsByIdloading,
    accLoading,
  ]);
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    accounTreeApicall(url.ACCOUNT_TREE);
  }, []);
  useEffect(() => {
    form.resetFields();
    typeWareHouseSheetsByIdData?.isSuccess &&
      form.setFieldsValue({ ...(typeWareHouseSheetsByIdData?.data || null) });
  }, [typeWareHouseSheetsByIdData]);

  useEffect(() => {
    editData?.isSuccess && onSuccess();
  }, [editData]);

  useEffect(() => {
    accounTreeData?.isSuccess && setOptions(accounTreeData?.data);
    accounTreeData?.isSuccess &&
      typeWareHouseSheetsByIdData?.data?.accountId &&
      accApiCall(
        `${url.ACCOUNT}/${typeWareHouseSheetsByIdData?.data?.accountId}`,
      );
  }, [accounTreeData]);

  useEffect(() => {
    if (accData?.isSuccess && accData?.data) {
      const treeArray = [
        parseInt(accData.data.accountGroupCode),
        parseInt(accData.data.parentKey),
        parseInt(accData.data.key),
      ];
      form.setFieldValue("accountId", treeArray);
    }
  }, [accData]);

  useEffect(() => {
    if (accData?.isSuccess && accData?.data) {
      const treeArray = [
        parseInt(accData?.data?.accountGroupCode),
        parseInt(accData?.data?.parentKey),
        parseInt(accData?.data?.key),
      ];

      form.setFieldValue("accountId", treeArray);
    }
  }, [accData]);

  //   useEffect(() => {
  //     debugger
  //     if (accounGroupTreeData?.isSuccess) {

  //       const updatedOptions = accounGroupTreeData.data.map((option, index) => ({
  //         ...option,
  //         key: option?.code || index
  //       }));
  //       setOptions(updatedOptions);
  //     }
  //   }, [accounGroupTreeData]);

  useEffect(() => {
    getTypeWareHouseSheetsById();
  }, []);

  // useEffect(() => {
  //   accounTreeData?.isSuccess && setOptions(accounTreeData?.data);
  // }, [accounTreeData]);
  //====================================================================
  //                        Functions
  //====================================================================
  const getTypeWareHouseSheetsById = async () => {
    await typeWareHouseSheetsByIdApiCall(
      `${url.INVENTORY_DOCUMENT_TYPE}/${id}`,
    );
  };

  const handleChangeAccount = (value, selectedOptions) => {
    const lastSelectedOption = selectedOptions[selectedOptions?.length - 1];
    console.log(lastSelectedOption, "lastSelectedOption");
    setSelectedAccount({
      id: lastSelectedOption.accountId,
      name: lastSelectedOption.name,
    });
  };
  const onFinish = async (values) => {
    const req = { ...values, id: id, accountId: selectedAccount?.id };

    await editApiCall(url.INVENTORY_DOCUMENT_TYPE, req);
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"ویرایش برگه انبار "} icon={<FaWarehouse />} />
      <Ant.Skeleton active loading={allLoading}>
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
                name={"nature"}
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
                loading={accError}
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
      </Ant.Skeleton>
    </>
  );
};

export default FormEditTypeWareHouseSheetsList;
FormEditTypeWareHouseSheetsList.propTypes = {
  onSuccess: PropTypes.func,
  id: PropTypes.number,
};

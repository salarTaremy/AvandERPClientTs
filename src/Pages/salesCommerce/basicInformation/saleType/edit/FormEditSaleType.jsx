import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { usePutWithHandler, useFetch, useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import {
  BsFillJournalBookmarkFill,
  BsBook,
  BsJournalCheck,

} from "react-icons/bs";
import { SiAnytype } from "react-icons/si";
import * as api from "@/api";
import useAllLoading from "@/hooks/useAllLoading ";
const FormEditSaleType = (props) => {
  const { onSuccess, id } = props;
  const [loading, setLoading] = useState(false);
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [currencyData, currencyLoading, currencyError] = useFetch(url.CURRENCY);
  const [accData, accLoading, accError, accApiCall] = useFetchWithHandler();
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
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
  useRequestManager({ error: error });
  useRequestManager({ error: dtAccError });
  useRequestManager({ error: currencyError });
  useRequestManager({ error: accounTreeError });
  useRequestManager({ error: editError, loading: editLoading, data: editData });
  const allLoading = useAllLoading([accounTreeLoading, dtAccLoading]);
  const [form] = Ant.Form.useForm();
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

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getSaleTypeById();
  }, []);
  useEffect(() => {
    accounTreeApicall(url.ACCOUNT_TREE);
  }, []);
  useEffect(() => {
    accounTreeData?.isSuccess && setOptions(accounTreeData?.data);
    accounTreeData?.isSuccess && listData?.data?.accountId &&
      accApiCall(`${url.ACCOUNT}/${listData?.data?.accountId}`);
  }, [accounTreeData]);
  useEffect(() => {
    form.resetFields();
    listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) });
  }, [listData]);
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
  //=====================================================================
  //                        Functions
  //=====================================================================
  const getSaleTypeById = async () => {
    await ApiCall(`${url.SALETYPE}/${id}`);
  };
  const handleChangeAccount = (value, selectedOptions) => {
    const lastSelectedOption = selectedOptions[selectedOptions.length - 1];

    setSelectedAccount({
      id: lastSelectedOption.accountId,
      name: lastSelectedOption.name,
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    const req = { ...values, id: id, accountId: selectedAccount.id };
    await editApiCall(url.SALETYPE, req);
    setLoading(false);
    onSuccess();
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"ویرایش نوع فروش "} icon={<SiAnytype />} />
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
              <Ant.Form.Item
                name={"defaultCurrencyId"}
                label="نام ارز"
                rules={[{ required: true }]}
              >
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
                  loading={accounTreeLoading || accLoading}
                  disabled={accounTreeLoading || accLoading}
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

export default FormEditSaleType;
FormEditSaleType.propTypes = {
  onFinish: PropTypes.func,
  onSuccess: PropTypes.func,
  obj: PropTypes.any,
  id: PropTypes.number,
  loading: PropTypes.bool,
};

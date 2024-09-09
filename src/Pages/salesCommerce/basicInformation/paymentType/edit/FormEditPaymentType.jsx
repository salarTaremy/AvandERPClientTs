import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { usePutWithHandler, useFetchWithHandler, useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";

import {
  BsFillJournalBookmarkFill,
  BsBook,
  BsJournalCheck,

} from "react-icons/bs";
import ModalHeader from "@/components/common/ModalHeader";
import { MdOutlinePayment } from "react-icons/md";
import * as api from "@/api";
import useAllLoading from "@/hooks/useAllLoading ";
const FormEditPaymentType = (props) => {
  const { onSuccess, id } = props;
  const [loading, setLoading] = useState(false);
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();

  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [
    accounGroupTreeData,
    accounGroupTreeLoading,
    accounGroupTreeError,
    accounGroupTreeApicall,
  ] = api.useFetchWithHandler();
  const [selectedAccount, setSelectedAccount] = useState({
    id: null,
    name: "",
  });
  const [options, setOptions] = useState([]);
  const [accData, accLoading, accError, accApiCall] = useFetchWithHandler();
  const allLoading = useAllLoading([
    loadingData,
    accounGroupTreeLoading,
    accLoading,
    dtAccLoading,
  ]);
  useRequestManager({ error: accounGroupTreeError });
  useRequestManager({ error: dtAccError });
  useRequestManager({ error: accError });
  useRequestManager({ error: error });
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
        String(option.fullCode).indexOf(inputValue) > -1,
    );

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getPaymentTypeById();
  }, []);

  useEffect(() => {
    accounGroupTreeApicall(url.ACCOUNT_TREE);
  }, []);

  useEffect(() => {
    form.resetFields();
    listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) });
  }, [listData]);

  useEffect(() => {
    accounGroupTreeData?.isSuccess && setOptions(accounGroupTreeData?.data);
    accounGroupTreeData?.isSuccess &&
      accApiCall(`${url.ACCOUNT}/${listData?.data.accountId}`);
  }, [accounGroupTreeData]);

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
  const getPaymentTypeById = async () => {
    await ApiCall(`${url.PAYMENT_TYPE}/${id}`);
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
    await editApiCall(url.PAYMENT_TYPE, req);
    setLoading(false);
    onSuccess();
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"ویرایش نوع پرداخت"} icon={<MdOutlinePayment />} />
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
                  loading={accounGroupTreeLoading || accLoading}
                  disabled={accounGroupTreeLoading || accLoading}
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
              <Ant.Form.Item
                name={"description"}
                label="توضیحات"
                rules={[{ required: false }]}
              >
                <Ant.Input.TextArea allowClear showCount maxLength={500} />
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

export default FormEditPaymentType;
FormEditPaymentType.propTypes = {
  onFinish: PropTypes.func,
  onSuccess: PropTypes.func,
  obj: PropTypes.any,
  id: PropTypes.number,
  loading: PropTypes.bool,
};

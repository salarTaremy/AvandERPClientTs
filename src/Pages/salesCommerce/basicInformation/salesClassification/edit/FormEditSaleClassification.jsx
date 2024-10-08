import React, { useEffect, useState } from "react";
import ModalHeader from "@/components/common/ModalHeader";
import * as Ant from "antd";
import { MdGrading } from "react-icons/md";
import useRequestManager from "@/hooks/useRequestManager";
import PropTypes from "prop-types";
import { useFetchWithHandler, useFetch, usePutWithHandler } from "@/api";
import {
  BsFillJournalBookmarkFill,
  BsBook,
  BsJournalCheck,

} from "react-icons/bs";
import * as url from "@/api/url";
import * as api from "@/api";
import useAllLoading from "@/hooks/useAllLoading ";


export const FormEditSaleClassification = (props) => {
  const { onSuccess, id } = props;
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [saleClassificationData, loadingsaleClassificationData, saleClassificationError, ApiCall] = useFetchWithHandler();
  const [accData, accLoading, accError, accApiCall] = useFetchWithHandler();
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
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
  useRequestManager({ error: accError });
  useRequestManager({ error: dtAccError });
  useRequestManager({ error: saleClassificationError });
  useRequestManager({ error: editError, loading: editLoading, data: editData });

  const allLoading = useAllLoading([loadingsaleClassificationData, accounTreeLoading, accLoading,dtAccLoading])
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
    getAllSalesClassiFicationId();
  }, []);

  useEffect(() => {
    accounTreeApicall(url.ACCOUNT_TREE);
  }, []);

  useEffect(() => {
    form.resetFields();
    saleClassificationData?.isSuccess &&
      form.setFieldsValue({
        ...saleClassificationData?.data,
      });
  }, [saleClassificationData]);

  useEffect(() => {
    editData?.isSuccess && onSuccess();
  }, [editData]);

  useEffect(() => {
    accounTreeData?.isSuccess && setOptions(accounTreeData?.data);
    accounTreeData?.isSuccess && saleClassificationData.data.accountId && accApiCall(`${url.ACCOUNT}/${saleClassificationData.data.accountId}`);
  }, [accounTreeData]);

  useEffect(() => {
    if (accData?.isSuccess && accData?.data) {
      const treeArray = [parseInt(accData.data.accountGroupCode), parseInt(accData.data.parentKey), parseInt(accData.data.key)]
      form.setFieldValue("accountId", treeArray)
    }
  }, [accData]);

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
  const getAllSalesClassiFicationId = async () => {
    await ApiCall(`${url.SALE_CLASSIFICATION}/${id}`);
  };

  const onFinish = async (values) => {
    const req = { ...values, id: id, accountId: selectedAccount.id };
    await editApiCall(url.SALE_CLASSIFICATION, req);
  };
  //====================================================================
  //                        Component
  //====================================================================


  return (
    <>
      <ModalHeader title={"ویرایش طبقه بندی فروش"} icon={<MdGrading />} />
      {/* <Ant.Skeleton active loading={allLoading}> */}
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
                    required: false,
                    message: "فیلد حساب  اجباری است",
                  },
                ]}
              >
                <Ant.Cascader
                  loading={accounTreeLoading || accLoading}
                  disabled={accounTreeLoading }
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
                  fieldNames={{ label: "name", value: "id", children: "children" }}
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
                  loading={editLoading }
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

export default FormEditSaleClassification;
FormEditSaleClassification.propTypes = {
  onSuccess: PropTypes.func,
  id: PropTypes.number,
};

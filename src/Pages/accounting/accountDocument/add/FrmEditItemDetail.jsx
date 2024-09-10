import React from "react";
import * as Ant from "antd";
import { useEffect, useState } from "react";
import * as url from "@/api/url";
import { useFetch } from "@/api";
import PropTypes from "prop-types";
import * as api from "@/api";
import * as uuid from "uuid";

import {
  BsFillJournalBookmarkFill,
  BsBook,
  BsJournalCheck,

} from "react-icons/bs";
import ModalHeader from "@/components/common/ModalHeader";
import useRequestManager from "@/hooks/useRequestManager";
import { FaFileMedical } from "react-icons/fa";
import useAllLoading from "@/hooks/useAllLoading ";
const FrmEditItemDetail = (props) => {
  const { id, obj } = props;
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [valueType, setValueType] = useState("0");
  const [selectedAccount, setSelectedAccount] = useState({
    id: null,
    name: "",
  });
  const [selectedDetailedAccountFour, setDetailedAccountFour] = useState();
  const [selectedDetailedAccountFive, setDetailedAccountFive] = useState();
  const [selectedDetailedAccountSix, setDetailedAccountSix] = useState();
  const [detailedError, setDetailedError] = useState('');
  const [
    accounGrouptData,
    accountGroupLoading,
    accountGroupError,
    accoupGroupApicall,
  ] = api.useFetchWithHandler();
  const [form] = Ant.Form.useForm();
  const [options, setOptions] = useState([]);

  useRequestManager({ error: dtAccError });
  const allLoading = useAllLoading([accountGroupLoading, dtAccLoading]);
  const commonOptions = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) =>
      option.label.toLowerCase().includes(input.toLowerCase()),
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
    form.resetFields();
    form.setFieldsValue({
      ...obj,
      accountId: obj.accountName,
    });
    if (obj?.creditor > 0) {
      setValueType("1");
    } else {
      setValueType("0");
    }
  }, [obj]);

  useEffect(() => {
    accoupGroupApicall(url.ACCOUNT_TREE);
  }, []);

  useEffect(() => {
    accounGrouptData?.isSuccess && setOptions(accounGrouptData?.data);
  }, [accounGrouptData]);
  //====================================================================
  //                        Functions
  //====================================================================
  const validateDetailedAccounts = () => {
    const detailedAccountId4 = form.getFieldValue('detailedAccountId4');
    const detailedAccountId5 = form.getFieldValue('detailedAccountId5');
    const detailedAccountId6 = form.getFieldValue('detailedAccountId6');
    if ( detailedAccountId4 && detailedAccountId4 !== undefined && (detailedAccountId4 === detailedAccountId5 )) {
      setDetailedError('حساب تفصیلی سطح چهار نمی‌تواند با حساب تفصیلی سطح پنج  یکسان باشد');
      return false;
    } else if (detailedAccountId5 && detailedAccountId5 !== undefined && (detailedAccountId5 === detailedAccountId6)) {
      setDetailedError('حساب تفصیلی سطح پنج نمی‌تواند با حساب تفصیلی سطح شش یکسان باشد');
      return false;
    }

    else if (detailedAccountId6 && detailedAccountId6 !== undefined && (detailedAccountId4 === detailedAccountId6))  {
      setDetailedError('حساب تفصیلی سطح چهار نمی‌تواند با حساب تفصیلی سطح شش یکسان باشد');
      return false;
    }
    setDetailedError('');
    return true;
  };
  const handleChangeAccount = (value, selectedOptions) => {
    const lastSelectedOption = selectedOptions[selectedOptions?.length - 1];
    setSelectedAccount({
      id: lastSelectedOption.id,
      name: lastSelectedOption.name,
    });
  };
  const handleChangeDetailedAccountFour = (value, selectedOption) => {
    setDetailedAccountFour({
      id: selectedOption?.value,
      name: selectedOption?.label,
    });
    validateDetailedAccounts()
  };

  const handleChangeDetailedAccountFive = (value, selectedOption) => {
    setDetailedAccountFive({
      id: selectedOption?.value,
      name: selectedOption?.label,
    });
    validateDetailedAccounts()
  };
  const handleChangeDetailedAccountSix = (value, selectedOption) => {
    setDetailedAccountSix({
      id: selectedOption?.value,
      name: selectedOption?.label,
    });
    validateDetailedAccounts()
  };
  const handleTypeChange = (value) => {
    setValueType(value);
    const formFields = form.getFieldsValue();

    if (formFields.creditor > 0) {
      form.setFieldsValue({
        debtor: 0,
      });
    }
    if (formFields.debtor > 0) {
      setValueType(value);
      form.setFieldsValue({
        creditor: 0,
      });
    }

  };


  const onFinish = async (values) => {
    const isValid = validateDetailedAccounts();
    if (isValid) {
    const { creditor, debtor, ...otherValues } = values;
    const adjustedCreditor = values.creditor ?? 0;
    const adjustedDebtor = values.debtor ?? 0;
    const updatedValues = {
      id: id,
      key: uuid.v1(),
      creditor: adjustedCreditor ?? obj?.creditor,
      debtor: adjustedDebtor ?? obj?.debtor,
      accountingDocumentID: 0,
      ...otherValues,
    };

    const accountId = selectedAccount.id;
    const accountName = selectedAccount.name;

    const req = {
      ...updatedValues,
      accountId: accountId ?? obj?.accountId,
      accountName: accountName !== "" ? accountName : obj?.accountName,
      detailedAccountId4:
        selectedDetailedAccountFour?.id ?? obj?.detailedAccountId4,
      detailedAccountId5:
        selectedDetailedAccountFive?.id ?? obj?.detailedAccountId5,
      detailedAccountId6:
        selectedDetailedAccountSix?.id ?? obj?.detailedAccountId6,
      detailedAccountName4:
        selectedDetailedAccountFour?.name ?? obj?.detailedAccountName4,
      detailedAccountName5:
        selectedDetailedAccountFive?.name ?? obj?.detailedAccountName5,
      detailedAccountName6:
        selectedDetailedAccountSix?.name ?? obj?.detailedAccountName6,
      id: id ?? obj.id,
    };

    if (values.detailedAccountId4 == undefined) {
      req.detailedAccountName4 = null;
      delete req.detailedAccountId4;
    }
    if (values.detailedAccountId5 == undefined) {
      req.detailedAccountName5 = null;
      delete req.detailedAccountId5;
    }
    if (values.detailedAccountId6 == undefined) {
      req.detailedAccountName6 = null;
      delete req.detailedAccountId6;
    }

    props.onDataSubmitEdit(req);
    props.closeModal();
  }
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Form form={form} layout="vertical" onFinish={onFinish} Failed={null}>
        <ModalHeader title={"ویرایش آرتیکل سند"} icon={<FaFileMedical />} />
        <Ant.Row gutter={[16, 8]}>
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
                loading={accountGroupLoading}
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
                displayRender={(labels, selectedOptions) => (
                  <>
                    {labels.map((label, index) => {
                      const accountCode = selectedOptions[index]?.code;
                      return (
                        <span key={index}>
                          {label}
                          {accountCode && <span> (کد: {accountCode})</span>}
                        </span>
                      );
                    })}
                  </>
                )}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24} md={24} lg={8}>
            <Ant.Form.Item
              name={"detailedAccountId4"}
              label="حساب تفصیلی سطح چهار"


              help={detailedError && <small className="text-red-600">{detailedError}</small>}
            >
              <Ant.Select
                {...commonOptions}
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                onChange={handleChangeDetailedAccountFour}
                options={dtAccData?.data.map((option) => ({
                  label: `${option.name} ,(${option.code}) `,
                  value: option.id,
                }))}
                loading={dtAccLoading}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24} md={24} lg={8}>
            <Ant.Form.Item
              name={"detailedAccountId5"}
              label="حساب تفصیلی سطح پنج"

              help={detailedError && <small className="text-red-600">{detailedError}</small>}
            >
              <Ant.Select
                {...commonOptions}
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                onChange={handleChangeDetailedAccountFive}
                options={dtAccData?.data.map((option) => ({
                  label: `${option.name} ,(${option.code}) `,
                  value: option.id,
                }))}
                loading={dtAccLoading}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24} md={24} lg={8}>
            <Ant.Form.Item
              name={"detailedAccountId6"}
              label="حساب تفصیلی سطح شش"

              help={detailedError && <small className="text-red-600">{detailedError}</small>}
            >
              <Ant.Select
                {...commonOptions}
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                onChange={handleChangeDetailedAccountSix}
                options={dtAccData?.data.map((option) => ({
                  label: `${option.name} ,(${option.code}) `,
                  value: option.id,
                }))}
                loading={dtAccLoading}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={24} lg={8}>
            <Ant.Form.Item
              label="ماهیت حساب"
              rules={[
                {
                  required: true,
                  message: "فیلد بدهکار و بستانکار اجباری است",
                },
              ]}
            >
              <Ant.Segmented
                block
                options={[
                  {
                    label: "بدهکار",
                    value: "0",
                    defaultValue: "1",
                  },
                  {
                    label: "بستانکار",
                    value: "1",
                  },
                ]}
                defaultValue={obj?.creditor > 0 ? "1" : "0"}
                onChange={handleTypeChange}
              />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col md={24} lg={8}>
            {valueType === "0" && (
              <Ant.Form.Item
                name={"debtor"}
                label="مبلغ"
                rules={[
                  {
                    required: true,
                    message: "مبلغ بدهکار اجباری است",
                    min: 0,

                    validator: (_, value) =>
                      new Promise((resolve, reject) => {
                        if (value === 0) {
                          reject(new Error("مبلغ بدهکار نمی‌تواند صفر  یا منفی باشد"));
                        } else {
                          resolve();
                        }
                      }),
                  },
                ]}
              >
                <Ant.InputNumber
                  min={0}
                  formatter={(value) =>
                    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  style={{ width: "100%" }}
                />
              </Ant.Form.Item>
            )}
            {valueType === "1" && (
              <Ant.Form.Item
                name={"creditor"}
                label="مبلغ"
                rules={[
                  {
                    min: 0,
                    required: true,
                    message: "مبلغ بستانکار اجباری است",
                    validator: (_, value) =>
                      new Promise((resolve, reject) => {
                        if (value === 0) {
                          reject(new Error("مبلغ بستانکار نمی‌تواند صفر یا منفی باشد"));
                        } else {
                          resolve();
                        }
                      }),
                  },
                ]}
              >
                <Ant.InputNumber
                  min={0}
                  formatter={(value) =>
                    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  style={{ width: "100%" }}
                />
              </Ant.Form.Item>
            )}
          </Ant.Col>

          <Ant.Col span={24} md={24} lg={8}>
            <Ant.Form.Item name={"referenceNo"} label="شماره مرجع">
              <Ant.Input style={{ width: "100%" }} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24} md={24} lg={24}>
            <Ant.Form.Item
              name={"article"}
              label="شرح"
              rules={[{ required: true }]}
            >
              <Ant.Input.TextArea allowClear showCount maxLength={300} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24} md={24} lg={24}>
            <Ant.Form.Item
              name={"description"}
              label="توضیحات"
              rules={[{ required: false }]}
            >
              <Ant.Input.TextArea allowClear showCount maxLength={400} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24} md={24} lg={24}>
            <Ant.Form.Item className="text-end">
              <Ant.Button

                disabled={allLoading || false}
                type="primary"
                htmlType="submit"
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

export default FrmEditItemDetail;
FrmEditItemDetail.propTypes = {
  id: PropTypes.number,
  form: PropTypes.any,
  obj: PropTypes.any,
};

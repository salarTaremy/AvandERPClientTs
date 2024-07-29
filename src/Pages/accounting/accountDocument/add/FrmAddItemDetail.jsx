import React from "react";
import * as Ant from "antd";
import { useEffect, useState } from "react";
import * as url from "@/api/url";
import { useFetch } from "@/api";
import PropTypes from "prop-types";
import * as api from "@/api";
import * as uuid from "uuid";
import ModalHeader from "@/components/common/ModalHeader";
import useRequestManager from "@/hooks/useRequestManager";
import { LuDollarSign } from "react-icons/lu";

import { FaFileMedical } from "react-icons/fa";
import { keys } from "highcharts";
const FrmAddItemDetail = (props) => {
  const { form,id } = props;
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [valueType, setValueType] = useState("0");
  const [creditor, setCreditor] = useState(0);
  const [debtor, setDebtor] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState({
    id: null,
    name: "",
  });
  const [selectedDetailedAccountFour, setDetailedAccountFour] = useState();
  const [selectedDetailedAccountFive, setDetailedAccountFive] = useState();
  const [selectedDetailedAccountSix, setDetailedAccountSix] = useState();

  const [
    accounGrouptData,
    accountGroupLoading,
    accountGroupError,
    accoupGroupApicall,
  ] = api.useFetchWithHandler();
  const DisplayCascader = () => {
    const displayRender = (labels, selectedOptions) => (
      <span>
        {labels.map((label, index) => {
          const option = selectedOptions[index];
          const code = option ? `(کد: ${option.code})` : '';
          return (
            <span key={index}>
              {label} {code}
              {index !== labels.length - 1 && ' / '}
            </span>
          );
        })}
      </span>
    );
     }
  const [options, setOptions] = useState([]);
  useRequestManager({ error: dtAccError });
  useRequestManager({ error: accountGroupError });

  const commonOptions = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) => option.name.indexOf(input) >= 0,
  };
  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||   String(option.id).indexOf(inputValue) > -1,
    );

  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {
    accoupGroupApicall(url.ACCOUNT_TREE);
  }, []);

  useEffect(() => {
    accounGrouptData?.isSuccess && setOptions(accounGrouptData?.data);
  }, [accounGrouptData]);
  //====================================================================
  //                        Functions
  //====================================================================
  const getValue = (e) => {
    if (valueType === "0") {
      setCreditor(e);
    }
    if (valueType === "1") {
      setDebtor(e);
    }
  };

  const handleChangeAccount = (value, selectedOptions) => {
    console.log(selectedOptions,"selectedOptions")
    const lastSelectedOption = selectedOptions[selectedOptions.length - 1];
    console.log(lastSelectedOption,"lastSelectedOption")
    setSelectedAccount({
      id: lastSelectedOption.id,
      name: lastSelectedOption.name,
    });
  };
  const handleChangeDetailedAccountFour = (value, selectedOption) => {
    setDetailedAccountFour({
      id: selectedOption?.id,
      name: selectedOption?.name,
    });
  };
  const handleChangeDetailedAccountFive = (value, selectedOption) => {
    setDetailedAccountFive({
      id: selectedOption?.id,
      name: selectedOption?.name,
    });
  };
  const handleChangeDetailedAccountSix = (value, selectedOption) => {
    setDetailedAccountSix({
      id: selectedOption?.id,
      name: selectedOption?.name,
    });
  };
  const onFinish = async (values) => {
    const { creditor, debtor, ...otherValues } = values;
    const adjustedCreditor = creditor ?? 0;
    const adjustedDebtor = debtor ?? 0;

    const updatedValues = {
      creditor: adjustedCreditor,
      debtor: adjustedDebtor,
      ...otherValues,
    };
    const accountId = selectedAccount.id;
    const accountName = selectedAccount.name;
    const req = {
      ...updatedValues,
      accountId: accountId,
      accountName: accountName,
      detailedAccountId4: selectedDetailedAccountFour?.id,
      detailedAccountName4: selectedDetailedAccountFour?.name,
      detailedAccountId5: selectedDetailedAccountFive?.id,
      detailedAccountName5: selectedDetailedAccountFive?.name,
      detailedAccountId6: selectedDetailedAccountSix?.id,
      detailedAccountName6: selectedDetailedAccountSix?.name,
      key: uuid.v1(),
      id:uuid.v1(),
    };
    console.log(req,"reqadd")
    props.onDataSubmit(req);
    props.closeModal();
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (

    <>
      <Ant.Form form={form} layout="vertical" onFinish={onFinish} Failed={null}>
        <ModalHeader title={"افزودن آرتیکل سند"} icon={<FaFileMedical />} />
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
                      const accountCode = selectedOptions[index]?.id;
                      return (
                        <span key={index}>
                          {label}
                          {accountCode && <span > (کد: {accountCode})</span>}

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
              rules={[
                {
                  required: false,
                  message: "فیلد حساب تفصیلی اجباری است",
                },
              ]}
            >
              <Ant.Select
                {...commonOptions}
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                onChange={handleChangeDetailedAccountFour}
                options={dtAccData?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24} md={24} lg={8}>
            <Ant.Form.Item
              name={"detailedAccountId5"}
              label="حساب تفصیلی سطح پنج"
              rules={[
                {
                  required: false,
                  message: "فیلد حساب تفصیلی اجباری است",
                },
              ]}
            >
              <Ant.Select
                {...commonOptions}
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                onChange={handleChangeDetailedAccountFive}
                options={dtAccData?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24} md={24} lg={8}>
            <Ant.Form.Item
              name={"detailedAccountId6"}
              label="حساب تفصیلی سطح شش"
              rules={[
                {
                  required: false,
                  message: "فیلد حساب تفصیلی اجباری است",
                },
              ]}
            >
              <Ant.Select
                {...commonOptions}
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                onChange={handleChangeDetailedAccountSix}
                options={dtAccData?.data}
                fieldNames={{ label: "name", value: "id" }}
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
                  },
                  {
                    label: "بستانکار",
                    value: "1",
                  },
                ]}
                onChange={(e) => {
                  setValueType(e);
                }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={24} lg={8}>
            <Ant.Form.Item
              name={valueType == "0" ? "debtor" : "creditor"}
              label="مبلغ"
              // rules={[
              //   {
              //     required: true,
              //     message: "مبلغ  اجباری است",
              //   },
              // ]}
              rules={[
                {
                  required: true,
                  message: "مبلغ  نمی‌تواند صفر باشد",

                  validator: (_, value) =>
                    new Promise((resolve, reject) => {
                      // alert(value)
                      if (value === 0 || value === undefined) {
                        reject(new Error("مبلغ  نمی‌تواند صفر باشد"));
                      } else {
                        resolve();
                      }
                    }),
                },
              ]}
            >
              <Ant.InputNumber
                onChange={(e) => {
                  getValue(e);
                }}
                formatter={(value) =>
                  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                style={{ width: "100%" }}
              />
            </Ant.Form.Item>
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
              <Ant.Button type="primary" htmlType="submit">
                {"تایید"}
              </Ant.Button>
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>
      </Ant.Form>
    </>
  );
};

export default FrmAddItemDetail;
FrmAddItemDetail.propTypes = {
  id: PropTypes.number,
};

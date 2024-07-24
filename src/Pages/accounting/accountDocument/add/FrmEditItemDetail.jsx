import React from "react";
import * as Ant from "antd";
import { useEffect, useState } from "react";
import * as url from "@/api/url";
import { useFetch } from "@/api";
import PropTypes, { object } from "prop-types";
import * as api from "@/api";
import { useFetchWithHandler } from "@/api";
import * as uuid from "uuid";
import ModalHeader from "@/components/common/ModalHeader";
import useRequestManager from "@/hooks/useRequestManager";
import { LuDollarSign } from "react-icons/lu";
import { FaFileMedical } from "react-icons/fa";
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

  const [
    accounGrouptData,
    accountGroupLoading,
    accountGroupError,
    accoupGroupApicall,
  ] = api.useFetchWithHandler();
  const [form] = Ant.Form.useForm();
  const [options, setOptions] = useState([]);
  useRequestManager({ error: dtAccError });

  const commonOptions = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) => option.name.indexOf(input) >= 0,
  };
  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
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

  const handleChangeAccount = (value, selectedOptions) => {
    const lastSelectedOption = selectedOptions[selectedOptions?.length - 1];
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
    debugger;
    console.log(values, "values");
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
      detailedAccountName4: selectedDetailedAccountFour?.name,
      detailedAccountId5:
        selectedDetailedAccountFive?.id ?? obj?.detailedAccountId5,
      detailedAccountName5:
        selectedDetailedAccountFive?.name ?? obj?.detailedAccountName5,
      detailedAccountId6:
        selectedDetailedAccountSix?.id ?? obj?.detailedAccountId6,
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
    console.log(req, "reqEdit");
    props.onDataSubmitEdit(req);
    props.closeModal();
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
              label="نوع حساب "
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
                loading={dtAccLoading}
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
                loading={dtAccLoading}
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

                    validator: (_, value) =>
                      new Promise((resolve, reject) => {
                        if (value === 0) {
                          reject(new Error("مبلغ بدهکار نمی‌تواند صفر باشد"));
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
                    required: true,
                    message: "مبلغ بستانکار اجباری است",
                    validator: (_, value) =>
                      new Promise((resolve, reject) => {
                        if (value === 0) {
                          reject(new Error("مبلغ بستانکار نمی‌تواند صفر باشد"));
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

export default FrmEditItemDetail;
FrmEditItemDetail.propTypes = {
  id: PropTypes.number,
  form: PropTypes.any,
  obj: PropTypes.any,
};

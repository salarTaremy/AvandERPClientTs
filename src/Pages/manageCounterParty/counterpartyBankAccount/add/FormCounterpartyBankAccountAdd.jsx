import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import useRequestManager from "@/hooks/useRequestManager";
import * as url from "@/api/url";
import { useFetch, useFetchWithHandler, usePostWithHandler } from "@/api";
import { Form } from "antd";
import ModalHeader from "@/components/common/ModalHeader";

//====================================================================
//                        Declaration
//====================================================================
const FormCounterpartyBankAccountAdd = (props) => {
  const { onSuccess, counterpartyId, key } = props;
  const [bankList, bankLoading, bankError] = useFetch(url.BANK);
  const [
    bankBranchList,
    bankBranchLoading,
    bankBranchError,
    bankBranchApiCall,
  ] = useFetchWithHandler();

  useRequestManager({ error: bankError });
  useRequestManager({ error: bankBranchError });

  const [loading, setLoading] = useState(false);
  const [
    bankAccountSavedData,
    bankAccountSaveLoading,
    bankAccountSaveError,
    bankAccountSaveApiCall,
  ] = usePostWithHandler();
  const [form] = Form.useForm();

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    bankAccountSavedData?.isSuccess && onSuccess();
  }, [bankAccountSavedData]);

  //====================================================================
  //                        Functions
  //====================================================================
  const onBankChange = async (value) => {
    await bankBranchApiCall(
      `${url.BANKBRANCH_GetFORDROPDOWN}/${value}`,
    );
  };

  const onFinish = async (values) => {
    setLoading(true);
    const req = { ...values, counterpartyId: counterpartyId };
    await bankAccountSaveApiCall(url.COUNTERPARTY_BANK_ACCOUNT, req);
    setLoading(false);
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"افزودن حساب بانکی"} />
      <Ant.Form form={form} key={key} onFinish={onFinish} layout="vertical">
        <Ant.Space style={{ display: "unset" }}>
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col lg={12} md={12} sm={12} xs={24}>
              <Ant.Form.Item rules={[{ required: true }]} label="بانک">
                <Ant.Select
                  onChange={onBankChange}
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={bankLoading || false}
                  loading={bankLoading}
                  options={bankList?.data}
                  fieldNames={{ label: "title", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={12} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                name={"bankBranchId"}
                label="شعبه"
              >
                <Ant.Select
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={bankBranchLoading || false}
                  loading={bankBranchLoading}
                  options={bankBranchList?.data}
                  fieldNames={{ label: "title", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={24} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                name={"accountHolder"}
                label="نام صاحب حساب"
              >
                <Ant.Input allowClear showCount maxLength={200} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={12} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[
                  {
                    min: 12,
                    max: 16,
                  },

                  {
                    required: false,
                    pattern: new RegExp("^[0-9]*$"),
                    message: "شماره حساب نمی تواند شامل کاراکترهای غیرعددی باشد",
                  },
                ]}
                name={"accountNumber"}
                label="شماره حساب"
                maxLength={10}
              >
                <Ant.Input allowClear showCount maxLength={16} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={12} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[
                  {
                    len: 16,
                  },

                  {
                    required: false,
                    pattern: new RegExp("^[0-9]*$"),
                    message: "شماره کارت نمی تواند شامل کاراکترهای غیرعددی باشد",
                  },
                ]}
                name={"cardNumber"}
                label="شماره کارت"
              >
                <Ant.Input
                  allowClear
                  showCount
                  maxLength={16}
                  className="w-full"
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={24} md={24} sm={24} xs={24}>
              <Ant.Form.Item
                name={"shebaNumber"}
                rules={[
                  {
                    len: 24,
                  },

                  {
                    required: false,
                    pattern: new RegExp("^[0-9]*$"),
                    message: "شماره شبا نمی تواند شامل کاراکترهای غیرعددی باشد",
                  },
                ]}
                label="شماره شبا"
              >
                <Ant.Input
                  allowClear
                  showCount
                  maxLength={24}
                  addonAfter={"IR"}
                  className="w-full"
                />
              </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>
          <Ant.Button
            loading={bankAccountSaveLoading}
            type="primary"
            onClick={() => {
              form.submit();
            }}
            block
          >
            {"ذخیره"}
          </Ant.Button>
        </Ant.Space>
      </Ant.Form>
    </>
  );
};

export default FormCounterpartyBankAccountAdd;

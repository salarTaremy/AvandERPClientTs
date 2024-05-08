import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import { DeleteOutlined } from "@ant-design/icons";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetch, useFetchWithHandler } from "@/api";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
const BankBranchInfo = (prop) => {
  const { form } = prop;
  const [bankList, bankLoading, bankError] = useFetch(url.BANK);
  const [idBranchBank, setBranchBank] = useState(null);
  const [bankBranchList, bankBranchLoading, bankBranchError, bankBranchApi] =
    useFetchWithHandler();

  useRequestManager({ error: bankError });
  useRequestManager({ error: bankBranchError });

  const handleChangeBank = async (value) => {
    await bankBranchApi(`${url.BANKBRANCH_GetFORDROPDOWN}/${value}`);

  };

  return (
    <>
      <Ant.Form.List name="bankAccountList">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Ant.Space {...restField} key={key} style={{ display: "unset" }}>
                <Ant.Row gutter={[16, 8]}>
                  <Ant.Col lg={8} md={12} sm={12} xs={24}>
                    <Ant.Form.Item
                      rules={[{ required: true }]}
                      name={[name, "bankName"]}
                      label="بانک"
                    >
                      <Ant.Select
                        onChange={(e) => handleChangeBank(e)}
                        allowClear={true}
                        placeholder={"انتخاب کنید..."}
                        disabled={bankLoading || false}
                        loading={bankLoading}
                        options={bankList?.data}
                        fieldNames={{ label: "title", value: "id" }}
                      />
                    </Ant.Form.Item>
                  </Ant.Col>
                  <Ant.Col lg={8} md={12} sm={12} xs={24}>
                    <Ant.Form.Item
                      rules={[{ required: true }]}
                      {...restField}
                      name={[name, "bankBranchId"]}

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

                  <Ant.Col lg={6} md={12} sm={12} xs={24}>
                    <Ant.Form.Item
                      rules={[
                        {
                          min: 12,
                          max: 16,
                        },

                        {
                          required: false,
                          pattern: new RegExp("^[0-9]"),
                          message: "شماره حساب شامل عدد میباشد",
                        },
                      ]}
                      {...restField}
                      name={[name, "accountNumber"]}
                      label="شماره حساب"
                      maxLength={10}
                    >
                      <Ant.Input allowClear showCount maxLength={16} />
                    </Ant.Form.Item>
                  </Ant.Col>

                  <Ant.Col lg={2} md={12} sm={12} xs={24}></Ant.Col>
                  <Ant.Col lg={8} md={12} sm={12} xs={24}>
                    <Ant.Form.Item
                      rules={[{ required: true }]}
                      {...restField}
                      name={[name, "accountHolder"]}
                      label="نام صاحب حساب"
                    >
                      <Ant.Input allowClear showCount maxLength={200} />
                    </Ant.Form.Item>
                  </Ant.Col>
                  <Ant.Col lg={8} md={12} sm={12} xs={24}>
                    <Ant.Form.Item
                      {...restField}
                      rules={[
                        {
                          len: 16,
                        },

                        {
                          required: false,
                          pattern: new RegExp("^[0-9]"),
                          message: "لطفا شماره کارت را درست وارد کنید!",
                        },
                      ]}
                      name={[name, "cardNumber"]}
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
                  <Ant.Col lg={6} md={12} sm={12} xs={24}>
                    <Ant.Form.Item
                      name={[name, "shebaNumber"]}
                      rules={[
                        {
                          len: 24,
                        },

                        {
                          required: false,
                          pattern: new RegExp("^[0-9]"),
                          message: "لطفا شماره شبا را درست وارد کنید!",
                        },
                      ]}
                      {...restField}
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
                  <Ant.Col lg={2} md={12} sm={12} xs={24}>
                    <Ant.Button
                      className="text-red-600 "
                      type="text"
                      onClick={() => remove(name)}
                      icon={<DeleteOutlined />}
                    />
                  </Ant.Col>
                </Ant.Row>
              </Ant.Space>
            ))}
            <Ant.Form.Item>
              <Ant.Button
                className="text-green-600 border-green-600"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                اضافه کردن
              </Ant.Button>
            </Ant.Form.Item>
          </>
        )}
      </Ant.Form.List>
    </>
  );
};
export default BankBranchInfo;
BankBranchInfo.propTypes = {
  from: PropTypes.any,
};

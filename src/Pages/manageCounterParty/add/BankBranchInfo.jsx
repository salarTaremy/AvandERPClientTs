import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import { DeleteOutlined } from "@ant-design/icons";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetch, useFetchWithHandler, usePostWithHandler } from "@/api";
import PropTypes from "prop-types";
import ButtonList from "@/components/common/ButtonList";
const BankBranchInfo = (props) => {
  const { form, sendDataToParent } = props;
  // const [form] = Ant.Form.useForm();
  const [bankList, bankLoading, bankError] = useFetch(url.BANK);
  const [bankBranchList, bankBranchLoading, bankBranchError, bankBranchApi] =
    useFetchWithHandler();
  useRequestManager({ error: bankError });
  useRequestManager({ error: bankBranchError });
  const [bankBranchInfos, setBankBranchInfos] = useState([
    {
      id: 1,
      bankBranchId: null,
      accountHolder: null,
      accountNumber: null,
      cardNumber: null,
      shebaNumber: null,
    },
  ]);
  const handleAdd = () => {
    const newId = bankBranchInfos.length + 1;
    console.log(newId, "nnnnnn");
    setBankBranchInfos([
      ...bankBranchInfos,
      {
        id: 1,
        bankBranchId: null,
        cityId: null,
        accountHolder: null,
        accountNumber: null,
        cardNumber: null,
        shebaNumber: null,
      },
    ]);
  };
  const handleDelete = (id) => {
    const newBranchInfo = bankBranchInfos.filter(
      (branchInfo) => branchInfo.id !== id,
    );
    setBankBranchInfos(newBranchInfo);
  };

  const handleChangeBank = async (value, index) => {
    console.log(value, "valuevaluebank");
debugger
    await bankBranchApi(`${url.BANKBRANCH_GetFORDROPDOWN}/${value}`);
    // const updatedBank = [...bankBranchInfos];

    // setBankBranchInfos(updatedBank);
  };

  const handleChangeBankBranch = (value, index) => {
    const updatedBranchInfos = [...bankBranchInfos];
    updatedBranchInfos[index].bankBranchId = value;
    setBankBranchInfos(updatedBranchInfos);
  };

  const handleChangeAccountHolder = (value, index) => {
    const updatedBranchInfos = [...bankBranchInfos];
    updatedBranchInfos[index].accountHolder = value;
    setBankBranchInfos(updatedBranchInfos);
  };
  const handleChangeAccountNumber = (value, index) => {
    const updatedAccountNumber = [...bankBranchInfos];
    updatedAccountNumber[index].accountNumber = value;
    setBankBranchInfos(updatedAccountNumber);
  };
  const handleChangeCardNumber = (value, index) => {
    const updatedCardNumber = [...bankBranchInfos];
    updatedCardNumber[index].cardNumber = value;
    setBankBranchInfos(updatedCardNumber);
  };
  const handleChangeShebaNumber = (value, index) => {
    const updatedShebaNumber = [...bankBranchInfos];
    updatedShebaNumber[index].shebaNumber = value;
    setBankBranchInfos(updatedShebaNumber);
  };
  const handleDataList = (event) => {
    console.log(bankBranchInfos, "bankBranchInfos");
    sendDataToParent(bankBranchInfos);
  };
  return (
    <>
      <Ant.Form
        layout="vertical"
        onKeyUp={handleDataList}
        form={form}
        onFinish={null}
      >
        {bankBranchInfos.map((bankBranch, index) => (
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                key={bankBranch.id}
                rules={[{ required: true }]}
                name={`bank-${index}`}
                label="بانک"
              >
                <Ant.Select
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={bankLoading || false}
                  loading={bankLoading}
                  onChange={(e) => handleChangeBank(e, index)}
                  options={bankList?.data}
                  fieldNames={{ label: "title", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                name={`bankBranchId-${index}`}
                label="شعبه"
              >
                <Ant.Select
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={bankBranchLoading || false}
                  onChange={(e) => handleChangeBankBranch(e, index)}
                  loading={bankBranchLoading}
                  options={bankBranchList?.data}
                  fieldNames={{ label: "title", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>

            <Ant.Col lg={7} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: false }]}
                name={`accountNumber-${index}`}
                label="شماره حساب"
                maxLength={10}
              >
                <Ant.InputNumber
                  value={bankBranch.accountNumber}
                  onChange={(e) =>
                    handleChangeAccountNumber(e.target.value, index)
                  }
                  className="w-full"
                  maxLength={200}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={1} md={12} sm={12} xs={24}></Ant.Col>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                name={`accountHolder-${index}`}
                label="نام صاحب حساب"
              >
                <Ant.Input
                  onChange={(e) =>
                    handleChangeAccountHolder(e.target.value, index)
                  }
                  maxLength={200}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: false }]}
                name={`cardNumber-${index}`}
                label="شماره کارت"
                maxLength={10}
              >
                <Ant.InputNumber
                  value={bankBranch.cardNumber}
                  onChange={(e) =>
                    handleChangeCardNumber(e.target.value, index)
                  }
                  className="w-full"
                  maxLength={12}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={7} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: false }]}
                name={"shebaNumber"}
                value={bankBranch.shebaNumber}
                onChange={(e) => handleChangeShebaNumber(e.target.value, index)}
                label="شماره شبا"
                maxLength={10}
              >
                <Ant.InputNumber className="w-full" maxLength={26} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={1} md={12} sm={12} xs={24}>
              <Ant.Button
                className="text-red-600"
                type="text"
                onClick={() => handleDelete(index)}
                icon={<DeleteOutlined />}
              />
            </Ant.Col>
          </Ant.Row>
        ))}
        <ButtonList onAdd={handleAdd} />
      </Ant.Form>
    </>
  );
};
export default BankBranchInfo;
BankBranchInfo.propTypes = {
  form: PropTypes.any,
  sendDataToParent: PropTypes.any,
};

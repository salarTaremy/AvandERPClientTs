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
  const [bankBranchList, bankBranchLoading, bankBranchError] = useFetch(
    url.BANKBRANCH,
  );
  useRequestManager({ error: bankError });
  useRequestManager({ error: bankBranchError });
  const [bankBranchInfos, setBankBranchInfos] = useState([
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

  const handleChangeBank = (value, index) => {
    const updatedBank = [...bankBranchInfos];
    updatedBank[index].bankBranchId = value;
    setBankBranchInfos(updatedBank);
  };
  const handleChangeCity = (value, index) => {
    const updatedBranchInfos = [...bankBranchInfos];
    updatedBranchInfos[index].cityId = value;
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
      {bankBranchInfos.map((bankBranch, index) => (
        <Ant.Form
        layout="vertical"
          key={index}
          onBlur={handleDataList}
          form={form}
          onFinish={null}
        >
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                key={bankBranch.id}
                rules={[{ required: true }]}
                name={`bankBranchId-${index}`}
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
                name={`cityId-${index}`}
                label="شعبه"
              >
                <Ant.Select
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={bankBranchLoading || false}
                  onChange={(e) => handleChangeCity(e, index)}
                  loading={bankBranchLoading}
                  options={bankBranchList?.data}
                  fieldNames={{ label: "bankTitle", value: "id" }}
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
        </Ant.Form>
      ))}
      <ButtonList onAdd={handleAdd} />
    </>
  );
};
export default BankBranchInfo;
BankBranchInfo.propTypes = {
  form: PropTypes.any,
  sendDataToParent: PropTypes.any,
};

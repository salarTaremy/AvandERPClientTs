import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import { DeleteOutlined } from "@ant-design/icons";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetch, useFetchWithHandler, usePostWithHandler } from "@/api";
import PropTypes from 'prop-types'
import ButtonList from "@/components/common/ButtonList";
const BankBranchInfo = (props) => {
  const { form  } = props
  // const [form] = Ant.Form.useForm();
  const [bankList, bankLoading, bankError] = useFetch(url.BANK);
  const [bankBranchList, bankBranchLoading, bankBranchError] = useFetch(
    url.BANKBRANCH,
  );
  useRequestManager({ error: bankError });
  useRequestManager({ error: bankBranchError });
  const [bankBranchInfos, setBankBranchInfos] = useState([{ id: 1 }]);
  const handleAdd = () => {
    const newId = bankBranchInfos.length + 1;
    console.log(newId, "nnnnnn");
    setBankBranchInfos([...bankBranchInfos, { id: newId }]);
  };
  const handleDelete = (id) => {
    const newAddresses = bankBranchInfos.filter((address) => address.id !== id);
    setBankBranchInfos(newAddresses);
  };
  const onFinish = async (values) => {

    form.setFieldValue({...values})

}
  return (
    <>
      <ButtonList onAdd={handleAdd} />
      {bankBranchInfos.map((bankBranch, index) => (
        <Ant.Form form={form} onFinish={onFinish}>
          <Ant.Row gutter={[16, 16]}>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                key={bankBranch.id}
                rules={[{ required: true }]}
                name={"bankBranchId"}
                label="بانک"
              >
                <Ant.Select
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
                name={"cityId"}
                label="شعبه"
              >
                <Ant.Select
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={bankBranchLoading || false}
                  loading={bankBranchLoading}
                  options={bankBranchList?.data}
                  fieldNames={{ label: "bankTitle", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>

            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                name={"accountHolder"}
                label="نام صاحب حساب"
              >
                <Ant.Input maxLength={200} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: false }]}
                name={"accountNumber"}
                label="شماره حساب"
                maxLength={10}
              >
                <Ant.InputNumber style={{ width: 200 }} maxLength={200} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: false }]}
                name={"cardNumber"}
                label="شماره کارت"
                maxLength={10}
              >
                <Ant.InputNumber style={{ width: 200 }} maxLength={12} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={6} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: false }]}
                name={"shebaNumber"}
                label="شماره شبا"
                maxLength={10}
              >
                <Ant.InputNumber style={{ width: 200 }} maxLength={26} />
                <Ant.Button
                  className="text-red-600"
                  type="text"
                  onClick={() => handleDelete(bankBranch.id)}
                  icon={<DeleteOutlined />}
                />
              </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>
        </Ant.Form>
      ))}
    </>
  );
};
export default BankBranchInfo;
BankBranchInfo.propTypes = {
  form: PropTypes.any,

}

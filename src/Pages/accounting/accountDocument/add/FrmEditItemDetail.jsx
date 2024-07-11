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
const FrmEditItemDetail = (props) => {
  const { form } = props;
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [debtorType, setDebtorType] = useState("0");
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
    accoupGroupApicall(url.ACCOUNT_TREE);
  }, []);

  useEffect(() => {
    accounGrouptData?.isSuccess && setOptions(accounGrouptData?.data);
  }, [accounGrouptData]);
  //====================================================================
  //                        Functions
  //====================================================================
  const handleChangeAccount = (value, selectedOptions) => {
    const lastSelectedOption = selectedOptions[selectedOptions.length - 1];
    setSelectedAccount({
      id: lastSelectedOption.id,
      name: lastSelectedOption.name,
    });
  };
  const handleChangeDetailedAccountFour = (value, selectedOption) => {
    setDetailedAccountFour({
      id: selectedOption.id,
      name: selectedOption.name,
    });
  };
  const handleChangeDetailedAccountFive = (value, selectedOption) => {
    setDetailedAccountFive({
      id: selectedOption.id,
      name: selectedOption.name,
    });
  };
  const handleChangeDetailedAccountSix = (value, selectedOption) => {
    setDetailedAccountSix({
      id: selectedOption.id,
      name: selectedOption.name,
    });
  };
  const onFinish = async (values) => {
    const { creditor, debtor, ...otherValues } = values;
    const adjustedCreditor = creditor ?? 0;
    const adjustedDebtor = debtor ?? 0;
    const updatedValues = {
      // key: uuid.v4(),
      // id:id,
      creditor: adjustedCreditor,
      debtor: adjustedDebtor,
      accountingDocumentID: 0,
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
    };
    props.onDataSubmit(req);
    props.closeModal();
  };
  const handleDebtorTypeChange = (value) => {
    setDebtorType(value);
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
              label="نوع حساب "
              rules={[
                {
                  required: false,
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
              // name={"amount"}
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
                    icon: <LuDollarSign />,
                  },
                  {
                    label: "بستانکار",
                    value: "1",
                    icon: <LuDollarSign />,
                  },
                ]}
                onChange={handleDebtorTypeChange}
              />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col md={24} lg={8}>
            {debtorType === "0" && (
              <Ant.Form.Item
                name={"creditor"}
                label="مبلغ"
                initialValue={"0"}
                rules={[
                  {
                    required: true,
                    message: "مبلغ  بدهکار اجباری است",
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
            {debtorType === "1" && (
              <Ant.Form.Item
                name={"debtor"}
                label="مبلغ"
                rules={[
                  {
                    required: true,
                    message: "مبلغ بستانکار اجباری است",
                  },
                ]}
                initialValue={"0"}
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
            <Ant.Form.Item
              name={"referenceNo"}
              label="شماره مرجع"
            >
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
};

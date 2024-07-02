import React from "react";
import * as Ant from "antd";
import { useEffect, useState } from "react";
import * as url from "@/api/url";
import { useFetch } from "@/api";
import * as api from "@/api";
import ModalHeader from "@/components/common/ModalHeader";
import useRequestManager from "@/hooks/useRequestManager";
const FrmAddItemDetail = () => {
  const [form] = Ant.Form.useForm();
//   const [accounGrouptData, accountGroupLoading, accountGroupError,accoupGroupApicall] = useFetch(url.ACCOUNT);
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [accounGrouptData, accountGroupLoading, accountGroupError,accoupGroupApicall] =
  api.useFetchWithHandler();
  const [options, setOptions] = useState([]);
  useRequestManager({ error: dtAccError });
  const commonOptions = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) => option.name.indexOf(input) >= 0,
  };
  //====================================================================
  //                        useEffects
  //====================================================================


  useEffect(() => {
    accoupGroupApicall(url.ACCOUNT_GROUP);
  }, []);

  useEffect(() => {
    accounGrouptData?.isSuccess && setOptions(accounGrouptData?.data);
  }, [accounGrouptData]);

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Form form={form} layout="vertical" onFinishFailed={null}>
        <ModalHeader title={"حساب"} />
        <Ant.Row gutter={[16, 8]}>
          <Ant.Col span={24} md={24} lg={24}>
            <Ant.Form.Item
              name={"accountId"}
              label="حساب "
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
                placeholder="لطفا انتخاب کنید ..."
                fieldNames={{
                  label: "name",
                  value: "id",
                  children: "children",
                }}
              />
              {/* <Ant.Select
                {...commonOptions}
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                disabled={accountLoading || false}
                loading={accountLoading}
                options={accountData?.data}
                fieldNames={{ label: "name", value: "id" }}
              /> */}
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24} md={24} lg={24}>
            <Ant.Form.Item
              name={"detailedAccountId4"}
              label="حساب تفصیلی"
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
                options={dtAccData?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24} md={24} lg={24}>
            <Ant.Form.Item
              name={"detailedAccountId5"}
              label="حساب تفصیلی"
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
                options={dtAccData?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24} md={24} lg={24}>
            <Ant.Form.Item
              name={"detailedAccountId6"}
              label="حساب تفصیلی"
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
                options={dtAccData?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>
      </Ant.Form>
    </>
  );
};

export default FrmAddItemDetail;

import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import PropTypes from "prop-types";
import ModalHeader from "@/components/common/ModalHeader";
import { usePostWithHandler, useFetch, GetAsync } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import DebounceSelect from "@/components/common/DebounceSelect";
import qs from "qs";
import { FaWarehouse } from "react-icons/fa6";

const FormAddNewWarehouse = (props) => {
  const { onSuccess } = props;
  const [loading, setLoading] = useState(false);
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
  const [warehouseTypeData, warehouseTypeLoading, warehouseTypeError] =
    useFetch(url.WAREHOUSE_TYPE);
  useRequestManager({ error: warehouseTypeError });
  const [branchData, branchLoading, branchError] = api.useFetch(
    url.BRANCH_GET_WITH_PERMISSION,
  );
  useRequestManager({ error: branchError });
  useRequestManager({ error: addError, loading: addLoading, data: addData });
  const [form] = Ant.Form.useForm();

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    addData?.isSuccess && onSuccess();
  }, [addData]);

  //====================================================================
  //                        Functions
  //======================================================================
  const onFinish = async (values) => {
    console.log(values, "values");
    setLoading(true);
    const req = {
      ...values,
      warehouseKeeperId: values.warehouseKeeperId.value,
    };
    await addApiCall(url.WAREHOUSE, req);
    setLoading(false);
  };

  const getAllCounterPartyForDropDown = async (inputValue) => {
    if (inputValue) {
      const queryString = qs.stringify({
        counterpartyName: inputValue,
      });

      const response = await GetAsync(
        `${url.COUNTER_PARTY_GET_FOR_DROPDOWN}?${queryString}`,
        "",
      );
      if (response?.data) {
        return response?.data.map((item) => ({
          label: `${item.counterpartyName} `,
          value: item.id,
        }));
      }
    }
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"ایجاد انبار "} icon={<FaWarehouse />} />
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Row gutter={[16, 8]}>
          <Ant.Col md={12} lg={12} sm={24} xs={24}>
            <Ant.Form.Item
              name="title"
              label={"نام انبار"}
              rules={[{ required: true }]}
            >
              <Ant.Input allowClear showCount maxLength={100} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={12} lg={12} sm={24} xs={24}>
            <Ant.Form.Item
              name="warehouseKeeperId"
              label={"نام انباردار"}
              rules={[{ required: true }]}
            >
              <DebounceSelect
                // mode="multiple"
                // maxCount={2}
                placeholder="بخشی از نام  انباردار را تایپ کنید..."
                fetchOptions={getAllCounterPartyForDropDown}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={12} lg={12} sm={24} xs={24}>
            <Ant.Form.Item
              name="warehouseTypeId"
              label={" نوع انبار"}
              rules={[{ required: true }]}
            >
              <Ant.Select
                placeholder={"انتخاب کنید..."}
                disabled={warehouseTypeLoading}
                loading={warehouseTypeLoading}
                options={warehouseTypeData?.data}
                fieldNames={{ label: "title", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={12} lg={12} sm={24} xs={24}>
            <Ant.Form.Item
              name="branchIds"
              label={"شعب"}
              rules={[{ required: true }]}
            >
              <Ant.Select
                placeholder={"انتخاب کنید..."}
                mode="multiple"
                disabled={branchLoading}
                loading={branchLoading}
                options={branchData?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={12} lg={12} sm={24} xs={24}>
            <Ant.Form.Item
              name="gln"
              label={"GLN "}
              rules={[{ required: true }]}
            >
              <Ant.Input allowClear showCount maxLength={13} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={12} lg={12} sm={24} xs={24}>
            <Ant.Form.Item
              name="postalCode"
              label={"کد پستی"}
              rules={[{ required: true }]}
            >
              <Ant.Input allowClear showCount maxLength={10} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={24} lg={24} sm={24} xs={24}>
            <Ant.Form.Item
              name="address"
              label={"آدرس"}
              rules={[{ required: true }]}
            >
              <Ant.Input.TextArea allowClear showCount maxLength={400} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={24} lg={24} sm={24} xs={24}>
            <Ant.Form.Item
              name="description"
              label={"توضیحات"}
              rules={[{ required: true }]}
            >
              <Ant.Input.TextArea allowClear showCount maxLength={400} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24}>
            <Ant.Flex justify="space-between" align="center">
              <Ant.Form.Item name="isActive" label="فعال">
                <Ant.Switch defaultChecked={false} />
              </Ant.Form.Item>

              <Ant.Form.Item name="isCentral" label="شعبه مرکزی">
                <Ant.Switch defaultChecked={false} />
              </Ant.Form.Item>
            </Ant.Flex>
          </Ant.Col>
        </Ant.Row>
        <Ant.Form.Item>
          <Ant.Button
            loading={loading}
            type="primary"
            onClick={() => {
              form.submit();
            }}
            block
          >
            {"تایید"}
          </Ant.Button>
        </Ant.Form.Item>
      </Ant.Form>
    </>
  );
};

export default FormAddNewWarehouse;
FormAddNewWarehouse.propTypes = {
  onSuccess: PropTypes.func,
};

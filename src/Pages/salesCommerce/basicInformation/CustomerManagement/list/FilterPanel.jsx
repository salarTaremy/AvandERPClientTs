import React, { useEffect } from "react";
import * as Ant from "antd";
import { PropTypes } from "prop-types";
import * as url from "@/api/url";
import { useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";

const FilterPanel = (props) => {
  const { onSubmit, filterObject } = props;
  const [form] = Ant.Form.useForm();
  const [customerGroupList, customerGroupLoading, customerGroupError] =
    useFetch(url.CUSTOMER_GROUP_GET_WITH_PERMISSION);
  const [customerTypeList, customerTypeLoading, customerTypeError] = useFetch(
    url.CUSTOMER_TYPE_GET_WITH_PERMISSION,
  );
  const [customerGradeList, customerGradeLoading, customerGradeError] =
    useFetch(url.CUSTOMER_GRADE);
  const [branchList, branchLoading, branchError] = useFetch(url.BRANCH_GET_WITH_PERMISSION);
  const [saleChannelData, saleChannelLoading, saleChannelError] = useFetch(
    url.SALE_CHANNEL_GET_WITH_PERMISSION,
  );
  useRequestManager({ error: branchError });
  useRequestManager({ error: saleChannelError });
  useRequestManager({ error: customerGradeError });
  useRequestManager({ error: customerTypeError });
  useRequestManager({ error: customerGradeError });
  useRequestManager({ error: customerGroupError });

  const commonOptions = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) => option.title.indexOf(input) >= 0,
  };
  const commonOptionsBranch = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) => option.name.indexOf(input) >= 0,
  };

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    filterObject && form.setFieldsValue({ ...filterObject });
  }, []);

  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = (values) => {
    onSubmit({
      ...values,
    });
  };
  //====================================================================
  //                        Child Components
  //====================================================================
  // Create Locale Components Here...

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        onFinishFailed={null}
      >
        <Ant.Form.Item name={"CounterpartyName"} label="نام طرف حساب">
          <Ant.Input allowClear />
        </Ant.Form.Item>
        <Ant.Form.Item rules={[{ max: 10 }]} name={"code"} label="کد">
          <Ant.Input allowClear maxLength={20} />
        </Ant.Form.Item>
        <Ant.Form.Item rules={[{ max: 20 }]} name={"secondCode"} label="کد دوم">
          <Ant.Input allowClear />
        </Ant.Form.Item>

        <Ant.Form.Item name={"NationalCode"} label="کد ملی">
          <Ant.Input allowClear />
        </Ant.Form.Item>
        <Ant.Form.Item name={"EconomicCode"} label="کد اقتصادی">
          <Ant.Input allowClear />
        </Ant.Form.Item>

        <Ant.Form.Item
          rules={[{ required: false }]}
          name={"groupId"}
          label="گروه"
        >
          <Ant.Select
            {...commonOptions}
            allowClear={true}
            placeholder={"انتخاب کنید..."}
            disabled={customerGroupLoading || false}
            loading={customerGroupLoading}
            options={customerGroupList?.data}
            fieldNames={{ label: "title", value: "id" }}
          />
        </Ant.Form.Item>

        <Ant.Form.Item
          rules={[{ required: false }]}
          name={"typeId"}
          label="نوع"
        >
          <Ant.Select
            {...commonOptions}
            allowClear={true}
            placeholder={"انتخاب کنید..."}
            disabled={customerTypeLoading || false}
            loading={customerTypeLoading}
            options={customerTypeList?.data}
            fieldNames={{ label: "title", value: "id" }}
          />
        </Ant.Form.Item>

        <Ant.Form.Item
          rules={[{ required: false }]}
          name={"branchId"}
          label="شعبه"
        >
          <Ant.Select
            {...commonOptionsBranch}
            allowClear={true}
            placeholder={"انتخاب کنید..."}
            disabled={branchLoading || false}
            loading={branchLoading}
            options={branchList?.data}
            fieldNames={{ label: "name", value: "id" }}
          />
        </Ant.Form.Item>

        <Ant.Form.Item name={"saleChannelIdList"} label="کانال فروش">
          <Ant.Select
            allowClear={true}
            placeholder={"انتخاب کنید..."}
            disable={saleChannelLoading || false}
            loading={saleChannelLoading}
            options={saleChannelData?.data}
            fieldNames={{ label: "title", value: "id" }}
          />
        </Ant.Form.Item>

        <Ant.Form.Item name={"gradeId"} label="رتبه">
          <Ant.Select
            allowClear={true}
            placeholder={"انتخاب کنید..."}
            disable={customerGradeLoading || false}
            loading={customerGradeLoading}
            options={customerGradeList?.data}
            fieldNames={{ label: "title", value: "id" }}
          />
        </Ant.Form.Item>

        <Ant.Button
          block
          type="primary"
          onClick={() => {
            form.submit();
          }}
        >
          {"اعمال"}
        </Ant.Button>
      </Ant.Form>
    </>
  );
};

export default FilterPanel;
FilterPanel.propTypes = {
  onSubmit: PropTypes.func,
  filterObject: PropTypes.any,
};

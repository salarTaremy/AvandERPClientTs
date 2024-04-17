import React, { useEffect } from "react";
import * as Ant from "antd";
import { PropTypes } from "prop-types";
import * as url from "@/api/url";
import { useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";

const FilterPanel = (props) => {
  const { onSubmit, filterObject } = props;
  const [form] = Ant.Form.useForm();
  const [brandData, brandLoading, brandError] = useFetch(url.BRAND);
  useRequestManager({ error: brandError });

  const commonOptions = {
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
        <Ant.Form.Item name={"code"} label="کد">
          <Ant.Input allowClear />
        </Ant.Form.Item>
        <Ant.Form.Item name={"seccondCode"} label="کد دوم">
          <Ant.Input allowClear />
        </Ant.Form.Item>
        <Ant.Form.Item name={"name"} label="نام کالا">
          <Ant.Input allowClear />
        </Ant.Form.Item>
        <Ant.Form.Item name={"seccondName"} label="نام دوم کالا">
          <Ant.Input allowClear />
        </Ant.Form.Item>
        <Ant.Form.Item
          name={"brandId"}
          label="نام برند"
          valuePropName="checked"
        >
          <Ant.Select
            {...commonOptions}
            mode="multiple"
            allowClear={true}
            placeholder={"انتخاب کنید..."}
            disabled={brandLoading || false}
            loading={brandLoading}
            options={brandData?.data}
            fieldNames={{ label: "name", value: "id" }}
          />
        </Ant.Form.Item>
        <Ant.Button
          block
          type="primary"
          onClick={() => {
            form.submit()
          }}
        >
          {'اعمال'}
        </Ant.Button>
      </Ant.Form>
    </>
  )
}

export default FilterPanel;
FilterPanel.propTypes = {
  onSubmit: PropTypes.func,
  filterObject: PropTypes.any,
};

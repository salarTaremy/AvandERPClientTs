import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { PropTypes } from "prop-types";
import * as url from "@/api/url";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";

const FilterPanel = (props) => {
  const { onSubmit, filterObject } = props;
  const [form] = Ant.Form.useForm();
  const [roleData, roleLoading, roleError] = api.useFetch(url.ROLE_SCOPE);
  useRequestManager({ error: roleError });
  const [isDenied, setIsDenied] = useState(1);
  const options = [
    { label: "همه", value: null },
    { label: "عدم دسترسی ", value: true },
    { label: "دسترسی مجاز", value: false },
  ];

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

  useEffect(() => {}, [isDenied]);
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
        <Ant.Form.Item name={"name"} label="نام نقش">
          <Ant.Input allowClear />
        </Ant.Form.Item>
        <Ant.Form.Item name={"persianTitle"} label="عنوان نقش">
          <Ant.Input allowClear />
        </Ant.Form.Item>
        <Ant.Form.Item
          name={"roleScopeId"}
          label="عنوان محدوده نقش"
          valuePropName="checked"
        >
          <Ant.Select
            {...commonOptions}
            allowClear={true}
            placeholder={"انتخاب کنید..."}
            disabled={roleLoading || false}
            loading={roleLoading}
            options={roleData?.data}
            fieldNames={{ label: "persianTitle", value: "id" }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item name={"isDenied"} label="وضعیت دسترسی">
          <Ant.Segmented options={options} block onChange={setIsDenied} />
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

import React from "react";
import { useEffect, useState } from 'react'
import * as Ant from "antd";
import { PropTypes } from "prop-types";
const FilterPanel = (props) => {
  const { onSubmit, filterObject } = props
  const [form] = Ant.Form.useForm()
  //====================================================================
  //                        Functions
  //====================================================================
  useEffect(() => {
    filterObject && form.setFieldsValue({ ...filterObject })
  }, [])

  const onFinish = (values) => {
    onSubmit({
      ...values,
    });
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Form.Item name={"PersianTitle"} label="نام">
          <Ant.Input allowClear showCount maxLength={300} />
        </Ant.Form.Item>
        <Ant.Form.Item name={"Name"} label="عنوان انگلیسی">
          <Ant.Input allowClear showCount maxLength={300} />
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
}

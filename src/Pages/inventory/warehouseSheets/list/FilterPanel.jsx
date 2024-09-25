import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import { PropTypes } from "prop-types";
import useRequestManager from "@/hooks/useRequestManager";
//====================================================================
//                        Declaration
//====================================================================
const FilterPanel = (props) => {

  const { onSubmit, filterObject } = props;
  const [form] = Ant.Form.useForm();


  const natureList = [
    { id: 0, title: "خنثی" },
    { id: 1, title: "رسید" },
    { id: -1, title: "حواله" },
  ];
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
        <Ant.Form.Item
          name="title"
          label={"عنوان"}
          rules={[{ required: false }]}
        >
          <Ant.Input allowClear showCount maxLength={100} />
        </Ant.Form.Item>

        <Ant.Form.Item
          name={"nature"}
          label={"ماهیت"}
          rules={[{ required: false }]}
        >
          <Ant.Select
            allowClear
            placeholder={"انتخاب کنید..."}
            options={natureList}
            fieldNames={{ label: "title", value: "id" }}
          />
        </Ant.Form.Item>

        <Ant.Form.Item>
          <Ant.Button
            block
            type="primary"
            onClick={() => {
              form.submit();
            }}
          >
            {"اعمال"}
          </Ant.Button>
        </Ant.Form.Item>
      </Ant.Form>
    </>
  );
};

export default FilterPanel;
FilterPanel.propTypes = {
  onSubmit: PropTypes.func,
  filterObject : PropTypes.any,
};

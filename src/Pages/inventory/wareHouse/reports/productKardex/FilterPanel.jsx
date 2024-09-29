import React, { useEffect } from "react";
import * as Ant from "antd";
import { PropTypes } from "prop-types";
import * as url from "@/api/url";
import { useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";

const FilterPanel = (props) => {
  const { onSubmit, filterObject } = props;
  const [form] = Ant.Form.useForm();
  const [brandData, brandLoading, brandError] = useFetch(url.BRAND_GET_WITH_PERMISSION);
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

        <Ant.Form.Item name={"ProductId"} label=" نام محصول" rules={[{ required: false }]}>
            <Ant.Cascader
            //   loading={CityLoading}
            //   options={options}
            //   onChange={onChange}
              placeholder="لطفا انتخاب کنید ..."
            //   fieldNames={{ label: "name", value: "id", children: "children" }}
            //   showSearch={{
            //     filter,
            //   }}

            />
          </Ant.Form.Item>

        <Ant.Form.Item name={"WarehouseId"} label="نام انبار">
          <Ant.Input allowClear />
        </Ant.Form.Item>
        <Ant.Form.Item name={"InventoryDocumentTypeId"} label=" نوع برگه انبار">
          <Ant.Input allowClear />
        </Ant.Form.Item>
        <Ant.Form.Item name={"FromIssueDateCalendarId"} label="از تاریخ ">
          <Ant.Input allowClear />
        </Ant.Form.Item>
        <Ant.Form.Item name={"FromIssueDateCalendarId"} label="تا تاریخ ">
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
            disabled={brandLoading}
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

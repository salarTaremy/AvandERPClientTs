import React, { useEffect } from "react";
import * as Ant from "antd";
import { PropTypes } from "prop-types";
import * as url from "@/api/url";
import { useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";

const FilterPanel = (props) => {
  const { onSubmit, filterObject } = props;
  const [form] = Ant.Form.useForm();
  const [brandData, brandLoading, brandError] = useFetch(
    url.BRAND_GET_WITH_PERMISSION,
  );
  const [productTypeData, productTypeLoading, productTypeError] = useFetch(
    url.PRODUCT_TYPE,
  );
  const [
    productNatureDetailData,
    productNatureDetailLoading,
    productNatureDetailError,
  ] = useFetch(url.PRODUCT_NATURE_DETAIL);
  const [warehouseListData, warehouseListLoading, warehouseListError] =
    useFetch(url.WAREHOUSE);
  useRequestManager({ error: brandError });

  const commonOptions = {
    showSearch: true,
    filterOption: (input, option) => option.name.indexOf(input) >= 0,
  };

  const maxLenGTIN = 16;
  const maxLenTaxId = 13;
  const minProductCodeLen = 2;
  const maxProductCodeLen = 10;
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
        <Ant.Form.Item
          rules={[
            {
              required: false,
              max: maxProductCodeLen,
              min: minProductCodeLen,
            },
          ]}
          name={"code"}
          label="کد"
        >
          <Ant.Input allowClear/>
        </Ant.Form.Item>
        <Ant.Form.Item
          rules={[
            {
              required: false,
              max: maxProductCodeLen,
              min: minProductCodeLen,
            },
          ]}
          name={"secondCode"}
          label="کد دوم"
        >
          <Ant.Input allowClear />
        </Ant.Form.Item>

        <Ant.Form.Item
          name={"typeId"}
          label="نوع کالا"
          rules={[{ required: false }]}
        >
          <Ant.Select
            {...commonOptions}
            placeholder="لطفا انتخاب کنید..."
            showSearch
            disabled={productTypeLoading}
            loading={productTypeLoading}
            options={productTypeData?.data}
            fieldNames={{ label: "name", value: "id" }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item
          name={"NatureDetailId"}
          label="ماهیت(فرعی) کالا/خدمت"
          rules={[{ required: false }]}
        >
          <Ant.Select
            {...commonOptions}
            placeholder="لطفا انتخاب کنید..."
            showSearch
            disabled={productNatureDetailLoading}
            loading={productNatureDetailLoading}
            options={productNatureDetailData?.data}
            fieldNames={{ label: "name", value: "id" }}
          />
        </Ant.Form.Item>

        <Ant.Form.Item
          name={"brandId"}
          label="برند"
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
        <Ant.Form.Item
          name={"warehouseId"}
          label="انبار"
          rules={[{ required: false }]}
        >
          <Ant.Select
            placeholder="لطفا انتخاب کنید..."
            disabled={warehouseListLoading}
            loading={warehouseListLoading}
            options={warehouseListData?.data}
            fieldNames={{ label: "title", value: "id" }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item
          name={"gtin"}
          label={"Gtin"}
          rules={[{ len: maxLenGTIN }]}
        >
          <Ant.Input
            placeholder="216012345..."
            maxLength={maxLenGTIN}
            showCount
          />
        </Ant.Form.Item>
        <Ant.Form.Item
          name={"stuffId"}
          label={"شناسه مالیاتی"}
          rules={[{ len: maxLenTaxId }]}
        >
          <Ant.Input
            placeholder="27XXXXXXXXXXXXXX"
            maxLength={maxLenTaxId}
            showCount
          />
        </Ant.Form.Item>
        <Ant.Form.Item name={"name"} label="نام کالا">
          <Ant.Input allowClear />
        </Ant.Form.Item>
        <Ant.Form.Item name={"secondName"} label="نام دوم کالا">
          <Ant.Input allowClear />
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

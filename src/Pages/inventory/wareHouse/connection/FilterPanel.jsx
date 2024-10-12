import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import PropTypes from "prop-types";
import ModalHeader from "@/components/common/ModalHeader";
import { useFetch, Get, useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import qs from "qs";

const FilterPanel = (props) => {
  const { onSubmit, filterObject } = props;
  const [warehouseTypeData, warehouseTypeLoading, warehouseTypeError] =
    useFetch(url.WAREHOUSE_TYPE);
  const [brandData, brandLoading, brandError] = useFetch(url.BRAND);
  const [productNatureData, productNatureLoading, productNatureError] =
    useFetch(url.PRODUCT_NATURE);
  const [
    productNatureDetailData,
    productNatureDetailLoading,
    productNatureDetailError,
    ApiCall,
  ] = useFetchWithHandler();
  const [selectedproductNature, setSelectedProductNature] = useState(null);
  const [form] = Ant.Form.useForm();
  useRequestManager({ error: brandError });
  useRequestManager({ error: warehouseTypeError });

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

  useEffect(() => {
    const ProductNature = form.getFieldValue("ProductNature");
    ProductNature && setSelectedProductNature(ProductNature);
  }, []);
  useEffect(() => {
    ApiCall(url.PRODUCT_NATURE_DETAIL);
  }, [selectedproductNature]);
  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = (values) => {
    onSubmit({
      ...values,
    });
  };


  const handleOnChange = async (val, option) => {
    form.setFieldsValue({ natureDetailId: undefined });
    console.log(option, "optionoption");
    console.log(val, "val");
    setSelectedProductNature(option?.id);
    // const req = {
    //   Id: option.id,
    // };
    // const queryString = qs.stringify(req);
    // await ApiCall(`${url.PRODUCT_NATURE_DETAIL}?${queryString}`);
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Row gutter={[16, 8]}>
          <Ant.Col md={24} lg={24} sm={24} xs={24}>
            <Ant.Form.Item name="ProductName" label={"نام محصول"}>
              <Ant.Input allowClear showCount maxLength={100} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={24} lg={24} sm={24} xs={24}>
            <Ant.Form.Item
              name={"BrandIdList"}
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
          </Ant.Col>

          <Ant.Col md={24} lg={24} sm={24} xs={24}>
            <Ant.Form.Item
              name={"ProductNature"}
              label="ماهیت(اصلی) کالا/خدمت"
              rules={[{ required: false }]}
            >
              <Ant.Select
                       placeholder={"انتخاب کنید..."}
                allowClear={true}
                {...commonOptions}
                onChange={handleOnChange}
                disabled={productNatureLoading}
                loading={productNatureLoading}
                options={productNatureData?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={24} lg={24} sm={24} xs={24}>
            <Ant.Form.Item
              name={"ProductNatureDetail"}
              label="ماهیت(فرعی) کالا/خدمت"
              rules={[{ required: false }]}
            >
              <Ant.Select
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                {...{ ...commonOptions }}
                loading={productNatureDetailLoading}
                // options={productNatureDetailData?.data}
                options={productNatureDetailData?.data?.filter(
                  (c) => c.productNatureTypeId === selectedproductNature,
                )}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>
        <Ant.Form.Item>
          <Ant.Button
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

export default FilterPanel;
FilterPanel.propTypes = {
  onSubmit: PropTypes.func,
  filterObject: PropTypes.any,
};

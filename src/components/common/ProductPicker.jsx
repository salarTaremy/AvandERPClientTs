import React, { useState, useEffect } from "react";
import * as Ant from "antd";
import * as uuid from "uuid";
import PropTypes from "prop-types";
import qs from "qs";
import * as url from "@/api/url";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import { TbBrandAirtable } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { RiBarcodeBoxLine } from "react-icons/ri";

//====================================================================
//                        Declaration
//====================================================================
const ProductPicker = ({
  warehouseId,
  mode,               // Any: 'productDetail'  or 'product'
  onChange,           //(value) => void
  onLoadingChange,    //(value) => void
  disabled,           //boolean
  initialValues,      //[]
  mobileMode = false,
}) => {
  const [
    productListData,
    productListLoading,
    productListError,
    productListApiCall,
  ] = useFetchWithHandler();

  useRequestManager({ error: productListError });

  const [productCascaderOption, setProductCascaderOption] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    let maxLevelToRender = 3;
    if (mode == "product") {
      maxLevelToRender = 2;
    } else if (mode == "productDetail") {
      maxLevelToRender = 3;
    }

    const queryString = qs.stringify({
      warehouseId: warehouseId,
      maxLevel: maxLevelToRender,
    });
    productListApiCall(`${url.PRODUCT_TREE}?${queryString}`);
  }, [warehouseId]);

  useEffect(() => {
    console.log('productListData changed', productListData)
    productListData?.isSuccess &&
      setProductCascaderOption(productListData?.data);
  }, [productListData]);


  useEffect(() => {
    onLoadingChange &&  onLoadingChange(productListLoading)
  }, [productListLoading]);



  //====================================================================
  //                        Functions
  //====================================================================
  const setDefaultValue = () => {
    if (initialValues) {
      if (mode == "product") {
        return [
          `${initialValues.brandId}`,
          `${initialValues.brandId}-${initialValues.productId}`,
        ];
      } else if (mode == "productDetail") {
        return [
          `${initialValues.brandId}`,
          `${initialValues.brandId}-${initialValues.productId}`,
          `${initialValues.brandId}-${initialValues.productId}-${initialValues.batchNumberId}`,
        ];
      }
    }
  };

  const productFilter = (inputValue, path) =>
    path.some(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
        String(option.fullCode).indexOf(inputValue) > -1,
    );

  const onProductChange = async (value, option) => {
    const levelCount = option.length;
    const selectedOptionData = {};
    if (levelCount == 1) {
      const selectedBrand = option[0];
      selectedOptionData.brand = {
        id: selectedBrand.brandId,
        name: selectedBrand.name,
      };
    }

    if (levelCount == 2) {
      const selectedBrand = option[0];
      const selectedProduct = option[1];
      selectedOptionData.brand = {
        id: selectedBrand.brandId,
        name: selectedBrand.name,
      };
      selectedOptionData.product = {
        id: selectedProduct.productId,
        name: selectedProduct.name,
      };
    }

    if (levelCount == 3) {
      const selectedBrand = option[0];
      const selectedProduct = option[1];
      const selectedBatchNumber = option[2];

      selectedOptionData.brand = {
        id: selectedBrand.brandId,
        name: selectedBrand.name,
      };
      selectedOptionData.product = {
        id: selectedProduct.productId,
        name: selectedProduct.name,
      };
      selectedOptionData.productDetail = {
        productDetailId: selectedBatchNumber.productDetailId,
        batchNumberId: selectedBatchNumber.batchNumberId,
        batchNumber: selectedBatchNumber.name,
      };
    }

    onChange && onChange(selectedOptionData);
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
 <>
 {mode}
    <Ant.Cascader
    disabled={disabled || false}
      defaultValue={initialValues && setDefaultValue()}
      loading={productListLoading}
      options={productCascaderOption}
      onChange={onProductChange}
      optionRender={(option) => (
        <>
          <Ant.Flex gap="small" key={uuid.v1()}>
            {option.level === 1 && (
              <TbBrandAirtable className="text-indigo-500" />
            )}
            {option.level === 2 && (
              <AiOutlineProduct className="text-cyan-500" />
            )}
            {option.level === 3 && (
              <RiBarcodeBoxLine className="text-teal-500" />
            )}
            {option.title}
          </Ant.Flex>
        </>
      )}
      placeholder="لطفا انتخاب کنید ..."
      fieldNames={{
        label: "title",
        value: "id",
        children: "children",
      }}
      showSearch={{ productFilter }}
    />
 </>
  );
};
ProductPicker.propTypes = {
  warehouseId: PropTypes.number.isRequired,
  mode: PropTypes.string,
  onChange: PropTypes.func,
  onLoadingChange: PropTypes.func,
  initialValues: PropTypes.object,
  mobileMode: PropTypes.bool,
};

export default ProductPicker;
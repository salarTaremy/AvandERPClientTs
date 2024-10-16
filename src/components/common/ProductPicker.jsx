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
import { DownOutlined } from "@ant-design/icons";
//====================================================================
//                        Declaration
//====================================================================
const ProductPicker = (props) => {
  const {
    warehouseId, // number
    mode, // string: 'productDetail'  or 'product'
    onLoadingChange, // func: (value) => void
    disabled, // boolean
    initialValues, // array
    value, // must not set manually, it will be controlled by form component
    onChange, // must not set manually, it will be set by form component
    ...validDomProps
  } = props;

  const [
    productListData,
    productListLoading,
    productListError,
    productListApiCall,
  ] = useFetchWithHandler();
  useRequestManager({ error: productListError });
  const [productCascaderOption, setProductCascaderOption] = useState([]);
  const [mobileMode, setMobileMode] = useState(window.innerWidth <= 768);
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
  }, [warehouseId, mode]);

  useEffect(() => {
    productListData?.isSuccess &&
      setProductCascaderOption(productListData?.data);
  }, [productListData]);

  useEffect(() => {
    onLoadingChange && onLoadingChange(productListLoading);
  }, [productListLoading]);

  useEffect(() => {
    window.addEventListener("resize", onWindowSizeChanged);
    return () => {
      window.removeEventListener("resize", onWindowSizeChanged);
    };
  }, []);
  //====================================================================
  //                        Functions
  //====================================================================
  const onWindowSizeChanged = () => {
    const windowWidth = window.innerWidth;
    setMobileMode(windowWidth <= 768);
  };

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

  const onProductSelect = (value, selectedNode, extra) => {
    const selectedOptionData = {};
    if (selectedNode) {
      if (!mobileMode) {
        const levelCount = selectedNode.length;
        if (levelCount == 1) {
          const selectedBrand = selectedNode[0];
          selectedOptionData.brand = {
            id: selectedBrand.brandId,
            name: selectedBrand.name,
          };
        }
  
        if (levelCount == 2) {
          const selectedBrand = selectedNode[0];
          const selectedProduct = selectedNode[1];
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
          const selectedBrand = selectedNode[0];
          const selectedProduct = selectedNode[1];
          const selectedBatchNumber = selectedNode[2];
  
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
      } else {
        const selectedItemsName = selectedNode.fullName.split(">");
        if (selectedNode.batchNumberId) {
          selectedOptionData.brand = {
            id: selectedNode.brandId,
            name: selectedItemsName[0].trim(),
          };
          selectedOptionData.product = {
            id: selectedNode.productId,
            name: selectedItemsName[1].trim(),
          };
          selectedOptionData.productDetail = {
            productDetailId: selectedNode.productDetailId,
            batchNumberId: selectedNode.batchNumberId,
            batchNumber: selectedItemsName[2].trim(),
          };
        } else {
          if (selectedNode.productId) {
            selectedOptionData.brand = {
              id: selectedNode.brandId,
              name: selectedItemsName[0].trim(),
            };
            selectedOptionData.product = {
              id: selectedNode.productId,
              name: selectedItemsName[1].trim(),
            };
          } else {
            selectedOptionData.brand = {
              id: selectedNode.brandId,
              name: selectedItemsName[0].trim(),
            };
          }
        }
      }
    }

    const extraInfo = { selectedOptionData: selectedOptionData, ...extra };
    onChange(value, selectedNode, extraInfo);
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      {!mobileMode && (
        <Ant.Cascader
          {...validDomProps}
          value={value}
          onChange={onProductSelect}
          disabled={disabled || productListLoading || false}
          defaultValue={initialValues && setDefaultValue()}
          loading={productListLoading}
          options={productCascaderOption}
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
          placeholder="لطفا انتخاب کنید..."
          fieldNames={{
            label: "title",
            value: "id",
            children: "children",
          }}
          showSearch={{ productFilter }}
        />
      )}
      {mobileMode && (
        <Ant.TreeSelect
          {...validDomProps}
          value={value}
          onSelect={onProductSelect}
          showSearch
          style={{
            width: "100%",
          }}
          labelInValue={false}
          dropdownStyle={{
            maxHeight: 400,
            overflow: "auto",
          }}
          placeholder="لطفا انتخاب کنید..."
          allowClear
          treeDefaultExpandAll={false}
          filterTreeNode={true}
          treeNodeFilterProp={"title"}
          treeNodeLabelProp={"fullName"}
          treeData={productCascaderOption}
          switcherIcon={<DownOutlined />}
        />
      )}
    </>
  );
};
ProductPicker.propTypes = {
  warehouseId: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  onLoadingChange: PropTypes.func,
  initialValues: PropTypes.object,
};

export default ProductPicker;

export const GetSelectedValue = (option) => {
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

  return selectedOptionData;
};

export const FormatValueToDisplay = (value) => {
  const isMobileMode = window.innerWidth <= 768;
  if (value.length == 3) {
    if (!isMobileMode) {
      //The value Cascader component understands
      return [
        `${value[0]}`,
        `${value[0]}-${value[1]}`,
        `${value[0]}-${value[1]}-${value[2]}`,
      ];
    } else {
      //The value TreeSelect component understands
      return `${value[0]}-${value[1]}-${value[2]}`;
    }
  } else if (value.length == 2) {
    if (!isMobileMode) {
      //The value Cascader component understands
      return [`${value[0]}`, `${value[0]}-${value[1]}`];
    } else {
      //The value TreeSelect component understands
      return `${value[0]}-${value[1]}`;
    }
  } else {
    return "";
  }
};

FormatValueToDisplay.propTypes = {
  value: PropTypes.array.isRequired,
};

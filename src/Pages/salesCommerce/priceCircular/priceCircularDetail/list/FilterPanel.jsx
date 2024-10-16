import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { PropTypes } from "prop-types";
import ProductPicker from "@/components/common/ProductPicker";
import useAllLoading from "@/hooks/useAllLoading ";
const FilterPanel = (props) => {
  const { onSubmit, filterObject } = props;
  const [form] = Ant.Form.useForm();
  const [selectedItemValues, setSelectedItemValues] = useState({});
  const [valueType, setValueType] = useState(
    filterObject?.productAndBatchNumber ? "1" : "0",
  );
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingBachNumber, setLoadingBachNumber] = useState(false);
  const allLoading = useAllLoading([loadingBachNumber, loadingProduct]);
  const [validationErrors, setValidationErrors] = useState(null);
  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {
    const dateFilter = {};
    if (filterObject?.toIssueDateCalendarId) {
      dateFilter.toIssueDateCalendarId = FormatDateToDisplay(
        filterObject?.toIssueDateCalendarId,
      );
    }
    filterObject && form.setFieldsValue({ ...filterObject, ...dateFilter });
  }, []);

  //====================================================================
  //                        Functions
  //====================================================================
  const handleTypeChange = (value) => {
    if (value === "1") {
      form.setFieldsValue("ProductId", null);

      setSelectedItemValues((prev) => ({
        ...prev,
        product: null,
      }));
    } else {
      form.setFieldsValue("BatchNumberId", null);

      setSelectedItemValues((prev) => ({
        ...prev,
        productAndBatchNumber: null,
      }));
    }

    setValueType(value);
    setValidationErrors("");
  };
  const onProductChange = async (value, selectedNode, extra) => {
    const selectedValue = extra.selectedOptionData;
    if (selectedValue.product) {
      setSelectedItemValues({
        brand: { id: selectedValue.brand.id, name: selectedValue.brand.name },
        product: {
          id: selectedValue?.product?.id,
          name: selectedValue?.product?.name,
        },
      });
    } else {
        setValidationErrors("انتخاب کالا اجباری است");         
    }
  };
  const onBatchNumberChange = async (value, selectedNode, extra) => {
    const selectedValue = extra.selectedOptionData;
    if (selectedValue.productDetail) {
        setValidationErrors("");
        setSelectedItemValues({
          brand: { id: selectedValue.brand.id, name: selectedValue.brand.name },
          product: {
            id: selectedValue.product.id,
            name: selectedValue.product.name,
          },
          productAndBatchNumber: {
            id: selectedValue?.productDetail?.productDetailId,
            batchNumberId: selectedValue?.productDetail?.batchNumberId,
            batchNumber: selectedValue?.productDetail?.batchNumber,
          },
        });
    } else {
        setValidationErrors("انتخاب کالا و سری ساخت اجباری است");
    }
  };

  const onFinish = (values) => {
    const ProductId = form.getFieldValue("ProductId");
    const BatchNumberId = form.getFieldValue("BatchNumberId");

    onSubmit({
      ...values,
      ProductId: selectedItemValues?.product?.id ?? ProductId,
      BatchNumberId: selectedItemValues?.productAndBatchNumber?.batchNumberId,
      BrandId: selectedItemValues?.brand?.id ?? BatchNumberId,
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
        <Ant.Form.Item label="کالا و سری ساخت">
          <Ant.Segmented
            disabled={loadingProduct || loadingBachNumber}
            block
            options={[
              {
                label: "کالا",
                value: "0",
              },
              {
                label: "سری ساخت",
                value: "1",
              },
            ]}
            defaultValue={filterObject?.productAndBatchNumber ? "1" : "0"}
            onChange={handleTypeChange}
          />
        </Ant.Form.Item>
        {valueType === "0" && (
          <Ant.Form.Item
            name={"Product"}
            label=" کالا "
            help={
              validationErrors && (
                  <Ant.Typography.Text type="danger">
                      {validationErrors}
                  </Ant.Typography.Text>
              )
          }
          >
            <ProductPicker
              disabled={loadingProduct}
              onLoadingChange={(value) => {
                setLoadingProduct(value);
              }}
              onChange={onProductChange}
              mode="product"
            />
          </Ant.Form.Item>
        )}
        {valueType === "1" && (
          <Ant.Form.Item
            label="برند، کالا و سری ساخت"
            name={"productAndBatchNumber"}
            help={
              validationErrors && (
                  <Ant.Typography.Text type="danger">
                      {validationErrors}
                  </Ant.Typography.Text>
              )
          }
          >
            <ProductPicker
              disabled={loadingBachNumber}
              onLoadingChange={(value) => {
                setLoadingBachNumber(value);
              }}
              onChange={onBatchNumberChange}
              mode="productDetail"
            />
          </Ant.Form.Item>
        )}

        <Ant.Form.Item>
          <Ant.Button
            block
            disabled={allLoading}
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
  filterObject: PropTypes.any,
};

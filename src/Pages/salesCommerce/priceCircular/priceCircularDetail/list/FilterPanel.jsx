import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { PropTypes } from "prop-types";
import ProductPicker, {
  GetSelectedValue as GetProductPickerValue,
  FormatValueToDisplay as ProductPickerDisplayValue,
} from "@/components/common/ProductPicker";
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
  };
  const onProductChange = async (value, option) => {
    const selectedValue = GetProductPickerValue(option);

    setSelectedItemValues({
      brand: { id: selectedValue.brand.id, name: selectedValue.brand.name },
      product: {
        id: selectedValue?.product?.id,
        name: selectedValue?.product?.name,
      },
    });
  };
  const onBatchNumberChange = async (value, option) => {
    const selectedValue = GetProductPickerValue(option);

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
            rules={[
              {
                validator: (_, value) =>
                  new Promise((resolve, reject) => {
                    if (value?.length != 2) {
                      reject(new Error("انتخاب کالا اجباری است"));
                    } else {
                      resolve();
                    }
                  }),
              },
            ]}
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
            rules={[
              {
                validator: (_, value) =>
                  new Promise((resolve, reject) => {
                    if (value?.length != 3) {
                      reject(new Error("انتخاب کالا و سری ساخت اجباری است"));
                    } else {
                      resolve();
                    }
                  }),
              },
            ]}
          >
            <ProductPicker
              disabled={loadingBachNumber}
              onLoadingChange={(value) => {
                setLoadingBachNumber(value);
              }}
              onChange={onBatchNumberChange}
              mode="productAndBatchNumber"
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

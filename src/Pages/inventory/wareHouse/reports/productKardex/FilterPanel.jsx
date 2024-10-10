import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { PropTypes } from "prop-types";
import * as url from "@/api/url";
import qs from "qs";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import ProductPicker, {
  GetSelectedValue as GetProductPickerValue,
  FormatValueToDisplay as ProductPickerDisplayValue,
} from "@/components/common/ProductPicker";
import useRequestManager from "@/hooks/useRequestManager";
import MyDatePicker, {
  FormatDateToDisplay,
  FormatDateToPost,
} from "@/components/common/MyDatePicker";
import useAllLoading from "@/hooks/useAllLoading ";

import * as api from "@/api";
import { useFetch, useFetchWithHandler } from "@/api";
const FilterPanel = (props) => {
  const { onSubmit, filterObject } = props;
  const [form] = Ant.Form.useForm();
  const [selectedItemValues, setSelectedItemValues] = useState({});
  const [wareHouseList, wareHouseLoading, wareHouseError] = api.useFetch(
    url.WAREHOUSE,
  );
  const [valueType, setValueType] = useState(
    filterObject?.productAndBatchNumber ? "1" : "0",
  );
  const [warehouseId, setWarehouseId] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingBachNumber, setLoadingBachNumber] = useState(false);

  const [
    inventoryDocumentList,
    inventoryDocumentLoading,
    inventoryDocumentError,
  ] = api.useFetch(url.INVENTORY_DOCUMENT_TYPE);

  useRequestManager({ error: wareHouseError });
  useRequestManager({ error: inventoryDocumentError });

  const allLoading = useAllLoading([
    inventoryDocumentLoading,
    wareHouseLoading,
    loadingBachNumber,
    loadingProduct,
  ]);
  const commonOptionsInventoryDocumentType = {
    showSearch: true,
    filterOption: (input, option) => option.title.indexOf(input) >= 0,
  };

  const commonOptionsWareHouse = {
    showSearch: true,
    filterOption: (input, option) => option.title.indexOf(input) >= 0,
  };
  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {
    const dateFilter = {};
    if (filterObject?.fromIssueDateCalendarId) {
      dateFilter.fromIssueDateCalendarId = FormatDateToDisplay(
        filterObject?.fromIssueDateCalendarId,
      );
    }
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
      form.setFieldValue("Product", null);
      setSelectedItemValues((prev) => ({
        ...prev,
        product: null,
      }));
    } else {
      form.setFieldValue("productAndBatchNumber", null);
      setSelectedItemValues((prev) => ({
        ...prev,
        productAndBatchNumber: null,
      }));
    }

    setValueType(value);
  };
  const onWarehouseChange = (val) => {
    setWarehouseId(val);

    form.setFieldValue("Product", null);
    form.setFieldValue("productAndBatchNumber", null);
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
        id: selectedValue?.productAndBatchNumber?.productAndBatchNumberId,
        batchNumberId: selectedValue?.productAndBatchNumber?.batchNumberId,
        batchNumber: selectedValue?.productAndBatchNumber?.batchNumber,
      },
    });
  };
  const onFinish = (values) => {
    console.log(values, "values");

    const otherFilterItems = {};
    if (values?.fromIssueDateCalendarId) {
      otherFilterItems.fromIssueDateCalendarId = FormatDateToPost(
        values?.fromIssueDateCalendarId,
      );
    }

    if (values?.toIssueDateCalendarId) {
      otherFilterItems.toIssueDateCalendarId = FormatDateToPost(
        values?.toIssueDateCalendarId,
      );
    }

    const ProductId = form.getFieldValue("ProductId");
    const BatchNumberId = form.getFieldValue("BatchNumberId");

    onSubmit({
      ...values,
      ...otherFilterItems,
      ProductId: selectedItemValues?.product?.id ?? ProductId,
      BatchNumberId:
        selectedItemValues?.productAndBatchNumber?.batchNumberId ?? BatchNumberId,
      BrandId: selectedItemValues?.brand?.id,
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
        requiredMark={false}
        form={form}
        onFinish={onFinish}
        layout="vertical"
        onFinishFailed={null}
      >
        <Ant.Form.Item name={"fromIssueDateCalendarId"} label="از تاریخ">
          <MyDatePicker />
        </Ant.Form.Item>
        <Ant.Form.Item name={"toIssueDateCalendarId"} label="تا تاریخ">
          <MyDatePicker />
        </Ant.Form.Item>
        <Ant.Form.Item name={"WarehouseId"} label="نام انبار">
          <Ant.Select
            {...commonOptionsWareHouse}
            disabled={wareHouseLoading}
            allowClear
            loading={wareHouseLoading}
            options={wareHouseList?.data}
            fieldNames={{ label: "title", value: "id" }}
            // onChange={(val) => setWarehouseId(val)}
            onChange={onWarehouseChange}
          />
        </Ant.Form.Item>
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
            // onChange={(e) => setValueType(e)}
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
              warehouseId={warehouseId}
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
              warehouseId={warehouseId}
              mode="productAndBatchNumber"
            />
          </Ant.Form.Item>
        )}

        <Ant.Form.Item name={"InventoryDocumentTypeId"} label="نوع برگه انبار">
          <Ant.Select
            {...commonOptionsInventoryDocumentType}
            allowClear
            disabled={inventoryDocumentLoading}
            loading={inventoryDocumentLoading}
            options={inventoryDocumentList?.data}
            fieldNames={{ label: "title", value: "id" }}
          />
        </Ant.Form.Item>

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
      </Ant.Form>
    </>
  );
};

export default FilterPanel;
FilterPanel.propTypes = {
  onSubmit: PropTypes.func,
  filterObject: PropTypes.any,
};

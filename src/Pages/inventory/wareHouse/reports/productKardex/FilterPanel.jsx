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
  const [valueType, setValueType] = useState("0");
  const [warehouseId, setWarehouseId] = useState(null);
  const [brand, setBrand] = useState(null);
  const [products, setProductLists] = useState(null);
  const [batchNumber, setBatchNumber] = useState(null);
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
    console.log(warehouseId, "warehouseId");
  }, [warehouseId]);

  useEffect(() => {
    const dateFilter = {};

    console.log(filterObject?.ProductId, "filterObject");
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


  const onProductChange = async (value, option) => {
    const selectedValue = GetProductPickerValue(option);

    setSelectedItemValues({})
      setSelectedItemValues({
        brand: { id: selectedValue.brand.id, name: selectedValue.brand.name },
        product: { id: selectedValue.product.id, name: selectedValue.product.name },
        // productDetail: {
        //   id: selectedValue.productDetail.productDetailId,
        //   batchNumberId: selectedValue.productDetail.batchNumberId,
        //   batchNumber: selectedValue.productDetail.batchNumber,
        // },
      });

  };
  const onFinish = (values) => {
    // alert(JSON.stringify(values, null, 1, 1));
    console.log(values, "values");
    console.log(selectedItemValues);
    console.log(selectedItemValues?.product.id, "Product");
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

    // setProduct(values.ProductId);
    // setBrand(product?.brand?.id);

    //     let brandId=product?.brand?.id
    //     console.log(brandId,"kkkbrandId")

    //    console.log( form.getFieldValue('ProductId'),"ProductId")

    //   delete values?.Product[0],
    // delete values?.Product[1]
    onSubmit({
      ...values,
      ...otherFilterItems,

      ProductId: selectedItemValues?.product.id,
      BrandId: selectedItemValues?.brand.id,
      // BatchNumberId: batchNumber?.productDetail?.batchNumberId,
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
        // variant="filled"
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
            onChange={(val) => setWarehouseId(val)}
          />
        </Ant.Form.Item>
        <Ant.Form.Item
          label="کالا و سری ساخت"
          rules={[
            {
              required: true,
              message: "فیلد کالا اجباری است",
            },
          ]}
        >
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
            onChange={(e) => setValueType(e)}
          />
        </Ant.Form.Item>
        {valueType === "0" && (
          <Ant.Form.Item
            rules={[{ required: true }]}
            name={"Product"}
            label=" کالا "
          >
            <ProductPicker
              // initialValues={(filterObject?.BrandId && filterObject?.ProductId
              //   &&  {brandId: filterObject?.BrandId, productId:  filterObject?.ProductId})|| null }
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
            // initialValues={{brandId: brandId, productId: productId, batchNumberId: batchNumberId}}
            label="برند، کالا و سری ساخت"
            name={"BatchNumberId"}
            rules={[{ required: false }]}
          >
            <ProductPicker
              disabled={loadingBachNumber}
              onLoadingChange={(value) => {
                setLoadingBachNumber(value);
              }}
              onChange={(selectedBatchNumber) =>
                setBatchNumber(selectedBatchNumber)
              }
              warehouseId={warehouseId}
              mode="productDetail"
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

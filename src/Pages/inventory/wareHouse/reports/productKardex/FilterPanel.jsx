import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { PropTypes } from "prop-types";
import * as url from "@/api/url";
import qs from "qs";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import ProductPicker from "@/components/common/ProductPicker";
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

  const [wareHouseList, wareHouseLoading, wareHouseError] = api.useFetch(
    url.WAREHOUSE,
  );
  const [valueType, setValueType] = useState("0");
  const [warehouseId, setWarehouseId] = useState(null);
  const [brand, setBrand] = useState(null);
  const [product, setProduct] = useState(null);
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
    setBrand(product && product?.brand?.id);
  }, [product]);
  useEffect(() => {
    console.log(brand, "brand");
    console.log( product?.product?.id, "productproduct");
  }, [brand]);


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

  const onFinish = (values) => {
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

    //     let brandId=product?.brand?.id
    //     console.log(brandId,"kkkbrandId")
    //  form.setFieldValue("ProductId", [brandId, product?.product?.id]);
    //    console.log( form.getFieldValue('ProductId'),"ProductId")

    onSubmit({
      ...values,
      ...otherFilterItems,
      ProductId: product?.product?.id,
      BatchNumberId: batchNumber?.productDetail?.batchNumberId,
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
      {JSON.stringify(form?.ErrorList)}

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
            name={"ProductId"}
            label=" کالا "
          >
            <ProductPicker
               initialValues={{brandId: brand, productId: product?.product?.id}}
              //  initialValues={{brandId: 1140, productId: 33479}}
              disabled={loadingProduct}
              warehouseId={warehouseId}
              onLoadingChange={(value) => {
                setLoadingProduct(value);
              }}
              onChange={(selectedProduct) => setProduct(selectedProduct)}
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

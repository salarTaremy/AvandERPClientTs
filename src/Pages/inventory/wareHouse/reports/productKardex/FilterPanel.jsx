import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { PropTypes } from "prop-types";
import * as url from "@/api/url";
import qs from "qs";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import useRequestManager from "@/hooks/useRequestManager";
import MyDatePicker, {
  FormatDateToDisplay,
  FormatDateToPost,
} from "@/components/common/MyDatePicker";
import { TbBrandAirtable } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { RiBarcodeBoxLine } from "react-icons/ri";
import * as api from "@/api";
import { useFetch, useFetchWithHandler } from "@/api";
const FilterPanel = (props) => {
  const { onSubmit, filterObject } = props;
  const [form] = Ant.Form.useForm();

  const [batchNumberList, batchNumberLoading, batchNumberError] = api.useFetch(
    url.BATCH_NUMBER,
  );
  const [wareHouseList, wareHouseLoading, wareHouseError] = api.useFetch(
    url.WAREHOUSE,
  );
  const [
    productListData,
    productListLoading,
    productListError,
    productListApiCall,
  ] = useFetchWithHandler();

  const [
    inventoryDocumentList,
    inventoryDocumentLoading,
    inventoryDocumentError,
  ] = api.useFetch(url.INVENTORY_DOCUMENT_TYPE);
  const [validationErrors, setValidationErrors] = useState();
  useRequestManager({ error: batchNumberError });
  useRequestManager({ error: wareHouseError });
  useRequestManager({ error: inventoryDocumentError });

  const commonOptions = {
    showSearch: true,
    filterOption: (input, option) => option.batchNumber.indexOf(input) >= 0,
  };
  const commonOptionsInventoryDocumentType = {
    showSearch: true,
    filterOption: (input, option) => option.title.indexOf(input) >= 0,
  };
  const [productCascaderOption, setProductCascaderOption] = useState([]);
  const commonOptionsWareHouse = {
    showSearch: true,
    filterOption: (input, option) => option.title.indexOf(input) >= 0,
  };
  //====================================================================
  //                        useEffects
  //====================================================================
  // useEffect(() => {
  //   const queryString = qs.stringify({ warehouseId: 22 });
  //   productListApiCall(`${url.PRODUCT_TREE}?${queryString}`);
  // }, []);
  useEffect(() => {
    getAllProductList();
  }, []);
  useEffect(() => {
    productListData?.isSuccess &&
      setProductCascaderOption(productListData?.data);
  }, [productListData]);
  useEffect(() => {
    const dateFilter = {};
    if (filterObject?.FromIssueDateCalendarId) {
      dateFilter.FromIssueDateCalendarId = FormatDateToDisplay(
        filterObject?.FromIssueDateCalendarId,
      );
    }
    if (filterObject?.ToIssueDateCalendarId) {
      dateFilter.ToIssueDateCalendarId = FormatDateToDisplay(
        filterObject?.ToIssueDateCalendarId,
      );
    }
    filterObject && form.setFieldsValue({ ...filterObject, ...dateFilter });
  }, []);

  //====================================================================
  //                        Functions
  //====================================================================
  const getAllProductList = async () => {
    await productListApiCall(url.PRODUCT_TREE);
  };
  const onProductChange = (value, option) => {
    if (option.length > 1) {
      const selectedProduct = option[option.length - 2];
      const selectedBatchNumber = option[option.length - 1];
      setDocumentDetailValues((documentDetailValues) => ({
        ...documentDetailValues,
        product: { id: selectedProduct.productId, name: selectedProduct.name },
        productDetail: {
          id: selectedBatchNumber.batchNumberId,
          batchNumber: selectedBatchNumber.name,
        },
      }));

      //TODO: Get product inventory from API
      // const inventory = 456;
      // const totalInventory = 791;
      // setProductInventory({
      //   batchNumberInventory: inventory,
      //   totalInventory: totalInventory,
      // });

      setValidationErrors("");
    } else {
      setValidationErrors("انتخاب کالا و سری ساخت اجباری است");
    }
  };
  const productFilter = (inputValue, path) =>
    path.some(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
        String(option.fullCode).indexOf(inputValue) > -1,
    );

  const onFinish = (values) => {
    let result;

    if (values?.productId && values?.productId.length === 3) {
      result = values?.productId[1];
    } else if (values?.productId.length === 2) {
      result = values?.productId[1];
    }

    const otherFilterItems = {};
    if (values?.FromIssueDateCalendarId) {
      otherFilterItems.FromIssueDateCalendarId = FormatDateToPost(
        values?.FromIssueDateCalendarId,
      );
    }

    if (values?.ToIssueDateCalendarId) {
      otherFilterItems.ToIssueDateCalendarId = FormatDateToPost(
        values?.ToIssueDateCalendarId,
      );
    }

    onSubmit({
      ...values,
      ...otherFilterItems,
      productId: result,
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
        <Ant.Form.Item name={"FromIssueDateCalendarId"} label="از تاریخ">
          <MyDatePicker />
        </Ant.Form.Item>
        <Ant.Form.Item name={"ToIssueDateCalendarId"} label="تا تاریخ">
          <MyDatePicker />
        </Ant.Form.Item>
        <Ant.Form.Item
          name={"productId"}
          label="کالا"
          rules={[{ required: true }]}
          help={
            validationErrors && (
              <Ant.Typography.Text type="danger">
                {validationErrors}
              </Ant.Typography.Text>
            )
          }
        >
          <Ant.Cascader
            loading={productListLoading}
            options={productCascaderOption}
            optionRender={(option) => (
              <>
                {option.level === 1 && (
                  <TbBrandAirtable className="text-indigo-500" />
                )}
                {option.level === 2 && (
                  <AiOutlineProduct className="text-cyan-500" />
                )}
                {option.level === 3 && (
                  <RiBarcodeBoxLine className="text-teal-500" />
                )}
                {/* {option.title} */} {option.title}{" "}
              </>
            )}
            placeholder="لطفا انتخاب کنید ..."
            fieldNames={{
              label: "title",
              value: "productId",
              children: "children",
            }}
            showSearch={{ productFilter }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item name={"BatchNumberId"} label="لیست سری ساخت ">
          <Ant.Select
            {...commonOptions}
            disabled={batchNumberLoading}
            allowClear
            loading={batchNumberLoading}
            options={batchNumberList?.data}
            fieldNames={{ label: "batchNumber", value: "id" }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item name={"WarehouseId"} label="نام انبار">
          <Ant.Select
            {...commonOptionsWareHouse}
            disabled={wareHouseLoading}
            allowClear
            loading={wareHouseLoading}
            options={wareHouseList?.data}
            fieldNames={{ label: "title", value: "id" }}
          />
        </Ant.Form.Item>
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

        <Ant.Form.Item
          name="IsConfirm"
          defaultChecked={false}
          label={"تایید شده/تایید نشده"}
        >
          <Ant.Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
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

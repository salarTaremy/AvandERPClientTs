import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { PropTypes } from "prop-types";
import * as url from "@/api/url";
import qs from "qs";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import useRequestManager from "@/hooks/useRequestManager";
import MyDatePicker, {
  FormatDateToDisplay,
  FormatDateToPost
} from "@/components/common/MyDatePicker";
import ProductPicker from "@/components/common/ProductPicker";
import useAllLoading from "@/hooks/useAllLoading ";
import * as api from "@/api";
import { useFetch, useFetchWithHandler } from "@/api";
const FilterPanel = (props) => {
  const { onSubmit, filterObject } = props;
  const [form] = Ant.Form.useForm();

  const [wareHouseList, wareHouseLoading, wareHouseError] = api.useFetch(
    url.WAREHOUSE,
  );

  useRequestManager({ error: wareHouseError });

  const [warehouseId, setWarehouseId] = useState(null);
  const [productId, setProductId] = useState(null);
  const [batchNumberId, setBatchNumberId] = useState(null);

  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingBachNumber, setLoadingBachNumber] = useState(false);
  const allLoading = useAllLoading([
    wareHouseLoading,
    loadingBachNumber,
    loadingProduct,
  ]);
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

  useEffect(() => {
    console.log(warehouseId,"ggggg");
  }, [warehouseId]);

  //====================================================================
  //                        Functions
  //====================================================================

  const onFinish = (values) => {
    const toIssueDateCalendarId = {};
    if (values?.toIssueDateCalendarId) {
      otherFilterItems.toIssueDateCalendarId = FormatDateToPost(
        values?.toIssueDateCalendarId,
      );
    }
    onSubmit({
      ...values,
      ...toIssueDateCalendarId,
      ProductId: productId?.product?.id,
      BatchNumberId: batchNumberId?.productDetail?.batchNumberId,
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
          <Ant.Form.Item name={"ToIssueDateCalendarId"} label=" تا تاریخ">
            <MyDatePicker />
          </Ant.Form.Item>
          <Ant.Form.Item
            rules={[{ required: false }]}
            name={"WarehouseId"}
            label="نام انبار"
          >
            <Ant.Select
              disabled={wareHouseLoading}
              allowClear
              loading={wareHouseLoading}
              options={wareHouseList?.data}
              onChange={(val) => setWarehouseId(val)}
              fieldNames={{ label: "title", value: "id" }}
            />
          </Ant.Form.Item>
          <Ant.Form.Item
            rules={[{ required: false }]}
            name={"ProductId"}
            label="کالا"
          >
            <ProductPicker
              warehouseId={warehouseId}
              onChange={(selectedProduct) => setProductId(selectedProduct)}
              mode="product"
              onLoadingChange={(value) => {
                setLoadingProduct(value);
              }}
            />
          </Ant.Form.Item>
          <Ant.Form.Item
            name={"BatchNumberId"}
            label="برند، کالا و سری ساخت"
            rules={[{ required: true }]}
          >
            <ProductPicker
              onLoadingChange={(value) => {
                setLoadingBachNumber(value);
              }}
              onChange={(selectedBatchNumber) =>
                setBatchNumberId(selectedBatchNumber)
              }
              warehouseId={warehouseId}
              mode="productDetail"
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

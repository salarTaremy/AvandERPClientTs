import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { PropTypes } from "prop-types";
import * as url from "@/api/url";
import qs from "qs";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import useRequestManager from "@/hooks/useRequestManager";
import MyDatePicker, {
  FormatDateToDisplay,
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
  const allLoading = useAllLoading([wareHouseLoading]);
  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {
    const dateFilter = {};
    if (filterObject?.ToIssueDateCalendarId) {
      dateFilter.ToIssueDateCalendarId = FormatDateToDisplay(
        filterObject?.ToIssueDateCalendarId,
      );
    }
    filterObject && form.setFieldsValue({ ...filterObject, ...dateFilter });
  }, []);

  useEffect(() => {
  console.log(warehouseId)
  }, [warehouseId]);

  //====================================================================
  //                        Functions
  //====================================================================

  const onFinish = (values) => {
    onSubmit({
      ...values,
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
      <Ant.Skeleton active loading={allLoading}>
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
            />
          </Ant.Form.Item>
          <Ant.Form.Item
            name={"BatchNumberId"}
            label="برند، کالا و سری ساخت"
            rules={[{ required: true }]}
          >
            <ProductPicker
              onChange={(selectedBatchNumber) =>
                setBatchNumberId(selectedBatchNumber)
              }
              warehouseId={warehouseId}
              mode="productDetail"
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
      </Ant.Skeleton>
    </>
  );
};

export default FilterPanel;
FilterPanel.propTypes = {
  onSubmit: PropTypes.func,
  filterObject: PropTypes.any,
};

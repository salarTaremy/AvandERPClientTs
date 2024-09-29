import React, { useEffect } from "react";
import * as Ant from "antd";
import { PropTypes } from "prop-types";
import * as url from "@/api/url";
import { useFetch } from "@/api";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import MyDatePicker from "@/components/common/MyDatePicker";
import useRequestManager from "@/hooks/useRequestManager";
import * as api from "@/api";
const FilterPanel = (props) => {
  const { onSubmit, filterObject } = props;
  const [form] = Ant.Form.useForm();
  //   const [brandData, brandLoading, brandError] = useFetch(
  //     url.BRAND_GET_WITH_PERMISSION,
  //   );
  const [batchNumberList, batchNumberLoading, batchNumberError] = api.useFetch(
    url.BATCH_NUMBER,
  );
  const [wareHouseList, wareHouseLoading, wareHouseError] = api.useFetch(
    url.WAREHOUSE,
  );
  const [
    inventoryDocumentList,
    inventoryDocumentLoading,
    inventoryDocumentError,
  ] = api.useFetch(url.INVENTORY_DOCUMENT_TYPE);
  //   useRequestManager({ error: brandError });
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
  const commonOptionsWareHouse = {
    showSearch: true,
    filterOption: (input, option) => option.title.indexOf(input) >= 0,
  };
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    filterObject && form.setFieldsValue({ ...filterObject });
  }, []);

  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = (values) => {
    console.log(values, "values");
    console.log( values?.FromIssueDateCalendarId
      ?.toString()
      .replace(/\//g, ""), "ccccc");
    onSubmit({
      ...values,
      FromIssueDateCalendarId: values?.fromIssueDateCalendarId
        ?.toString()
        .replace(/\//g, ""),
        ToIssueDateCalendarId: values?.ToIssueDateCalendarId
        ?.toString()
        .replace(/\//g, ""),
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
          name={"ProductId"}
          label=" نام محصول"
          rules={[{ required: false }]}
        >
          <Ant.Cascader
            //   loading={CityLoading}
            //   options={options}
            //   onChange={onChange}
            placeholder="لطفا انتخاب کنید ..."
            //   fieldNames={{ label: "name", value: "id", children: "children" }}
            //   showSearch={{
            //     filter,
            //   }}
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

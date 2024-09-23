import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import qs from "qs";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import DebounceSelect from "@/components/common/DebounceSelect";
import MyDatePicker, {
  FormatDateToDisplay,
  FormatDateToPost,
} from "@/components/common/MyDatePicker";
import useRequestManager from "@/hooks/useRequestManager";

const FilterPanel = ({ onSubmit, filterObject }) => {
  const [form] = Ant.Form.useForm();
  const [documentTypeData, documentTypeListLoading, documentTypeListError] =
    api.useFetch(url.INVENTORY_DOCUMENT_TYPE);

  const [warehouseListData, warehouseListLoading, warehouseListError] =
    api.useFetch(url.WAREHOUSE);

  useRequestManager({ error: documentTypeListError });
  useRequestManager({ error: warehouseListError });

  const commonOptions = {
    placeholder: "انتخاب کنید...",
    allowClear: true,
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
  const onFinish = (values) => {
    const otherFilterItems = {};
    if (values?.counterpartyId) {
      otherFilterItems.counterpartyId = {
        label: values?.counterpartyId.label,
        key: values?.counterpartyId.value,
        value: values?.counterpartyId.value,
      };
    } else {
      otherFilterItems.counterpartyId = undefined;
    }

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

    onSubmit({
      ...values,
      ...otherFilterItems,
    });
  };

  const getCounterpartyForDropDown = async (searchText) => {
    if (searchText) {
      const queryString = qs.stringify({
        counterpartyName: searchText,
      });

      const response = await api.GetAsync(
        `${url.COUNTER_PARTY_GET_FOR_DROPDOWN}?${queryString}`,
        "",
      );
      if (response?.data) {
        return response?.data.map((item) => ({
          label: `${item.counterpartyName}`,
          value: item.id,
        }));
      }
    }
  };

  //IsConfirm AS BIT = NULL
  //IsReserve AS BIT = NULL
  //CreatedByUserId AS SMALLINT = NULL

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
        <Ant.Form.Item name={"documentNumber"} label="شماره برگه">
          <Ant.InputNumber min={1} style={{ width: "100%" }} />
        </Ant.Form.Item>
        <Ant.Form.Item name={"counterpartyId"} label="طرف حساب">
          <DebounceSelect
            placeholder="بخشی از نام طرف حساب را تایپ کنید..."
            fetchOptions={getCounterpartyForDropDown}
          />
        </Ant.Form.Item>
        <Ant.Form.Item name={"fromIssueDateCalendarId"} label="از تاریخ">
          <MyDatePicker />
        </Ant.Form.Item>
        <Ant.Form.Item name={"toIssueDateCalendarId"} label="تا تاریخ">
          <MyDatePicker />
        </Ant.Form.Item>
        <Ant.Form.Item name={"inventoryDocumentTypeId"} label="نوع برگه">
          <Ant.Select
            {...commonOptions}
            disabled={documentTypeListLoading}
            loading={documentTypeListLoading}
            options={documentTypeData?.data}
            fieldNames={{ label: "title", value: "id" }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item name={"warehouseId"} label="انبار">
          <Ant.Select
            {...commonOptions}
            disabled={warehouseListLoading}
            loading={warehouseListLoading}
            options={warehouseListData?.data}
            fieldNames={{ label: "title", value: "id" }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item name={"isConfirm"} label="وضعیت تایید برگه">
          <Ant.Select
            {...commonOptions}
            options={[
              { value: true, label: "تایید شده" },
              { value: false, label: "تایید نشده" },
            ]}
          />
        </Ant.Form.Item>
        <Ant.Form.Item>
          <Ant.Button block type="primary" onClick={() => form.submit()}>
            {"اعمال"}
          </Ant.Button>
        </Ant.Form.Item>
      </Ant.Form>
    </>
  );
};

FilterPanel.propTypes = {
  onSubmit: PropTypes.func,
  filterObject: PropTypes.object,
};

export default FilterPanel;

import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";

import { PropTypes } from "prop-types";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetch, useFetchWithHandler } from "@/api";
import qs from "qs";

//====================================================================
//                        Declaration
//====================================================================
const FilterPanel = (props) => {
  const [cityList, cityLoading, cityError, cityApiCall] = useFetchWithHandler();
  const [cityOptions, setCityOptions] = useState([]);
  const [counterpartyTypeList, counterpartyTypeLoading, counterpartyTypeError] =
    useFetch(url.COUNTER_PARTY_TYPE);
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const { onSubmit, filterObject } = props;
  const [form] = Ant.Form.useForm();
  useRequestManager({ error: dtAccError });
  useRequestManager({ error: counterpartyTypeError });
  useRequestManager({ error: cityError });
  const commonOptions = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) => option.name.indexOf(input) >= 0,
  };

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    filterObject && form.setFieldsValue({ ...filterObject });
  }, []);

  useEffect(() => {
    cityApiCall(url.CITY_TREE);
  }, []);

  useEffect(() => {
    cityList?.isSuccess && setCityOptions(cityList?.data);
  }, [cityList]);
  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = (values) => {
    onSubmit({
      ...values,
    });
  };

  const filterCity = (inputValue, path) =>
    path.some(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
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
        <Ant.Form.Item name={"counterpartyTypeId"} label="نوع طرف حساب">
          <Ant.Select
            allowClear={true}
            disabled={counterpartyTypeLoading}
            loading={counterpartyTypeLoading}
            options={counterpartyTypeList?.data}
            fieldNames={{ label: "name", value: "id" }}
            placeholder={"انتخاب کنید..."}
          />
        </Ant.Form.Item>

        <Ant.Form.Item
          rules={[{ required: false }, { max: 150 }]}
          name={"CounterpartyName"}
          label="عنوان طرف حساب"
        >
          <Ant.Input
            allowClear
            showCount
            maxLength={150}
            style={{ width: "100%" }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item name={"code"} label="کد">
          <Ant.Input
              allowClear
              showCount
              maxLength={10}
              style={{ width: "100%" }}
          />
        </Ant.Form.Item>

        <Ant.Form.Item
          name={"nationalCode"}
          label="کد ملی"
          maxLength={10}
          rules={[
            {
              required: false,
              pattern: new RegExp("^[0-9]*$"),
              message:
                "کد ملی نمی تواند شامل کاراکترهای غیرعددی باشد",
            },
          ]}
        >
          <Ant.Input
            allowClear
            showCount
            maxLength={10}
            style={{ width: "100%" }}
          />
        </Ant.Form.Item>

        <Ant.Form.Item
          name={"fidaCode"}
          label="کد فراگیر"
          rules={[
            {
              required: false,
              pattern: new RegExp("^[0-9]*$"),
              message:
                "کد فراگیر نمی تواند شامل کاراکترهای غیرعددی باشد",
            },
          ]}
        >
          <Ant.Input allowClear showCount maxLength={12} />
        </Ant.Form.Item>

        <Ant.Form.Item
          name={"legalEntityIdentity"}
          label="شناسه ملی"
          maxLength={11}
          rules={[
            {
              required: false,
              pattern: new RegExp("^[0-9]*$"),
              message:
                "کد اقتصادی نمی تواند شامل کاراکترهای غیرعددی باشد",
            },
          ]}
        >
          <Ant.Input
            allowClear
            showCount
            maxLength={11}
            style={{ width: "100%" }}
          />
        </Ant.Form.Item>

        <Ant.Form.Item
          name={"economicCode"}
          label="کد اقتصادی"
          maxLength={14}
          rules={[
            {
              required: false,
              pattern: new RegExp("^[0-9]*$"),
              message:
                "کد اقتصادی نمی تواند شامل کاراکترهای غیرعددی باشد",
            },
          ]}
        >
          <Ant.Input
            allowClear
            showCount
            maxLength={14}
            style={{ width: "100%" }}
          />
        </Ant.Form.Item>

        <Ant.Form.Item name={"cityId"} label="استان و شهر">
          <Ant.Cascader
            loading={cityLoading}
            options={cityOptions}
            placeholder="لطفا انتخاب کنید..."
            fieldNames={{
              label: "name",
              value: "id",
              children: "children",
            }}
            showSearch={{
              filterCity,
            }}
            style={{ width: "100%" }}
          />
        </Ant.Form.Item>

        {/* <Ant.Form.Item name={"DetailedAccountId"} label=" حساب تفصیلی">
          <Ant.Select
            {...commonOptions}
            allowClear={true}
            placeholder={"انتخاب کنید..."}
            loading={dtAccLoading}
            options={dtAccData?.data}
            fieldNames={{ label: "name", value: "id" }}
          />
        </Ant.Form.Item> */}

        {/* <Ant.Form.Item
          rules={[
            {
              max: 100,
            },
          ]}
          name={"firstName"}
          label="نام"
        >
          <Ant.Input allowClear showCount maxLength={100} />
        </Ant.Form.Item>

        <Ant.Form.Item
          rules={[{ max: 100 }]}
          name={"lastName"}
          label="نام خانوادگی"
        >
          <Ant.Input allowClear showCount maxLength={100} />
        </Ant.Form.Item> */}

        <Ant.Form.Item name={"isActive"} label="فعال">
          <Ant.Switch defaultChecked={true} />
        </Ant.Form.Item>
        <Ant.Form.Item>
          <Ant.Button
            block
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

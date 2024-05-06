import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import MyDatePicker from "@/components/common/MyDatePicker";
import { PropTypes } from "prop-types";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetch, useFetchWithHandler } from "@/api";
import qs from "qs";
import { validateNationalCode } from "@/Tools";
//====================================================================
//                        Declaration
//====================================================================
const FilterPanel = (props) => {
  const [provinceList, provinceLoading, provinceError] = useFetch(url.PROVINCE);
  const [cityList, cityLoading, cityError, cityApi] = useFetchWithHandler();
  const [counterpartyTypeList, counterpartyTypeLoading, counterpartyTypeError] =
    useFetch(url.COUNTER_PARTY_TYPE);
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [idProvince, setIdProvince] = useState(null);
  useRequestManager({ error: dtAccError });
  useRequestManager({ error: provinceError });
  useRequestManager({ error: counterpartyTypeError });
  useRequestManager({ error: cityError });
  const { onSubmit, filterObject } = props;
  const [form] = Ant.Form.useForm();
  const commonOptions = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) => option.name.indexOf(input) >= 0,
  };

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    // filterObject && form.setFieldsValue({ ...filterObject, fromDate: formattedFromDate, toDate: formattedToDate })
    filterObject && form.setFieldsValue({ ...filterObject });
  }, []);

  useEffect(() => {
    getAllCity();
  }, [idProvince]);

  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = (values) => {
    onSubmit({
      ...values,
    });
  };

  const getAllCity = async () => {
    console.log(idProvince, "idProvince");

    const queryString = qs.stringify({
      ProvinceId: idProvince,
    });

    await cityApi(`${url.CITY}?${queryString}`);
  };
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
        <Ant.Form.Item name={"counterpartyTypeId"} label="نوع">
          <Ant.Select
            allowClear={true}
            disabled={counterpartyTypeLoading || false}
            loading={counterpartyTypeLoading}
            options={counterpartyTypeList?.data}
            fieldNames={{ label: "name", value: "id" }}
            placeholder={"انتخاب کنید..."}
          />
        </Ant.Form.Item>

        <Ant.Form.Item name={"provinceId"} label="استان">
          <Ant.Select
            {...commonOptions}
            allowClear={true}
            placeholder={"انتخاب کنید..."}
            onChange={(value) => setIdProvince(value)}
            disabled={provinceLoading || false}
            loading={provinceLoading}
            options={provinceList?.data}
            fieldNames={{ label: "name", value: "id" }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item name={"cityId"} label="شهر">
          <Ant.Select
            {...commonOptions}
            allowClear={true}
            placeholder={"انتخاب کنید..."}
            loading={cityLoading}
            options={cityList?.data}
            fieldNames={{ label: "name", value: "id" }}
          />
        </Ant.Form.Item>

        <Ant.Form.Item name={"DetailedAccountId"} label=" حساب تفصیلی">
          <Ant.Select
            {...commonOptions}
            allowClear={true}
            placeholder={"انتخاب کنید..."}
            loading={dtAccLoading}
            options={dtAccData?.data}
            fieldNames={{ label: "name", value: "id" }}
          />
        </Ant.Form.Item>

        <Ant.Form.Item
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
        </Ant.Form.Item>
        <Ant.Form.Item
          rules={[{ required: false }, { max: 150 }]}
          name={"companyTitle"}
          label="عنوان شرکت/سازمان"
        >
          <Ant.Input
            allowClear
            showCount
            maxLength={150}
            style={{ width: "100%" }}
          />
        </Ant.Form.Item>

        <Ant.Form.Item name={"code"} label="کد">
          <Ant.InputNumber
            maxLength={10}
            className="w-full"
            allowClear
            showCount
          />
        </Ant.Form.Item>
        <Ant.Form.Item
          // rules={[
          //   {
          //     required: false,
          //   },
          //   {
          //     validator: (_, value) => {
          //       if (validateNationalCode(value?.toString())) {
          //         return Promise.resolve();
          //       } else {
          //         return Promise.reject("کد ملی نا معتبر");
          //       }
          //     },
          //   },
          // ]}
          name={"NationalIdentity"}
          label="کدملی"
        >
          <Ant.InputNumber className="w-full" allowClear showCount />
        </Ant.Form.Item>
        <Ant.Form.Item name={"PhoneNumber"} label="شماره تلفن">
          <Ant.InputNumber className="w-full" allowClear showCount />
        </Ant.Form.Item>

        <Ant.Form.Item
          name={"legalEntityIdentity"}
          label="شناسه مالیاتی"
          rules={[{ required: false }]}
          maxLength={11}
        >
          <Ant.InputNumber min={0} style={{ width: "100%" }} />
        </Ant.Form.Item>
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

import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as styles from "@/styles";
import MyDatePicker from "@/components/common/MyDatePicker";
import useRequestManager from "@/hooks/useRequestManager";
import { PiArrowLineDownLeftLight } from "react-icons/pi";
import * as url from "@/api/url";
import PropTypes from "prop-types";
import { useFetch, useFetchWithHandler } from "@/api";


const HeaderAddCounterParty = (prop) => {
  // const {form}=prop;

  const [counterpartyTypeList, counterpartyTypeLoading, counterpartyTypeError] =
    useFetch(url.COUNTER_PARTY_TYPE);
  const [cityList, cityLoading, cityError] = useFetch(url.CITY);
  useRequestManager({ error: cityError });
  const [selectedValueType, setSelectedValueType] = useState("");
  const [dataList, setDataList] = useState("");
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] =
    useFetchWithHandler();

  useRequestManager({ error: counterpartyTypeError });
  useRequestManager({ error: maxCodeError });
  const commonOptions = {
    showSearch: true,
    filterOption: (input, option) => option.name.indexOf(input) >= 0,
  };
  const [form] = Ant.Form.useForm();
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    maxCodeData?.isSuccess &&
      maxCodeData?.data &&
      form.setFieldsValue({ code: maxCodeData.data });
  }, [maxCodeData]);






  //====================================================================
  //                        Functions
  //=================================================================

  const handleSelectChange = (value) => {
    setSelectedValueType(value);
  };
  const getMaxCode = async () => {
    await maxCodeApiCall(`${url.GETFIRST_FREE_CODE}`);
  };

  //====================================================================
  //                        Child Components
  //===================================================================

  const AddonBefore = () => {
    return (
      <Ant.Button
        size="small"
        type="text"
        onClick={getMaxCode}
        loading={maxCodeLoading}
      >
        <PiArrowLineDownLeftLight />
      </Ant.Button>
    );
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <div>

        <Ant.Row gutter={[16, 8]}>
          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              rules={[{ required: true }]}

              name={"counterpartyTypeId"}
              label="نوع"
            >
              <Ant.Select
                onChange={handleSelectChange}
                allowClear={true}
                disabled={counterpartyTypeLoading || false}
                loading={counterpartyTypeLoading}
                options={counterpartyTypeList?.data}
                fieldNames={{ label: "name", value: "id" }}
                placeholder={"انتخاب کنید..."}
              />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              rules={[
                { required: true },
                {
                  max: 100,
                },
              ]}
              name={"firstName"}
              label="نام"
            >
              <Ant.Input allowClear showCount maxLength={100} />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              rules={[{ required: true }, { max: 100 }]}
              name={"lastName"}
              label="نام خانوادگی"
            >
              <Ant.Input allowClear showCount maxLength={100} />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col
            className={selectedValueType === 2 ? "hidden" : ""}
            lg={8}
            md={12}
            sm={12}
            xs={24}
          >
            <Ant.Form.Item
              rules={[{ required: false }, { max: 100 }]}
              name={"fatherName"}
              label="نام پدر"
            >
              <Ant.Input allowClear showCount maxLength={100} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              rules={[{ required: true }, { max: 20 }]}
              name={"code"}
              label="کد"
            >
              <Ant.Input
                allowClear
                showCount
                maxLength={20}
                addonBefore={<AddonBefore />}
                style={{ textAlign: "center" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col
            className={selectedValueType === 2 ? "hidden" : ""}
            lg={8}
            md={12}
            sm={12}
            xs={24}
          >
            <Ant.Form.Item
              name={"nationalCode"}
              rules={[
                {
                  required: true,
                  // message: 'The name is required.',
                },
                {
                  validator: (_, value) => {
                    if (validateNationalCode(value?.toString())) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("کد ملی نا معتبر");
                    }
                  },
                },
              ]}
              label="کدملی"
            >
              <Ant.Input allowClear showCount min={0} maxLength={10} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col
            className={selectedValueType === 2 ? "hidden" : ""}
            lg={8}
            md={12}
            sm={12}
            xs={24}
          >
            <Ant.Form.Item
              name={"birthCertificateNumber"}
              label="شماره شناسنامه"
              rules={[{ required: false }, { max: 10 }]}
            >
              <Ant.Input
                allowClear
                showCount
                min={0}
                maxLength={10}
                style={{ width: "100%" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col
            className={selectedValueType === 2 ? "hidden" : ""}
            lg={8}
            md={12}
            sm={12}
            xs={24}
          >
            <Ant.Form.Item name={"birthDateCalendarId"} label={"تاریخ تولد"}>
              <MyDatePicker />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col
            className={selectedValueType === 2 ? "hidden" : ""}
            lg={8}
            md={12}
            sm={12}
            xs={24}
          >
            <Ant.Form.Item
              name={"birthCertificatePlaceOfIssueCityId"}
              label="محل صدور"
              rules={[{ required: false }]}
            >
              <Ant.Select
                showCount
                {...commonOptions}
                showSearch
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                disabled={cityLoading || false}
                loading={cityLoading}
                options={cityList?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col
            className={selectedValueType === 2 ? "" : "hidden"}
            lg={8}
            md={12}
            sm={12}
            xs={24}
          >
            <Ant.Form.Item
              name={"companyRegistrationPlaceCityId"}
              label="محل ثبت شرکت/سازمان"
              rules={[{ required: false }]}
            >
              <Ant.Select
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                disabled={cityLoading || false}
                loading={cityLoading}
                options={cityList?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col
            className={selectedValueType === 2 ? "" : "hidden"}
            lg={8}
            md={12}
            sm={12}
            xs={24}
          >
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
          </Ant.Col>
          <Ant.Col
            className={selectedValueType === 2 ? "" : "hidden"}
            lg={8}
            md={12}
            sm={12}
            xs={24}
          >
            <Ant.Form.Item
              name={"companyRegistrationNumber"}
              label="شماره ثبت شرکت/سازمان"
              rules={[{ required: false }, { max: 50 }]}
            >
              <Ant.InputNumber
                allowClear
                showCount
                min={0}
                maxLength={50}
                style={{ width: "100%" }}
              />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col
            className={selectedValueType === 2 ? "" : "hidden"}
            lg={8}
            md={12}
            sm={12}
            xs={24}
          >
            <Ant.Form.Item
              name={"nationalCode"}
              label="شناسه ملی"
              rules={[{ required: false }]}
            >
              <Ant.InputNumber
                // allowClear
                // showCount
                minLength={5}
                maxLength={11}
                style={{ width: "100%" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col
            className={selectedValueType === 2 ? "" : "hidden"}
            lg={8}
            md={12}
            sm={12}
            xs={24}
          >
            <Ant.Form.Item
              name={"economicCode"}
              label="کداقتصادی"
              rules={[{ required: false }]}
            >
              <Ant.InputNumber
                allowClear
                showCount
                min={0}
                maxLength={14}
                style={{ width: "100%" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col
            className={selectedValueType === 2 ? "" : "hidden"}
            lg={8}
            md={12}
            sm={12}
            xs={24}
          >
            <Ant.Form.Item
              name={"legalEntityIdentity"}
              label="شناسه مالیاتی"
              rules={[{ required: false }]}
              maxLength={11}
            >
              <Ant.InputNumber min={0} style={{ width: "100%" }} />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              name={"longitude"}
              label="طول جغرافیایی"
              rules={[{ required: false }]}
            >
              <Ant.InputNumber
                min={0}
                decimalSeparator={"."}
                step={0.01}
                style={{ width: "100%" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              name={"latitude"}
              label="عرض جغرافیایی"
              rules={[{ required: false }]}
            >
              <Ant.InputNumber
                min={0}
                decimalSeparator={"."}
                step={0.01}
                style={{ width: "100%" }}
              />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              name={"email"}
              label="ایمیل"
              maxLength={100}
              rules={[
                {
                  required: false,
                  pattern: new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}"),
                  message: "لطفا ایمیل را درست وارد کنید!",
                },
              ]}
            >
              <Ant.Input />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item name="isActive" label="فعال">
              <Ant.Switch defaultChecked={false} />
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>

    </div>
  );
};
export default HeaderAddCounterParty;
HeaderAddCounterParty.propTypes = {
  from: PropTypes.any,
};

import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { PiArrowLineDownLeftLight } from "react-icons/pi";
import MyDatePicker from "@/components/common/MyDatePicker";
import * as url from "@/api/url";
import { useFetch, useFetchWithHandler } from "@/api";
import PropTypes from "prop-types";
import { validateNationalCode } from "@/Tools";
import useRequestManager from "@/hooks/useRequestManager";

//====================================================================
//                        Declaration
//====================================================================
const CounterpartyBasicInfoAdd = (prop) => {
  const { form } = prop;
  const [isIndividual, setIsIndividual] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBirthCertificateCity, setSelectedBirthCertificateCity] =
    useState(null);
  const [
    selectedCompanyRegistrationPlaceCity,
    setSelectedCompanyRegistrationPlaceCity,
  ] = useState(null);

  const [cityList, cityLoading, cityError, cityApiCall] = useFetchWithHandler();
  const [cityOptions, setCityOptions] = useState([]);

  const [provinceList, provinceLoading, provinceError] = useFetch(url.PROVINCE);
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] =
    useFetchWithHandler();
  const commonOptions = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) => option.name.indexOf(input) >= 0,
  };
  useRequestManager({ error: cityError });
  useRequestManager({ error: provinceError });
  useRequestManager({ error: maxCodeError });

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    maxCodeData?.isSuccess &&
      maxCodeData?.data &&
      form.setFieldsValue({ code: maxCodeData.data });
  }, [maxCodeData]);

  useEffect(() => {
    cityApiCall(url.CITY_TREE);
  }, []);

  useEffect(() => {
    cityList?.isSuccess && setCityOptions(cityList?.data);
    cityList?.isSuccess && form.setFieldValue("cityId", [1, 1001]);
  }, [cityList]);

  //====================================================================
  //                        Functions
  //====================================================================

  const getMaxCode = async () => {
    await maxCodeApiCall(`${url.COUNTER_PARTY_FREE_CODE}`);
  };

  function onCityChange(value, selectedOptions) {
    setSelectedCity(value);
  }

  const filterCity = (inputValue, path) =>
    path.some(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );

  const onBirthCertificatePlaceOfIssueChange = (value) => {
    setSelectedBirthCertificateCity(value);
  };

  const onCompanyRegistrationPlaceChange = (value) => {
    setSelectedCompanyRegistrationPlaceCity(value);
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
    <>
      <Ant.Card
        style={{ maxHeight: "60vh", overflow: "scroll", boxShadow: "none" }}
        bordered={false}
        className="mb-4"
      >
        <Ant.Row gutter={[16, 8]}>
          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              rules={[{ required: true }]}
              name={"counterpartyTypeId"}
              label="نوع"
            >
              <Ant.Radio.Group
                onChange={(event) => {
                  setIsIndividual(event.target.value === 1 ? true : false);
                }}
              >
                <Ant.Radio value={1}>حقیقی</Ant.Radio>
                <Ant.Radio value={2}>حقوقی</Ant.Radio>
              </Ant.Radio.Group>
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>
        <Ant.Card title={"اطلاعات پایه"} type="inner" size="small">
          <Ant.Row gutter={[16, 8]}>
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
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }, { max: 20 }]}
                name={"secondCode"}
                label="کد دوم"
              >
                <Ant.Input allowClear showCount maxLength={20} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item name="isActive" label="وضعیت">
                <Ant.Switch
                  checkedChildren="فعال"
                  unCheckedChildren="غیرفعال"
                  defaultChecked={true}
                />
              </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>
        </Ant.Card>

        <Ant.Card
          title={"اطلاعات هویتی"}
          type="inner"
          className="mt-6"
          size="small"
        >
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }, { max: 100 }]}
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

            {/*  individual counterparty */}
            {isIndividual && (
              <Ant.Col lg={8} md={12} sm={12} xs={24}>
                <Ant.Form.Item
                  rules={[{ required: false }, { max: 100 }]}
                  name={"fatherName"}
                  label="نام پدر"
                >
                  <Ant.Input allowClear showCount maxLength={100} />
                </Ant.Form.Item>
              </Ant.Col>
            )}
            {isIndividual && (
              <Ant.Col lg={8} md={12} sm={12} xs={24}>
                <Ant.Form.Item
                  name={"nationalCode"}
                  rules={[
                    {
                      required: true,
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
            )}
            {isIndividual && (
              <Ant.Col lg={8} md={12} sm={12} xs={24}>
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
            )}
            {isIndividual && (
              <Ant.Col lg={8} md={12} sm={12} xs={24}>
                <Ant.Form.Item
                  name={"birthDateCalendarId"}
                  label={"تاریخ تولد"}
                >
                  <MyDatePicker />
                </Ant.Form.Item>
              </Ant.Col>
            )}
            {isIndividual && (
              <Ant.Col lg={8} md={12} sm={12} xs={24}>
                <Ant.Form.Item
                  name={"birthCertificatePlaceOfIssueCityId"}
                  label="محل صدور شناسنامه"
                  rules={[{ required: false }]}
                >
                  <Ant.Cascader
                    loading={cityLoading}
                    options={cityOptions}
                    onChange={onBirthCertificatePlaceOfIssueChange}
                    placeholder="لطفا انتخاب کنید ..."
                    fieldNames={{
                      label: "name",
                      value: "id",
                      children: "children",
                    }}
                    showSearch={{
                      filterCity,
                    }}
                    onSearch={(value) => console.log(value)}
                    style={{ width: "100%" }}
                  />
                </Ant.Form.Item>
              </Ant.Col>
            )}

            {/*  legal counterparty */}
            {!isIndividual && (
              <Ant.Col lg={8} md={12} sm={12} xs={24}>
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
            )}
            {!isIndividual && (
              <Ant.Col lg={8} md={12} sm={12} xs={24}>
                <Ant.Form.Item
                  name={"companyRegistrationPlaceCityId"}
                  label="محل ثبت شرکت/سازمان"
                  rules={[{ required: false }]}
                >
                  <Ant.Cascader
                    loading={cityLoading}
                    options={cityOptions}
                    onChange={onCompanyRegistrationPlaceChange}
                    placeholder="لطفا انتخاب کنید ..."
                    fieldNames={{
                      label: "name",
                      value: "id",
                      children: "children",
                    }}
                    showSearch={{
                      filterCity,
                    }}
                    onSearch={(value) => console.log(value)}
                    style={{ width: "100%" }}
                  />
                </Ant.Form.Item>
              </Ant.Col>
            )}
            {!isIndividual && (
              <Ant.Col lg={8} md={12} sm={12} xs={24}>
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
            )}
            {!isIndividual && (
              <Ant.Col lg={8} md={12} sm={12} xs={24}>
                <Ant.Form.Item
                  name={"nationalCode"}
                  label="شناسه ملی"
                  rules={[{ required: false }]}
                >
                  <Ant.InputNumber
                    minLength={5}
                    maxLength={11}
                    style={{ width: "100%" }}
                  />
                </Ant.Form.Item>
              </Ant.Col>
            )}
            {!isIndividual && (
              <Ant.Col lg={8} md={12} sm={12} xs={24}>
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
            )}
            {!isIndividual && (
              <Ant.Col lg={8} md={12} sm={12} xs={24}>
                <Ant.Form.Item
                  name={"legalEntityIdentity"}
                  label="شناسه مالیاتی"
                  rules={[{ required: false }]}
                  maxLength={11}
                >
                  <Ant.InputNumber min={0} style={{ width: "100%" }} />
                </Ant.Form.Item>
              </Ant.Col>
            )}
          </Ant.Row>
        </Ant.Card>

        <Ant.Card
          title={"اطلاعات جغرافیایی"}
          type="inner"
          className="mt-6"
          size="small"
        >
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                name={"cityId"}
                label="شهر"
                rules={[{ required: true }]}
              >
                <Ant.Cascader
                  loading={cityLoading}
                  options={cityOptions}
                  onChange={onCityChange}
                  placeholder="لطفا انتخاب کنید ..."
                  fieldNames={{
                    label: "name",
                    value: "id",
                    children: "children",
                  }}
                  showSearch={{
                    filterCity,
                  }}
                  onSearch={(value) => console.log(value)}
                  style={{ width: "100%" }}
                />
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
          </Ant.Row>
        </Ant.Card>

        <Ant.Card
          title={"اطلاعات تکمیلی"}
          type="inner"
          className="mt-6"
          size="small"
        >
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                name={"email"}
                label="ایمیل"
                maxLength={100}
                rules={[
                  {
                    required: false,
                    pattern: new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}"),
                    message: "آدرس ایمیل وارد شده معتبر نیست.",
                  },
                ]}
              >
                <Ant.Input />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={12} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }, { max: 20 }]}
                name={"branchCode"}
                label="کد شعبه"
              >
                <Ant.InputNumber allowClear showCount maxLength={20} />
              </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>
        </Ant.Card>
      </Ant.Card>
    </>
  );
};
export default CounterpartyBasicInfoAdd;
CounterpartyBasicInfoAdd.propTypes = {
  from: PropTypes.any,
};

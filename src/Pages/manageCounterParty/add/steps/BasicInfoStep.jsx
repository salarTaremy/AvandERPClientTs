import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { PiArrowLineDownLeftLight } from "react-icons/pi";
import MyDatePicker from "@/components/common/MyDatePicker";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { useFetchWithHandler } from "@/api";
import { validateNationalCode } from "@/Tools";
import useRequestManager from "@/hooks/useRequestManager";
import qs from "qs";

//====================================================================
//                        Declaration
//====================================================================
export const BasicInfoStep = (props) => {
  const { form, counterpartyId } = props;
  const [isIndividual, setIsIndividual] = useState(true);
  const [counterpartyType, setCounterpartyType] = useState(1);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedBirthCertificateCity, setSelectedBirthCertificateCity] =
    useState(null);
  const [
    selectedCompanyRegistrationPlaceCity,
    setSelectedCompanyRegistrationPlaceCity,
  ] = useState(null);

  const [cityList, cityLoading, cityError, cityApiCall] = useFetchWithHandler();
  const [cityOptions, setCityOptions] = useState([]);
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] =
    useFetchWithHandler();

  const [counterpartyFetchedData, counterpartyFetchLoading, counterpartyFetchError, counterpartyFetchApiCall] =
  useFetchWithHandler();

  const commonOptions = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) => option.name.indexOf(input) >= 0,
  };
  useRequestManager({ error: cityError });
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
    counterpartyId === 0 && cityList?.isSuccess && form.setFieldValue("cityId", [1, 1002]);
  }, [cityList]);

  useEffect(() => {
    if (counterpartyId !== 0) {
      fetchCounterparty(counterpartyId);
    }
  }, [counterpartyId])

  useEffect(() => {
    const provinceId = counterpartyFetchedData?.data.provinceId;
    const cityId = counterpartyFetchedData?.data.cityId;
    const otherValues = {};
    otherValues.cityId =  [provinceId, cityId];
    // if (counterpartyFetchedData?.data.birthDateCalendarId) {
    //   const yearFrom = counterpartyFetchedData?.data.birthDateCalendarId.substr(0,4);
    //   const monthFrom = counterpartyFetchedData?.databirthDateCalendarId.substr(4,2);
    //   const dayFrom = counterpartyFetchedData?.data.birthDateCalendarId.substr(6,2);
    //   const formattedFromDate = `${yearFrom}/${monthFrom}/${dayFrom}`
    //   otherValues.birthDateCalendarId = formattedFromDate;
    // }

    // if (counterpartyFetchedData?.data.birthCertificatePlaceOfIssueCityId) {
    //   otherValues.birthCertificatePlaceOfIssueCityId = [provinceId, counterpartyFetchedData?.data.birthCertificatePlaceOfIssueCityId];
    // }

    form.setFieldsValue({
      ...(counterpartyFetchedData?.data || null),
      ...otherValues,
    });
    setSelectedCity([provinceId, cityId]);
    setIsIndividual(counterpartyFetchedData?.data.counterpartyTypeId === 1);
    setCounterpartyType(counterpartyFetchedData?.data.counterpartyTypeId);
  }, [counterpartyFetchedData])
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

  const onCounterpartyTypeChange = (event) => {
    const selectedValue = event.target.value;
    setIsIndividual(selectedValue === 1 ? true : false);
    setCounterpartyType(selectedValue);
    counterpartyId === 0 && form.resetFields();
    form.setFieldsValue({counterpartyTypeId: selectedValue});
  };

  const fetchCounterparty = async (id) => {
    await counterpartyFetchApiCall(`${url.COUNTER_PARTY}/${id}`);
  }

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
                onChange={onCounterpartyTypeChange}
              >
                <Ant.Radio value={1}>حقیقی</Ant.Radio>
                <Ant.Radio value={2}>حقوقی</Ant.Radio>
              </Ant.Radio.Group>
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>
        <Ant.Card title={"کدگذاری"} type="inner" size="small">
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
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
                rules={[{ required: false }, { max: 20 }]}
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

        <Ant.Card title={"اطلاعات هویتی"} type="inner" className="mt-6" size="small">
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: isIndividual }, { max: 100 }]}
                name={"firstName"}
                label="نام"
              >
                <Ant.Input allowClear showCount maxLength={100} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: isIndividual }, { max: 100 }]}
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

            {/*  legal counterparty */}
            {!isIndividual && (
              <Ant.Col lg={16} md={12} sm={12} xs={24}>
                <Ant.Form.Item
                  rules={[{ required: !isIndividual }, { max: 150 }]}
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
                  name={"companyRegistrationNumber"}
                  label="شماره ثبت شرکت/سازمان"
                  rules={[
                    { 
                    required: false, 
                    pattern: new RegExp("^[0-9]"),
                     message: "لطفا کد ثبت را به درستی وارد نمایید." 
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
              </Ant.Col>
            )}
            {!isIndividual && (
              <Ant.Col lg={12} md={12} sm={12} xs={24}>
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
              <Ant.Col lg={6} md={12} sm={12} xs={24}>
                <Ant.Form.Item
                  name={"economicCode"}
                  label="کداقتصادی"
                  rules={[
                    {
                      required: false,
                      pattern: new RegExp("^[0-9]"),
                      message: "کد اقتصادی نمی تواند شامل کاراکترهای غیرعددی باشد",
                    },
                  ]}
                >
                  <Ant.Input
                    allowClear
                    showCount
                    maxLength={12}
                    style={{ width: "100%" }}
                  />
                </Ant.Form.Item>
              </Ant.Col>
            )}
            {!isIndividual && (
              <Ant.Col lg={6} md={12} sm={12} xs={24}>
                <Ant.Form.Item
                  name={"legalEntityIdentity"}
                  label="شناسه ملی"
                  rules={[
                    {
                      required: !isIndividual,
                      pattern: new RegExp("^[0-9]"),
                      message: "شناسه ملی نمی تواند شامل کاراکترهای غیرعددی باشد",
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
              </Ant.Col>
            )}
          </Ant.Row>
        </Ant.Card>

        <Ant.Card title={"اطلاعات جغرافیایی"} type="inner" className="mt-6" size="small">
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col lg={12} md={12} sm={12} xs={24}>
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

            <Ant.Col lg={6} md={12} sm={12} xs={24}>
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
            <Ant.Col lg={6} md={12} sm={12} xs={24}>
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

        <Ant.Card title={"اطلاعات تکمیلی"} type="inner" className="mt-6" size="small">
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col lg={10} md={12} sm={12} xs={24}>
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
            <Ant.Col lg={6} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: false }, { max: 20 }]}
                name={"branchCode"}
                label="کد شعبه"
              >
                <Ant.InputNumber
                  allowClear
                  showCount
                  maxLength={20}
                  style={{ width: "100%" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>
        </Ant.Card>
      </Ant.Card>
    </>
  );
};

BasicInfoStep.propTypes = {
  form: PropTypes.any,
};

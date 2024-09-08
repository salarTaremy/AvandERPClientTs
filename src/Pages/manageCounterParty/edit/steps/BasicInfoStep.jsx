import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { PiArrowLineDownLeftLight } from "react-icons/pi";
import MyDatePicker, { FormatDateToDisplay } from "@/components/common/MyDatePicker";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { useFetchWithHandler, useFetch } from "@/api";
import { validateNationalCode } from "@/Tools";
import useRequestManager from "@/hooks/useRequestManager";
import CoustomContent from "@/components/common/CoustomContent";
import { COUNTERPARTY_TYPE } from "@/staticValues";
//====================================================================
//                        Declaration
//====================================================================
export const BasicInfoStep = (props) => {
  const { form, id } = props;
  const [isIndividual, setIsIndividual] = useState(true);
  const [counterpartyType, setCounterpartyType] = useState(1);
  const [cityList, cityLoading, cityError, cityApiCall] = useFetchWithHandler();
  const [cityOptions, setCityOptions] = useState([]);
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] =
    useFetchWithHandler();

  const [
    counterpartyFetchedData,
    counterpartyFetchLoading,
    counterpartyFetchError,
    counterpartyFetchApiCall,
  ] = useFetchWithHandler();

  const [
    counterpartyTypeList,
    counterpartyTypeListLoading,
    counterpartyTypeListError
  ] = useFetch(url.COUNTER_PARTY_TYPE);

  useRequestManager({ error: cityError });
  useRequestManager({ error: maxCodeError });
  useRequestManager({ error: counterpartyFetchError });
  useRequestManager({ error: counterpartyTypeListError });

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
  }, [cityList]);

  useEffect(() => {
    fetchCounterparty();
  }, []);

  useEffect(() => {
    if (counterpartyFetchedData) {
      const otherValues = {};
      //set cityId field
      if (counterpartyFetchedData.data.provinceId && counterpartyFetchedData.data.cityId) {
        const provinceId = counterpartyFetchedData.data.provinceId;
        const cityId = counterpartyFetchedData.data.cityId;
        otherValues.cityId = [provinceId, cityId];
      }

      //set birthDateCalendarId field
      if (counterpartyFetchedData.data.birthDateCalendarId) {
        const formattedBirthDate = FormatDateToDisplay(counterpartyFetchedData.data.birthDateCalendarId);
        otherValues.birthDateCalendarId = formattedBirthDate;
      }

      //set birthCertificatePlaceOfIssueCityId field
      if (counterpartyFetchedData.data.birthCertificatePlaceOfIssueCityId) {
        otherValues.birthCertificatePlaceOfIssueCityId = [
          counterpartyFetchedData.data.birthCertificatePlaceOfIssueProvinceId,
          counterpartyFetchedData.data.birthCertificatePlaceOfIssueCityId,
        ];
      }

      //set companyRegistrationPlaceCityId field
      if (counterpartyFetchedData.data.companyRegistrationPlaceCityId) {
        otherValues.companyRegistrationPlaceCityId = [
          counterpartyFetchedData.data.companyRegistrationPlaceProvinceId,
          counterpartyFetchedData.data.companyRegistrationPlaceCityId,
        ];
      }

      //set passportValidityDate field
      if (counterpartyFetchedData.data.passportValidityDate) {
        const formattedPassportValidityDate = FormatDateToDisplay(counterpartyFetchedData.data.passportValidityDate);
        otherValues.passportValidityDate = formattedPassportValidityDate;
      }

      form.setFieldsValue({
        ...(counterpartyFetchedData.data || null),
        ...otherValues,
      });

      setIsIndividual(counterpartyFetchedData.data.counterpartyTypeId !== COUNTERPARTY_TYPE.Institution);
      setCounterpartyType(counterpartyFetchedData?.data.counterpartyTypeId);
    }
  }, [counterpartyFetchedData]);

  //====================================================================
  //                        Functions
  //====================================================================

  const getMaxCode = async () => {
    await maxCodeApiCall(`${url.COUNTER_PARTY_FREE_CODE}`);
  };

  const filterCity = (inputValue, path) => {
    path.some(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
  };

  const onCounterpartyTypeChange = (selectedValue) => {
    setIsIndividual(selectedValue !== COUNTERPARTY_TYPE.Institution ? true : false);
    setCounterpartyType(selectedValue);
    form.setFieldsValue({ counterpartyTypeId: selectedValue });
  };

  const fetchCounterparty = async () => {
    await counterpartyFetchApiCall(`${url.COUNTER_PARTY}/${id}`);
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
   <CoustomContent height= "70vh"
      >
        <Ant.Skeleton active  loading={counterpartyFetchLoading}>
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                name={"counterpartyTypeId"}
                label="نوع"
              >
                <Ant.Select
                  options={counterpartyTypeList?.data}
                  loading={counterpartyTypeListLoading}
                  fieldNames={{label: "name", value: "id"}}
                  disable={counterpartyTypeListLoading || false}
                  onChange={onCounterpartyTypeChange}
                />
              </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>

          {/*** کدگذاری ***/}
          <Ant.Row gutter={[16, 8]}>
            <CoustomContent itle={"کدگذاری"} bordered size="small"  >
              {/* <Ant.Card title={"کدگذاری"} type="inner" size="small"> */}
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
                    rules={[
                      {
                        required: false,
                        pattern: new RegExp("^[0-9]*$"),
                        message:
                          "کد دوم نمی تواند شامل کاراکترهای غیرعددی باشد",
                      },
                    ]}
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
            </CoustomContent >

            {/*** اطلاعات هویتی ***/}

            <CoustomContent title={"اطلاعات هویتی"} bordered size="small">
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
                {isIndividual && counterpartyType === COUNTERPARTY_TYPE.Individual && (
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
                              return Promise.reject(
                                " کد ملی وارد شده نامعتبر است",
                              );
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
                {isIndividual && counterpartyType === COUNTERPARTY_TYPE.ForeignIndividual && (
                  <Ant.Col lg={8} md={12} sm={12} xs={24}>
                    <Ant.Form.Item
                      name={"fidaCode"}
                      rules={[
                        {
                          required: true,
                          pattern: new RegExp("^[0-9]*$"),
                          message: "کد فراگیر نمی تواند شامل کاراکترهای غیرعددی باشد",
                        },
                        {
                          validator: (_, value) => {
                            if (value?.toString().length == 9 || value?.toString().length == 12) {
                              return Promise.resolve();
                            } else {
                              return Promise.reject(
                                "کد فراگیر باید حداقل 9 و حداکثر 12 کاراکتر باشد",
                              );
                            }
                          },
                        },
                      ]}
                      label="کد فراگیر"
                    >
                      <Ant.Input allowClear showCount min={0} maxLength={12} />
                    </Ant.Form.Item>
                  </Ant.Col>
                )}
                {isIndividual && (counterpartyType ===  COUNTERPARTY_TYPE.Individual || counterpartyType ===  COUNTERPARTY_TYPE.CivicParticipation) &&  (
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
                {isIndividual && counterpartyType === COUNTERPARTY_TYPE.ForeignIndividual && (
                  <Ant.Col lg={8} md={12} sm={12} xs={24}>
                    <Ant.Form.Item
                      name={"passportNumber"}
                      label="شماره گذرنامه"
                      rules={[
                        { 
                          required: false 
                        },  
                        {
                          validator: (_, value) => {
                            if (value === null || (value !== null && value.toString().length == 9)) {
                              return Promise.resolve();
                            } else {
                              return Promise.reject(
                                "شماره گذرنامه باید 9 کاراکتر باشد",
                              );
                            }
                          },
                      },
                    ]}
                    >
                      <Ant.Input
                        allowClear
                        showCount
                        min={0}
                        maxLength={9}
                        style={{ width: "100%" }}
                      />
                    </Ant.Form.Item>
                  </Ant.Col>
                )}
                {isIndividual && counterpartyType === COUNTERPARTY_TYPE.ForeignIndividual && (
                  <Ant.Col lg={8} md={12} sm={12} xs={24}>
                    <Ant.Form.Item
                      name={"passportValidityDate"}
                      label={"تاریخ اعتبار گذرنامه"}
                    >
                      <MyDatePicker />
                    </Ant.Form.Item>
                  </Ant.Col>
                )}
                {isIndividual && (counterpartyType === COUNTERPARTY_TYPE.Individual || counterpartyType === COUNTERPARTY_TYPE.CivicParticipation) && (
                  <Ant.Col lg={8} md={12} sm={12} xs={24}>
                    <Ant.Form.Item
                      name={"birthCertificatePlaceOfIssueCityId"}
                      label="محل صدور شناسنامه"
                      rules={[{ required: false }]}
                    >
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
                          pattern: new RegExp("^[0-9]*$"),
                          message: "لطفا کد ثبت را به درستی وارد نمایید.",
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
                  </Ant.Col>
                )}
                
                <Ant.Col lg={!isIndividual && 6 || 8} md={12} sm={12} xs={24}>
                  <Ant.Form.Item
                    allowClear
                    name={"economicCode"}
                    label="کداقتصادی"
                    rules={[
                      {
                        required: false,
                        pattern: new RegExp("^[0-9]*$"),
                        message:
                          "کد اقتصادی نمی تواند شامل کاراکترهای غیرعددی باشد",
                      },
                      {
                        validator: (_, value) => {
                          if (
                            value == null || value?.toString().length == 0 ||
                            (counterpartyType == COUNTERPARTY_TYPE.Institution && value?.toString().length == 12)
                          ) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(
                              "کد اقتصادی باید حداقل 12 کاراکتر باشد",
                            );
                          }
                        },
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
                </Ant.Col>
                
                {(!isIndividual || counterpartyType === COUNTERPARTY_TYPE.CivicParticipation) && (
                  <Ant.Col lg={counterpartyType === COUNTERPARTY_TYPE.Institution && 6 || 8} md={12} sm={12} xs={24}>
                    <Ant.Form.Item
                      name={"legalEntityIdentity"}
                      label="شناسه ملی"
                      rules={[
                        {
                          required: !isIndividual,
                          pattern: new RegExp("^[0-9]*$"),
                          message:
                            "شناسه ملی نمی تواند شامل کاراکترهای غیرعددی باشد",
                        },
                        {
                          validator: (_, value) => {
                            if (value?.toString().length == 11) {
                              return Promise.resolve();
                            } else {
                              return Promise.reject(
                                "شناسه ملی باید 11 کاراکتر باشد",
                              );
                            }
                          },
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
            </CoustomContent>

            {/*** اطلاعات جغرافیایی ***/}

            <CoustomContent title={"اطلاعات جغرافیایی"} bordered size="small">
              <Ant.Row gutter={[16, 8]}>
                <Ant.Col lg={12} md={12} sm={12} xs={24}>
                  <Ant.Form.Item
                    name={"cityId"}
                    label="شهر"
                    rules={[{ required: counterpartyType !== COUNTERPARTY_TYPE.ForeignIndividual }]}
                  >
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
            </CoustomContent>

            {/*** اطلاعات تکمیلی ***/}

            <CoustomContent title={"اطلاعات تکمیلی"} bordered size="small">
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
                    rules={[
                      {
                        required: false,
                        pattern: new RegExp("^[0-9]*$"),
                        message:
                          "کد شعبه نمی تواند شامل کاراکترهای غیرعددی باشد",
                      },
                    ]}
                    name={"branchCode"}
                    label="کد شعبه"
                  >
                    <Ant.Input
                      allowClear
                      showCount
                      maxLength={10}
                      style={{ width: "100%" }}
                    />
                  </Ant.Form.Item>
                </Ant.Col>
              </Ant.Row>
            </CoustomContent>


            </Ant.Row >
        </Ant.Skeleton>
      </CoustomContent>
    </>
  );
};

BasicInfoStep.propTypes = {
  form: PropTypes.any,
  id: PropTypes.number.isRequired,
};

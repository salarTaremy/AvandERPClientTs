import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { Form } from "antd";
import * as url from "@/api/url";
import PropTypes from "prop-types";
import { useFetchWithHandler, usePutWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";

//====================================================================
//                        Declaration
//====================================================================
const FormCounterpartyAddressEdit = (props) => {
  const { onSuccess, id, key } = props;
  const [loading, setLoading] = useState(false);
  const [cityList, cityLoading, cityError, cityApiCall] = useFetchWithHandler();
  const [
    addressFetchedData,
    fetchAddressLoading,
    fetchAddressError,
    fetchAddressApiCall,
  ] = useFetchWithHandler();

  const [
    addressSavedData,
    addressSaveLoading,
    addressSaveError,
    addressSaveApiCall,
  ] = usePutWithHandler();
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [form] = Form.useForm();
  useRequestManager({ error: cityError });

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    cityApiCall(url.CITY_TREE);
  }, []);

  useEffect(() => {
    cityList?.isSuccess && setCityOptions(cityList?.data);
  }, [cityList]);

  useEffect(() => { 
    fetchAddress();
  }, [key]);

  useEffect(() => {
    const provinceId = addressFetchedData?.data.provinceId;
    const cityId = addressFetchedData?.data.cityId;
    const cityValue = { cityId: [provinceId, cityId] };
    form.setFieldsValue({
      ...(addressFetchedData?.data || null),
      ...cityValue,
    });
    setSelectedCity([provinceId, cityId]);
  }, [addressFetchedData]);

  useEffect(() => {
    addressSavedData?.isSuccess && onSuccess();
  }, [addressSavedData]);

  //====================================================================
  //                        Functions
  //====================================================================
  function onCityChange(value, selectedOptions) {
    setSelectedCity(value);
  }

  const filterCity = (inputValue, path) =>
    path.some(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );

  const fetchAddress = async () => {
    await fetchAddressApiCall(`${url.COUNTERPARTY_ADDRESS}/${id}`);
  }

  const onFinish = async (values) => {
    setLoading(true);
    const otherValues = { id: id, cityId: selectedCity[1] };
    const req = { ...values, ...otherValues };
    await addressSaveApiCall(url.COUNTERPARTY_ADDRESS, req);
    setLoading(false);
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"ویرایش آدرس"} />
      <Ant.Skeleton active loading={fetchAddressLoading}>
        <Ant.Form form={form} key={key} onFinish={onFinish} layout="vertical">
          <Ant.Space style={{ display: "unset" }}>
            <Ant.Row gutter={[16, 8]}>
              <Ant.Col lg={24} md={12} sm={12} xs={24}>
                <Ant.Form.Item
                  name={"title"}
                  label="عنوان"
                  rules={[{ required: true }]}
                  maxLength={500}
                >
                  <Ant.Input />
                </Ant.Form.Item>
              </Ant.Col>
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
                    value={selectedCity}
                  />
                </Ant.Form.Item>
              </Ant.Col>

              <Ant.Col lg={12} md={12} sm={12} xs={24}>
                <Ant.Form.Item
                  rules={[{ required: true }]}
                  name={"postalCode"}
                  label="کدپستی"
                >
                  <Ant.InputNumber maxLength={10} style={{ width: "100%" }} />
                </Ant.Form.Item>
              </Ant.Col>
              <Ant.Col lg={24} md={12} sm={12} xs={24}>
                <Ant.Form.Item
                  rules={[{ required: true }]}
                  name={"address"}
                  label="نشانی"
                  maxLength={500}
                >
                  <Ant.Input.TextArea rows={3} />
                </Ant.Form.Item>
              </Ant.Col>
            </Ant.Row>
            <Ant.Button
              loading={addressSaveLoading}
              type="primary"
              onClick={() => {
                form.submit();
              }}
              block
            >
              {"ذخیره"}
            </Ant.Button>
          </Ant.Space>
        </Ant.Form>
      </Ant.Skeleton>
    </>
  );
};

export default FormCounterpartyAddressEdit;
FormCounterpartyAddressEdit.propTypes = {
  onSuccess: PropTypes.func,
  id: PropTypes.number.isRequired,
  key: PropTypes.string.isRequired,
};
import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import { DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetch, useFetchWithHandler, usePostWithHandler } from "@/api";

import ButtonList from "@/components/common/ButtonList";
const Address = (props) => {
  const { form, sendDataToParent } = props;
  //   const [form] = Ant.Form.useForm();
  const [provinceList, provinceLoading, provinceError] = useFetch(url.PROVINCE);
  const [cityList, cityLoading, cityError] = useFetch(url.CITY);
  useRequestManager({ error: provinceError });
  useRequestManager({ error: cityError });
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      provinceId: null,
      cityId: null,
      postalCode: null,
      address: null,
      isMainAddress: false,
    },
  ]);
  const handleAdd = () => {
    const newId = addresses.length + 1;
    console.log(newId, "nnnnnn");
    setAddresses([
      ...addresses,
      {
        id: newId,
        provinceId: null,
        cityId: null,
        postalCode: null,
        address: null,
        isMainAddress: false,
      },
    ]);
  };
  const handleDelete = (id) => {
    const newAddresses = addresses.filter((address) => address.id !== id);
    setAddresses(newAddresses);
  };

  const handleChangeAddress = (value, index) => {

    const updatedAddress = [...addresses];
    updatedAddress[index].address = value;
    setAddresses(updatedAddress);
    sendDataToParent(updatedAddress)
  };
  const handleChangePostalCode = (value, index) => {
    const updatedPostalCode = [...addresses];
    updatedPostalCode[index].postalCode = value;
    setAddresses(updatedPostalCode);
    sendDataToParent(updatedPostalCode)

  };
  const handleChangeCity = (value, index) => {
    const updatedCity = [...addresses];
    updatedCity[index].cityId = value;
    setAddresses(updatedCity);

    sendDataToParent(updatedCity)
  };
  const handleChangeProvince = (value, index) => {
    const updatedProvince = [...addresses];
    updatedProvince[index].provinceId = value;
    setAddresses(updatedProvince);
    sendDataToParent(updatedProvince)
    sendDataToParent(updatedProvince)
  };
  const handleChangeIsMain = (checked, index) => {
    const updatedIsMain = [...addresses];
    updatedIsMain[index].isMainAddress = checked;
    console.log(updatedIsMain, "updatedAddress");
    setAddresses(updatedIsMain);
    sendDataToParent(updatedIsMain)
    sendDataToParent(updatedIsMain)
  };

  const handleDataList = () => {
    sendDataToParent(addresses);
  };
  return (
    <>
      {/* <Ant.Form
        layout="vertical"
        onKeyUp={handleDataList}
        form={form}
        onFinish={null}
      > */}
        {addresses.map((address, index) => (
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col lg={4} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                name={`provinceId-${index}`}
                label="استان"
              >
                <Ant.Select
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={provinceLoading || false}
                  loading={provinceLoading}
                  options={provinceList?.data}
                  onChange={(e) => handleChangeProvince(e, index)}
                  fieldNames={{ label: "name", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={4} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                name={`cityId-${index}`}
                label="شهر"
              >
                <Ant.Select
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={cityLoading || false}
                  loading={cityLoading}
                  onChange={(e) => handleChangeCity(e, index)}
                  options={cityList?.data}
                  fieldNames={{ label: "name", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>

            <Ant.Col lg={4} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: false }]}
                name={`postalCode-${index}`}
                label="کدپستی"
              >
                <Ant.InputNumber
                  value={address.postalCode}
                  onChange={(e) =>
                    (e, index)}
                  maxLength={10}
                  style={{ width: 200 }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                name={`address-${index}`}
                label="نشانی"
                maxLength={10}
              >
                <Ant.Input.TextArea
                  value={address.address}
                  onChange={(e) => handleChangeAddress(e.target.value, index)}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={4} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                name={"isMainAddress"}
                label={"آدرس اصلی"}
                rules={[{ required: false }]}
              >
                <Ant.Switch
                  checked={address.isMainAddress}
                  onChange={(checked) => handleChangeIsMain(checked, index)}
                />
                <Ant.Button
                  onClick={() => handleDelete(address.id)}
                  className="text-red-600"
                  type="text"
                  icon={<DeleteOutlined />}
                />
              </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>
        ))}
        <ButtonList onAdd={handleAdd} />
      {/* </Ant.Form> */}
    </>
  );
};
export default Address;
Address.propTypes = {
  form: PropTypes.any,
  sendDataToParent: PropTypes.any,
};

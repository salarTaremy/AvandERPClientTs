import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import { DeleteOutlined } from "@ant-design/icons";
import useRequestManager from "@/hooks/useRequestManager";
import { PlusOutlined } from "@ant-design/icons";
import { useFetch, useFetchWithHandler } from "@/api";
import qs from "qs";
import PropTypes from "prop-types";
const Address = (prop) => {
  const { form } = prop;
  const [provinceList, provinceLoading, provinceError] = useFetch(url.PROVINCE);
  const [cityList, cityLoading, cityError, cityApi] = useFetchWithHandler();
  const [idProvince, setIdProvince] = useState(null);
  const [valueCity, setValueCity] = useState(null);
  useRequestManager({ error: provinceError });
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
    cityList?.data && setValueCity(cityList?.data);
  }, [cityList?.data]);
  //====================================================================
  //                        Functions
  //====================================================================

  const handleSelectProvince = async (value, key) => {
    debugger;
    setIdProvince({ key });

    const data = form.getFieldValue("addressList");

    data[key].cityId = null;
    form.getFieldValue("addressList", [...data]);

    if (value == undefined) {
      setValueCity(null);
      form.getFieldValue({ cityId: undefined });
    } else {
      const queryString = qs.stringify({
        ProvinceId: value,
      });
      await cityApi(`${url.CITY}?${queryString}`);
      form.getFieldValue({ cityId: undefined });
    }
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Form.List name="addressList">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Ant.Space key={key} style={{ display: "unset" }}>
                <Ant.Row gutter={[16, 8]}>
                  <Ant.Col lg={4} md={12} sm={12} xs={24}>
                    <Ant.Form.Item
                      rules={[{ required: true }]}
                      {...restField}
                      name={[name, "provinceId"]}
                      label="استان"
                    >
                      <Ant.Select
                        {...commonOptions}
                        allowClear={true}
                        placeholder={"انتخاب کنید..."}
                        disabled={provinceLoading || false}
                        // onChange={handleSelectProvince}
                        onChange={(value) => handleSelectProvince(value, key)}
                        loading={provinceLoading}
                        options={provinceList?.data}
                        fieldNames={{ label: "name", value: "id" }}
                      />
                    </Ant.Form.Item>
                  </Ant.Col>
                  <Ant.Col lg={4} md={12} sm={12} xs={24}>
                    <Ant.Form.Item
                      rules={[{ required: true }]}
                      {...restField}
                      name={[name, "cityId"]}
                      label="شهر"
                    >
                      <Ant.Select
                        {...commonOptions}
                        allowClear={true}
                        placeholder={"انتخاب کنید..."}
                        disabled={
                          (idProvince?.key == key && cityLoading) || false
                        }
                        loading={cityLoading && idProvince?.key == key}
                        options={valueCity}
                        fieldNames={{ label: "name", value: "id" }}
                      />
                    </Ant.Form.Item>
                  </Ant.Col>

                  <Ant.Col lg={4} md={12} sm={12} xs={24}>
                    <Ant.Form.Item
                      rules={[{ required: false }]}
                      {...restField}
                      name={[name, "postalCode"]}
                      label="کدپستی"
                    >
                      <Ant.InputNumber maxLength={10} style={{ width: 200 }} />
                    </Ant.Form.Item>
                  </Ant.Col>
                  <Ant.Col lg={8} md={12} sm={12} xs={24}>
                    <Ant.Form.Item
                      rules={[{ required: true }]}
                      {...restField}
                      name={[name, "address"]}
                      label="نشانی"
                      maxLength={500}
                    >
                      <Ant.Input.TextArea />
                    </Ant.Form.Item>
                  </Ant.Col>
                  <Ant.Col lg={2} md={12} sm={12} xs={24}>
                    <Ant.Form.Item
                      {...restField}
                      name={[name, "isMainAddress"]}
                      label={"آدرس اصلی"}
                      rules={[{ required: false }]}
                    >
                      <Ant.Switch />
                    </Ant.Form.Item>
                  </Ant.Col>
                  <Ant.Col lg={2} md={12} sm={12} xs={24}>
                    <Ant.Button
                      className="text-red-600 mt-8"
                      type="text"
                      onClick={() => remove(name)}
                      icon={<DeleteOutlined />}
                    />
                  </Ant.Col>
                </Ant.Row>
              </Ant.Space>
            ))}
            <Ant.Form.Item>
              <Ant.Button
                className="text-green-600 border-green-600"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                اضافه کردن
              </Ant.Button>
            </Ant.Form.Item>
          </>
        )}
      </Ant.Form.List>
    </>
  );
};
export default Address;
Address.propTypes = {
  from: PropTypes.any,
};

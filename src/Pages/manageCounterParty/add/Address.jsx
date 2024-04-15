import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import { DeleteOutlined } from "@ant-design/icons";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetch, useFetchWithHandler, usePostWithHandler } from "@/api";
import ButtonList from "@/components/common/ButtonList";
const Address = () => {
  const [form] = Ant.Form.useForm();
  const [provinceList, provinceLoading, provinceError] = useFetch(url.PROVINCE);
  const [cityList, cityLoading, cityError] = useFetch(url.CITY);
  useRequestManager({ error: provinceError });
  useRequestManager({ error: cityError });
  const [addresses, setAddresses] = useState([{ id: 1 }]);
  const handleAdd = () => {

    const newId = addresses.length + 1;
    console.log(newId, "nnnnnn");
    setAddresses([...addresses, { id: newId }]);
  };
  const handleDelete = (id) => {
    const newAddresses = addresses.filter((address) => address.id !== id);
    setAddresses(newAddresses);
  };
  return (
    <>
      <ButtonList onAdd={handleAdd} />
      {addresses.map((address, index) => (
        <Ant.Form form={form}>
          <Ant.Row gutter={[16, 16]}>
            <Ant.Col lg={4} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                key={address.id}
                rules={[{ required: true }]}
                name={"provinceId"}
                label="استان"
              >
                <Ant.Select
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  disabled={provinceLoading || false}
                  loading={provinceLoading}
                  options={provinceList?.data}
                  fieldNames={{ label: "name", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={4} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                name={"cityId"}
                label="شهر"
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

            <Ant.Col lg={4} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: false }]}
                name={"postalCode"}
                label="کدپستی"
              >
                <Ant.InputNumber maxLength={10} style={{ width: 200 }} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={8} md={12} sm={12} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                name={"postalCode"}
                label="نشانی"
                maxLength={10}
              >
                <Ant.Input.TextArea />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={4} md={12} sm={12} xs={24}>
              <Ant.Form.Item label={"آدرس اصلی"} rules={[{ required: true }]}>
                <Ant.Switch />
                <Ant.Button
                  onClick={() => handleDelete(address.id)}
                  className="text-red-600"
                  type="text"
                  icon={<DeleteOutlined />}
                />
              </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>
        </Ant.Form>
      ))}
    </>
  );
};
export default Address;

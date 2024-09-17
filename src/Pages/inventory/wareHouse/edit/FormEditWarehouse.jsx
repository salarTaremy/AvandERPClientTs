import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { usePutWithHandler, useFetchWithHandler, useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import DebounceSelect from "@/components/common/DebounceSelect";
import qs from "qs";
import * as api from "@/api";
import { FaWarehouse } from "react-icons/fa6";

const FormEditWareHouse = (props) => {
  const { onSuccess, id, name } = props;
  const [loading, setLoading] = useState(false);
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  const [warehouseTypeData, warehouseTypeLoading, warehouseTypeError] = useFetch(
    url.WAREHOUSE_TYPE,
  );
  const [branchData, branchLoading, branchError] = api.useFetch(url.BRANCH_GET_WITH_PERMISSION);
  useRequestManager({ error: editError, loading: editLoading, data: editData });
  useRequestManager({ error: warehouseTypeError });
  useRequestManager({ error: branchError });

  const [form] = Ant.Form.useForm();
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getWarehouseById()
  }, []);

  useEffect(() => {
    form.resetFields()
    listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
    listData?.isSuccess && form.setFieldsValue({warehouseKeeperId: {label: listData?.data.warehouseKeeperName, value: listData?.data.warehouseKeeperId}});
  }, [listData])

  //======================================================================
  //                        Functions
  //======================================================================
  const getWarehouseById = async () => {
    await ApiCall(`${url.WAREHOUSE}/${id}`);
  }

  const onFinish = async (values) => {
    setLoading(true);
    const req = { ...values, id: id, warehouseKeeperId: values?.warehouseKeeperId?.value };
    await editApiCall(url.WAREHOUSE, req);
    setLoading(false);
    onSuccess();
  };

  const getAllCounterPartyForDropDown = async (inputValue) => {
    if (inputValue) {
      const queryString = qs.stringify({
        counterpartyName: inputValue,
      });

      const response = await api.GetAsync(
        `${url.COUNTER_PARTY_GET_FOR_DROPDOWN}?${queryString}`,
        "",
      );
      if (response?.data) {
        return response?.data.map((item) => ({
          label: `${item.counterpartyName} `,
          value: item.id,
        }));
      }
    }
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={`ویرایش '${name}'`} icon={<FaWarehouse />}/>
      <Ant.Skeleton active loading={loadingData}>
        <Ant.Form form={form} onFinish={onFinish} layout="vertical">
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col md={12} lg={12} sm={24} xs={24}>
              <Ant.Form.Item
                name="title"
                label={"نام انبار"}
                rules={[{ required: true }]}
              >
                <Ant.Input allowClear showCount maxLength={100} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col md={12} lg={12} sm={24} xs={24}>
              <Ant.Form.Item
                name="warehouseKeeperId"
                label={"نام انباردار"}
                rules={[{ required: true }]}
              >
                <DebounceSelect
                  maxCount={1}
                  placeholder="بخشی از نام  انباردار را تایپ کنید..."
                  fetchOptions={getAllCounterPartyForDropDown}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col md={12} lg={12} sm={24} xs={24}>
              <Ant.Form.Item
                name="warehouseTypeId"
                label={" نوع انبار"}
                rules={[{ required: true }]}
              >
                <Ant.Select
                  placeholder={"انتخاب کنید..."}
                  disabled={warehouseTypeLoading}
                  loading={warehouseTypeLoading}
                  options={warehouseTypeData?.data}
                  fieldNames={{ label: "title", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col md={12} lg={12} sm={24} xs={24}>
              <Ant.Form.Item
                name="branchIds"
                label={"شعب"}
                rules={[{ required: true }]}
              >
                <Ant.Select
                  placeholder={"انتخاب کنید..."}
                  mode="multiple"
                  disabled={branchLoading}
                  loading={branchLoading}
                  options={branchData?.data}
                  fieldNames={{ label: "name", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col md={12} lg={12} sm={24} xs={24}>
              <Ant.Form.Item
                name="gln"
                label={"GLN "}
                rules={[{ required: true }]}
              >
                <Ant.Input allowClear showCount maxLength={13} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col md={12} lg={12} sm={24} xs={24}>
              <Ant.Form.Item
                name="postalCode"
                label={"کد پستی"}
                rules={[{ required: true }]}
              >
                <Ant.Input allowClear showCount maxLength={10} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col md={24} lg={24} sm={24} xs={24}>
              <Ant.Form.Item
                name="address"
                label={"آدرس"}
                rules={[{ required: true }]}
              >
                <Ant.Input.TextArea allowClear showCount maxLength={400} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col md={24} lg={24} sm={24} xs={24}>
              <Ant.Form.Item
                name="description"
                label={"توضیحات"}
                rules={[{ required: true }]}
              >
                <Ant.Input.TextArea allowClear showCount maxLength={400} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col md={12} lg={12} sm={24} xs={24}>
              <Ant.Form.Item name="isActive" label="فعال">
                <Ant.Switch defaultChecked={false} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col md={12} lg={12} sm={24} xs={24}>
              <Ant.Form.Item name="isCentral" label="شعبه مرکزی">
                <Ant.Switch defaultChecked={false} />
              </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>
          <Ant.Form.Item>
            <Ant.Button
              loading={loading}
              type="primary"
              onClick={() => {
                form.submit();
              }}
              block
            >
              {"تایید"}
            </Ant.Button>
          </Ant.Form.Item>
        </Ant.Form>
      </Ant.Skeleton>
    </>
  );
}

export default FormEditWareHouse
FormEditWareHouse.propTypes = {
  onSuccess: PropTypes.func,
  obj: PropTypes.any,
  id: PropTypes.number,
  myKey: PropTypes.number,
};

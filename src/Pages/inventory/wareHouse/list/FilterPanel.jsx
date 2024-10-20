import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import PropTypes from "prop-types";
import ModalHeader from "@/components/common/ModalHeader";
import { useFetch, Get } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import DebounceSelect from "@/components/common/DebounceSelect";
import qs from "qs";

const FilterPanel = (props) => {
  const { onSubmit, filterObject } = props;
  const [warehouseTypeData, warehouseTypeLoading, warehouseTypeError] =
    useFetch(url.WAREHOUSE_TYPE);
  useRequestManager({ error: warehouseTypeError });
  const [branchData, branchLoading, branchError] = api.useFetch(
    url.BRANCH_GET_WITH_PERMISSION,
  );
  useRequestManager({ error: branchError });
  const [form] = Ant.Form.useForm();
  const commonOptions = {
    showSearch: true,
    filterOption: (input, option) => option.name.indexOf(input) >= 0,
  };

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    filterObject && form.setFieldsValue({ ...filterObject });
  }, []);

  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = (values) => {
    onSubmit({
      ...values,
    });
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
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Row gutter={[16, 8]}>
          <Ant.Col md={24} lg={24} sm={24} xs={24}>
            <Ant.Form.Item name="title" label={"نام انبار"}>
              <Ant.Input allowClear showCount maxLength={100} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={24} lg={24} sm={24} xs={24}>
            <Ant.Form.Item name="warehouseKeeperId" label={"نام انباردار"}>
              <DebounceSelect
                placeholder="بخشی از نام  انباردار را تایپ کنید..."
                fetchOptions={getAllCounterPartyForDropDown}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={24} lg={24} sm={24} xs={24}>
            <Ant.Form.Item name="warehouseTypeId" label={" نوع انبار"}>
              <Ant.Select
                placeholder={"انتخاب کنید..."}
                disabled={warehouseTypeLoading}
                loading={warehouseTypeLoading}
                options={warehouseTypeData?.data}
                fieldNames={{ label: "title", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={24} lg={24} sm={24} xs={24}>
            <Ant.Form.Item name="branchIds" label={"شعب"}>
              <Ant.Select
                {...commonOptions}
                placeholder={"انتخاب کنید..."}
                mode="multiple"
                disabled={branchLoading}
                loading={branchLoading}
                options={branchData?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={24} lg={24} sm={24} xs={24}>
            <Ant.Form.Item name="gln" label={"GLN "}>
              <Ant.Input allowClear showCount maxLength={13} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={24} lg={24} sm={24} xs={24}>
            <Ant.Form.Item name="postalCode" label={"کد پستی"}>
              <Ant.Input allowClear showCount maxLength={10} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={24} lg={24} sm={24} xs={24}>
            <Ant.Form.Item name="address" label={"آدرس"}>
              <Ant.Input allowClear showCount maxLength={400} />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col span={24}>
            <Ant.Flex justify="space-between" align="center">
              <Ant.Form.Item name="isActive" label="فعال">
                <Ant.Switch defaultChecked={false} />
              </Ant.Form.Item>

              <Ant.Form.Item name="isCentral" label="شعبه مرکزی">
                <Ant.Switch defaultChecked={false} />
              </Ant.Form.Item>
            </Ant.Flex>
          </Ant.Col>
        </Ant.Row>
        <Ant.Form.Item>
          <Ant.Button
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
    </>
  );
};

export default FilterPanel;
FilterPanel.propTypes = {
  onSubmit: PropTypes.func,
  filterObject: PropTypes.any,
};

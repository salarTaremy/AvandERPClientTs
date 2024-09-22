import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { usePutWithHandler, useFetch, useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { MinusCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons";
import ModalHeader from "@/components/common/ModalHeader";
import { FaFileInvoiceDollar } from "react-icons/fa6";
const FormSaleEffectiveFactorEdit = (props) => {
  const { onSuccess, id, myKey } = props;
  const [loading, setLoading] = useState(false);
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [
    effectiveFactorTypeData,
    effectiveFactorTypeLoading,
    effectiveFactorTypeError,
  ] = useFetch(url.SALE_EFFECTIVE_FACTOR_TYPE);
  useRequestManager({ error: editError, loading: editLoading, data: editData });
  useRequestManager({ error: effectiveFactorTypeError });
  const [form] = Ant.Form.useForm();
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getEffectiveFactorListById();
  }, []);

  useEffect(() => {
    form.resetFields();
    listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) });
  }, [listData]);
  //====================================================================
  //                        Functions
  //====================================================================
  const getEffectiveFactorListById = async () => {
    await ApiCall(`${url.SALE_EFFECTIVE_FACTOR}/${id}`);
  };

  const onFinish = async (values) => {
    setLoading(true);
    const req = { ...values, id: id };
    await editApiCall(url.SALE_EFFECTIVE_FACTOR, req);
    setLoading(false);
    onSuccess();
  };
  //====================================================================
  //                        Component
  //====================================================================

  return (
    <>
      <ModalHeader
        title={"ویرایش عامل موثر بر برگه فروش"}
        icon={<FaFileInvoiceDollar />}
      />
      <Ant.Skeleton active loading={loadingData}>
        <Ant.Form form={form} onFinish={onFinish} layout="vertical">
          <Ant.Form.Item name="name" label={"نام"} rules={[{ required: true }]}>
            <Ant.Input allowClear showCount maxLength={100} />
          </Ant.Form.Item>
          <Ant.Row gutter={12}>
            <Ant.Col span={12}>
              <Ant.Form.Item
                name="saleEffectiveOperativeTypeId"
                label={"نوع"}
                rules={[{ required: true }]}
              >
                <Ant.Select
                  placeholder={"انتخاب کنید..."}
                  disabled={effectiveFactorTypeLoading}
                  loading={effectiveFactorTypeLoading}
                  options={effectiveFactorTypeData?.data}
                  optionRender={(option) => (
                    <>
                      <Ant.Space size="small" align="center">
                        {option.data.nature == 1 && (
                          <PlusCircleTwoTone twoToneColor="#52c41a" />
                        )}
                        {option.data.nature == -1 && (
                          <MinusCircleTwoTone twoToneColor="#eb2f96" />
                        )}
                        <span>{option.data.name}</span>
                      </Ant.Space>
                    </>
                  )}
                  fieldNames={{ label: "name", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={12}>
              <Ant.Form.Item
                name="allowEdit"
                label={"مجاز به ویرایش باشد؟"}
                rules={[{ required: false }]}
              >
                <Ant.Switch />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={12}>
              <Ant.Form.Item
                defaultValue={0}
                name="percentage"
                label={"مقدار درصدی"}
              >
                <Ant.InputNumber
                  min={0}
                  max={100}
                  step={"0.01"}
                  stringMode
                  style={{ width: "100%" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={12}>
              <Ant.Form.Item
                defaultValue={0}
                name="amount"
                label={"مقدار ریالی"}
              >
                <Ant.InputNumber
                  min={0}
                  formatter={(value) =>
                    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  style={{ width: "100%" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>
          <Ant.Form.Item
            name="description"
            label={"توضیحات"}
            rules={[{ required: false }]}
          >
            <Ant.Input.TextArea rows={2} allowClear showCount maxLength={100} />
          </Ant.Form.Item>

          <Ant.Form.Item>
            <Ant.Button
              block
              type="primary"
              loading={loading}
              onClick={() => {
                form.submit();
              }}
            >
              {"تایید"}
            </Ant.Button>
          </Ant.Form.Item>
        </Ant.Form>
      </Ant.Skeleton>
    </>
  );
};

export default FormSaleEffectiveFactorEdit;
FormSaleEffectiveFactorEdit.propTypes = {
  onSuccess: PropTypes.func,
  myKey: PropTypes.number,
};

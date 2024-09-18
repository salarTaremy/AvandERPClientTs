import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { usePostWithHandler, useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { MinusCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons";
import ModalHeader from "@/components/common/ModalHeader";
import { FaFileInvoiceDollar } from "react-icons/fa6";
const FormSaleEffectiveFactorAdd = (props) => {
    const { onSuccess } = props;
    const [loading, setLoading] = useState(false);
    const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
    const [effectiveFactorTypeData, effectiveFactorTypeLoading, effectiveFactorTypeError] = useFetch(url.SALE_EFFECTIVE_FACTOR_TYPE);
    useRequestManager({ error: addError, loading: addLoading, data: addData });
    const [form] = Ant.Form.useForm();
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        addData?.isSuccess && onSuccess();
    }, [addData]);
    //====================================================================
    //                        Functions
    //====================================================================
    const onFinish = async (values) => {
        setLoading(true);
        const req = { ...values };
        await addApiCall(url.SALE_EFFECTIVE_FACTOR, req);
        setLoading(false);
    };
    //====================================================================
    //                        Component
    //====================================================================

    return (
      <>
            <ModalHeader title= {"ایجاد عامل موثر بر برگه فروش"} icon={<FaFileInvoiceDollar />}/>
        <Ant.Form form={form} onFinish={onFinish} layout="vertical">
          <Ant.Form.Item name="name" label={"نام"} rules={[{ required: true }]} >
            <Ant.Input allowClear showCount maxLength={100} />
          </Ant.Form.Item>
          <Ant.Row gutter={12}>
            <Ant.Col span={12}>
                <Ant.Form.Item name="saleEffectiveOperativeTypeId" label={"نوع"} rules={[{ required: true }]}>
                    <Ant.Select
                      placeholder={'انتخاب کنید...'}
                      disabled={effectiveFactorTypeLoading }
                      loading={effectiveFactorTypeLoading}
                      options={effectiveFactorTypeData?.data}
                      optionRender={(option) => (
                        <>
                          <Ant.Space size="small" align="center">
                            {option.data.nature == 1 && <PlusCircleTwoTone twoToneColor="#52c41a" />}
                            {option.data.nature == -1 && <MinusCircleTwoTone twoToneColor="#eb2f96"/>}
                            <span>{option.data.name}</span>
                          </Ant.Space>
                        </>
                      )}
                      fieldNames={{label: 'name', value: 'id'}}
                    />
                </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={12}>
                <Ant.Form.Item name="allowEdit" label={"مجاز به ویرایش باشد؟"} rules={[{ required: false }]}>
                    <Ant.Switch />
                </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={12}>
                <Ant.Form.Item name="percentage" label={"مقدار درصدی"} >
                    <Ant.InputNumber
                      allowClear
                      defaultValue={0}
                      min={0}
                      max={100}
                      step={"0.01"}
                      stringMode
                      style={{ width: "100%" }}
                      />
                </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={12}>
                <Ant.Form.Item name="amount" label={"مقدار ریالی"}>
                    <Ant.InputNumber
                      allowClear
                      defaultValue={0}
                      min={0}
                      formatter={(value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      style={{ width: "100%" }}
                    />
                </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>
          <Ant.Form.Item name="description" label={"توضیحات"} rules={[{ required: false }]}>
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
      </>
    );
  };

  export default FormSaleEffectiveFactorAdd;
  FormSaleEffectiveFactorAdd.propTypes = {
    onSuccess: PropTypes.func,
  };
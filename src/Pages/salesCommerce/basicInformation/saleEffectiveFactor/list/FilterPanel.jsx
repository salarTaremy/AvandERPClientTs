import React, { useEffect, useState } from "react";
import * as url from "@/api/url";
import * as api from "@/api";
import * as Ant from "antd";
import useRequestManager from '@/hooks/useRequestManager'
import { MinusCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons";

//====================================================================
//                        Declaration
//====================================================================
const FilterPanel = (props) => {
    const [form] = Ant.Form.useForm();
    const [effectiveFactorTypeData, effectiveFactorTypeLoading, effectiveFactorTypeError] = api.useFetch(url.SALE_EFFECTIVE_FACTOR_TYPE);
    const { onSubmit, filterObject } = props;
    useRequestManager({ error: effectiveFactorTypeError });

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
        onSubmit({ ...values });
    }

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical" onFinishFailed={null}>
            <Ant.Form.Item name={'name'} label="عنوان">
                    <Ant.Input allowClear  showCount maxLength={100} style={{ width: "100%" }}/>
                </Ant.Form.Item>
                <Ant.Form.Item name={'saleEffectiveOperativeTypeId'} label="نوع">
                    <Ant.Select
                        allowClear={true}
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
                <Ant.Form.Item>
                    <Ant.Button
                        block
                        type="primary"
                        onClick={() => form.submit()}
                    >
                        {'اعمال'}
                    </Ant.Button>
                </Ant.Form.Item>
            </Ant.Form>
        </>
    )
}

export default FilterPanel;
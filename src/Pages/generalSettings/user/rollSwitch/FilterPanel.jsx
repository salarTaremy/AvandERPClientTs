import React, { useEffect } from 'react'
import * as Ant from 'antd'
import { PropTypes } from 'prop-types'
import useRequestManager from "@/hooks/useRequestManager";
import * as url from "@/api/url";
import * as api from "@/api";


const FilterPanel = (props) => {
    const { onSubmit, filterObject } = props
    const [form] = Ant.Form.useForm()
    const [roleData, roleLoading, roleError] = api.useFetch(url.ROLE_SCOPE);
    useRequestManager({ error: roleError });
    const commonOptions = {
        showSearch: true,
        filterOption: (input, option) => option.persianTitle.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    };


    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        filterObject && form.setFieldsValue({ ...filterObject })
    }, [])

    //====================================================================
    //                        Functions
    //====================================================================
    const onFinish = (values) => {
        onSubmit({
            ...values,
        })
    }

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical" onFinishFailed={null}>
                <Ant.Form.Item
                    name={"persianTitle"}
                    label=" محدوده نقش"
                    valuePropName="checked"
                >
                    <Ant.Select
                        {...commonOptions}
                        allowClear={true}
                        placeholder={"انتخاب کنید..."}
                        disabled={roleLoading}
                        loading={roleLoading}
                        options={roleData?.data}
                        fieldNames={{ label: "persianTitle", value: "persianTitle" }}
                    />
                </Ant.Form.Item>
                <Ant.Form.Item name={'rolePersianTitle'} label="نام نقش ">
                    <Ant.Input allowClear />
                </Ant.Form.Item>
                <Ant.Button
                    block
                    type="primary"
                    onClick={() => {
                        form.submit()
                    }}
                >
                    {'اعمال'}
                </Ant.Button>

            </Ant.Form>
        </>
    )
}

export default FilterPanel
FilterPanel.propTypes = {
    onSubmit: PropTypes.func,
    filterObject: PropTypes.any,
}


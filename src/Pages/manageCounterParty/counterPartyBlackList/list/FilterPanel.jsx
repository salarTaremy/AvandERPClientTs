import React, { useEffect } from 'react'
import * as Ant from 'antd'
import { PropTypes } from 'prop-types'
import MyDatePicker from "@/components/common/MyDatePicker";
import { useFetch } from "@/api";
import * as url from '@/api/url'
import useRequestManager from '@/hooks/useRequestManager'



const FilterPanel = (props) => {
    const { onSubmit, filterObject } = props
    const [form] = Ant.Form.useForm()
    const [stateData, stateLoading, stateError] = useFetch(url.COUNTER_PARTY_BLACK_LIST_STATE);
    useRequestManager({ error: stateError });
    const commonOptions = {
        showSearch: true,
        filterOption: (input, option) => option.title.indexOf(input) >= 0,
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
            dateCalendarId: parseInt(values?.dateCalendarId?.toString().replace(/\//g, '')),
        })
    }

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical" onFinishFailed={null}>
                <Ant.Form.Item name={"dateCalendarId"} label="تاریخ" >
                    <MyDatePicker />
                </Ant.Form.Item>
                <Ant.Form.Item
                    name={"counterpartyBlackListStateId"}
                    label="وضعیت"
                    valuePropName="checked"
                >
                    <Ant.Select
                        {...commonOptions}
                        allowClear={true}
                        placeholder={"انتخاب کنید..."}
                        disabled={stateLoading || false}
                        loading={stateLoading}
                        options={stateData?.data}
                        fieldNames={{ label: "title", value: "id" }}
                    />
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

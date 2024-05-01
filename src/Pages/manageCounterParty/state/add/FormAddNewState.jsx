import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import useRequestManager from '@/hooks/useRequestManager'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import MyDatePicker from "@/components/common/MyDatePicker";
import { useFetch, usePostWithHandler } from "@/api";


const FormAddNewState = (props) => {
    const { onSuccess } = props
    const [loading, setLoading] = useState(false)
    const [addData, addLoading, addError, addApiCall] = usePostWithHandler()
    useRequestManager({ error: addError, loading: addLoading, data: addData })
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
        addData?.isSuccess && onSuccess()
    }, [addData])

    //====================================================================
    //                        Functions
    //====================================================================
    const onFinish = async (values) => {
        setLoading(true)
        const req = {
            ...values,
            dateCalendarId: parseInt(values?.dateCalendarId?.toString().replace(/\//g, '')),
        }
        console.log('req', req)
        await addApiCall(url.COUNTER_PARTY_BLACK_LIST, req)
        setLoading(false)
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                <Ant.Row>
                    <Ant.Col span={24}>
                        {'ایجاد وضعیت جدید طرف حساب '}
                        <Ant.Divider />
                    </Ant.Col>
                </Ant.Row>
                <Ant.Form.Item name={"dateCalendarId"} label="تاریخ" rules={[{ required: true }]}>
                    <MyDatePicker />
                </Ant.Form.Item>
                <Ant.Form.Item
                    name={"counterpartyBlackListStateId"}
                    label="وضعیت"
                    valuePropName="checked"
                    rules={[{ required: true }]}
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
                <Ant.Form.Item name={'description'} label="توضیحات" rules={[{ required: true }]}>
                    <Ant.Input.TextArea allowClear showCount maxLength={400} />
                </Ant.Form.Item>
                <Ant.Form.Item>
                    <Ant.Button block
                        type="primary"
                        loading={loading}
                        onClick={() => {
                            form.submit()
                        }}>
                        {'تایید'}
                    </Ant.Button>
                </Ant.Form.Item>
            </Ant.Form>
        </>
    )
}

export default FormAddNewState
FormAddNewState.propTypes = {
    onSuccess: PropTypes.func,
    counterPartyId: PropTypes.int,
}

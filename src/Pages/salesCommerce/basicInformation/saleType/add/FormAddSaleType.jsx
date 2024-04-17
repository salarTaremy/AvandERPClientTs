import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import {
    usePostWithHandler,
    useFetch
} from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import PropTypes from 'prop-types'
import * as url from '@/api/url'

const FormAddSaleType = (props) => {
    const { onSuccess } = props
    const [loading, setLoading] = useState(false)
    const [addData, addLoading, addError, addApiCall] = usePostWithHandler()
    useRequestManager({ error: addError, loading: addLoading, data: addData })
    const [currencyData, currencyLoading, currencyError] = useFetch(url.CURRENCY);
    useRequestManager({ error: currencyError });
    const [form] = Ant.Form.useForm()

    const commonOptions = {
        showSearch: true,
        filterOption: (input, option) => option.persianTitle.indexOf(input) >= 0,
    };
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        form.setFieldValue('isActive', true)
    }, [form])

    useEffect(() => {
        addData?.isSuccess && onSuccess()
    }, [addData])
    //====================================================================
    //                        Functions
    //====================================================================
    const onFinish = async (values) => {
        setLoading(true)
        const req = { ...values }
        await addApiCall(url.SALETYPE, req)
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
                        {'ایجاد نوع فروش جدید '}
                        <Ant.Divider />
                    </Ant.Col>
                </Ant.Row>
                <Ant.Form.Item name="title" label={'عنوان فروش'} rules={[{ required: true }]}>
                    <Ant.Input allowClear showCount maxLength={200} />
                </Ant.Form.Item>
                <Ant.Form.Item
                    name={"defaultCurrencyId"}
                    label="نام ارز"
                    valuePropName="checked"
                >
                    <Ant.Select
                        {...commonOptions}
                        allowClear={true}
                        placeholder={"انتخاب کنید..."}
                        disabled={currencyLoading || false}
                        loading={currencyLoading}
                        options={currencyData?.data}
                        fieldNames={{ label: "persianTitle", value: "id" }}
                    />
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

export default FormAddSaleType
FormAddSaleType.propTypes = {
    onSuccess: PropTypes.func,
}

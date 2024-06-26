import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import {
    usePutWithHandler,
    useFetch,
    useFetchWithHandler
} from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
const FormEditSaleType = (props) => {
    const { onSuccess, id } = props
    const [loading, setLoading] = useState(false)
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: editError, loading: editLoading, data: editData })
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
        getSaleTypeById()
    }, []);

    useEffect(() => {
        form.resetFields()
        listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
    }, [listData])
    //=====================================================================
    //                        Functions
    //=====================================================================
    const getSaleTypeById = async () => {
        await ApiCall(`${url.SALETYPE}/${id}`);
    };

    const onFinish = async (values) => {
        setLoading(true)
        const req = { ...values, id: id }
        await editApiCall(url.SALETYPE, req)
        setLoading(false)
        onSuccess()
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={'ویرایش نوع فروش '} />
            <Ant.Skeleton loading={loadingData}>
                <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                    <Ant.Form.Item name="title" label={'عنوان فروش'} rules={[{ required: true }]}>
                        <Ant.Input allowClear showCount maxLength={200} />
                    </Ant.Form.Item>
                    <Ant.Form.Item
                        name={"defaultCurrencyId"}
                        label="نام ارز"
                        valuePropName="checked"
                        rules={[{ required: true }]}
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
                            }}
                        >
                            {'تایید'}
                        </Ant.Button>
                    </Ant.Form.Item>
                </Ant.Form>
            </Ant.Skeleton>
        </>
    )
}

export default FormEditSaleType
FormEditSaleType.propTypes = {
    onFinish: PropTypes.func,
    onSuccess: PropTypes.func,
    obj: PropTypes.any,
    id: PropTypes.number,
    loading: PropTypes.bool,
}

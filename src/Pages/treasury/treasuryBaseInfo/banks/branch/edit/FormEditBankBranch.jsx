import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import { usePutWithHandler, useFetchWithHandler, useFetch } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import * as styles from "@/styles";

const FormEditBranch = (props) => {
    const { onSuccess, obj, id, name, bankTitle, bankId } = props
    const [loading, setLoading] = useState(false)
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    useRequestManager({ error: editError, loading: editLoading, data: editData })
    const [form] = Ant.Form.useForm()
    const [provinceData, provinceLoading, provinceError] = useFetch(url.PROVINCE)
    useRequestManager({ error: provinceError })
    const [cityData, cityLoading, cityError, cityApiCall] = useFetchWithHandler()
    useRequestManager({ error: cityError })
    const [selectedProvince, setSelectedProvince] = useState(null)
    const commonOptions = {
        showSearch: true,
        filterOption: (input, option) => option.name.indexOf(input) >= 0,
    };
    const handleOnChange = (val, option) => {
        form.setFieldsValue({ cityId: undefined })
        setSelectedProvince(option.id)
    }

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        form.resetFields()
        form.setFieldsValue({ ...obj })
    }, [obj])

    useEffect(() => {
        editData?.isSuccess && onSuccess()
    }, [editData])

    useEffect(() => {
        selectedProvince && cityApiCall(`${url.CITY}?provinceId=${selectedProvince}`)
    }, [selectedProvince])

    //=====================================================================
    //                        Functions
    //=====================================================================
    const onFinish = async (values) => {
        console.log(values, 'values')
        setLoading(true)
        const req = {
            ...values,
            id: id,
            bankId: bankId
        }
        await editApiCall(url.BANKBRANCH, req)
        setLoading(false)
    }

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <br></br>
            <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} title={`ویرایش بانک "${bankTitle}" شعبه "${name}"`} type="inner" loading={loading}>
                <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                    <Ant.Form.Item name={'code'} label="کد شعبه" rules={[{ required: true }]}>
                        <Ant.Input allowClear showCount maxLength={100} />
                    </Ant.Form.Item>
                    <Ant.Form.Item name={'name'} label="نام شعبه" rules={[{ required: true }]}>
                        <Ant.Input allowClear showCount maxLength={100} />
                    </Ant.Form.Item>
                    <Ant.Form.Item name={'provinceId'} label="نام استان" rules={[{ required: true }]}>
                        <Ant.Select
                            {...commonOptions}
                            onChange={handleOnChange}
                            placeholder={"انتخاب کنید..."}
                            allowClear={true}
                            disabled={provinceLoading || false}
                            loading={provinceLoading}
                            options={provinceData?.data}
                            fieldNames={{ label: 'name', value: 'id' }}
                        />
                    </Ant.Form.Item>
                    <Ant.Form.Item name={'cityId'} label="نام شهر" rules={[{ required: true }]}>
                        <Ant.Select
                            {...commonOptions}
                            placeholder={"انتخاب کنید..."}
                            allowClear={true}
                            disabled={cityLoading || false}
                            loading={cityLoading}
                            options={cityData?.data}
                            fieldNames={{ label: 'name', value: 'id' }}
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
            </Ant.Card>
        </>
    )
}

export default FormEditBranch
FormEditBranch.propTypes = {
    onFinish: PropTypes.func,
    onSuccess: PropTypes.func,
    obj: PropTypes.any,
    id: PropTypes.number,
    loading: PropTypes.bool,
}
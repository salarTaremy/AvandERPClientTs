import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import useRequestManager from '@/hooks/useRequestManager'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import {
    useFetch,
    usePostWithHandler,
    useFetchWithHandler
} from "@/api";
import ModalHeader from "@/components/common/ModalHeader";
const FormAddNewBranch = (props) => {
    const { onSuccess, bankId } = props
    const [loading, setLoading] = useState(false)
    const [addData, addLoading, addError, addApiCall] = usePostWithHandler()
    useRequestManager({ error: addError, loading: addLoading, data: addData })
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
        addData?.isSuccess && onSuccess()
    }, [addData])

    useEffect(() => {
        setSelectedProvince(addData?.data.provinceId)
    }, [addData?.data.provinceId])

    useEffect(() => {
        selectedProvince && cityApiCall(`${url.CITY}?provinceId=${selectedProvince}`)
    }, [selectedProvince])

    //====================================================================
    //                        Functions
    //====================================================================
    const onFinish = async (values) => {
        setLoading(true)
        const req = {
            ...values,
            bankId: bankId
        }
        await addApiCall(url.BANKBRANCH, req)
        setLoading(false)
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={'ایجاد شعبه جدید'} />
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
                        }}>
                        {'تایید'}
                    </Ant.Button>
                </Ant.Form.Item>
            </Ant.Form>
        </>
    )
}

export default FormAddNewBranch
FormAddNewBranch.propTypes = {
    onSuccess: PropTypes.func,
    counterPartyId: PropTypes.number,
}


import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import { usePutWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'

const FormResetPasswordUser = (props) => {
    const { onSuccess, obj, id } = props
    const [loading, setLoading] = useState(false)
    const [form] = Ant.Form.useForm()
      const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    useRequestManager({ error: editError, loading: editLoading, data: editData })
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
    //=====================================================================
    //                        Functions
    //=====================================================================
    const onFinish = async (values) => {
        console.log(values, 'values')
        setLoading(true)
        const req = { ...values, id: id }
        await editApiCall(url.USER_RESET_PASSWORD, req)
        setLoading(false)
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">
            <Ant.Form.Item name="userName" label={'نام کاربری'} >
                    <Ant.Input allowClear showCount maxLength={200} disabled/>
                </Ant.Form.Item>
                <Ant.Form.Item name="password" label={'رمز عبور'} rules={[{ required: true }]}>
                    <Ant.Input allowClear showCount maxLength={200} />
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
        </>
    )
}

export default FormResetPasswordUser
FormResetPasswordUser.propTypes = {
    onFinish: PropTypes.func,
    onSuccess: PropTypes.func,
    obj: PropTypes.any,
    id: PropTypes.number,
    loading: PropTypes.bool,
}
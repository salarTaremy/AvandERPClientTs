import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import { usePutWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'

const FormEditUser = (props) => {
    const { onSuccess, obj, id } = props
    const [loading, setLoading] = useState(false)
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    useRequestManager({ error: editError, loading: editLoading, data: editData })
    const [form] = Ant.Form.useForm()
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        form.setFieldValue('isActive', true)
    }, [form])
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
        await editApiCall(url.USER, req)
        setLoading(false)
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                <Ant.Form.Item name="createDate" label={'تاریخ ایجاد'} rules={[{ required: true }]}>
                    <Ant.Input allowClear showCount maxLength={200} />
                </Ant.Form.Item>
                <Ant.Form.Item name="userName" label={'نام کاربری'} rules={[{ required: true }]}>
                    <Ant.Input allowClear showCount maxLength={200} />
                </Ant.Form.Item>
                <Ant.Col span={24} >
                    <Ant.Flex justify={'right'} align={'right'}>
                        <Ant.Form.Item name="isActive" valuePropName="checked">
                            <Ant.Checkbox checked>{'فعال'}</Ant.Checkbox>
                        </Ant.Form.Item>
                    </Ant.Flex>
                </Ant.Col>
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

export default FormEditUser
FormEditUser.propTypes = {
    onFinish: PropTypes.func,
    onSuccess: PropTypes.func,
    obj: PropTypes.any,
    id: PropTypes.number,
    loading: PropTypes.bool,
}

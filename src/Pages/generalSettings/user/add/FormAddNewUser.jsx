import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import { usePostWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import ModalHeader from "@/components/common/ModalHeader";
import { FaUserPlus } from "react-icons/fa6";

const FormAddNewUser = (props) => {
    const { onSuccess } = props
    const [loading, setLoading] = useState(false)
    const [addData, addLoading, addError, addApiCall] = usePostWithHandler()
    useRequestManager({ error: addError, loading: addLoading, data: addData })
    const [form] = Ant.Form.useForm()
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
        await addApiCall(url.USER, req)
        setLoading(false)
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">

                <ModalHeader title={'ایجاد کاربر جدید '} icon={<FaUserPlus />} />
                <Ant.Form.Item name="userName" label={'نام کاربری'} rules={[{ required: true }]}>
                    <Ant.Input allowClear showCount maxLength={50} />
                </Ant.Form.Item>
                <Ant.Form.Item name="passwordHash" label={'رمز عبور'} rules={[{ required: true }]}>
                    <Ant.Input allowClear showCount maxLength={200} />
                </Ant.Form.Item>
                <Ant.Col span={24} >
                    <Ant.Flex justify={'right'} align={'right'}>
                        <Ant.Form.Item name="isActive" label=" " valuePropName="checked">
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
                        }}>
                        {'تایید'}
                    </Ant.Button>
                </Ant.Form.Item>
            </Ant.Form>
        </>
    )
}

export default FormAddNewUser
FormAddNewUser.propTypes = {
    onSuccess: PropTypes.func,
}

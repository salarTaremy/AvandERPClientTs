import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import { usePostWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import ModalHeader from "@/components/common/ModalHeader";
const FormAddNewBanks = (props) => {
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
        await addApiCall(url.BANK, req)
        setLoading(false)
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">

                <ModalHeader title=  {'ایجاد بانک جدید'}/>
                <Ant.Form.Item name="title" label={'عنوان'} rules={[{ required: true }]}>
                    <Ant.Input allowClear showCount maxLength={200} />
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

export default FormAddNewBanks
FormAddNewBanks.propTypes = {
    onSuccess: PropTypes.func,
}


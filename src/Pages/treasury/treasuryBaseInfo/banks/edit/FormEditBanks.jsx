import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import { usePutWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import * as styles from "@/styles";

const FormEditBanks = (props) => {
    const { onSuccess, obj, id, bankTitle } = props
    const [loading, setLoading] = useState(false)
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    useRequestManager({ error: editError, loading: editLoading, data: editData })
    const [form] = Ant.Form.useForm()

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
        setLoading(true)
        const req = { ...values, id: id }
        await editApiCall(url.BANk, req)
        setLoading(false)
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <br></br>
            <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} title={`ویرایش بانک "${bankTitle}"`} type="inner" loading={loading}>
                <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                    <Ant.Form.Item name="title" label={'نام بانک'} rules={[{ required: true }]}>
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
            </Ant.Card>
        </>
    )
}

export default FormEditBanks
FormEditBanks.propTypes = {
    onFinish: PropTypes.func,
    onSuccess: PropTypes.func,
    obj: PropTypes.any,
    id: PropTypes.number,
    loading: PropTypes.bool,
}


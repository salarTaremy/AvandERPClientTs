import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import { usePutWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
const FormEditBranch = (props) => {
    const { onSuccess, obj, id } = props
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
        console.log(values, 'values')
        setLoading(true)
        const req = { ...values, id: id }
        await editApiCall(url.BRANCH, req)
        setLoading(false)
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
                 <ModalHeader title={"ویرایش شعبه "} />
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                <Ant.Form.Item name="name" label={'نام شعبه'} rules={[{ required: true }]}>
                    <Ant.Input allowClear showCount maxLength={200} />
                </Ant.Form.Item>
                <Ant.Form.Item name="address" label={'آدرس'} rules={[{ required: true }]}>
                    <Ant.Input allowClear showCount maxLength={600} />
                </Ant.Form.Item>
                <Ant.Form.Item name="description" label="توضیحات" rules={[{ required: false }]}>
                    <Ant.Input.TextArea allowClear showCount maxLength={400} />
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

export default FormEditBranch
FormEditBranch.propTypes = {
    onFinish: PropTypes.func,
    onSuccess: PropTypes.func,
    obj: PropTypes.any,
    id: PropTypes.number,
    loading: PropTypes.bool,
}
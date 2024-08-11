import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import { usePutWithHandler, useFetchWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import { PiMedalFill } from "react-icons/pi";

const FormEditCustomerGrade = (props) => {
    const { onSuccess, id } = props
    const [loading, setLoading] = useState(false)
    const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    useRequestManager({ error: editError, loading: editLoading, data: editData })
    const [form] = Ant.Form.useForm()

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getCustomerGradeById()
    }, []);

    useEffect(() => {
        form.resetFields()
        listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
    }, [listData])
    //=====================================================================
    //                        Functions
    //=====================================================================
    const getCustomerGradeById = async () => {
        await ApiCall(`${url.CUSTOMER_GRADE}/${id}`);
    }

    const onFinish = async (values) => {
        setLoading(true)
        const req = { ...values, id: id }
        await editApiCall(url.CUSTOMER_GRADE, req)
        setLoading(false)
        onSuccess()
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={'ویرایش رتبه مشتری '} icon={<PiMedalFill />} />
            <Ant.Skeleton active loading={loadingData}>
                <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                    <Ant.Form.Item name="title" label={'عنوان'} rules={[{ required: true }]}>
                        <Ant.Input allowClear showCount maxLength={200} />
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
            </Ant.Skeleton>
        </>
    )
}

export default FormEditCustomerGrade
FormEditCustomerGrade.propTypes = {
    onFinish: PropTypes.func,
    onSuccess: PropTypes.func,
    obj: PropTypes.any,
    id: PropTypes.number,
    loading: PropTypes.bool,
}


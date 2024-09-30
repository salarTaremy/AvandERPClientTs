import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import * as url from '@/api/url'
import { usePutWithHandler, useFetchWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import { FaBarcode } from "react-icons/fa6";
import PropTypes from 'prop-types'
import MyDatePicker from "@/components/common/MyDatePicker";

const FormEditBatchNumber = (props) => {
    const { onSuccess, id } = props
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: editError, loading: editLoading, data: editData })
    useRequestManager({ error: error })
    const [form] = Ant.Form.useForm()
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getBatchNumberById()
    }, []);

    useEffect(() => {
        form.resetFields()
        listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
    }, [listData])

    //====================================================================
    //                        Functions
    //======================================================================
    const getBatchNumberById = async () => {
        await ApiCall(`${url.BATCH_NUMBER}/${id}`)
    }

    const onFinish = async (values) => {

        const req = {
            ...values,
            id: id,
            productionDateCalendarId: values?.productionDate?.toString().replace(/\//g, ''),
            expiryDateCalendarId: values?.expiryDate?.toString().replace(/\//g, ''),
        }
        await editApiCall(url.BATCH_NUMBER, req)
        onSuccess()
    }

    //====================================================================
    //                        Child Components
    //====================================================================

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={'ویرایش سری ساخت'} icon={<FaBarcode />} />
            <Ant.Skeleton active loading={loadingData}>
                <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                    <Ant.Space>
                        <Ant.Form.Item name="batchNumber" label={'سری ساخت'} rules={[{ required: true }]}>
                            <Ant.Input allowClear showCount maxLength={100} />
                        </Ant.Form.Item>
                        <Ant.Form.Item name="shelfLife" label={'عمر مفید'} rules={[{ required: true }]}>
                            <Ant.Input allowClear showCount maxLength={100} />
                        </Ant.Form.Item>
                    </Ant.Space>
                    <Ant.Space>
                        <Ant.Form.Item name="productionDate" label={'تاریخ تولید'} rules={[{ required: true }]}>
                            <MyDatePicker />
                        </Ant.Form.Item>
                        <Ant.Form.Item name="expiryDate" label={'تاریخ انقضا'} rules={[{ required: true }]}>
                            <MyDatePicker />
                        </Ant.Form.Item>
                    </Ant.Space>
                    <Ant.Form.Item>
                        <Ant.Button
                            type="primary"
                            onClick={() => {
                                form.submit()
                            }}
                            block
                        >
                            {'تایید'}
                        </Ant.Button>
                    </Ant.Form.Item>
                </Ant.Form>
            </Ant.Skeleton>
        </>
    )
}
export default FormEditBatchNumber
FormEditBatchNumber.propTypes = {
    onSuccess: PropTypes.func,
    obj: PropTypes.any,
    id: PropTypes.number,
    myKey: PropTypes.number,
}

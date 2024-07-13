import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import * as url from '@/api/url'
import { MdPriceChange } from "react-icons/md";
import { useFetchWithHandler } from '@/api'
import { usePostWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import MyDatePicker from "@/components/common/MyDatePicker";
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

const FormCopyPriceCircularHeader = (props) => {
    const { onSuccess, id } = props
    const [loading, setLoading] = useState(false)
    const [addtData, addLoading, addError, addApiCall] = usePostWithHandler()
    const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: addError, loading: addLoading, data: addtData })
    const [implementationTime, setImplementationTime] = useState(null)
    const [form] = Ant.Form.useForm()

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getPriceCircularListById()
    }, []);

    useEffect(() => {
        form.resetFields()
        const timeData = { implementationTime: dayjs(listData?.data?.implementationTime, 'HH:mm:ss') };
        listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null), ...(listData?.data ? timeData : null) })
    }, [listData])

    //====================================================================
    //                        Functions
    //======================================================================
    const getPriceCircularListById = async () => {
        await ApiCall(`${url.PRICE_CIRCULAR_HEADER}/${id}`)
    }

    const onFinish = async (values) => {
        setLoading(true)
        const req = {
            ...values,
            id: id,
            implementationDateCalendarId: values?.implementationDate?.toString().replace(/\//g, ''),
            implementationTime: implementationTime
        }
        await addApiCall(url.PRICE_CIRCULAR_HEADER_CREATE_COPY, req)
        setLoading(false)
        onSuccess()
    }

    const timePickerOnChange = (time, timeString) => {
        setImplementationTime(timeString);
    }

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={"کپی و ایجاد بخشنامه قیمت جدید"} icon={<MdPriceChange />} />
            <Ant.Skeleton loading={loadingData}>
                <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                    <Ant.Row gutter={8}>
                        <Ant.Col span={12}>
                            <Ant.Form.Item
                                name={'implementationDate'}
                                label="تاریخ اجرا"
                                rules={[{ required: true }]}
                            >
                                <MyDatePicker />
                            </Ant.Form.Item>
                        </Ant.Col>
                        <Ant.Col span={12}>
                            <Ant.Form.Item
                                name={'implementationTime'}
                                label="ساعت اجرا"
                                rules={[{ required: true }]}
                            >
                                <TimePicker onChange={timePickerOnChange} style={{ width: "100%" }} />
                            </Ant.Form.Item>
                        </Ant.Col>
                    </Ant.Row>

                    <Ant.Form.Item>
                        <Ant.Button
                            loading={loading}
                            type="primary"
                            onClick={() => {
                                form.submit();
                            }}
                            block
                        >
                            {"ایجاد و ذخیره"}
                        </Ant.Button>
                    </Ant.Form.Item>
                </Ant.Form>
            </Ant.Skeleton>
        </>
    );
}

export default FormCopyPriceCircularHeader

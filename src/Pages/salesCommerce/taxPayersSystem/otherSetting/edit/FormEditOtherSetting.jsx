import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import { usePutWithHandler, useFetchWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import { IoMdSettings } from "react-icons/io";

const FormEditOtherSetting = (props) => {
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
        getAuthInformationById()
    }, []);

    useEffect(() => {
        form.resetFields()
        listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
    }, [listData])
    //=====================================================================
    //                        Functions
    //=====================================================================
    const getAuthInformationById = async () => {
        await ApiCall(`${url.TPS_CONFIG}/${id}`);
    };

    const onFinish = async (values) => {
        setLoading(true)
        const req = { ...values, id: id }
        await editApiCall(url.TPS_CONFIG, req)
        setLoading(false)
        onSuccess()
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={"ویرایش تنظیمات "} icon={<IoMdSettings />} />
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                <Ant.Form.Item
                    name="title"
                    label={"عنوان"}
                    rules={[{ required: true }]}
                >
                    <Ant.Input allowClear showCount maxLength={150} />
                </Ant.Form.Item>
                <Ant.Form.Item
                    name="value"
                    label={"مقدار"}
                    rules={[{ required: true }]}
                >
                    <Ant.Input allowClear showCount maxLength={50} />
                </Ant.Form.Item>
                <Ant.Form.Item
                    name="description"
                    label={"توضیحات"}
                    rules={[{ required: true }]}
                >
                    <Ant.Input.TextArea allowClear showCount maxLength={500} />
                </Ant.Form.Item>
                <Ant.Form.Item>
                    <Ant.Button
                        block
                        type="primary"
                        loading={loading}
                        onClick={() => {
                            form.submit();
                        }}
                    >
                        {"تایید"}
                    </Ant.Button>
                </Ant.Form.Item>
            </Ant.Form>
        </>
    );
}

export default FormEditOtherSetting
FormEditOtherSetting.propTypes = {
    onFinish: PropTypes.func,
    onSuccess: PropTypes.func,
    obj: PropTypes.any,
    id: PropTypes.number,
    loading: PropTypes.bool,
}

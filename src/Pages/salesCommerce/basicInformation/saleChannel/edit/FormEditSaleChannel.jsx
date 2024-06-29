import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import { usePutWithHandler, useFetchWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import { BiSolidCategory } from "react-icons/bi";

const FormEditSaleChannel = (props) => {
    const { onSuccess, obj, id } = props
    const [loading, setLoading] = useState(false)
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: editError, loading: editLoading, data: editData })
    const [form] = Ant.Form.useForm()

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getSaleChannelById()
    }, []);

    useEffect(() => {
        form.resetFields()
        listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
    }, [listData])
    //=====================================================================
    //                        Functions
    //=====================================================================
    const getSaleChannelById = async () => {
        await ApiCall(`${url.SALE_CHANNEL}/${id}`)
    };

    const onFinish = async (values) => {
        setLoading(true)
        const req = { ...values, id: id }
        await editApiCall(url.SALE_CHANNEL, req)
        setLoading(false)
        onSuccess()
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={'ویرایش کانال فروش '} icon={<BiSolidCategory />} />
            <Ant.Skeleton loading={loadingData}>
                <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                    <Ant.Form.Item name="title" label={'عنوان'} rules={[{ required: true }]}>
                        <Ant.Input allowClear showCount maxLength={100} />
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

export default FormEditSaleChannel
FormEditSaleChannel.propTypes = {
    onFinish: PropTypes.func,
    onSuccess: PropTypes.func,
    obj: PropTypes.any,
    id: PropTypes.number,

}
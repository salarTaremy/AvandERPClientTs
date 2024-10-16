import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import { usePutWithHandler, useFetchWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import { TbSettingsCog } from "react-icons/tb";

const FormEditAuthInfo = (props) => {
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
        await ApiCall(`${url.TAX_PAYERS_SYSTEM_AUTH_INFORMATION}/${id}`);
    };

    const onFinish = async (values) => {
        console.log(values, 'values')
        setLoading(true)
        const req = { ...values, id: id }
        await editApiCall(url.TAX_PAYERS_SYSTEM_AUTH_INFORMATION, req)
        setLoading(false)
        onSuccess()
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={"ویرایش اطلاعات احراز هویت"} icon={<TbSettingsCog />} />
            <Ant.Skeleton active  loading={loadingData}>
                <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                    <Ant.Form.Item
                        name="uniqueFiscalId"
                        label={"شناسه مالیاتی یکتا"}
                        rules={[{ required: true }]}
                    >
                        <Ant.Input allowClear showCount maxLength={6} />
                    </Ant.Form.Item>
                    <Ant.Form.Item
                        name="publicKey"
                        label={"کلید عمومی"}
                        rules={[{ required: true }]}
                    >
                        <Ant.Input.TextArea allowClear showCount maxLength={4000} rows={4} />
                    </Ant.Form.Item>
                    <Ant.Form.Item
                        name="privateKey"
                        label={"کلید خصوصی"}
                        rules={[{ required: true }]}
                    >
                        <Ant.Input.TextArea allowClear showCount maxLength={4000} rows={4} />
                    </Ant.Form.Item>
                    <Ant.Space size={110}>
                        <Ant.Form.Item
                            name="isDefault"
                            label="شناسه پیش فرض"
                        >
                            <Ant.Switch />
                        </Ant.Form.Item>
                        <Ant.Form.Item
                            name="isActive"
                            label="فعال"
                        >
                            <Ant.Switch />
                        </Ant.Form.Item>
                    </Ant.Space>



                    <Ant.Col span={24}>
              <Ant.Flex justify="space-between" align="center">
              <Ant.Form.Item
                            name="isDefault"
                            label="شناسه پیش فرض"
                        >
                            <Ant.Switch />
                            </Ant.Form.Item>
                <Ant.Form.Item
                            name="isActive"
                            label="فعال"
                        >
                            <Ant.Switch />
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
            </Ant.Skeleton>
        </>
    )
}

export default FormEditAuthInfo
FormEditAuthInfo.propTypes = {
    onFinish: PropTypes.func,
    onSuccess: PropTypes.func,
    obj: PropTypes.any,
    id: PropTypes.number,
    loading: PropTypes.bool,
}

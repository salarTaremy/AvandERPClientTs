import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import {
    usePutWithHandler,
    useFetchWithHandler
}
    from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import * as styles from '@/styles'
import { useParams } from 'react-router-dom'

const EditProductList = () => {
    const [loading, setLoading] = useState(false)
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    useRequestManager({ error: editError, loading: editLoading, data: editData })
    const [form] = Ant.Form.useForm()
    const [listData, listLoading, listError, ApiCall] = useFetchWithHandler()
    const params = useParams()

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getProductList()
    }, [])

    useEffect(() => {
        form.resetFields()
        listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
    }, [listData])

    //=====================================================================
    //                        Functions
    //=====================================================================
    const getProductList = async () => {
        console.log('product', params.id)
        await ApiCall(`${url.PRODUCT}/${params.id}`)
    }

    const onFinish = async (values) => {
        console.log(values, 'values')
        setLoading(true)
        const req = { ...values, id: params.id }
        await editApiCall(url.PRODUCT, req)
        setLoading(false)
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Card title={'ویرایش کالا و خدمات'} type="inner" >
                <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} loading={listLoading}>
                    <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                        <Ant.Row gutter={[16, 8]}>
                            <Ant.Col lg={12} >
                                <Ant.Form.Item name="name" label="نام کالا" rules={[{ required: true }]}>
                                    <Ant.Input.TextArea allowClear showCount maxLength={200} />
                                </Ant.Form.Item>
                            </Ant.Col>
                            <Ant.Col lg={6} md={12} sm={12} xs={24}>
                                <Ant.Form.Item name="code" label={'کد'} rules={[{ required: true }]}>
                                    <Ant.Input allowClear showCount maxLength={50} />
                                </Ant.Form.Item>
                            </Ant.Col>
                            <Ant.Col lg={6} md={12} sm={12} xs={24}>
                                <Ant.Form.Item name="seccondCode" label={'کد دوم'} rules={[{ required: true }]}>
                                    <Ant.Input allowClear showCount maxLength={50} />
                                </Ant.Form.Item>
                            </Ant.Col>
                            <Ant.Col lg={12} >
                                <Ant.Form.Item name="seccondName" label="نام دوم کالا" rules={[{ required: true }]}>
                                    <Ant.Input.TextArea allowClear showCount maxLength={200} />
                                </Ant.Form.Item>
                            </Ant.Col>
                            <Ant.Col lg={6} md={12} sm={12} xs={24}>
                                <Ant.Form.Item name="typeId" label="شناسه نوع" rules={[{ required: true }]}>
                                    <Ant.Input allowClear showCount maxLength={50} />
                                </Ant.Form.Item>
                            </Ant.Col>
                            <Ant.Col lg={6} md={12} sm={12} xs={24}>
                                <Ant.Form.Item name="brandId" label="شناسه برند" rules={[{ required: true }]}>
                                    <Ant.Input allowClear showCount maxLength={50} />
                                </Ant.Form.Item>
                            </Ant.Col>
                            <Ant.Col lg={12}>
                                <Ant.Form.Item name="brandName" label="نام برند" rules={[{ required: true }]}>
                                    <Ant.Input.TextArea allowClear showCount maxLength={200} />
                                </Ant.Form.Item>
                            </Ant.Col>
                            <Ant.Col lg={6} md={12} sm={12} xs={24}>
                                <Ant.Form.Item name="natureDetailId" label="شناسه جزئیات برند" rules={[{ required: true }]}>
                                    <Ant.Input allowClear showCount maxLength={50} />
                                </Ant.Form.Item>
                            </Ant.Col>
                        </Ant.Row>
                        <Ant.Col lg={6} md={12} sm={12} xs={24}>
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
                        </Ant.Col>
                    </Ant.Form>
                </Ant.Card>
            </Ant.Card>
        </>
    )
}

export default EditProductList
EditProductList.propTypes = {
    onFinish: PropTypes.func,
    onSuccess: PropTypes.func,
    obj: PropTypes.any,
    id: PropTypes.number,
    loading: PropTypes.bool,
}

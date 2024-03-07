import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import {
    usePutWithHandler,
    useFetchWithHandler,
    useFetch
}
    from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import * as styles from '@/styles'
import { useParams } from 'react-router-dom'
import { GS1PrefixCodeToCountryCode } from 'gs1-prefix-code-to-country-code'

const EditProductList = () => {
    const [loading, setLoading] = useState(false)
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    useRequestManager({ error: editError, loading: editLoading, data: editData })
    const [form] = Ant.Form.useForm()
    const [listData, listLoading, listError, ApiCall] = useFetchWithHandler()
    const params = useParams()
    const [productNatureData, productNatureLoading, productNatureError] = useFetch(url.PRODUCT_NATURE)
    const [productNatureDetailData, productNatureDetailLoading, productNatureDetailError, productApiCall] =
        useFetchWithHandler()
    const [unitTypeData, unitTypeLoading, unitTypeError] = useFetch(url.PRODUCT_UNIT_TYPE)
    const [unitData, unitLoading, unitError, unitApiCall] = useFetchWithHandler()
    const [supplierData, supplierLoading, supplierError] = useFetch(url.SUPPLIER)
    const [brandData, brandLoading, brandError, brandApiCall] = useFetchWithHandler()
    const [seasonalReportsdata, seasonalReportsloading, seasonalReportserror] = useFetch(url.PRODUCT_TYPE)
    useRequestManager({ error: brandError })
    useRequestManager({ error: listError })
    useRequestManager({ error: productNatureError })
    const [selectedproductNature, setSelectedProductNature] = useState(null)
    const [selectedUnitType, setSelectedUnitType] = useState(null)
    const [selectedSupplier, setSelectedSupplier] = useState(null)
    const [countryInfo, setCountryInfo] = useState(null)

    const commonOptions = {
        showSearch: true,
        filterOption: (input, option) => option.name.indexOf(input) >= 0,
    }

    const handleOnChange = (val, option) => {
        form.setFieldsValue({ natureDetailId: undefined })
        setSelectedProductNature(option.id)
    }

    const handleOnChangeunit = (val, option) => {
        form.setFieldsValue({ unitId: undefined })
        setSelectedUnitType(option.id)
    }

    const handleOnChangebrand = (val, option) => {
        form.setFieldsValue({ brandId: undefined })
        setSelectedSupplier(option.id)
    }

    const maxLenGS1 = 13
    const maxLenGTIN = 16
    const maxLenTaxId = 13
    const isValidIrCode = async (e, value) => {
        setCountryInfo(null)
        if (value?.length >= 3) {
            const preFixInfo = GS1PrefixCodeToCountryCode(value.substring(0, 3))
            preFixInfo && setCountryInfo(preFixInfo)
        }
        return Promise.resolve()
    }

    const f1 = (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const f2 = (value) => value.replace(/\$\s?|(,*)/g, '')
    const stl = { width: '100%' }
    const publicProps = {
        // type: 'number',
        min: 0,
        placeholder: 'cm',
        style: stl,
        formatter: f1,
        parser: f2,
    }

    const minProductCodeLen = 2
    const maxProductCodeLen = 10

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getProductList()
    }, [])

    useEffect(() => {
        setSelectedProductNature(listData?.data.natureId)
    }, [listData?.data.natureId])

    useEffect(() => {
        setSelectedSupplier(listData?.data.supplierId)
    }, [listData?.data.supplierId])

    useEffect(() => {
        setSelectedUnitType(listData?.data.unitTypeId)
    }, [listData?.data.unitTypeId])

    useEffect(() => {
        form.resetFields()
        console.log(listData?.data,"listData?.data")
        listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
    }, [listData])

    useEffect(() => {
        productApiCall(url.PRODUCT_NATURE_DETAIL)
    }, [selectedproductNature])

    useEffect(() => {
        selectedSupplier && brandApiCall(`${url.BRAND}?supplierId=${selectedSupplier}`)
    }, [selectedSupplier])

    useEffect(() => {
        //اگر تأمین کننده فقط یک برند داشته باشد
        if (brandData?.data?.length === 1) {
            form.setFieldsValue({ brandId: brandData?.data[0].id })
        }
        if (brandData?.data?.length > 1) {
            const brandId = form.getFieldValue('brandId')
            brandId && form.setFieldsValue({ brandId: brandId })
        }
    }, [brandData])

    useEffect(() => {
        const defaultTypeId = 12
        const typeId = form.getFieldValue('typeId')
        form.setFieldsValue({ typeId: typeId || defaultTypeId })
    }, [])

    useEffect(() => {
        const unitTypeId = form.getFieldValue('unitTypeId')
        unitTypeId && form.setFieldsValue({unitTypeId: unitTypeId})
    }, [])

    useEffect(() => {
        selectedUnitType && unitApiCall(`${url.PRODUCT_UNIT}?productUnitTypeId=${selectedUnitType}`)
    }, [selectedUnitType])

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
                        <Ant.Card title={'اطلاعات پایه'} type="inner" >
                            <Ant.Row gutter={[16, 8]}>
                                <Ant.Col span={24} sm={8}>
                                    <Ant.Form.Item name={'natureId'} label="ماهیت(اصلی) کالا/خدمت" rules={[{ required: true }]}>
                                        <Ant.Select
                                            {...commonOptions}
                                            onChange={handleOnChange}
                                            disabled={productNatureLoading || false}
                                            loading={productNatureLoading}
                                            options={productNatureData?.data}
                                            fieldNames={{ label: 'name', value: 'id' }}
                                        />
                                    </Ant.Form.Item>
                                    <Ant.Form.Item
                                        name={'natureDetailId'}
                                        label="ماهیت(فرعی) کالا/خدمت"
                                        rules={[{ required: true }]}
                                    >
                                        <Ant.Select
                                            {...{ ...commonOptions }}
                                            loading={productNatureDetailLoading}
                                            options={productNatureDetailData?.data?.filter(
                                                (c) => c.productNatureTypeId === selectedproductNature,
                                            )}
                                            fieldNames={{ label: 'name', value: 'id' }}
                                        />
                                    </Ant.Form.Item>
                                    <Ant.Form.Item name="name" label={'نام کالا/خدمت'} rules={[{ required: true }]}>
                                        <Ant.Input placeholder="نام کالا/خدمت' به صورت فارسی" allowClear />
                                    </Ant.Form.Item>
                                </Ant.Col>
                                <Ant.Col span={24} sm={8}>
                                    <Ant.Form.Item
                                        name="code"
                                        label={'کد کالا/خدمت'}
                                        rules={[
                                            {
                                                required: true,
                                                max: maxProductCodeLen,
                                                min: minProductCodeLen,
                                            },
                                        ]}
                                    >
                                        <Ant.Input
                                            maxLength={maxProductCodeLen}
                                            showCount
                                            allowClear
                                            placeholder="کد عددی"
                                            onChange={(e) => {
                                                setQrCode(e.target.value)
                                            }}
                                        />
                                    </Ant.Form.Item>
                                    <Ant.Form.Item name={'seccondCode'} label={'کد دوم کالا'}>
                                        <Ant.Input placeholder="کد دوم کالا'" allowClear />
                                    </Ant.Form.Item>
                                    <Ant.Form.Item name={'seccondName'} label={'نام دوم کالا/خدمت'}>
                                        <Ant.Input placeholder="'نام دوم کالا/خدمت'" allowClear />
                                    </Ant.Form.Item>
                                </Ant.Col>
                            </Ant.Row>
                        </Ant.Card>
                        <Ant.Card title={'واحد کالا'} type="inner" >
                            <Ant.Row gutter={[16, 8]}>
                                <Ant.Col span={24} sm={8}>
                                    <Ant.Form.Item name={'unitTypeId'} label="نوع واحد(اصلی)" rules={[{ required: true }]}>
                                        <Ant.Select
                                            {...commonOptions}
                                            onChange={handleOnChangeunit}
                                            disabled={unitTypeLoading || false}
                                            loading={unitTypeLoading}
                                            options={unitTypeData?.data}
                                            fieldNames={{ label: 'name', value: 'id' }}
                                        />
                                    </Ant.Form.Item>
                                    <Ant.Form.Item name={'unitId'} label="واحد(اصلی)" rules={[{ required: true }]}>
                                        <Ant.Select
                                            {...commonOptions}
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.name.indexOf(input) >= 0
                                            }
                                            disabled={unitLoading || false}
                                            loading={unitLoading}
                                            options={unitData?.data}
                                            fieldNames={{ label: 'name', value: 'id' }}
                                        />
                                    </Ant.Form.Item>
                                </Ant.Col>
                            </Ant.Row>
                        </Ant.Card>
                        <Ant.Card title={'برند و تامین کننده'} type="inner" >
                            <Ant.Row gutter={[16, 8]}>
                                <Ant.Col span={24} sm={8}>
                                    <Ant.Form.Item name={'supplierId'} label="تأمین کننده" rules={[{ required: true }]}>
                                        <Ant.Select
                                            {...commonOptions}
                                            onChange={handleOnChangebrand}
                                            disabled={supplierLoading || false}
                                            loading={supplierLoading}
                                            options={supplierData?.data}
                                            fieldNames={{ label: 'name', value: 'id' }}
                                        />
                                    </Ant.Form.Item>
                                    <Ant.Form.Item name={'brandId'} label="برند" rules={[{ required: true }]}>
                                        <Ant.Select
                                            {...commonOptions}
                                            disabled={brandLoading || false}
                                            loading={brandLoading}
                                            options={brandData?.data}
                                            fieldNames={{ label: 'name', value: 'id' }}
                                        />
                                    </Ant.Form.Item>
                                </Ant.Col>
                            </Ant.Row>
                        </Ant.Card>
                        <Ant.Card title={'بارکد'} type="inner" >
                            <Ant.Row gutter={[16, 8]}>
                                <Ant.Col span={24} sm={8}>
                                    <Ant.Form.Item
                                        name={'irCode'}
                                        label={'ایران کد / (GS1)'}
                                        rules={[
                                            { validator: isValidIrCode },
                                            {
                                                required: true,
                                                len: maxLenGS1,
                                            },
                                        ]}
                                    >
                                        <Ant.Input
                                            maxLength={maxLenGS1}
                                            showCount
                                            placeholder="626XXXXXXXX"
                                        />
                                    </Ant.Form.Item>
                                    <Ant.Form.Item name={'gtin'} label={'Gtin'} rules={[{ len: maxLenGTIN }]}>
                                        <Ant.Input placeholder="216012345..." maxLength={maxLenGTIN} showCount />
                                    </Ant.Form.Item>
                                    <Ant.Form.Item name={'stuffId'} label={'شناسه مالیاتی'} rules={[{ len: maxLenTaxId }]}>
                                        <Ant.Input placeholder="27XXXXXXXXXXXXXX" maxLength={maxLenTaxId} showCount />
                                    </Ant.Form.Item>
                                </Ant.Col>
                            </Ant.Row>
                        </Ant.Card>
                        <Ant.Card title={'گزارشات فصلی(169)'} type="inner" >
                            <Ant.Row gutter={[16, 8]}>
                                <Ant.Col span={24} sm={8}>
                                    <Ant.Form.Item name={'typeId'} label="نوع کالا" rules={[{ required: true }]}>
                                        <Ant.Select
                                            {...commonOptions}
                                            showSearch
                                            filterOption={(input, option) => option.name.indexOf(input) >= 0}
                                            disabled={seasonalReportsloading || false}
                                            loading={seasonalReportsloading}
                                            options={seasonalReportsdata?.data}
                                            fieldNames={{ label: 'name', value: 'id' }}
                                        />
                                    </Ant.Form.Item>
                                </Ant.Col>
                            </Ant.Row>
                        </Ant.Card>
                        <Ant.Card title={'مشخصات فنی'} type="inner" >
                            <Ant.Row gutter={[16, 8]}>
                                <Ant.Col span={24} sm={8}>
                                    <Ant.Form.Item name={'length'} label={'طول'}>
                                        <Ant.InputNumber {...publicProps} />
                                    </Ant.Form.Item>
                                    <Ant.Form.Item name={'width'} label={'عرض'}>
                                        <Ant.InputNumber {...publicProps} />
                                    </Ant.Form.Item>
                                    <Ant.Form.Item name={'height'} label={'ارتفاع'}>
                                        <Ant.InputNumber {...publicProps} />
                                    </Ant.Form.Item>
                                </Ant.Col>
                                <Ant.Col span={24} sm={8}>
                                    <Ant.Form.Item name={'weight'} label={'وزن'}>
                                        <Ant.InputNumber {...publicProps} placeholder="gr" />
                                    </Ant.Form.Item>
                                </Ant.Col>
                            </Ant.Row>
                        </Ant.Card>
                        <Ant.Col lg={6} md={12} sm={12} xs={24}>
                            <Ant.Form.Item name="typeId" label="شناسه نوع" className='hidden' rules={[{ required: true }]} >
                                <Ant.Input allowClear showCount maxLength={50} />
                            </Ant.Form.Item>
                        </Ant.Col>
                        <Ant.Col lg={6} md={12} sm={12} xs={24}>
                            <Ant.Form.Item name="brandId" label="شناسه برند" className='hidden' rules={[{ required: true }]}>
                                <Ant.Input allowClear showCount maxLength={50} />
                            </Ant.Form.Item>
                        </Ant.Col>
                        <Ant.Col lg={6} md={12} sm={12} xs={24}>
                            <Ant.Form.Item name="natureDetailId" label="شناسه جزئیات برند" className='hidden' rules={[{ required: true }]}>
                                <Ant.Input allowClear showCount maxLength={50} />
                            </Ant.Form.Item>
                        </Ant.Col>

                        <Ant.Col className='text-center' span={24} sm={8}>
                            <Ant.Form.Item>
                                <Ant.Button
                                    block
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
                </Ant.Card >
            </Ant.Card >
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

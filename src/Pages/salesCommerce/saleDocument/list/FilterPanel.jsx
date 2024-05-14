import React, { useEffect, useState } from "react";
import qs from "qs";
import * as url from "@/api/url";
import * as api from "@/api";
import * as Ant from "antd";
import DebounceSelect from "@/components/common/DebounceSelect";
import MyDatePicker from "@/components/common/MyDatePicker";
import useRequestManager from '@/hooks/useRequestManager'

//====================================================================
//                        Declaration
//====================================================================
const FilterPanel = (props) => {
    const [form] = Ant.Form.useForm();
    const [saleChannelData, saleChannelLoading, saleChannelError] = api.useFetch(url.SALE_CHANNEL);
    const [saleDocTypeData, saleDocTypeLoading, saleDocTypeError] = api.useFetch(url.SALE_DOCUMENT_TYPE);
    const [branchData, branchLoading, branchError] = api.useFetch(url.BRANCH);
    const { onSubmit, filterObject } = props;
    useRequestManager({ error: saleChannelError });
    useRequestManager({ error: saleDocTypeError });
    useRequestManager({ error: branchError });
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        const dateFilter = {};
        if (filterObject?.fromIssueDateCalendarId) {
            const yearFrom = filterObject?.fromIssueDateCalendarId.substr(0,4);
            const monthFrom = filterObject?.fromIssueDateCalendarId.substr(4,2);
            const dayFrom = filterObject?.fromIssueDateCalendarId.substr(6,2);
            const formattedFromDate = `${yearFrom}/${monthFrom}/${dayFrom}`
            dateFilter.fromIssueDateCalendarId = formattedFromDate;
        }
        if (filterObject?.toIssueDateCalendarId) {
            const yearTo = filterObject?.toIssueDateCalendarId.substr(0,4);
            const monthTo = filterObject?.toIssueDateCalendarId.substr(4,2);
            const dayTo = filterObject?.toIssueDateCalendarId.substr(6,2);
            const formattedToDate = `${yearTo}/${monthTo}/${dayTo}`;
            dateFilter.toIssueDateCalendarId = formattedToDate;
        }
        filterObject && form.setFieldsValue({ ...filterObject,...dateFilter });
    }, [])
    //====================================================================
    //                        Functions
    //====================================================================
    const onFinish = (values) => {
        let customerFilter = {};
        //debugger;
        if (values?.customerId && values?.customerId.length > 0) {
            customerFilter.customerId = [{label: values?.customerId[0].label, key: values?.customerId[0].value, value: values?.customerId[0].value}];       
        }
        else {
            customerFilter.customerId  = undefined;
        }
        onSubmit({
            ...values,
            ...customerFilter,
            fromIssueDateCalendarId: values?.fromIssueDateCalendarId?.toString().replace(/\//g, ''),
            toIssueDateCalendarId: values?.toIssueDateCalendarId?.toString().replace(/\//g, '')
        })
        
    }
    const getCustomerForDropDown = async (searchText) => {
        const queryString = qs.stringify({
            customerName: searchText
        })

        const response = await api.Get(`${url.SALE_CUSTOMER_GET_FOR_DROPDOWN}?${queryString}`, '');
        if (response?.data) {
            return response?.data.map((item) => ({
                label: `${item.customerName}`,
                value: item.id
            }))
        }
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical" onFinishFailed={null}>
                <Ant.Form.Item name={'customerCode'} label="کد مشتری">
                    <Ant.InputNumber allowClear min={1} style={{ width: "100%" }}/>
                </Ant.Form.Item>
                <Ant.Form.Item name={'customerId'} label="مشتری">
                    <DebounceSelect
                        mode="multiple"
                        maxCount={1}
                        placeholder="بخشی از نام مشتری را تایپ کنید..."
                        fetchOptions={getCustomerForDropDown}
                    />
                </Ant.Form.Item>
                <Ant.Form.Item name={'fromIssueDateCalendarId'} label="از تاریخ">
                    <MyDatePicker/>
                </Ant.Form.Item>
                <Ant.Form.Item name={'toIssueDateCalendarId'} label="تا تاریخ">
                    <MyDatePicker/>
                </Ant.Form.Item>
                <Ant.Form.Item name={'saleChannelId'} label="کانال فروش">
                    <Ant.Select
                        allowClear={true}
                        placeHolder={'انتخاب کنید...'}
                        disable={saleChannelLoading || false}
                        loading={saleChannelLoading}
                        options={saleChannelData?.data}
                        fieldNames={{label: 'title', value: 'id'}}
                    />
                </Ant.Form.Item>
                <Ant.Form.Item name={'saleDocumentTypeId'} label="نوع برگه فروش">
                    <Ant.Select
                        allowClear={true}
                        placeholder={'انتخاب کنید...'}
                        disable={saleDocTypeLoading || false}
                        loading={saleDocTypeLoading}
                        options={saleDocTypeData?.data}
                        fieldNames={{label: 'title', value: 'id'}}
                    />
                </Ant.Form.Item>
                <Ant.Form.Item name={'branchId'} label="نام شعبه">
                    <Ant.Select 
                        allowClear={true}
                        placeholder={'انتخاب کنید...'}
                        disable={branchLoading || false}
                        loading={branchLoading}
                        options={branchData?.data}
                        fieldNames={{label: 'name', value: 'id'}}
                    />
                </Ant.Form.Item>
                <Ant.Form.Item>
                    <Ant.Button 
                        block
                        type="primary"
                        onClick={() => form.submit()}
                    >
                        {'اعمال'}
                    </Ant.Button>
                </Ant.Form.Item>
            </Ant.Form>
        </>
    )
}

export default FilterPanel;
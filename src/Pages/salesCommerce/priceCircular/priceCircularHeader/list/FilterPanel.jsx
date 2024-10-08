import React, { useEffect, useState } from "react";
import qs from "qs";
import * as url from "@/api/url";
import * as api from "@/api";
import * as Ant from "antd";
import MyDatePicker from "@/components/common/MyDatePicker";

//====================================================================
//                        Declaration
//====================================================================
const FilterPanel = (props) => {
    const [form] = Ant.Form.useForm();
    const { onSubmit, filterObject } = props;
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        const dateFilter = {};
        if (filterObject?.fromStartDateCalendarId) {
            const yearFrom = filterObject?.fromStartDateCalendarId.substr(0, 4);
            const monthFrom = filterObject?.fromStartDateCalendarId.substr(4, 2);
            const dayFrom = filterObject?.fromStartDateCalendarId.substr(6, 2);
            const formattedFromDate = `${yearFrom}/${monthFrom}/${dayFrom}`
            dateFilter.fromStartDateCalendarId = formattedFromDate;
        }
        if (filterObject?.toStartDateCalendarId) {
            const yearTo = filterObject?.toStartDateCalendarId.substr(0, 4);
            const monthTo = filterObject?.toStartDateCalendarId.substr(4, 2);
            const dayTo = filterObject?.toStartDateCalendarId.substr(6, 2);
            const formattedToDate = `${yearTo}/${monthTo}/${dayTo}`;
            dateFilter.toStartDateCalendarId = formattedToDate;
        }
        if (filterObject?.fromEndDateCalendarId) {
            const yearTo = filterObject?.fromEndDateCalendarId.substr(0, 4);
            const monthTo = filterObject?.fromEndDateCalendarId.substr(4, 2);
            const dayTo = filterObject?.fromEndDateCalendarId.substr(6, 2);
            const formattedToDate = `${yearTo}/${monthTo}/${dayTo}`;
            dateFilter.fromEndDateCalendarId = formattedToDate;
        }
        if (filterObject?.toEndDateCalendarId) {
            const yearTo = filterObject?.toEndDateCalendarId.substr(0, 4);
            const monthTo = filterObject?.toEndDateCalendarId.substr(4, 2);
            const dayTo = filterObject?.toEndDateCalendarId.substr(6, 2);
            const formattedToDate = `${yearTo}/${monthTo}/${dayTo}`;
            dateFilter.toEndDateCalendarId = formattedToDate;
        }
        filterObject && form.setFieldsValue({ ...filterObject, ...dateFilter });
    }, [])
    //====================================================================
    //                        Functions
    //====================================================================
    const onFinish = (values) => {
        onSubmit({
            ...values,
            fromStartDateCalendarId: values?.fromStartDate?.toString().replace(/\//g, ''),
            toStartDateCalendarId: values?.toStartDate?.toString().replace(/\//g, ''),
            fromEndDateCalendarId: values?.fromEndDate?.toString().replace(/\//g, ''),
            toEndDateCalendarId: values?.toEndDate?.toString().replace(/\//g, '')
        })

    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical" onFinishFailed={null}>
                <Ant.Form.Item name={'title'} label="عنوان">
                    <Ant.Input allowClear style={{ width: "100%" }} />
                </Ant.Form.Item>
                <Ant.Form.Item name={'fromStartDate'} label=" از تاریخ شروع">
                    <MyDatePicker />
                </Ant.Form.Item>
                <Ant.Form.Item name={'toStartDate'} label="تا تاریخ شروع">
                    <MyDatePicker />
                </Ant.Form.Item>
                <Ant.Form.Item name={'fromEndDate'} label="از تاریخ پایان">
                    <MyDatePicker />
                </Ant.Form.Item>
                <Ant.Form.Item name={'toEndDate'} label="تا تاریخ پایان">
                    <MyDatePicker />
                </Ant.Form.Item>
                <Ant.Form.Item name={'isActive'} label="وضعیت" >
                    <Ant.Switch  checkedChildren="فعال" unCheckedChildren="غیرفعال" defaultChecked />
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
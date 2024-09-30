import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import { PropTypes } from 'prop-types'
import MyDatePicker, {
    FormatDateToDisplay,
    FormatDateToPost,
} from "@/components/common/MyDatePicker";


const FilterPanel = (props) => {
    const { onSubmit, filterObject } = props
    const [form] = Ant.Form.useForm()
    //====================================================================
    //                        useEffects
    useEffect(() => {
        const dateFilter = {};
        if (filterObject?.FromProductionDateCalendarId) {
            dateFilter.FromProductionDateCalendarId = FormatDateToDisplay(
                filterObject?.FromProductionDateCalendarId,
            );
        }
        if (filterObject?.ToProductionDateCalendarId) {
            dateFilter.ToProductionDateCalendarId = FormatDateToDisplay(
                filterObject?.ToProductionDateCalendarId,
            );

        }
        if (filterObject?.FromExpiryDateCalendarId) {
            dateFilter.FromExpiryDateCalendarId = FormatDateToDisplay(
                filterObject?.FromExpiryDateCalendarId,
            );
        }
        if (filterObject?.ToExpiryDateCalendarId) {
            dateFilter.ToExpiryDateCalendarId = FormatDateToDisplay(
                filterObject?.ToExpiryDateCalendarId,
            );
        }
        filterObject && form.setFieldsValue({ ...filterObject, ...dateFilter });
    }, []);

    //====================================================================
    //                        Functions
    //====================================================================
    const onFinish = (values) => {
        const otherFilterItems = {};
        if (values?.FromProductionDateCalendarId) {
            otherFilterItems.FromProductionDateCalendarId = FormatDateToPost(
                values?.FromProductionDateCalendarId,
            );
        }

        if (values?.ToProductionDateCalendarId) {
            otherFilterItems.ToProductionDateCalendarId = FormatDateToPost(
                values?.ToProductionDateCalendarId,
            );
        }

        if (values?.FromExpiryDateCalendarId) {
            otherFilterItems.FromExpiryDateCalendarId = FormatDateToPost(
                values?.FromExpiryDateCalendarId,
            );
        }

        if (values?.ToExpiryDateCalendarId) {
            otherFilterItems.ToExpiryDateCalendarId = FormatDateToPost(
                values?.ToExpiryDateCalendarId,
            );
        }

        onSubmit({
            ...values,
            ...otherFilterItems,
        });
    };
    //====================================================================
    //                        Child Components
    //====================================================================
    // Create Locale Components Here...

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical" onFinishFailed={null}>
                <Ant.Form.Item name="batchNumber" label={'سری ساخت'} >
                    <Ant.Input allowClear />
                </Ant.Form.Item>
                <Ant.Row gutter={[10, 10]}>
                    <Ant.Col span={12}>
                        <Ant.Form.Item name="FromProductionDateCalendarId" label={'از تاریخ تولید'} >
                            <MyDatePicker />
                        </Ant.Form.Item>
                    </Ant.Col>
                    <Ant.Col span={12}>
                        <Ant.Form.Item name="ToProductionDateCalendarId" label={'تا تاریخ تولید'} >
                            <MyDatePicker />
                        </Ant.Form.Item>
                    </Ant.Col>
                </Ant.Row >
                <Ant.Row gutter={[10, 10]}>
                    <Ant.Col span={12}>
                        <Ant.Form.Item name="FromExpiryDateCalendarId" label={'از تاریخ انقضا'} >
                            <MyDatePicker />
                        </Ant.Form.Item>
                    </Ant.Col>
                    <Ant.Col span={12}>
                        <Ant.Form.Item name="ToExpiryDateCalendarId" label={'تا تاریخ انقضا'} >
                            <MyDatePicker />
                        </Ant.Form.Item>
                    </Ant.Col>
                </Ant.Row>
                <Ant.Form.Item>
                    <Ant.Button
                        block
                        type="primary"
                        onClick={() => {
                            form.submit()
                        }}
                    >
                        {'اعمال'}
                    </Ant.Button>
                </Ant.Form.Item>
            </Ant.Form>
        </>
    )
}

export default FilterPanel
FilterPanel.propTypes = {
    onSubmit: PropTypes.func,
    filterObject: PropTypes.any,
}

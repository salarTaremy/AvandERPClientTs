import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { PropTypes } from "prop-types";

const FilterPanel = (props) => {
    const { onSubmit, filterObject } = props;
    const [form] = Ant.Form.useForm();
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        filterObject && form.setFieldsValue({ ...filterObject });
    }, []);

    //====================================================================
    //                        Functions
    //====================================================================
    const onFinish = (values) => {
        onSubmit({
            ...values,
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
            <Ant.Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                onFinishFailed={null}
            >
                <Ant.Form.Item name={"title"} label="عنوان">
                    <Ant.Input allowClear />
                </Ant.Form.Item>
                <Ant.Button
                    block
                    type="primary"
                    onClick={() => {
                        form.submit();
                    }}
                >
                    {"اعمال"}
                </Ant.Button>
            </Ant.Form>
        </>
    );
}

export default FilterPanel
FilterPanel.propTypes = {
    onSubmit: PropTypes.func,
    filterObject: PropTypes.any,
};


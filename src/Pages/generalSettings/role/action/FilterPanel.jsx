import React, { useEffect } from 'react'
import * as Ant from 'antd'
import { PropTypes } from 'prop-types'

const FilterPanel = (props) => {
    const { onSubmit, filterObject } = props
    const [form] = Ant.Form.useForm()

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        filterObject && form.setFieldsValue({ ...filterObject })
    }, [])

    //====================================================================
    //                        Functions
    //====================================================================
    const onFinish = (values) => {
        onSubmit({
            ...values,
        })
    }

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical" onFinishFailed={null}>
                <Ant.Form.Item name={'controllerPersianTitle'} label="نام بخش (controller) ">
                    <Ant.Input allowClear />
                </Ant.Form.Item>
                <Ant.Button
                    block
                    type="primary"
                    onClick={() => {
                        form.submit()
                    }}
                >
                    {'اعمال'}
                </Ant.Button>

            </Ant.Form>
        </>
    )
}

export default FilterPanel
FilterPanel.propTypes = {
    onSubmit: PropTypes.func,
    filterObject: PropTypes.any,
}

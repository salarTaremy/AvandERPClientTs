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
    //                        Child Components
    //====================================================================
    // Create Locale Components Here...

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical" onFinishFailed={null}>

                <Ant.Form.Item name={'code'} label="کد">
                    <Ant.Input allowClear />
                </Ant.Form.Item>
                <Ant.Form.Item name={'seccondCode'} label="کد دوم">
                    <Ant.Input allowClear />
                </Ant.Form.Item>
                <Ant.Form.Item name={'brandId'} label="شناسه برند">
                    <Ant.Input allowClear />
                </Ant.Form.Item>
                <Ant.Form.Item name={'name'} label="نام کالا">
                    <Ant.Input allowClear />
                </Ant.Form.Item>
                <Ant.Form.Item name={'seccondName'} label="نام دوم کالا">
                    <Ant.Input allowClear />
                </Ant.Form.Item>

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

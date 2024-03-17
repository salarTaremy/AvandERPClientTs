import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import { PropTypes } from 'prop-types'

const FilterPanel = (props) => {
    const { onSubmit, filterObject } = props
    const [form] = Ant.Form.useForm()
    const [userHasRole, setUserHasRole] = useState(1)
    const options = [
        { label: 'همه', value: null },
        { label: 'دسترسی', value: true },
        { label: 'عدم دسترسی', value: false },
    ]
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        filterObject && form.setFieldsValue({ ...filterObject })
    }, [])

    useEffect(() => {
    }, [userHasRole])
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
                <Ant.Form.Item name={'roleScopePersianTitle'} label="محدوده نقش">
                    <Ant.Input allowClear />
                </Ant.Form.Item>
                <Ant.Form.Item name={'rolePersianTitle'} label="نام نقش">
                    <Ant.Input allowClear />
                </Ant.Form.Item>
                <Ant.Form.Item name={'userHasRole'} label="وضعیت کاربران">
                    <Ant.Segmented options={options} block onChange={setUserHasRole} />
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
import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import { PropTypes } from 'prop-types'

const FilterPanel = (props) => {
    const { onSubmit, filterObject } = props
    const [form] = Ant.Form.useForm()
    const [isActive, setIsActive] = useState(1)
    const options = [
        { label: 'همه', value: null },
        { label: 'فعال', value: true },
        { label: 'غیر فعال', value: false },
      ]
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        filterObject && form.setFieldsValue({ ...filterObject })
    }, [])

    useEffect(() => {
    }, [isActive])

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
                <Ant.Form.Item name={'userName'} label="نام کاربری">
                    <Ant.Input allowClear />
                </Ant.Form.Item>
                <Ant.Form.Item name={'isActive'} label="وضعیت کاربران">
                    <Ant.Segmented options={options} block onChange={setIsActive} />
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
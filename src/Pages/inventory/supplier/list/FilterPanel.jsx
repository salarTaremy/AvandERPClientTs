import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import { PropTypes } from 'prop-types'
import useRequestManager from '@/hooks/useRequestManager'
//====================================================================
//                        Declaration
//====================================================================
const FilterPanel = (props) => {
  const { onSubmit, filterObject } = props
  const [form] = Ant.Form.useForm()
  //====================================================================
  //                        useEffects
  useEffect(() => {
    filterObject && form.setFieldsValue({ ...filterObject })
  }, [])

  useEffect(() => {

    console.log('componenet did mount')

    return () => {
      console.log('component un mount')
    }
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
        <Ant.Form.Item name={'name'} label="نام">
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

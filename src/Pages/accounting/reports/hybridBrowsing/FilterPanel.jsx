import React, { useEffect } from 'react'
import * as Ant from 'antd'
import { PropTypes } from 'prop-types'
import MyDatePicker from '@/components/common/MyDatePicker'
//====================================================================
//                        Declaration
//====================================================================
const FilterPanel = (props) => {
  const { onSubmit, filterObject } = props
  const [form] = Ant.Form.useForm()

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    filterObject &&  form.setFieldsValue({...filterObject})
  }, [])

  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = (formData) => {
    onSubmit({...formData})
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
        <Ant.Form.Item name={'fromDate'} label="از تاریخ" >
          <MyDatePicker block />
        </Ant.Form.Item>
        <Ant.Form.Item name={'toDate'} label="تا تاریخ" >
          <MyDatePicker />
        </Ant.Form.Item>
        <Ant.Form.Item name={'keyword'} label="شرح"   >
          <Ant.Input  allowClear/>
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

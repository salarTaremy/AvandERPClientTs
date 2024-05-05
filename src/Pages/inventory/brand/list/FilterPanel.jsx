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
  const [supplierData, supplierLoading, supplierError] = api.useFetch(url.SUPPLIER)
  const { onSubmit, filterObject } = props
  const [form] = Ant.Form.useForm()
  useRequestManager({ error: supplierError })
  const commonOptions = {
    placeholder: 'انتخاب کنید...',
    showSearch: true,
    filterOption: (input, option) =>  option.name.indexOf(input) >= 0,
  }
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

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Form form={form} onFinish={onFinish} layout="vertical" onFinishFailed={null}>
        <Ant.Form.Item name={'supplierId'} label="تأمین کننده">
          <Ant.Select
            {...commonOptions}
            allowClear={true}

            disabled={supplierLoading || false}
            loading={supplierLoading}
            options={supplierData?.data}
            fieldNames={{ label: 'name', value: 'id' }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item name={'name'} label="نام برند">
          <Ant.Input allowClear />
        </Ant.Form.Item>
        <Ant.Form.Item name={'code'} label="کد">
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

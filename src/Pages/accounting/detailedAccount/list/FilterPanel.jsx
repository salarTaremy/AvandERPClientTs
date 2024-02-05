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
  const [dtAccData, dtAccLoading, dtAccError] = api.useFetch(url.DETAILED_ACCOUNT_GROUP)
  const { onSubmit, filterObject } = props
  const [isActive, setIsActive] = useState(1)
  const [form] = Ant.Form.useForm()
  const options = [
    { label: 'همه', value: null },
    { label: 'فعال', value: true },
    { label: 'غیر فعال', value: false },
  ]
  useRequestManager({ error: dtAccError })
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
        <Ant.Form.Item name={'detailedAccountGroupId'} label="گروه تفصیل">
          <Ant.Select
            allowClear={true}
            placeholder={'انتخاب کنید...'}
            disabled={dtAccLoading || false}
            loading={dtAccLoading}
            options={dtAccData?.data}
            fieldNames={{ label: 'name', value: 'id' }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item name={'fullCode'} label="کد">
          <Ant.Input allowClear />
        </Ant.Form.Item>
        <Ant.Form.Item name={'name'} label="شرح">
          <Ant.Input allowClear />
        </Ant.Form.Item>
        <Ant.Form.Item name={'isActive'} label="وضعیت حساب">
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

import React, { useEffect } from 'react'
import * as Ant from 'antd'
import MyDatePicker from '@/components/common/MyDatePicker'

const DatePickerSample = () => {
  const [form] = Ant.Form.useForm()
  const onFinish = async (values) => {
    alert(values?.fromDate?.toString())
    console.log(values?.fromDate?.toString())
  }

  useEffect(() => {
    form.setFieldValue('fromDate', '1363/04/15')
  }, [form])

  return (
    <Ant.Card>
      <h6>{'Test DatePicker'}</h6>
      <Ant.Form form={form} onFinish={onFinish} layout="vertical" onFinishFailed={null}>
        <Ant.Form.Item name={'fromDate'} label="تاریخ" rules={[{ required: true }]}>
          <MyDatePicker />
        </Ant.Form.Item>
        <Ant.Form.Item>
          <Ant.Button
            onClick={() => {
              form.submit()
            }}
          >
            {'تایید'}
          </Ant.Button>
        </Ant.Form.Item>
      </Ant.Form>
    </Ant.Card>
  )
}

export default DatePickerSample

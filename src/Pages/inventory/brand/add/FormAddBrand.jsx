import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import PropTypes from 'prop-types'
import { PiArrowLineDownLeftLight } from 'react-icons/pi'
import { usePostWithHandler, useFetchWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
const FormAddBrand = (props) => {
  const { onSuccess } = props
  const [loading, setLoading] = useState(false)
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler()
  const [selectData, selectLoading, selectError] = api.useFetch(url.BRAND)
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] = useFetchWithHandler()
  useRequestManager({ error: selectError })
  useRequestManager({ error: maxCodeError })
  useRequestManager({ error: addError, loading: addLoading, data: addData })
  const [form] = Ant.Form.useForm()

  const commonOptions = {
    placeholder: 'انتخاب کنید...',
    showSearch: true,
    filterOption: (input, option) =>  option.name.indexOf(input) >= 0,
  }

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    addData?.isSuccess && onSuccess()
  }, [addData])

  useEffect(() => {
    maxCodeData?.isSuccess &&
      maxCodeData?.data?.maxCode &&
      form.setFieldsValue({ code: maxCodeData.data.maxCode })
    maxCodeData?.isSuccess && maxCodeData?.data?.maxCode && console.log(maxCodeData.data)
  }, [maxCodeData])
  //====================================================================
  //                        Functions
  //======================================================================
  const getMaxCode = async () => {
    await maxCodeApiCall(url.BRAND_MAX_CODE)
  }

  //====================================================================
  //                        Child Components
  //====================================================================
  const AddonBefore = () => {
    return (
      <Ant.Button size="small" type="text" onClick={getMaxCode} loading={maxCodeLoading}>
        <PiArrowLineDownLeftLight />
      </Ant.Button>
    )
  }
  //====================================================================
  //                        Component
  //====================================================================
  const onFinish = async (values) => {
    setLoading(true)
    const req = { ...values }
    await addApiCall(url.BRAND, req)
    setLoading(false)
  }
  return (
    <>
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Row>
          <Ant.Col span={24}>
            {'ایجاد برند'}
            <Ant.Divider />
          </Ant.Col>
        </Ant.Row>
        <Ant.Form.Item name={'supplierId'} label="تأمین کنندگان" rules={[{ required: true }]}>
          <Ant.Select
              {...commonOptions}
            allowClear={true}
            placeholder={'انتخاب کنید...'}
            disabled={selectLoading || false}
            loading={selectLoading}
            options={selectData?.data}
            fieldNames={{ label: 'name', value: 'supplierId' }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item name="name" label={'نام برند'} rules={[{ required: true }]}>
          <Ant.Input allowClear showCount maxLength={200} />
        </Ant.Form.Item>
        <Ant.Form.Item name={'code'} label="کد" rules={[{ required: true }]}>
          <Ant.Input addonBefore={<AddonBefore />} style={{ textAlign: 'center' }} />
        </Ant.Form.Item>

        <Ant.Form.Item>
          <Ant.Button
            loading={loading}
            type="primary"
            onClick={() => {
              form.submit()
            }}
            block
          >
            {'تایید'}
          </Ant.Button>
        </Ant.Form.Item>
      </Ant.Form>
    </>
  )
}
export default FormAddBrand
FormAddBrand.propTypes = {
  onSuccess: PropTypes.func,
}

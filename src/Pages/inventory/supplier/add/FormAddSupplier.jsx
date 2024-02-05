import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import { PiArrowLineDownLeftLight } from 'react-icons/pi'
import { usePostWithHandler, useFetchWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
const FormAddSupplier = (props) => {
  const { onSuccess } = props
  const [loading, setLoading] = useState(false)
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler()
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] = useFetchWithHandler()
  useRequestManager({ error: addError, loading: addLoading, data: addData })
  useRequestManager({ error: maxCodeError })
  const [form] = Ant.Form.useForm()

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
  }, [maxCodeData])
  //====================================================================
  //                        Functions
  //======================================================================
  const getMaxCode = async () => {
    await maxCodeApiCall(url.SUPPLIER_MAX_CODE)
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
    await addApiCall(url.SUPPLIER, req)
    setLoading(false)
  }
  return (
    <>
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Row>
          <Ant.Col span={24}>
            {'ایجاد تأمین کننده'}
            <Ant.Divider />
          </Ant.Col>
        </Ant.Row>
        <Ant.Form.Item name="name" label={'نام'} rules={[{ required: true }]}>
          <Ant.Input allowClear showCount maxLength={200} />
        </Ant.Form.Item>
        <Ant.Form.Item name={'code'} label="کد" rules={[{ required: true }]}>
          <Ant.Input allowClear showCount maxLength={12} addonBefore={<AddonBefore />} style={{ textAlign: 'center' }} />
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
export default FormAddSupplier
FormAddSupplier.propTypes = {
  onSuccess: PropTypes.func,
}

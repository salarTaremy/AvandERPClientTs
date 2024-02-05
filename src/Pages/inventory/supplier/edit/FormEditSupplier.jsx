import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import { usePutWithHandler, useFetchWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import { PiArrowLineDownLeftLight } from 'react-icons/pi'
const FormEditSupplier = (props) => {
  const { onSuccess, obj, id, myKey } = props
  const [loading, setLoading] = useState(false)
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] = useFetchWithHandler()
  useRequestManager({ error: maxCodeError })
  useRequestManager({ error: editError, loading: editLoading, data: editData })
  const [form] = Ant.Form.useForm()
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    form.resetFields()
    form.setFieldsValue({ ...obj })
  }, [obj])
  useEffect(() => {
    editData?.isSuccess && onSuccess()
  }, [editData])
  //====================================================================
  //                        Functions
  //======================================================================
  const onFinish = async (values) => {
    console.log(values, 'values')
    setLoading(true)
    const req = { ...values, id: id }
    await editApiCall(url.SUPPLIER, req)
    setLoading(false)
  }
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
  return (
    <>
      <Ant.Form form={form} key={myKey} onFinish={onFinish} layout="vertical">
        <Ant.Row>
          <Ant.Col span={24}>
            {'ویرایش تأمین کننده'}
            <Ant.Divider />
          </Ant.Col>
        </Ant.Row>
        <Ant.Form.Item name="name" label={'نام'} rules={[{ required: true }]}>
          <Ant.Input allowClear showCount maxLength={200} />
        </Ant.Form.Item>

        <Ant.Form.Item name={'code'} label="کد" rules={[{ required: true }]}>
          <Ant.Input
            allowClear
            showCount
            maxLength={12}
            addonBefore={<AddonBefore />}
            style={{ textAlign: 'center' }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item>
          <Ant.Button
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
export default FormEditSupplier
FormEditSupplier.propTypes = {
  onSuccess: PropTypes.func,
  obj: PropTypes.any,
  id: PropTypes.number,
  myKey: PropTypes.number,
}

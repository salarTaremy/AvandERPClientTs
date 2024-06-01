import React, { useEffect } from 'react'
import { forwardRef, useImperativeHandle } from 'react'
import { useFetchWithHandler } from '@/api'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import { PiArrowLineDownLeftLight } from 'react-icons/pi'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import * as url from '@/api/url'
const FrmAddDetailedAccountGroup = forwardRef((props, ref) => {
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] = useFetchWithHandler()
  const { onFinish, loading } = props
  useRequestManager({ error: maxCodeError })
  //====================================================================
  //                        useEffects
  //====================================================================
  const [form] = Ant.Form.useForm()
  useImperativeHandle(ref, () => ({
    resetFields() {
      form.resetFields()
    },
  }))
  useEffect(() => {
    form.resetFields()
  }, [])
  useEffect(() => {
    maxCodeData?.isSuccess &&
      maxCodeData?.data?.maxCode &&
      form.setFieldsValue({ code: maxCodeData.data.maxCode })
  }, [maxCodeData])

  //====================================================================
  //                        Functions
  //====================================================================
  const getMaxCode = async () => {
    await maxCodeApiCall(`${url.DETAILED_ACCOUNT_GROUP_MAX_CODE}`)
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
      <ModalHeader title={" ایجاد گروه تفصیلی"} />
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Form.Item name={'code'} label="کد" rules={[{ required: true }]}>
          <Ant.Input addonBefore={<AddonBefore />} style={{ textAlign: 'center' }} />
        </Ant.Form.Item>
        <Ant.Form.Item name="name" label={'نام'} rules={[{ required: true }]}>
          <Ant.Input allowClear showCount maxLength={200} />
        </Ant.Form.Item>
        <Ant.Form.Item name="secondName" label={'نام دوم'} rules={[{ required: false }]}>
          <Ant.Input allowClear showCount maxLength={200} />
        </Ant.Form.Item>

        <Ant.Form.Item name="description" label="توضیحات" rules={[{ required: false }]}>
          <Ant.Input.TextArea allowClear showCount maxLength={400} />
        </Ant.Form.Item>
        <Ant.Form.Item>
          <Ant.Button block type="primary" loading={loading} htmlType="submit">
            {'تایید'}
          </Ant.Button>
        </Ant.Form.Item>
      </Ant.Form>
    </>
  )
})

export default FrmAddDetailedAccountGroup
FrmAddDetailedAccountGroup.propTypes = {
  onFinish: PropTypes.func,
  loading: PropTypes.bool,
}

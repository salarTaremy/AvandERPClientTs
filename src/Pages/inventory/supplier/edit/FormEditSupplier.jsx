import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import { usePutWithHandler, useFetchWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import { PiArrowLineDownLeftLight } from 'react-icons/pi'
import ModalHeader from "@/components/common/ModalHeader";
import { FaBoxOpen } from "react-icons/fa";
const FormEditSupplier = (props) => {
  const { onSuccess, id, key } = props
  const [loading, setLoading] = useState(false)
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] = useFetchWithHandler()
  useRequestManager({ error: maxCodeError })
  useRequestManager({ error: editError, loading: editLoading, data: editData })
  const [form] = Ant.Form.useForm()
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getSupplierById()
  }, []);

  useEffect(() => {
    form.resetFields()
    listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
  }, [listData])

  useEffect(() => {
    maxCodeData?.isSuccess &&
      maxCodeData?.data?.maxCode &&
      form.setFieldsValue({ code: maxCodeData.data.maxCode })
  }, [maxCodeData])
  //====================================================================
  //                        Functions
  //======================================================================
  const getSupplierById = async () => {
    await ApiCall(`${url.SUPPLIER}/${id}`)
  }

  const onFinish = async (values) => {
    console.log(values, 'values')
    setLoading(true)
    const req = { ...values, id: id }
    await editApiCall(url.SUPPLIER, req)
    setLoading(false)
    onSuccess()
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
      <ModalHeader title={'ویرایش تأمین کننده'} icon={<FaBoxOpen />} />
      <Ant.Skeleton active loading={loadingData}>
        <Ant.Form form={form} key={key} onFinish={onFinish} layout="vertical">
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
      </Ant.Skeleton>
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

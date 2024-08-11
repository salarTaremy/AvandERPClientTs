import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import * as api from '@/api'
import { PiArrowLineDownLeftLight } from 'react-icons/pi'
import { useFetchWithHandler } from '@/api'
import { usePutWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import { TbBrandAirtable } from "react-icons/tb";
const FormEditBrand = (props) => {
  const { onSuccess, id, key } = props
  const [loading, setLoading] = useState(false)
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
  const [selectData, selectLoading, selectError] = api.useFetch(url.SUPPLIER)
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] = useFetchWithHandler()
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  useRequestManager({ error: editError, loading: editLoading, data: editData })
  const [form] = Ant.Form.useForm()
  useRequestManager({ error: error })
  useRequestManager({ error: selectError })
  useRequestManager({ error: maxCodeError })
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getBrandById()
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
  const getBrandById = async () => {
    await ApiCall(`${url.BRAND}/${id}`)
  }

  const getMaxCode = async () => {
    await maxCodeApiCall(url.BRAND_MAX_CODE)
  }
  const onFinish = async (values) => {
    setLoading(true)
    const req = { ...values, id: id }
    await editApiCall(url.BRAND, req)
    setLoading(false)
    onSuccess()
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
      <ModalHeader title={'ویرایش برند'} icon={<TbBrandAirtable />}/>
      <Ant.Skeleton active  loading={loadingData}>
        <Ant.Form form={form} key={key} onFinish={onFinish} layout="vertical">
          <Ant.Form.Item name={'supplierId'} label="تأمین کننده" rules={[{ required: true }]}>
            <Ant.Select
              allowClear={true}
              placeholder={'انتخاب کنید...'}
              disabled={selectLoading || false}
              loading={selectLoading}
              options={selectData?.data}
              fieldNames={{ label: 'name', value: 'id' }}
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
export default FormEditBrand
FormEditBrand.propTypes = {
  onSuccess: PropTypes.func,
  obj: PropTypes.any,
  id: PropTypes.number,
  myKey: PropTypes.number,
}

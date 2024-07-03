import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import * as Ant from 'antd'
import * as url from '@/api/url'
import { PiArrowLineDownLeftLight } from 'react-icons/pi'
import { useFetch, useFetchWithHandler, usePostWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import useAllLoading from '@/hooks/useAllLoading '
import { PlusOutlined } from '@ant-design/icons'
import * as defaultValues from "@/defaultValues";
import ModalHeader from "@/components/common/ModalHeader";
import FrmAddDetailedAccountGroup from '../../detailedAccountGroup/add/FrmAddDetailedAccountGroup'
import { HiDocumentPlus } from "react-icons/hi2";
export const FrmAddDetailedAccount = (props) => {
  const { onSuccess} = props
  const [form] = Ant.Form.useForm()
  const [detailedAccGrpData, detailedAccGrpLoading, detailedAccGrpError] = useFetch(
    url.DETAILED_ACCOUNT_GROUP,
  )
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] = useFetchWithHandler()
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler()
  const allLoading = useAllLoading([detailedAccGrpLoading])
  const [selectedDetailedAccGrpId, setSelectedDetailedAccGrpId] = useState(null)
  useRequestManager({ error: detailedAccGrpError })
  useRequestManager({ error: maxCodeError, loading: addLoading, data: addData })
  useRequestManager({ error: addError })
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    form.setFieldValue('isActive', true)
  }, [form])
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
  //====================================================================
  const onFinish = async (values) => {
    const req = { ...values }
    await addApiCall(url.DETAILED_ACCOUNT, req)
  }
  const getMaxCode = async () => {
    form.setFieldsValue({ code: null })
    await maxCodeApiCall(`${url.DETAILED_ACCOUNT_MAX_CODE}/${selectedDetailedAccGrpId}`)
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
  const AddonAfter = () => {
    const selectedItem = detailedAccGrpData?.data?.find((c) => c.id == selectedDetailedAccGrpId)
    return <>{selectedItem?.code}</>
  }
  const handleOnChange = (val, option) => {
    form.setFieldsValue({ code: undefined })
    setSelectedDetailedAccGrpId(option.id)
  }
  //====================================================================
  //                        Component
  //====================================================================
  const [openModalAdd, setOpenModalAdd] = useState(false)
  return (
    <>
      <Ant.Modal
        open={openModalAdd}
        centered
        getContainer={null}
        footer={null}
        onCancel={() => {
          setOpenModalAdd(false)
        }}
        {...defaultValues.MODAL_PROPS}
        onOk={() => {
          setOpenModalAdd(false)
        }}
      >
        <FrmAddDetailedAccountGroup />
      </Ant.Modal>

      <ModalHeader title= {' ایجاد حساب تفصیلی'} icon={<HiDocumentPlus />}/>
      <Ant.Form form={form} onFinish={onFinish} layout="vertical" onFinishFailed={null}>
        <Ant.Row gutter={[16, 8]}>

          <Ant.Col span={24} md={24} lg={12}>
            <Ant.Form.Item name={'detailedAccountGroupId'} label="گروه تفصیلی" rules={[{ required: true }]}>
              <Ant.Select
                onChange={handleOnChange}
                placeholder={'انتخاب کنید...'}
                disabled={detailedAccGrpLoading}
                loading={detailedAccGrpLoading}
                options={detailedAccGrpData?.data}
                fieldNames={{ label: 'fullName', value: 'id' }}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Ant.Button
                      onClick={() => {
                        setOpenModalAdd(true)
                      }}
                      block
                      type="primary"
                      icon={<PlusOutlined />}
                    >
                      {'ایجاد گروه تفصیل جدید'}
                    </Ant.Button>
                  </>
                )}
              />
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>
        <Ant.Row>
          <Ant.Col span={24} md={24} lg={12}>
            <Ant.Form.Item name={'code'} label="کد" rules={[{ required: true }]}>
              <Ant.Input
                disabled={selectedDetailedAccGrpId ? false : true}
                addonAfter={selectedDetailedAccGrpId && <AddonAfter />}
                addonBefore={<AddonBefore />}
                style={{ textAlign: 'center' }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24} sm={10}>
            <Ant.Flex justify={'center'} align={'center'}>
              <Ant.Form.Item name="isActive" label=" " valuePropName="checked">
                <Ant.Checkbox checked>{'فعال'}</Ant.Checkbox>
              </Ant.Form.Item>
            </Ant.Flex>
          </Ant.Col>
        </Ant.Row>
        <Ant.Form.Item name="name" label={'عنوان حساب'} rules={[{ required: true }]}>
          <Ant.Input allowClear showCount maxLength={200} />
        </Ant.Form.Item>
        <Ant.Form.Item name="secondName" label={'عنوان دوم حساب'} rules={[{ required: true }]}>
          <Ant.Input allowClear showCount maxLength={400} />
        </Ant.Form.Item>
        <Ant.Form.Item name={'description'} label="توضیحات" rules={[{ required: false }]}>
          <Ant.Input.TextArea allowClear showCount maxLength={400} />
        </Ant.Form.Item>
        <Ant.Form.Item>
          <Ant.Button
            type="primary"
            disabled={allLoading}
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
export default FrmAddDetailedAccount
FrmAddDetailedAccount.propTypes = {
  onSuccess: PropTypes.func,
}

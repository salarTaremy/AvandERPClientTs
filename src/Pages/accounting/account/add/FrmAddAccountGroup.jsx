import React from 'react'
import { PropTypes } from 'prop-types'
import { useFetch, useFetchWithHandler, usePutWithHandler, usePostWithHandler } from '@/api'
import * as url from '@/api/url'
import { useEffect } from 'react'
import Loading from '@/components/common/Loading'
import { RequestManager } from '@/components/common/RequestManager'
import * as IconBs from 'react-icons/bs'
import useAllLoading from '@/hooks/useAllLoading '
import * as icon from '@ant-design/icons'
import { PiArrowLineDownLeftLight } from 'react-icons/pi'
import * as Ant from 'antd'
import useRequestManager from '@/hooks/useRequestManager'
export const FrmAddAccountGroup = (props) => {
  const { onSuccess, onCancel, onLoading } = props

  const [form] = Ant.Form.useForm()

  const [accNatureData, accNatureLoading, accNatureError] = useFetch(url.ACCOUNT_NATURE)
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] = useFetchWithHandler()
  const [accTypeData, accTypeLoading, accTypeError] = useFetch(url.ACCOUNT_TYPE)
  const [accAddGrpData, accAddGrpLoading, accAddGrpError, accAddApiCall] = usePostWithHandler()
  const allLoading = useAllLoading([accNatureLoading, accTypeLoading])
  useRequestManager({ error: accNatureError })
  useRequestManager({ error: accTypeError })
  useRequestManager({ error: maxCodeError })
  useRequestManager({ error: accAddGrpError, loading: accAddGrpLoading, data: accAddGrpData })
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    accAddGrpData?.isSuccess && onSuccess && onSuccess()
  }, [accAddGrpData])
  useEffect(() => {
    maxCodeData?.isSuccess &&
      maxCodeData?.data?.maxCode &&
      form.setFieldsValue({ code: maxCodeData.data.maxCode  })
  }, [maxCodeData])
  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = async (values) => {
    const req = { ...values }
    await accAddApiCall(url.ACCOUNT_GROUP, req)
  }
  const getMaxCode = async () => {
    form.setFieldsValue({ code: null })
    await maxCodeApiCall(url.ACCOUNT_GROUP_MAX_CODE)
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
      <Ant.Form
        form={form}
        //disabled={accEditGrpLoading}
        onFinish={onFinish}
        layout="vertical"
        onFinishFailed={null}
      >
        <Ant.Row>
          <Ant.Col span={24}>
            <IconBs.BsJournalCheck style={{ color: 'orange' }} />
            {' ایجاد گروه حساب'}
            <Ant.Divider />
          </Ant.Col>
          <Ant.Col span={24} md={24} lg={12}>
            <Ant.Form.Item name={'code'} label="کد" rules={[{ required: true }]}>
              <Ant.Input addonBefore={<AddonBefore />} style={{ textAlign: 'center' }} />
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>
        <Ant.Form.Item name="name" label={'عنوان حساب'} rules={[{ required: true }]}>
          <Ant.Input allowClear showCount maxLength={200} />
        </Ant.Form.Item>
        <Ant.Form.Item name="secondName" label={'عنوان دوم حساب'} rules={[{ required: true }]}>
          <Ant.Input allowClear showCount maxLength={400} />
        </Ant.Form.Item>

        <Ant.Row gutter={[16, 8]}>
          <Ant.Col span={24} sm={12}>
            <Ant.Form.Item name={'accountTypeId'} label="نوع" rules={[{ required: true }]}>
              <Ant.Select
                placeholder={'انتخاب کنید...'}
                disabled={accTypeLoading }
                loading={accTypeLoading}
                options={accTypeData?.data}
                fieldNames={{ label: 'name', value: 'id' }}
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={24} sm={12}>
            <Ant.Form.Item name={'accountNatureId'} label="ماهیت" rules={[{ required: true }]}>
              <Ant.Select
                placeholder={'انتخاب کنید...'}
                disabled={accNatureLoading}
                loading={accNatureLoading}
                options={accNatureData?.data}
                fieldNames={{ label: 'name', value: 'id' }}
              />
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>

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
FrmAddAccountGroup.propTypes = {
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  onLoading: PropTypes.func,
}
export default FrmAddAccountGroup

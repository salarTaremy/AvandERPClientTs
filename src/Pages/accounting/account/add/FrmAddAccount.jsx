import React from 'react'
import { PropTypes } from 'prop-types'
import { useFetch, useFetchWithHandler, usePutWithHandler, usePostWithHandler } from '@/api'
import * as url from '@/api/url'
import { useEffect } from 'react'
import * as IconBs from 'react-icons/bs'
import useAllLoading from '@/hooks/useAllLoading '
import { PiArrowLineDownLeftLight } from 'react-icons/pi'
import * as Ant from 'antd'
import useRequestManager from '@/hooks/useRequestManager'
export const FrmAddAccount = (props) => {
  const { onSuccess, onCancel, onLoading } = props
  const { accountHeaderId } = props
  const [form] = Ant.Form.useForm()
  const [accNatureData, accNatureLoading, accNatureError] = useFetch(url.ACCOUNT_NATURE)
  const [maxCodeData, maxCodeLoading, maxCodeError, maxCodeApiCall] = useFetchWithHandler()
  const [accTypeData, accTypeLoading, accTypeError] = useFetch(url.ACCOUNT_TYPE)
  const [accHdrData, accHdrLoading, accHdrError] = useFetch(
    `${url.ACCOUNT_HEADER}/${accountHeaderId}`,
  )
  const [accAddHdrData, accAddHdrLoading, accAddHdrError, accAddApiCall] = usePostWithHandler()
  const allLoading = useAllLoading([
    accNatureLoading,
    accTypeLoading,
    accHdrLoading,
    maxCodeLoading,
  ])
  useRequestManager({ error: accNatureError })
  useRequestManager({ error: accTypeError })
  useRequestManager({ error: accHdrError })
  useRequestManager({ error: maxCodeError })
  useRequestManager({ error: accAddHdrError, loading: accAddHdrLoading, data: accAddHdrData })
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    form.setFieldValue('isActive', true)
  }, [form])
  useEffect(() => {
    accAddHdrData?.isSuccess && onSuccess && onSuccess()
  }, [accAddHdrData])
  useEffect(() => {
    accHdrData?.isSuccess &&
      form.setFieldsValue({
        accountNatureId: accHdrData?.data?.accountNatureId,
        accountTypeId: accHdrData?.data?.accountTypeId,
      })
  }, [accHdrData])
  useEffect(() => {
    maxCodeData?.isSuccess &&
      maxCodeData?.data?.maxCode &&
      form.setFieldsValue({ code: maxCodeData.data.maxCode })
  }, [maxCodeData])
  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = async (values) => {
    const req = { ...values, accountHeaderId: accountHeaderId }
    await accAddApiCall(url.ACCOUNT, req)
  }
  const getMaxCode = async () => {
    form.setFieldsValue({ code: null })
    await maxCodeApiCall(`${url.ACCOUNT_MAX_CODE}/${accountHeaderId}`)
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
      <Ant.Form form={form} onFinish={onFinish} layout="vertical" onFinishFailed={null}>
        <Ant.Row>
          <Ant.Col span={24}>
            <IconBs.BsBook style={{ color: 'green' }} />
            {' ایجاد حساب معین'}
            {accHdrData?.isSuccess && `(در حساب کل  ${accHdrData?.data?.name})`}
            <Ant.Divider />
          </Ant.Col>
          <Ant.Col span={24} md={24} lg={12}>
            <Ant.Form.Item name={'code'} label="کد" rules={[{ required: true }]}>
              <Ant.Input
                disabled={maxCodeLoading || accHdrLoading}
                addonAfter={accHdrData?.data?.fullCode || <Ant.Spin />}
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

        <Ant.Row gutter={[16, 8]}>
          <Ant.Col span={24} sm={12}>
            <Ant.Form.Item name={'accountTypeId'} label="نوع" rules={[{ required: true }]}>
              <Ant.Select
                placeholder={'انتخاب کنید...'}
                disabled={accTypeLoading || false}
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
                disabled={accNatureLoading || false}
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
FrmAddAccount.propTypes = {
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  onLoading: PropTypes.func,
  accountHeaderId: PropTypes.number.isRequired,
}
export default FrmAddAccount

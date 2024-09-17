import React from 'react'
import { PropTypes } from 'prop-types'
import { useFetch, useFetchWithHandler, usePutWithHandler } from '@/api'
import * as url from '@/api/url'
import { useEffect } from 'react'
import useAllLoading from '@/hooks/useAllLoading '
import * as IconBs from 'react-icons/bs'
import * as Ant from 'antd'
import useRequestManager from '@/hooks/useRequestManager'
export const FrmEditAccountHeader = ({ accountHeaderId }) => {
  const [form] = Ant.Form.useForm()
  const [accHdrData, accHdrLoading, accHdrError] = useFetch(
    `${url.ACCOUNT_HEADER}/${accountHeaderId}`,
  )
  const [accNatureData, accNatureLoading, accNatureError] = useFetch(url.ACCOUNT_NATURE)
  const [accTypeData, accTypeLoading, accTypeError] = useFetch(url.ACCOUNT_TYPE)
  const [accEditHdrData, accEditHdrLoading, accEditHdrError, accEditApiCall] = usePutWithHandler()
  useRequestManager({ error: accHdrError })
  useRequestManager({ error: accNatureError })
  useRequestManager({ error: accTypeError })
  useRequestManager({ error: accEditHdrError, data: accEditHdrData, loading: accEditHdrLoading })

  const allLoading = useAllLoading([accNatureLoading, accTypeLoading, accHdrLoading])
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    form.resetFields()
    accHdrData?.data && form.setFieldsValue({ ...accHdrData.data })
  }, [accHdrData, form])

  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = async (values) => {
    const req = {
      ...values,
      id: accountHeaderId,
      accountGroupId: accHdrData.data.accountGroupId,
    }
    await accEditApiCall(url.ACCOUNT_HEADER, req)
  }
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Skeleton  active loading={accHdrLoading}>
        <Ant.Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          onFinishFailed={null}
        >
          <Ant.Row>
            <Ant.Col span={24}>
            <IconBs.BsJournalCheck style={{ color: 'orange' }} />
              {` حساب کل : ${accHdrData?.data?.fullName}`}
              <Ant.Divider />
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={6}>
              <Ant.Form.Item name={'code'} label="کد" rules={[{ required: true }]}>
                <Ant.Input addonAfter={accHdrData?.data?.accountGroupCode || <Ant.Spin/>} style={{ textAlign: 'center' }} />
              </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>
          <Ant.Form.Item name="name" label={'عنوان حساب'} rules={[{ required: true }]}>
            <Ant.Input allowClear showCount maxLength={200} />
          </Ant.Form.Item>
          <Ant.Form.Item name="secondName" label={'عنوان دوم حساب'} rules={[{ required: true }]}>
            <Ant.Input allowClear showCount maxLength={200} />
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
                  disabled={accNatureLoading }
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
              loading={accEditHdrLoading}
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
FrmEditAccountHeader.propTypes = {
  accountHeaderId: PropTypes.number.isRequired,
}
export default FrmEditAccountHeader

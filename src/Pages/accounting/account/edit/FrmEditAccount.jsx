import React from 'react'
import { PropTypes } from 'prop-types'
import { useFetch, useFetchWithHandler, usePutWithHandler } from '@/api'
import * as url from '@/api/url'
import { useEffect } from 'react'
import useAllLoading from '@/hooks/useAllLoading '
import * as IconBs from 'react-icons/bs'
import * as Ant from 'antd'
import useRequestManager from '@/hooks/useRequestManager'
export const FrmEditAccount = ({ accountId }) => {
  const [form] = Ant.Form.useForm()
  const [accData, accLoading, accError] = useFetch(`${url.ACCOUNT}/${accountId}`)
  const [accNatureData, accNatureLoading, accNatureError] = useFetch(url.ACCOUNT_NATURE)
  const [accTypeData, accTypeLoading, accTypeError] = useFetch(url.ACCOUNT_TYPE)
  const [accEditData, accEditLoading, accEditError, accEditApiCall] = usePutWithHandler()
  useRequestManager({ error: accError })
  useRequestManager({ error: accNatureError })
  useRequestManager({ error: accTypeError })
  useRequestManager({ error: accEditError, data: accEditData, loading: accEditLoading })

  const allLoading = useAllLoading([accNatureLoading, accTypeLoading, accLoading])
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    form.resetFields()
    accData?.data && form.setFieldsValue({ ...accData.data })
  }, [accData, form])
  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = async (values) => {
    const req = {
      ...values,
      id: accountId,
      accountHeaderId: accData.data.accountHeaderId,
    }
    await accEditApiCall(url.ACCOUNT, req)
  }
  const AddonAfter = () => {
    return (
      <>
        {(accData?.data?.accountGroupCode &&
          accData?.data?.accountHeaderCode &&
          `${accData?.data?.accountGroupCode}${accData?.data?.accountHeaderCode}`) || <Ant.Spin />}
      </>
    )
  }


  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Skeleton  active loading={accLoading}>
        <Ant.Form form={form} onFinish={onFinish} layout="vertical" onFinishFailed={null}>
          <Ant.Row>
            <Ant.Col span={24}>
            <IconBs.BsBook style={{ color: 'green' }} />
              {` حساب معین : ${accData?.data?.fullName}`}
              <Ant.Divider />
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={6}>
              <Ant.Form.Item name={'code'} label="کد" rules={[{ required: true }]}>
                <Ant.Input addonAfter={<AddonAfter/>} style={{ textAlign: 'center' }} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col span={24} sm={10}>
              <Ant.Flex justify={'center'} align={'center'}>
                <Ant.Form.Item
                  name="isActive"
                  label=" "
                  valuePropName="checked"
                >
                  <Ant.Checkbox checked >{'فعال'}</Ant.Checkbox>
                </Ant.Form.Item>
              </Ant.Flex>
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
              loading={accEditLoading}
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
FrmEditAccount.propTypes = {
  accountId: PropTypes.number.isRequired,
}
export default FrmEditAccount

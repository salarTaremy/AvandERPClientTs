import React from 'react'
import { PropTypes } from 'prop-types'
import { useFetch, useFetchWithHandler, usePutWithHandler } from '@/api'
import * as url from '@/api/url'
import { useEffect } from 'react'
import useAllLoading from '@/hooks/useAllLoading '
import * as IconBs from 'react-icons/bs'
import * as Ant from 'antd'
import useRequestManager from '@/hooks/useRequestManager'
export const FrmEditAccountGroup = ({ accountGroupId }) => {
  const [form] = Ant.Form.useForm()
  const [accGrpData, accGrpLoading, accGrpError] = useFetch(
    `${url.ACCOUNT_GROUP}/${accountGroupId}`,
  )
  const [accNatureData, accNatureLoading, accNatureError] = useFetch(url.ACCOUNT_NATURE)
  const [accTypeData, accTypeLoading, accTypeError] = useFetch(url.ACCOUNT_TYPE)
  const [accEditGrpData, accEditGrpLoading, accEditGrpError, accEditApiCall] = usePutWithHandler()
  useRequestManager({ error: accGrpError })
  useRequestManager({ error: accNatureError })
  useRequestManager({ error: accTypeError })
  useRequestManager({ error: accEditGrpError, data: accEditGrpData, loading: accEditGrpLoading })

  const allLoading = useAllLoading([accNatureLoading, accTypeLoading, accGrpLoading])
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    form.resetFields()
    accGrpData?.data && form.setFieldsValue({ ...accGrpData.data })
  }, [accGrpData, form])

  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = async (values) => {
    const req = { ...values, id: accountGroupId }
    await accEditApiCall(url.ACCOUNT_GROUP, req)
  }
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Skeleton loading={accGrpLoading}>
        <Ant.Form
          form={form}
          //disabled={accEditGrpLoading}
          onFinish={onFinish}
          layout="vertical"
          onFinishFailed={null}
        >
          <Ant.Row>
          <Ant.Col span={24}>
          <IconBs.BsFillJournalBookmarkFill style={{ color: '#3498db' }} />
              {' گروه حساب'}
              <Ant.Divider/>
            </Ant.Col>
            <Ant.Col span={24} md={24} lg={6}>
              <Ant.Form.Item name={'code'} label="کد" rules={[{ required: true }]}>
                <Ant.Input style={{ textAlign: 'center' }} />
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
              loading={accEditGrpLoading}
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
FrmEditAccountGroup.propTypes = {
  accountGroupId: PropTypes.number.isRequired,
}
export default FrmEditAccountGroup

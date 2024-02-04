import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import { PiArrowLineDownLeftLight } from 'react-icons/pi'
import { useFetch, useFetchWithHandler, usePostWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import useAllLoading from '@/hooks/useAllLoading '
import { PlusOutlined } from '@ant-design/icons'
import { CloseOutlined } from '@ant-design/icons'
import AccountDocumentArticle from './_AccountDocumentArticle'
import AccountDocumentHeader from './_AccountDocumentHeader'
import AccountDocumentDetail from './_AccountDocumentDetail'

export const FrmAddAccountDocument = () => {
  const [form] = Ant.Form.useForm()
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT)
  const [accountData, accountLoading, accountError] = useFetch(url.ACCOUNT)
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler()
  useRequestManager({ error: dtAccError })
  useRequestManager({ error: addError })
  //-------------------------------------------------------------------------
  const onFinish = async (values) => {
    const calender = parseInt(values?.calendarId?.toString().replace(/\//g, ''))
    const header = { ...values, calendarId: calender, documentNumber: 0 }
    delete header.details
    const updatedParentObject = {
      header,
      details: values.details,
    }

    await addApiCall(url.ACCOUNT_DOCUMENT, updatedParentObject)
  }
  return (
    <>
      <Ant.Card Card title={'ایجاد سند حسابداری'} type="inner">
        <Ant.Form
          onFinish={onFinish}
          form={form}
          layout="vertical"
          initialValues={{ accountingDocumentTypeId: 1 }}
        >
          <AccountDocumentHeader />

          {dtAccData?.data && (
            <AccountDocumentDetail
              detailedAccounList={[...dtAccData?.data]}
              accountList={[...accountData?.data]}
            />
          )}

          <Ant.Flex align="center" justify="flex-start" gap="small" vertical>
            <Ant.Form.Item>
              <Ant.Button
                type="primary"
                onClick={() => {
                  form.submit()
                }}
              >
                {'تایید'}
              </Ant.Button>
            </Ant.Form.Item>
          </Ant.Flex>
          {/* =========================================== */}
          <Ant.Form.Item noStyle shouldUpdate>
            {() => (
              <Ant.Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Ant.Typography>
            )}
          </Ant.Form.Item>
        </Ant.Form>
      </Ant.Card>
    </>
  )
}
export default FrmAddAccountDocument
FrmAddAccountDocument.propTypes = {
  detailedAccounList: PropTypes.any.isRequired,
}

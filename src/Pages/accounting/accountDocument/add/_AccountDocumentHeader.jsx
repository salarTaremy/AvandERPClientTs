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
import MyDatePicker from '@/components/common/MyDatePicker'
const AccountDocumentHeader = () => {
  const [branchData, branchLoading, branchError] = api.useFetch(url.BRANCH)
  const [accTypeData, accTypeLoading, accTypeError] = api.useFetch(url.ACCOUNTING_DOCUMENT_TYPE)
  const [accStateData, accStateLoading, accStateError] = api.useFetch(url.ACCOUNT_DOCUMENT_STATE)
  useRequestManager({ error: branchError })
  useRequestManager({ error: accTypeError })
  useRequestManager({ error: accStateError })
  const { TextArea } = Ant.Input
  const commonOptions = {
    placeholder: 'انتخاب کنید...',
    showSearch: true,
    filterOption: (input, option) => option.name.indexOf(input) >= 0,
  }
  return (
    <>
      <Ant.Row gutter={[16, 8]}>
        <Ant.Col span={24} md={24} lg={6}>
          <Ant.Form.Item rules={[{ required: true }]} name={'branchId'} label="شعبه سند">
            <Ant.Select
              {...commonOptions}
              allowClear={true}
              placeholder={'انتخاب کنید...'}
              disabled={branchLoading || false}
              loading={branchLoading}
              options={branchData?.data}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Ant.Form.Item>
        </Ant.Col>
        <Ant.Col span={24} md={24} lg={6}>
          <Ant.Form.Item name={'accountingDocumentTypeId'} label="نوع سند">
            <Ant.Select
              disabled
              allowClear={true}
              placeholder={'انتخاب کنید...'}
              loading={accTypeLoading}
              options={accTypeData?.data}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Ant.Form.Item>
        </Ant.Col>
        <Ant.Col span={24} md={24} lg={6}>
          <Ant.Form.Item
            rules={[{ required: true }]}
            name={'accountingDocumentStateId'}
            label="وضعیت"
          >
            <Ant.Select
              allowClear={true}
              placeholder={'انتخاب کنید...'}
              disabled={accStateLoading || false}
              loading={accStateLoading}
              options={accStateData?.data && [...accStateData?.data?.filter((c) => c.id <= 2)]}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Ant.Form.Item>
        </Ant.Col>
        <Ant.Col span={24} md={24} lg={6}>
          <Ant.Form.Item rules={[{ required: true }]} name="calendarId" label="تاریخ سند">
            <MyDatePicker />
          </Ant.Form.Item>
        </Ant.Col>
        <Ant.Col span={24} md={24} lg={6}>
          <Ant.Form.Item rules={[{ required: true } ]}  name="subNumber" label="شماره فرعی">
            <Ant.InputNumber style={{ width: '100%' }} />
          </Ant.Form.Item>
        </Ant.Col>
        <Ant.Col span={24} md={24} lg={12}>
          <Ant.Form.Item name="description" label="توضیحات">
            <TextArea rows={2} />
          </Ant.Form.Item>
        </Ant.Col>
      </Ant.Row>
    </>
  )
}
export default AccountDocumentHeader

import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import MyDatePicker from '@/components/common/MyDatePicker'
import { PropTypes } from 'prop-types'
import useRequestManager from '@/hooks/useRequestManager'
import moment from 'moment'
//====================================================================
//                        Declaration
//====================================================================
const FilterPanel = (props) => {
  const [branchData, branchLoading, branchError] = api.useFetch(url.BRANCH)
  const [accTypeData, accTypeLoading, accTypeError] = api.useFetch(url.ACCOUNTING_DOCUMENT_TYPE)
  const [accStateData, accStateLoading, accStateError] = api.useFetch(url.ACCOUNT_DOCUMENT_STATE)
  const { onSubmit, filterObject } = props
  const [form] = Ant.Form.useForm()
  useRequestManager({ error: branchError })
  useRequestManager({ error: accTypeError })
  useRequestManager({ error: accStateError })
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    const dateFilter = {}
    if (filterObject?.fromDate) {
      const yearFrom = filterObject?.fromDate?.substr(0, 4)
      const monthFrom = filterObject?.fromDate?.substr(4, 2)
      const dayFrom = filterObject?.fromDate?.substr(6, 2)
      const formattedFromDate = `${yearFrom}/${monthFrom}/${dayFrom}`;
      dateFilter.fromDate= formattedFromDate;
    }
    if (filterObject?.toDate) {
      const yearTo = filterObject?.toDate?.substr(0, 4)
      const monthTo = filterObject?.toDate?.substr(4, 2)
      const dayTo = filterObject?.toDate?.substr(6, 2)
      const formattedToDate = `${yearTo}/${monthTo}/${dayTo}`;
      dateFilter.toDate= formattedToDate;
    }
    // filterObject && form.setFieldsValue({ ...filterObject, fromDate: formattedFromDate, toDate: formattedToDate })
    filterObject && form.setFieldsValue({ ...filterObject,...dateFilter })
  }, [])
  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = (values) => {
    onSubmit({
      ...values,
      fromDate: values?.fromDate?.toString().replace(/\//g, ''),
      toDate: values?.toDate?.toString().replace(/\//g, ''),
    })
  }
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Form form={form} onFinish={onFinish} layout="vertical" onFinishFailed={null}>
        <Ant.Form.Item name={'branchId'} label="شعبه سند">
          <Ant.Select
            allowClear={true}
            placeholder={'انتخاب کنید...'}
            disabled={branchLoading || false}
            loading={branchLoading}
            options={branchData?.data}
            fieldNames={{ label: 'name', value: 'id' }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item name={'accountingDocumentTypeId'} label="نوع سند">
          <Ant.Select
            allowClear={true}
            placeholder={'انتخاب کنید...'}
            disabled={accTypeLoading || false}
            loading={accTypeLoading}
            options={accTypeData?.data}
            fieldNames={{ label: 'name', value: 'id' }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item name={'accountingDocumentStateId'} label="وضعیت">
          <Ant.Select
            allowClear={true}
            placeholder={'انتخاب کنید...'}
            disabled={accStateLoading || false}
            loading={accStateLoading}
            options={accStateData?.data}
            fieldNames={{ label: 'name', value: 'id' }}
          />
        </Ant.Form.Item>
        <Ant.Space>
          <Ant.Form.Item name={'fromDate'} label="از تاریخ">
            <MyDatePicker />
          </Ant.Form.Item>
          <Ant.Form.Item name={'toDate'} label="تا تاریخ">
            <MyDatePicker />
          </Ant.Form.Item>
        </Ant.Space>
        <Ant.Space>
          <Ant.Form.Item name={'fromDocumentNumber'} label="شماره" autoFocus>
            <Ant.InputNumber allowClear min={0} addonBefore={'از'} />
          </Ant.Form.Item>
          <Ant.Form.Item name={'toDocumentNumber'} label=" ">
            <Ant.InputNumber allowClear min={0} addonBefore={'تا'} />
          </Ant.Form.Item>
        </Ant.Space>
        <Ant.Space>
          <Ant.Form.Item name={'fromInflectionNumber'} label="شماره عطف">
            <Ant.InputNumber allowClear min={0} addonBefore={'از'} />
          </Ant.Form.Item>
          <Ant.Form.Item name={'toInflectionNumber'} label=" ">
            <Ant.InputNumber allowClear min={0} addonBefore={'تا'} />
          </Ant.Form.Item>
        </Ant.Space>
        <Ant.Space>
          <Ant.Form.Item name={'fromSubNumber'} label="شماره فرعی">
            <Ant.InputNumber allowClear min={0} addonBefore={'از'} />
          </Ant.Form.Item>
          <Ant.Form.Item name={'toSubNumber'} label=" ">
            <Ant.InputNumber allowClear mmin={0} addonBefore={'تا'} />
          </Ant.Form.Item>
        </Ant.Space>
        <Ant.Space>
          <Ant.Form.Item name={'fromDailyNumber'} label="شماره روزانه">
            <Ant.InputNumber allowClear min={0} addonBefore={'از'} />
          </Ant.Form.Item>
          <Ant.Form.Item name={'toDailyNumber'} label=" ">
            <Ant.InputNumber allowClear min={0} addonBefore={'تا'} />
          </Ant.Form.Item>
        </Ant.Space>
        <Ant.Form.Item>
          <Ant.Button
            block
            type="primary"
            onClick={() => {
              form.submit()
            }}
          >
            {'اعمال'}
          </Ant.Button>
        </Ant.Form.Item>
      </Ant.Form>
    </>
  )
}

export default FilterPanel
FilterPanel.propTypes = {
  onSubmit: PropTypes.func,
  filterObject: PropTypes.any,
}

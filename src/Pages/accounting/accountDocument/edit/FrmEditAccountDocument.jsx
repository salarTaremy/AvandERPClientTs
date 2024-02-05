import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import * as url from '@/api/url'
import MyDatePicker from '@/components/common/MyDatePicker'
import { useFetch, usePutWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import TBL from '../../../accounting/accountDocument/add/Table'
import * as api from '@/api'
import {  useParams } from 'react-router-dom'
import qs from 'qs'
export const FrmAddAccountDocument = () => {
  const [accTypeData, accTypeLoading, accTypeError] = useFetch(url.ACCOUNTING_DOCUMENT_TYPE)
  const [branchData, branchLoading, branchError] = useFetch(url.BRANCH)
  const [accStateData, accStateLoading, accStateError] = useFetch(url.ACCOUNT_DOCUMENT_STATE)
  const [listDataHeader, listLoadingHeader, listErrorHeader, listApiCallHeader] =
    api.useFetchWithHandler()
  // const [listDataDetail, listLoadingDetail, listErrorDetail, listApiCallDetail] =
  //   api.useFetchWithHandler()

  const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
  const [form] = Ant.Form.useForm()
  useRequestManager({ error: accStateError })
  useRequestManager({ error: listErrorHeader })
  // useRequestManager({ error: listErrorDetail })
  useRequestManager({ error: editError, loading: editLoading, data: editData })

  useRequestManager({ error: accTypeError })
  useRequestManager({ error: branchError })
  const [dataSource, setDataSource] = useState([])
  // const [dataDetailObject, setDataDetailObject] = useState()
  const [sumDebtor, setSumDebtor] = useState(0)
  const [sumCreditor, setSumCreditor] = useState(0)
  const params = useParams()
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    form.resetFields()
  }, [form])

  useEffect(() => {
    onEditHeader()
    // onEditDetail()
  }, [])


  useEffect(() => {
    form.resetFields()
    listDataHeader?.isSuccess && form.setFieldsValue({ ...(listDataHeader?.data || null) })
    console.log(listDataHeader?.data, 'listDataHeader')
  }, [listDataHeader])
  // useEffect(() => {
  //   form.resetFields()
  //   listDataDetail?.isSuccess && form.setFieldsValue({ ...(listDataDetail?.data || null) })
  //   console.log(listDataDetail?.data, 'listDataDetail')
  // }, [listDataDetail])

  //====================================================================
  //
  //====================================================================

  const onEditHeader = async () => {
    await listApiCallHeader(`${url.ACCOUNT_DOCUMENT}/${params.id}`)
  }
  // const onEditDetail = async () => {
  //   debugger

  //   const queryString = qs.stringify({
  //     AccountingDocumentID:parseInt(params.id),
  //   })
  //   await listApiCallDetail(`${url.ACCOUNT_DOCUMENT_DETAIL}?${queryString}`)

  // }

  const onChangeDatePicker = (e, key) => {
    const value = e.target
    setDataSource((prevDataSource) =>
      prevDataSource.map((record) => {
        if (record.key === key) {
          return { ...record, calendarId: value }
        }
        return record
      }),
    )
  }

  //====================================================================
  //                        Functions
  //====================================================================
  const updateDebtor = (debtor) => {
    setSumDebtor(debtor)
  }
  const updateCreditor = (creditor) => {
    setSumCreditor(creditor)
  }

  const onFinish = async (values) => {
    alert("hhhhh")
    let valueHeader = form.getFieldsValue()
    console.log(valueHeader,"valueHeader")
    const header = {
      documentNumber: 0,
      branchId: valueHeader.branchId,
      accountingDocumentTypeId: valueHeader.AccountingDocumentTypeId,
      accountingDocumentStateId: valueHeader.accountingDocumentStateId,
      calendarId: parseInt(valueHeader?.persianDateTilte?.toString().replace(/\//g, '')),
      subNumber: valueHeader.subNumber,
    }

    const detailsList = []

    for (let key in values) {
      if (typeof values[key] === 'object') {
        detailsList.push(values[key])
      }
    }
    const filteredAnyObj = detailsList.filter((obj) => Object.keys(obj).length > 0)
    console.log(filteredAnyObj, 'filteredAnyObj')
    delete header.details
    const dto = {
      header,
      details: filteredAnyObj,
    }

    await editApiCall(url.ACCOUNT_DOCUMENT, dto)
  }

  //====================================================================
  //                        Child Components
  //====================================================================
  const FooterContent = () => {
    return (
      <>
        <Ant.Flex gap="middle" vertical>
          <Ant.Flex justify="space-between" align="center">
            <Ant.Button
              htmlType="submit"
              type="primary"
              style={{ width: 150 }}
              onClick={() => {
                form.submit()
              }}
            >
              {'تایید'}
            </Ant.Button>
            <span className="text-blue-600">
              <div>جمع کل بدهکار: {sumDebtor.toLocaleString() || 0}</div>
              <div>جمع کل بستانکار: {sumCreditor.toLocaleString() || 0}</div>
            </span>
          </Ant.Flex>
        </Ant.Flex>
      </>
    )
  }

  //====================================================================
  //                        Component
  //====================================================================
  const text = <strong>{'ویرایش سند حسابداری'}</strong>
  return (
    <>
      <Ant.Collapse
        style={{ backgroundColor: 'white' }}
        defaultActiveKey={['1']}
        items={[
          {
            key: '1',
            label: text,

            children: (
              <>
                <Ant.Form form={form} layout="vertical" onFinishFailed={null}>
                  <Ant.Row gutter={[16, 8]}>
                    <Ant.Col lg={6} md={12} sm={12} xs={24}>
                      <Ant.Form.Item
                        rules={[{ required: true }]}
                        name={'branchId'}
                        label="شعبه سند"
                      >
                        <Ant.Select
                          allowClear={true}
                          placeholder={'انتخاب کنید...'}
                          disabled={branchLoading || false}
                          loading={branchLoading}
                          options={branchData?.data}
                          fieldNames={{ label: 'name', value: 'id' }}
                        />
                      </Ant.Form.Item>
                    </Ant.Col>
                    <Ant.Col lg={6} md={12} sm={12} xs={24}>
                      <Ant.Form.Item
                        rules={[{ required: true }]}
                        name={'accountingDocumentTypeId'}
                        label="نوع سند "
                      >
                        <Ant.Select
                          allowClear={true}
                          placeholder={'انتخاب کنید...'}
                          disabled={accTypeLoading || false}
                          loading={accTypeLoading}
                          options={accTypeData?.data}
                          fieldNames={{ label: 'name', value: 'id' }}
                        />
                      </Ant.Form.Item>
                    </Ant.Col>
                    <Ant.Col lg={6} md={12} sm={12} xs={24}>
                      <Ant.Form.Item
                        rules={[{ required: true }]}
                        name={'accountingDocumentStateId'}
                        label="وضعیت "
                      >
                        <Ant.Select
                          allowClear={true}
                          placeholder={'انتخاب کنید...'}
                          disabled={accStateLoading || false}
                          loading={accStateLoading}
                          options={accStateData?.data}
                          fieldNames={{ label: 'name', value: 'id' }}
                        />
                      </Ant.Form.Item>
                    </Ant.Col>

                    <Ant.Col lg={6} md={12} sm={12} xs={24}>
                      <Ant.Form.Item
                        rules={[{ required: true }]}
                        name={'subNumber'}
                        label="شماره فرعی"
                      >
                        <Ant.InputNumber min={0} style={{ width: '100%' }} />
                      </Ant.Form.Item>
                    </Ant.Col>
                    <Ant.Col lg={6} md={12} sm={12} xs={24}>
                      <Ant.Form.Item name={'persianDateTilte'} label="تاریخ">
                        <MyDatePicker onChange={onChangeDatePicker} />
                      </Ant.Form.Item>
                    </Ant.Col>
                    <Ant.Col lg={18} md={12} sm={12} xs={24}>
                      <Ant.Form.Item
                        name={'description'}
                        label="توضیحات"
                        rules={[{ required: false }]}
                      >
                        <Ant.Input.TextArea allowClear showCount maxLength={400} />
                      </Ant.Form.Item>
                    </Ant.Col>
                  </Ant.Row>
                </Ant.Form>
                {/* <Ant.Flex gap="middle" vertical>
                    <Ant.Flex justify="center" align="center">
                        <Ant.Button
                          htmlType="submit"
                          type="primary"
                          style={{ width: 150 }}
                          onClick={() => {
                            form.submit()
                          }}
                        >
                          {'تایید'}
                        </Ant.Button>

                    </Ant.Flex>
                  </Ant.Flex> */}
              </>
            ),
          },
        ]}
      />

      <TBL
        updateDebtor={updateDebtor}
        updateCreditor={updateCreditor}
        footer={FooterContent}

        onSubmit={onFinish}
      />
    </>
  )
}
export default FrmAddAccountDocument

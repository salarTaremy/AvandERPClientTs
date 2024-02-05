import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import * as url from '@/api/url'
import MyDatePicker from '@/components/common/MyDatePicker'
import { useFetch, usePutWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import TBL from '../../../accounting/accountDocument/add/Table'
import * as api from '@/api'
import { useParams } from 'react-router-dom'
export const FrmEditAccountDocument = () => {
  const [accTypeData, accTypeLoading, accTypeError] = useFetch(url.ACCOUNTING_DOCUMENT_TYPE)
  const [branchData, branchLoading, branchError] = useFetch(url.BRANCH)
  const [accStateData, accStateLoading, accStateError] = useFetch(url.ACCOUNT_DOCUMENT_STATE)
  const [listDataHeader, listLoadingHeader, listErrorHeader, listApiCallHeader] =
    api.useFetchWithHandler()
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
  const [dataEditList, setDataEdit] = useState([])
  const [sumDebtorEdit, setSumDebtorEdit] = useState(0)
  const [sumCreditorEdit, setSumCreditorEdit] = useState(0)
  const [form] = Ant.Form.useForm()
  const params = useParams()
  useRequestManager({ error: editError, loading: editLoading, data: editData })
  useRequestManager({ error: accStateError })
  useRequestManager({ error: listErrorHeader })
  useRequestManager({ error: accTypeError })
  useRequestManager({ error: branchError })


  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    form.resetFields()
  }, [form])

  useEffect(() => {
    onEditHeader()
  }, [])
  useEffect(() => {}, [dataEditList])

  useEffect(() => {
    form.resetFields()
    listDataHeader?.isSuccess && form.setFieldsValue({ ...(listDataHeader?.data || null) })
  }, [listDataHeader])

  //====================================================================
  //                        Functions
  //====================================================================
  const onEditHeader = async () => {
    await listApiCallHeader(`${url.ACCOUNT_DOCUMENT}/${params.id}`)
  }

  const dataEdit = (data) => {
    setDataEdit(data)
  }
  const updateDebtorEdit = (debtor) => {
    setSumDebtorEdit(debtor)
  }
  const updateCreditorEdit = (creditor) => {
    setSumCreditorEdit(creditor)
  }
  const onFinish = async (values) => {
    let valueHeader = form.getFieldsValue()

    const header = {
      id: parseInt(params.id),
      documentNumber: 0,
      branchId: valueHeader.branchId,
      calendarId: parseInt(valueHeader?.persianDateTilte?.toString().replace(/\//g, '')),
      subNumber: valueHeader.subNumber,
      description: valueHeader.description,
    }

    const detailsList = []

    for (let key in values) {
      if (typeof values[key] === 'object') {
        detailsList.push(values[key])
      }
    }

    delete header.details
    const dto = {
      header,
      details: detailsList,
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
            <span className="text-primary">
              <div>جمع کل بدهکار: {sumDebtorEdit.toLocaleString() || 0}</div>
              <div>جمع کل بستانکار: {sumCreditorEdit.toLocaleString() || 0}</div>
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
                          disabled
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
                          disabled
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
                        <MyDatePicker />
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
              </>
            ),
          },
        ]}
      />
      <TBL
        updateDebtorEdit={updateDebtorEdit}
        updateCreditorEdit={updateCreditorEdit}
        footer={FooterContent}
        dataEdit={dataEdit}
        onSubmit={onFinish}
      />
    </>
  )
}
export default FrmEditAccountDocument

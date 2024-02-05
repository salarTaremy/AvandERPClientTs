import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
  Tabs,
  Space,
  theme,
  Steps,
  Affix,
  Spin,
  Divider,
  QRCode,
  Upload,
  Checkbox,
  Popconfirm,
} from 'antd'
import { useFetch, usePostWithHandler } from '@/api'
import * as url from '@/api/url'
import { BaseStep } from './steps/BaseStep'
import { SupplierStep } from './steps/SupplierStep'
import { SeasonalReportsStep } from './steps/SeasonalReportsStep'
import { UnitsStep } from './steps/UnitsStep'
import { TechnicalSpecificationsStep } from './steps/TechnicalSpecificationsStep'
import { BarcodeStep } from './steps/BarcodeStep'
import { FinalStep } from './steps/FinalStep'
import { RequestManager } from '@/components/common/RequestManager'
const { useToken } = theme
const { Step } = Steps
  //====================================================================
  //                        Declaration
  //====================================================================
export const FrmAddProduct = () => {
  const [formValues, setFormValues] = useState({}) // ایجاد متغیر موقت برای ذخیره تمام مقادیر ورودی فرم
  const [unitsData, unitsLoading, unitsError] = useFetch(url.PRODUCT_UNIT)
  const [savingData, savingLoading, savingError, savingApiCall] = usePostWithHandler()
  const { token } = useToken()
  const [qrCode, setQrCode] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [form] = Form.useForm()

  const steps = [
    {
      title: 'اطلاعات پایه',
      content: <BaseStep form={form} />,
    },
    {
      title: 'واحد کالا',
      content: <UnitsStep form={form} />,
    },
    {
      title: 'برند و تأمین کننده',
      content: <SupplierStep form={form} />,
    },
    {
      title: 'بارکد',
      content: <BarcodeStep />,
    },
    {
      title: 'گزارشات فصلی(169)',
      content: <SeasonalReportsStep form={form} />,
    },
    {
      title: 'مشخصات فنی',
      content: <TechnicalSpecificationsStep form={form} />,
    },
    {
      title: 'اتمام',
      content: <FinalStep form={form} />,
    },
  ]

  const onFinish = async (values) => {
    await savingApiCall(url.PRODUCT, { ...formValues })
  }

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo)
  }

  const onConfirm = (e) => {
    form.submit()
  }

  const popconfirm = {
    title: 'ثبت کالا/خدمت',
    description: 'برای ثبت اطلاعات وارد شده مطمئن هستید ؟',
    okText: 'تایید',
    cancelText: 'انصراف',
    onConfirm: onConfirm,
  }

  const nextStep = async () => {
    try {
      await form.validateFields()
      const formFields = await form.getFieldsValue()
      setFormValues({ ...formValues, ...formFields })
      setCurrentStep(currentStep + 1)
    } catch (error) {
      steps[currentStep + 1].status = 'error'
      console.error('خطا در اعتبارسنجی فرم:', error)
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  return (
    <>
      <RequestManager error={savingError} data={savingData} loading={savingLoading} />
      <div style={{ minHeight: '100px' }}>
        <Steps current={currentStep} size="small">
          {steps.map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>
        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <>{steps[currentStep].content}</>
          <Row gutter={[16, 8]} justify="end">
            {currentStep > 0 && (
              <Col span={24} sm={12} md={4}>
                <Button disabled={savingLoading} onClick={prevStep} block>
                  {'قبلی'}
                </Button>
              </Col>
            )}
            {currentStep < steps.length - 1 && (
              <Col span={24} sm={12} md={4}>
                <Button type="primary" onClick={nextStep} block>
                  {'بعدی'}
                </Button>
              </Col>
            )}
            {currentStep === steps.length - 1 && (
              <Col span={24} sm={12} md={4}>
                <Popconfirm {...popconfirm}>
                  <Button loading={savingLoading} type="primary" block>
                    {'تایید'}
                  </Button>
                </Popconfirm>
              </Col>
            )}
          </Row>
        </Form>
      </div>
    </>
    // )
  )
}

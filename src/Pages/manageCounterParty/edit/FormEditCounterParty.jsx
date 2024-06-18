import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import { Steps, Form } from "antd";
import {
  usePutWithHandler,
} from "@/api";
import ModalHeader from "@/components/common/ModalHeader";
import { BasicInfoStep } from "../edit/steps/BasicInfoStep";
import CounterpartyAddressList from "@/Pages/manageCounterParty/counterpartyContactInfo/address/list/CounterpartyAddressList";
import CounterpartyBankAccountList from "@/Pages/manageCounterParty/counterpartyBankAccount/list/CounterpartyBankAccountList";



const FormEditCounterParty = ({ onSuccess, id, key }) => {
  const [form] = Ant.Form.useForm();
  const { Step } = Steps;

  const [
    counterpartyEditedData,
    counterpartyEditLoading,
    counterpartyEditError,
    counterpartyEditApiCall,
  ] = usePutWithHandler();
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState({}); // ایجاد متغیر موقت برای ذخیره تمام مقادیر ورودی فرم

  const steps = () => [
    {
      title: "اطلاعات پایه",
      content:
        <Ant.Form
          form={form}
          key={key}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <BasicInfoStep form={form} id={id} />
        </Ant.Form>,
    },
    {
      title: "اطلاعات تماس",
      content: <CounterpartyAddressList counterpartyId={id} />,
    },
    {
      title: "اطلاعات حساب بانکی",
      content: <CounterpartyBankAccountList counterpartyId={id} />,
    },
  ];
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    counterpartyEditedData?.isSuccess && onSuccessEdit();
  }, [counterpartyEditedData]);

  //====================================================================
  //                        Functions
  //====================================================================
  const onSuccessEdit = () => {
    setCurrentStep(currentStep + 1);
  }

  const onFinish = async (values) => {
    await counterpartyEditApiCall(url.COUNTER_PARTY, { ...formValues, id: id });
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  const onSave = async (e) => {
    try {
      await form.validateFields();
      const formFields = await form.getFieldsValue();
      const cityFields = {};
      cityFields.cityId = formFields.cityId[1];
      if (formFields.birthCertificatePlaceOfIssueCityId) {
        cityFields.birthCertificatePlaceOfIssueCityId = formFields.birthCertificatePlaceOfIssueCityId[1];
      }
      if (formFields.companyRegistrationPlaceCityId) {
        cityFields.companyRegistrationPlaceCityId = formFields.companyRegistrationPlaceCityId[1];
      }
      const dateFields = {};
      if (formFields.birthDateCalendarId) {
        dateFields.birthDateCalendarId = formFields.birthDateCalendarId.toString().replace(/\//g, "");
      }
      setFormValues({ ...formValues, ...formFields, ...cityFields, ...dateFields });
      form.submit();
    } catch (error) {
      steps()[currentStep + 1].status = "error";
      console.error("خطا در اعتبارسنجی فرم:", error);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"ویرایش طرف حساب"} />
      <div style={{ minHeight: "100px" }}>
        <Steps current={currentStep} size="small" className="mb-4">
          {steps().map((step, index) => (
            <Step key={index} title={step.title} />
          ))}
        </Steps>
        <>{steps()[currentStep].content}</>
        <Ant.Row gutter={[16, 8]} justify="end">
          {currentStep > 0 && (
            <Ant.Col span={24} sm={12} md={4}>
              <Ant.Button
                onClick={prevStep}
                block
              >
                {"قبلی"}
              </Ant.Button>
            </Ant.Col>
          )}
          {currentStep === 0 && (
            <Ant.Col span={24} sm={12} md={4}>
              <Ant.Button
                type="primary"
                block
                onClick={onSave}
              >
                {"ذخیره و ادامه"}
              </Ant.Button>
            </Ant.Col>
          )}
          {currentStep !== 0 && currentStep < steps().length - 1 && (
            <Ant.Col span={24} sm={12} md={4}>
              <Ant.Button type="primary" onClick={nextStep} block>
                {"بعدی"}
              </Ant.Button>
            </Ant.Col>
          )}
          {currentStep === steps().length - 1 && (
            <Ant.Col span={24} sm={12} md={4}>
              <Ant.Button
                type="primary"
                block
                onClick={onSuccess}
              >
                {"اتمام"}
              </Ant.Button>
            </Ant.Col>
          )}
        </Ant.Row>
      </div>
    </>
    // )
  );
};
export default FormEditCounterParty;

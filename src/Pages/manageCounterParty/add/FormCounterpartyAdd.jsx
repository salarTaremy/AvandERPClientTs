import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { Steps, Form } from "antd";
import * as url from "@/api/url";
import { usePostWithHandler, usePutWithHandler } from "@/api";
import { RequestManager } from "@/components/common/RequestManager";
import * as uuid from "uuid";
import { BasicInfoStep } from "./steps/BasicInfoStep";
import CounterpartyAddressList from "../counterpartyContactInfo/address/list/CounterpartyAddressList";
import CounterpartyBankAccountList from "../counterpartyBankAccount/list/CounterpartyBankAccountList";
import ModalHeader from "@/components/common/ModalHeader";
import { FaUserPlus } from "react-icons/fa6";
const { Step } = Steps;

//====================================================================
//                        Declaration
//====================================================================
export const FormCounterpartyAdd = (props) => {
  const { onSuccess } = props;
  const [formValues, setFormValues] = useState({}); // ایجاد متغیر موقت برای ذخیره تمام مقادیر ورودی فرم
  const [
    counterpartyAddedData,
    counterpartyAddLoading,
    counterpartyAddError,
    counterpartyAddApiCall,
  ] = usePostWithHandler();

  const [
    counterpartyEditedData,
    counterpartyEditLoading,
    counterpartyEditError,
    counterpartyEditApiCall,
  ] = usePutWithHandler();

  const [counterpartyId, setCounterpartyId] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const steps =() =>   [
    {
      title: "اطلاعات پایه",
      content: 
      <Ant.Form
        form={form}
        key={uuid.v1()}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <BasicInfoStep form={form} counterpartyId={counterpartyId}/>
      </Ant.Form>,
    },
    {
      title: "اطلاعات تماس",
      content: <CounterpartyAddressList counterpartyId={counterpartyId} />,
    },
    {
      title: "اطلاعات حساب بانکی",
      content: <CounterpartyBankAccountList counterpartyId={counterpartyId} />,
    },
  ];

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    counterpartyAddedData?.isSuccess && onSuccessAdd();
  }, [counterpartyAddedData]);

  useEffect(() => {
    counterpartyEditedData?.isSuccess && onSuccessEdit();
  }, [counterpartyEditedData]);

  //====================================================================
  //                        Functions
  //====================================================================
  const onSuccessAdd = () => {
    setCounterpartyId(counterpartyAddedData?.data.id);
    setCurrentStep(currentStep + 1);
  };

  const onSuccessEdit = () => {
    setCurrentStep(currentStep + 1);
  }

  const onFinish = async (values) => {
    if (counterpartyId === 0) {
      await counterpartyAddApiCall(url.COUNTER_PARTY, { ...formValues });
    }
    else {
      await counterpartyEditApiCall(url.COUNTER_PARTY, { ...formValues, id: counterpartyId });
    }
    
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
      <ModalHeader title={"افزودن طرف حساب"} icon={<FaUserPlus />}/>
      <RequestManager
        error={counterpartyAddError}
        data={counterpartyAddedData}
        loading={counterpartyAddLoading}
      />
      {/* <div style={{ minHeight: "100px" }}> */}
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
                  disabled={counterpartyAddLoading}
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
                  loading={counterpartyAddLoading}
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
      {/* </div> */}
    </>
    // )
  );
};

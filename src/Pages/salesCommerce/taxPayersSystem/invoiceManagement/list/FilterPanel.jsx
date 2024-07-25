import React, { useEffect } from "react";
import qs from "qs";
import { PropTypes } from "prop-types";
import * as url from "@/api/url";
import * as api from "@/api";
import * as Ant from "antd";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ClockCircleTwoTone,
  ExclamationCircleTwoTone,
  QuestionCircleTwoTone,
  PauseCircleTwoTone,
  UpCircleTwoTone,
  PlayCircleTwoTone,
  StopTwoTone,
} from "@ant-design/icons";
import DebounceSelect from "@/components/common/DebounceSelect";
import MyDatePicker from "@/components/common/MyDatePicker";
import useRequestManager from "@/hooks/useRequestManager";

//====================================================================
//                        Declaration
//====================================================================
const FilterPanel = (props) => {
  const [form] = Ant.Form.useForm();
  const [
    saleDocumentIssueData,
    saleDocumentIssueLoading,
    saleDocumentIssueError,
  ] = api.useFetch(url.TPS_SALE_DOCUMENT_ISSUE);

  const [
    invoiceInquiryStatusData,
    invoiceInquiryStatusLoading,
    invoiceInquiryStatusError,
  ] = api.useFetch(url.TPS_INVOICE_INQUIRY_STATUS);

  const [
    invoiceSendingStatusData,
    invoiceSendingStatusLoading,
    invoiceSendingStatusError,
  ] = api.useFetch(url.TPS_INVOICE_SENDING_STATUS);

  const saleDocTypeQueryString = qs.stringify({
    hasMappedTaxPayersSystemSaleDocumentIssue: true,
  });
  const saleDocTypeFetchUrl = `${url.SALE_DOCUMENT_TYPE}?${saleDocTypeQueryString}`;
  const [saleDocTypeData, saleDocTypeLoading, saleDocTypeError] =
    api.useFetch(saleDocTypeFetchUrl);

  const { onSubmit, filterObject } = props;
  useRequestManager({ error: saleDocumentIssueError });
  useRequestManager({ error: saleDocTypeError });
  useRequestManager({ error: invoiceInquiryStatusError });
  useRequestManager({ error: invoiceSendingStatusError });
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    const dateFilter = {};
    if (filterObject?.fromIssueDateCalendarId) {
      const yearFrom = filterObject?.fromIssueDateCalendarId.substr(0, 4);
      const monthFrom = filterObject?.fromIssueDateCalendarId.substr(4, 2);
      const dayFrom = filterObject?.fromIssueDateCalendarId.substr(6, 2);
      const formattedFromDate = `${yearFrom}/${monthFrom}/${dayFrom}`;
      dateFilter.fromIssueDateCalendarId = formattedFromDate;
    }
    if (filterObject?.toIssueDateCalendarId) {
      const yearTo = filterObject?.toIssueDateCalendarId.substr(0, 4);
      const monthTo = filterObject?.toIssueDateCalendarId.substr(4, 2);
      const dayTo = filterObject?.toIssueDateCalendarId.substr(6, 2);
      const formattedToDate = `${yearTo}/${monthTo}/${dayTo}`;
      dateFilter.toIssueDateCalendarId = formattedToDate;
    }
    if (filterObject?.fromDateSentCalendarId) {
      const yearTo = filterObject?.fromDateSentCalendarId.substr(0, 4);
      const monthTo = filterObject?.fromDateSentCalendarId.substr(4, 2);
      const dayTo = filterObject?.fromDateSentCalendarId.substr(6, 2);
      const formattedFromDateSent = `${yearTo}/${monthTo}/${dayTo}`;
      dateFilter.fromDateSentCalendarId = formattedFromDateSent;
    }
    if (filterObject?.toDateSentCalendarId) {
      const yearTo = filterObject?.toDateSentCalendarId.substr(0, 4);
      const monthTo = filterObject?.toDateSentCalendarId.substr(4, 2);
      const dayTo = filterObject?.toDateSentCalendarId.substr(6, 2);
      const formattedToDateSent = `${yearTo}/${monthTo}/${dayTo}`;
      dateFilter.toDateSentCalendarId = formattedToDateSent;
    }

    filterObject && form.setFieldsValue({ ...filterObject, ...dateFilter });
  }, []);
  //====================================================================
  //                        Functions
  //====================================================================
  const getInvoiceStatusIcon = (id) => {
    let icon;
    switch (id) {
      case 1:
        icon = <CheckCircleTwoTone twoToneColor="#52c41a" />;
        break;
      case 2:
        icon = <CloseCircleTwoTone twoToneColor="#ff4d4f" />;
        break;
      case 3:
        icon = <ClockCircleTwoTone twoToneColor="orange" />;
        break;
      case 4:
        icon = <ExclamationCircleTwoTone twoToneColor="#f759ab" />;
        break;
      case 5:
        icon = <QuestionCircleTwoTone twoToneColor="#2f54eb" />;
        break;
      default:
        icon = <></>;
        break;
    }

    return icon;
  };
  const getSendStatusIcon = (id) => {
    let icon;
    switch (id) {
      case 0:
        icon = <StopTwoTone twoToneColor="#bfbfbf" />;
        break;
      case 1:
        icon = <PauseCircleTwoTone twoToneColor="#597ef7" />;
        break;
      case 2:
        icon = <PlayCircleTwoTone twoToneColor="#36cfc9" rotate={180} />;
        break;
      case 3:
        icon = <UpCircleTwoTone twoToneColor="#52c41a" />;
        break;
      default:
        icon = <></>;
        break;
    }

    return icon;
  };

  const onFinish = (values) => {
    let customerFilter = {};
    if (values?.customerId) {
      customerFilter.customerId = {
        label: values?.customerId.label,
        key: values?.customerId.value,
        value: values?.customerId.value,
      };
    } else {
      customerFilter.customerId = undefined;
    }

    onSubmit({
      ...values,
      ...customerFilter,
      fromIssueDateCalendarId: values?.fromIssueDateCalendarId
        ?.toString()
        .replace(/\//g, ""),
      toIssueDateCalendarId: values?.toIssueDateCalendarId
        ?.toString()
        .replace(/\//g, ""),
      fromDateSentCalendarId: values?.fromDateSentCalendarId
        ?.toString()
        .replace(/\//g, ""),
      toDateSentCalendarId: values?.toDateSentCalendarId
        ?.toString()
        .replace(/\//g, ""),
    });
  };
  const getCustomerForDropDown = async (searchText) => {
    const queryString = qs.stringify({
      customerName: searchText,
    });

    const response = await api.GetAsync(
      `${url.SALE_CUSTOMER_GET_FOR_DROPDOWN}?${queryString}`,
      "",
    );
    if (response?.data) {
      return response?.data.map((item) => ({
        label: `${item.customerName}`,
        value: item.id,
      }));
    }
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        onFinishFailed={null}
      >
        <Ant.Form.Item name="invoiceStatus" label="وضعیت صورتحساب">
          <Ant.Select
            allowClear={true}
            placeholder={"انتخاب کنید..."}
            disable={invoiceInquiryStatusLoading || false}
            loading={invoiceInquiryStatusLoading}
            options={invoiceInquiryStatusData?.data}
            optionRender={(option) => (
              <>
                <Ant.Space size="small" align="center">
                  {getInvoiceStatusIcon(option.data.id)}
                  <span>{option.data.persianTitle}</span>
                </Ant.Space>
              </>
            )}
            fieldNames={{ label: "persianTitle", value: "id" }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item name="sendingStatus" label="وضعیت ارسال">
          <Ant.Select
            allowClear={true}
            placeholder={"انتخاب کنید..."}
            disable={invoiceSendingStatusLoading || false}
            loading={invoiceSendingStatusLoading}
            options={invoiceSendingStatusData?.data}
            optionRender={(option) => (
              <>
                <Ant.Space size="small" align="center">
                  {getSendStatusIcon(option.data.id)}
                  <span>{option.data.title}</span>
                </Ant.Space>
              </>
            )}
            fieldNames={{ label: "title", value: "id" }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item
          name={"documentSerialNumber"}
          label="شماره سریال"
          rules={[
            {
              required: false,
              pattern: new RegExp("^[0-9]*$"),
              message: "مقدار نامعتبر",
            },
          ]}
        >
          <Ant.Input allowClear min={1} style={{ width: "100%" }} />
        </Ant.Form.Item>
        <Ant.Form.Item name={"documentFiscalId"} label="شناسه مالیاتی">
          <Ant.Input allowClear style={{ width: "100%" }} />
        </Ant.Form.Item>
        <Ant.Form.Item name={"customerId"} label="مشتری">
          <DebounceSelect
            maxCount={1}
            placeholder="بخشی از نام مشتری را تایپ کنید..."
            fetchOptions={getCustomerForDropDown}
            onChange={(newValue) => {
              console.log("onChange debounce:" + newValue);
            }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item
          name={"customerLegalEntityIdentity"}
          label="کد/شناسه ملی"
          maxLength={11}
          rules={[
            {
              required: false,
              pattern: new RegExp("^[0-9]*$"),
              message: "مقدار نامعتبر",
            },
          ]}
        >
          <Ant.Input
            allowClear
            showCount
            maxLength={11}
            style={{ width: "100%" }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item
          name={"customerEconomicCode"}
          label="کد اقتصادی"
          maxLength={14}
          rules={[
            {
              required: false,
              pattern: new RegExp("^[0-9]*$"),
              message: "مقدار نامعتبر",
            },
          ]}
        >
          <Ant.Input
            allowClear
            showCount
            maxLength={14}
            style={{ width: "100%" }}
          />
        </Ant.Form.Item>

        <Ant.Row gutter={[10, 10]}>
          <Ant.Col span={12}>
            <Ant.Form.Item
              name={"fromIssueDateCalendarId"}
              label="از تاریخ صدور"
            >
              <MyDatePicker addonBefore="از" />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={12}>
            <Ant.Form.Item name={"toIssueDateCalendarId"} label="تا تاریخ صدور">
              <MyDatePicker addonBefore="تا" />
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>

        <Ant.Row gutter={[10, 10]}>
          <Ant.Col span={12}>
            <Ant.Form.Item
              name={"fromDateSentCalendarId"}
              label="از تاریخ ارسال"
            >
              <MyDatePicker />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={12}>
            <Ant.Form.Item name={"toDateSentCalendarId"} label="تا تاریخ ارسال">
              <MyDatePicker />
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>

        <Ant.Row gutter={[10, 10]}>
          <Ant.Col span={24}>
            <Ant.Typography.Text>{"مبلغ صورتحساب"}</Ant.Typography.Text>
          </Ant.Col>
          <Ant.Col span={12}>
            <Ant.Form.Item name={"fromTotalPrice"}>
              <Ant.InputNumber
                controls={false}
                allowClear
                addonBefore="از"
                parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                onChange={(value) =>
                  form.setFieldsValue({ toTotalPrice: value })
                }
              />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={12}>
            <Ant.Form.Item name={"toTotalPrice"}>
              <Ant.InputNumber
                controls={false}
                allowClear
                addonBefore="تا"
                parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>

        <Ant.Form.Item
          name={"taxPayersSystemSaleDocumentIssueId"}
          label="الگوی صورتحساب"
        >
          <Ant.Select
            allowClear={true}
            placeholder={"انتخاب کنید..."}
            disable={saleDocumentIssueLoading || false}
            loading={saleDocumentIssueLoading}
            options={saleDocumentIssueData?.data}
            fieldNames={{ label: "title", value: "id" }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item name={"saleDocumentTypeId"} label="نوع برگه فروش">
          <Ant.Select
            allowClear={true}
            placeholder={"انتخاب کنید..."}
            disable={saleDocTypeLoading || false}
            loading={saleDocTypeLoading}
            options={saleDocTypeData?.data}
            fieldNames={{ label: "title", value: "id" }}
          />
        </Ant.Form.Item>
        <Ant.Form.Item>
          <Ant.Button block type="primary" onClick={() => form.submit()}>
            {"اعمال"}
          </Ant.Button>
        </Ant.Form.Item>
      </Ant.Form>
    </>
  );
};

export default FilterPanel;
FilterPanel.propTypes = {
  onSubmit: PropTypes.func,
  filterObject: PropTypes.any,
};

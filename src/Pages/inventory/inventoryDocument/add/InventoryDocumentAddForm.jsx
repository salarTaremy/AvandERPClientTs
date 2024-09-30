import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import qs from "qs";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import * as uuid from "uuid";
import { useFetch, GetAsync } from "@/api";
import useRequestManager  from "@/hooks/useRequestManager";
import CustomContent from "@/components/common/CustomContent";
import ModalHeader from "@/components/common/ModalHeader";
import { FaFileMedical } from "react-icons/fa";
import dayjs from "dayjs";
import MyDatePicker, {
  FormatDateToPost,
} from "@/components/common/MyDatePicker";
import DebounceSelect from "@/components/common/DebounceSelect";
import ButtonList from "@/components/common/ButtonList";
import InventoryDocumentDetailAddForm from "../detail/add/InventoryDocumentDetailAddForm";
import { documentDetailColumns } from "../detail/add/documentDetailColumns";

//====================================================================
//                        Declaration
//====================================================================
const InventoryDocumentAddForm = ({ onSuccess, onCancel }) => {
  const [form] = Ant.Form.useForm();
  const [documentTypeData, documentTypeListLoading, documentTypeListError] =
    useFetch(url.INVENTORY_DOCUMENT_TYPE);
    
  const [warehouseListData, warehouseListLoading, warehouseListError] =
    useFetch(url.WAREHOUSE);

  const [modalOpenState, setModalOpenState] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [issueTime, setIssueime] = useState("");
  const [inventoryDocument, setInventoryDocument] = useState({});
  const [documentDetailDataSource, setDocumentDetailDataSource] = useState([]);
   
  useRequestManager({ error: documentTypeListError});
  useRequestManager({ error: warehouseListError});
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    const currentDate = new Date();
    const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}.${currentDate.getMilliseconds()}`;
    const timeData = dayjs(currentTime, "HH:mm:ss.fff");
    form.setFieldValue("issueDateCalendarId", currentDate);
    form.setFieldValue("issueTime", timeData);
  }, [form]);
  //====================================================================
  //                        Functions
  //====================================================================
  const timePickerOnChange = (time, timeString) => {
    setIssueime(timeString);
  };

  const getCounterpartyForDropDown = async (searchText) => {
    if (searchText) {
      const queryString = qs.stringify({
        counterpartyName: searchText,
      });

      const response = await GetAsync(
        `${url.COUNTER_PARTY_GET_FOR_DROPDOWN}?${queryString}`,
        "",
      );
      if (response?.data) {
        return response?.data.map((item) => ({
          label: `${item.counterpartyName}`,
          value: item.id,
        }));
      }
    }
  };

  const onDocumentDetailAdd = () => {
    setModalContent(
      <InventoryDocumentDetailAddForm
        warehouseId={inventoryDocument.warehouseId}
        onSuccess={onDocumentDetailAddSucceeded}
        key={uuid.v1()}
      />,
    );
    setModalOpenState(true);
  };

  const onDocumentDetailAddSucceeded = (detailData) => {
    const inventoryDocumentDetail = {
      rowNumber: documentDetailDataSource.length + 1,
      productId: detailData?.product.id,
      productName: detailData?.product.name,
      productDetailId: detailData?.productDetail.id,
      batchNumber: detailData?.productDetail.batchNumber,
      productUnit: detailData?.productUnit.name,
      productUnitId: detailData?.productUnit.id,
      quantity: detailData?.quantity,
      unitPrice: detailData?.unitPrice,
      totalPrice: detailData?.totalPrice,
      description: detailData?.description,
    };
    setDocumentDetailDataSource((documentDetailDataSource) => [
      ...documentDetailDataSource,
      inventoryDocumentDetail,
    ]);

    setModalOpenState(false);
  };

  const onDocumentDetailDelete = () => {
    console.log("deleted");
  }

  const onWarehouseChange = (value, option) => {
    setInventoryDocument((inventoryDocument) => ({...inventoryDocument, warehouseId: value}));
  }

  const onFinish = (formValues) => {
    setInventoryDocument({
      documentNumber: formValues?.documentNumber,
      inventoryDocumentTypeId: formValues?.inventoryDocumentTypeId,
      warehouseId: formValues?.warehouseId,
      issueDateCalendarId: FormatDateToPost(formValues?.issueDateCalendarId),
      issueTime: dayjs(issueTime, "HH:mm:ss.fff"),
      counterpartyId: formValues?.counterpartyId,
      secondCounterpartyId: formValues?.secondCounterpartyId,
      oppositeWarehouseId: formValues?.oppositeWarehouseId,
      description: formValues?.description,
      inventoryDocumentDetail: [],
    });
  };
  //====================================================================
  //                        Child Component
  //====================================================================
  const tableTitle = () => {
    return inventoryDocument.warehouseId && <ButtonList onAdd={onDocumentDetailAdd} />;
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"افزودن  برگه انبار"} icon={<FaFileMedical />} />
      <Ant.Modal
        centered
        {...defaultValues.MODAL_PROPS}
        open={modalOpenState}
        getContainer={null}
        footer={null}
        onCancel={() => setModalOpenState(false)}
        onOk={() => setModalOpenState(false)}
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        onFinishFailed={null}
      >
        <Ant.Row gutter={[4, 16]}>
          <Ant.Col xs={24} sm={24} md={24} lg={24}>
            <CustomContent bordered>
              <Ant.Row gutter={10}>
                <Ant.Col xs={24} sm={24} md={12} lg={8}>
                  <Ant.Form.Item
                    name={"documentNumber"}
                    label="شماره"
                    rules={[{ required: true }]}
                  >
                    <Ant.InputNumber style={{ width: "100%" }} />
                  </Ant.Form.Item>
                </Ant.Col>
                <Ant.Col xs={24} sm={24} md={6} lg={5}>
                  <Ant.Form.Item
                    name={"issueDateCalendarId"}
                    label="تاریخ  صدور"
                    rules={[{ required: true }]}
                  >
                    <MyDatePicker />
                  </Ant.Form.Item>
                </Ant.Col>
                <Ant.Col xs={24} sm={24} md={6} lg={3}>
                  <Ant.Form.Item
                    name={"issueTime"}
                    label="ساعت صدور"
                    rules={[{ required: true }]}
                  >
                    <Ant.TimePicker
                      onChange={timePickerOnChange}
                      style={{ width: "100%" }}
                    />
                  </Ant.Form.Item>
                </Ant.Col>
                <Ant.Col xs={24} sm={24} md={12} lg={8}>
                  <Ant.Form.Item
                    name={"inventoryDocumentTypeId"}
                    label="نوع برگه"
                    rules={[{ required: true }]}
                  >
                    <Ant.Select
                      placeholder="لطفا انتخاب کنید..."
                      disabled={documentTypeListLoading}
                      loading={documentTypeListLoading}
                      options={documentTypeData?.data}
                      fieldNames={{ label: "title", value: "id" }}
                    />
                  </Ant.Form.Item>
                </Ant.Col>
              </Ant.Row>
              <Ant.Row gutter={10}>
                <Ant.Col xs={24} sm={24} md={12} lg={8}>
                  <Ant.Form.Item
                    name={"warehouseId"}
                    label="انبار"
                    rules={[{ required: true }]}
                  >
                    <Ant.Select
                      placeholder="لطفا انتخاب کنید..."
                      disabled={warehouseListLoading}
                      loading={warehouseListLoading}
                      options={warehouseListData?.data}
                      fieldNames={{ label: "title", value: "id" }}
                      onChange={onWarehouseChange}
                    />
                  </Ant.Form.Item>
                  <Ant.Form.Item
                    name={"oppositeWarehouseId"}
                    label="انبار مقابل"
                  >
                    <Ant.Select
                      placeholder="لطفا انتخاب کنید..."
                      disabled={warehouseListLoading}
                      loading={warehouseListLoading}
                      options={warehouseListData?.data}
                      fieldNames={{ label: "title", value: "id" }}
                    />
                  </Ant.Form.Item>
                </Ant.Col>
                <Ant.Col xs={24} sm={24} md={12} lg={8}>
                  <Ant.Form.Item name={"counterpartyId"} label="طرف حساب">
                    <DebounceSelect
                      placeholder="بخشی از نام طرف حساب را تایپ کنید..."
                      fetchOptions={getCounterpartyForDropDown}
                    />
                  </Ant.Form.Item>
                  <Ant.Form.Item
                    name={"secondCounterpartyId"}
                    label="طرف حساب دوم"
                  >
                    <DebounceSelect
                      placeholder="بخشی از نام طرف حساب را تایپ کنید..."
                      fetchOptions={getCounterpartyForDropDown}
                    />
                  </Ant.Form.Item>
                </Ant.Col>
                <Ant.Col xs={24} sm={24} md={12} lg={8}>
                  <Ant.Form.Item name={"description"} label="توضیحات">
                    <Ant.Input.TextArea
                      rows={5}
                      style={{ resize: "none" }}
                      showCount
                      maxLength={300}
                    />
                  </Ant.Form.Item>
                </Ant.Col>
              </Ant.Row>
            </CustomContent>
          </Ant.Col>
          <Ant.Col xs={24} sm={24} md={24} lg={24}>
            <CustomContent bordered scroll={true} height="40vh">
              <Ant.Table
                columns={documentDetailColumns(onDocumentDetailDelete)}
                dataSource={documentDetailDataSource}
                title={tableTitle}
                {...defaultValues.TABLE_PROPS}
                size="middle"
                bordered={false}
              />
            </CustomContent>
          </Ant.Col>
          <Ant.Col span={24}>
            <Ant.Row justify={"end"} gutter={[8, 16]}>
              <Ant.Col xs={24} sm={24} md={12} lg={2}>
                <Ant.Button type="primary" block>
                  {"ذخیره"}
                </Ant.Button>
              </Ant.Col>
              <Ant.Col xs={24} sm={24} md={12} lg={2}>
                <Ant.Popconfirm
                  title={
                    "در صورت خروج از این صفحه، اطلاعات ذخیره نخواهد شد، آیا مطمئن هستید؟"
                  }
                  onConfirm={onCancel}
                >
                  <Ant.Button type="default" block>
                    {"انصراف"}
                  </Ant.Button>
                </Ant.Popconfirm>
              </Ant.Col>
            </Ant.Row>
          </Ant.Col>
        </Ant.Row>
      </Ant.Form>
    </>
  );
};

InventoryDocumentAddForm.propTypes = {
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

export default InventoryDocumentAddForm;

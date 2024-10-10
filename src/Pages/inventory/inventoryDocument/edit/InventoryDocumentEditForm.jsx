import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import qs from "qs";
import * as Ant from "antd";
import dayjs from "dayjs";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import * as uuid from "uuid";
import {
  useFetch,
  GetAsync,
  useFetchWithHandler,
  usePutWithHandler,
} from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import { FaFileMedical } from "react-icons/fa";
import MyDatePicker, {
  FormatDateToDisplay,
  FormatDateToPost,
} from "@/components/common/MyDatePicker";
import DebounceSelect from "@/components/common/DebounceSelect";
import ButtonList from "@/components/common/ButtonList";
import InventoryDocumentDetailAddForm from "../detail/add/InventoryDocumentDetailAddForm";
import { documentDetailColumns } from "../detail/add/documentDetailColumns";

//====================================================================
//                        Declaration
//====================================================================
const InventoryDocumentEditForm = ({ id, onSuccess, onCancel }) => {
  const [form] = Ant.Form.useForm();
  const [documentTypeData, documentTypeListLoading, documentTypeListError] =
    useFetch(url.INVENTORY_DOCUMENT_TYPE);
  const [warehouseListData, warehouseListLoading, warehouseListError] =
    useFetch(url.WAREHOUSE);

  const [fetchedData, fetchLoading, fetchError, fetchApiCall] =
    useFetchWithHandler();
  const [
    documentSavedData,
    documentSaveLoading,
    documentSaveError,
    documentSaveApiCall,
  ] = usePutWithHandler();

  const [modalOpenState, setModalOpenState] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [inventoryDocumentData, setInventoryDocumentData] = useState({
    warehouseId: 0,
    documentTypeId: 0,
    documentTypeNature: 0,
  });
  const [documentDetailDataSource, setDocumentDetailDataSource] = useState([]);

  useRequestManager({ error: documentTypeListError });
  useRequestManager({ error: warehouseListError });
  useRequestManager({ error: fetchError });
  useRequestManager({
    data: documentSavedData,
    loading: documentSaveLoading,
    error: documentSaveError,
  });
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    fetchDataToEdit();
  }, []);

  useEffect(() => {
    if (fetchedData?.isSuccess) {
      const customizedDisplayData = {
        issueTime: dayjs(fetchedData?.data?.issueTime, "HH:mm:ss.fff"),
        issueDateCalendarId: FormatDateToDisplay(
          fetchedData?.data?.issueDateCalendarId,
        ),
        counterpartyId: {
          id: fetchedData?.data?.counterpartyId,
          label: fetchedData?.data?.counterpartyTitle,
        },
        secondCounterpartyId: {
          id: fetchedData?.data?.secondCounterpartyId,
          label: fetchedData?.data?.secondCounterpartyTitle,
        },
      };

      form.setFieldsValue({
        ...(fetchedData?.data || null),
        ...(fetchedData?.data ? customizedDisplayData : null),
      });

      setInventoryDocumentData({
        warehouseId: fetchedData?.data?.warehouseId,
        documentTypeId: fetchedData?.data?.inventoryDocumentTypeId,
        documentTypeNature: fetchedData?.data?.inventoryDocumentTypeNature
      });

      if (fetchedData?.data?.documentDetails) {
        setDocumentDetailDataSource(fetchedData?.data?.documentDetails);
      }
    }
  }, [fetchedData]);

  useEffect(() => {
    documentSavedData?.isSuccess && onSuccess();
  }, [documentSavedData]);
  //====================================================================
  //                        Functions
  //====================================================================
  const fetchDataToEdit = async () => {
    await fetchApiCall(`${url.INVENTORY_DOCUMENT}/${id}`);
  };

  const documentTypeOnChange = (value, option) => {
    setInventoryDocumentData((inventoryDocumentData) => ({
      ...inventoryDocumentData,
      documentTypeId: value,
      documentTypeNature: option.nature,
    }));
  };

  const onWarehouseChange = (value, option) => {
    setInventoryDocumentData((inventoryDocumentData) => ({
      ...inventoryDocumentData,
      warehouseId: value,
    }));
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
        warehouseId={inventoryDocumentData.warehouseId}
        documentTypeNature={inventoryDocumentData.documentTypeNature}
        onSuccess={onDocumentDetailAddSucceeded}
        onCancel={() => setModalOpenState(false)}
        key={uuid.v1()}
      />,
    );
    setModalOpenState(true);
  };

  const onDocumentDetailAddSucceeded = (detailData) => {
    const inventoryDocumentDetail = {
      rowNumber: documentDetailDataSource.length + 1,
      key: detailData?.key,
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

  const onDocumentDetailDelete = (key) => {
    setDocumentDetailDataSource((documentDetailDataSource) =>
      documentDetailDataSource.filter((item) => item.key !== key),
    );
  };

  const onFinish = async (formValues) => {
    const inventoryDocument = {
      id: id,
      folioReferenceNumber: formValues?.folioReferenceNumber,
      inventoryDocumentTypeId: formValues?.inventoryDocumentTypeId,
      warehouseId: formValues?.warehouseId,
      issueDateCalendarId: FormatDateToPost(formValues?.issueDateCalendarId),
      counterpartyId: formValues?.counterpartyId?.value,
      secondCounterpartyId: formValues?.secondCounterpartyId?.value,
      oppositeWarehouseId: formValues?.oppositeWarehouseId,
      description: formValues?.description,
      documentDetail: documentDetailDataSource,
    };

    await documentSaveApiCall(url.INVENTORY_DOCUMENT, inventoryDocument);
  };
  //====================================================================
  //                        Child Component
  //====================================================================
  const tableTitle = () => {
    return (
      (inventoryDocumentData.warehouseId &&
        inventoryDocumentData.documentTypeId && (
          <ButtonList onAdd={onDocumentDetailAdd} />
        )) || <></>
    );
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader
        title={
          fetchedData?.isSuccess &&
          `ویرایش ${fetchedData?.data?.documentType} (شماره : ${fetchedData?.data?.documentNumber})`
        }
        icon={<FaFileMedical />}
      />
      <Ant.Modal
        closable={false}
        maskClosable={false}
        width={600}
        open={modalOpenState}
        getContainer={null}
        footer={null}
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
            <Ant.Card bordered>
              <Ant.Row gutter={10}>
                <Ant.Col xs={24} sm={24} md={12} lg={4}>
                  <Ant.Form.Item name={"documentNumber"} label="شماره">
                    <Ant.InputNumber style={{ width: "100%" }} disabled />
                  </Ant.Form.Item>
                </Ant.Col>
                <Ant.Col xs={24} sm={24} md={12} lg={4}>
                  <Ant.Form.Item
                    name={"folioReferenceNumber"}
                    label="شماره عطف"
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
                  <Ant.Form.Item name={"issueTime"} label="ساعت صدور">
                    <Ant.TimePicker style={{ width: "100%" }} disabled />
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
                      onChange={documentTypeOnChange}
                      showSearch
                      filterOption={(searchText, option) =>
                        option.title
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      }
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
                      showSearch
                      filterOption={(searchText, option) =>
                        option.title
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      }
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
                      showSearch
                      filterOption={(searchText, option) =>
                        option.title
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      }
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
            </Ant.Card>
          </Ant.Col>
          <Ant.Col xs={24} sm={24} md={24} lg={24}>
            <Ant.Card>
              <Ant.Table
                columns={documentDetailColumns(onDocumentDetailDelete)}
                dataSource={documentDetailDataSource}
                title={tableTitle}
                {...defaultValues.TABLE_PROPS}
                scroll={{ x: "100%", y: "20vh" }}
                size="middle"
                bordered={false}
              />
            </Ant.Card>
          </Ant.Col>
          <Ant.Col span={24}>
            <Ant.Row justify={"end"} gutter={[8, 16]}>
              <Ant.Col xs={24} sm={24} md={12} lg={2}>
                <Ant.Button
                  type="primary"
                  block
                  loading={documentSaveLoading}
                  onClick={() => form.submit()}
                >
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

InventoryDocumentEditForm.propTypes = {
  id: PropTypes.number,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

export default InventoryDocumentEditForm;

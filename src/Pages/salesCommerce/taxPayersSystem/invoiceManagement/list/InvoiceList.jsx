import React, { useState, useEffect } from "react";
import qs from "qs";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as styles from "@/styles";
import * as api from "@/api";
import * as defaultValues from "@/defaultValues";
import * as uuid from "uuid";
import { columns } from "./columns";
import { BsSend } from "react-icons/bs";
import useRequestManager from "@/hooks/useRequestManager";
import ButtonList from "@/components/common/ButtonList";
import FilterPanel from "./FilterPanel";
import FilterBedge from "@/components/common/FilterBedge";
import FilterDrawer from "@/components/common/FilterDrawer";
import InquiryResult from "../inquiry/InquiryResult";
import SaleDocumentDescription from "../../../saleDocument/description/SaleDocumentDescription";
import CustomerDescription from "../../../basicInformation/CustomerManagement/description/CustomerDescription";
import CompanyInformation from "../info/CompanyInformation";
//====================================================================
//                        Declaration
//====================================================================
const InvoiceList = () => {
  const pageTitle = "مدیریت صورتحساب ها (سامانه مودیان)";
  const [
    invoiceListData,
    invoiceListLoading,
    invoiceListError,
    invoiceListApiCall,
  ] = api.useFetchWithHandler();

  const [
    invoiceSendData,
    invoiceSendLoading,
    invoiceSendError,
    invoiceSendApiCall,
  ] = api.usePostWithHandler();

  const [dataSource, setDataSource] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [filterObject, setFilterObject] = useState();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [modalOpenState, setModalOpenState] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modalSize, setModalSize] = useState({ ...defaultValues.MODAL_LARGE });

  useRequestManager({ error: invoiceListError });
  useRequestManager({
    data: invoiceSendData,
    error: invoiceSendError,
    loading: invoiceSendLoading,
  });
  //====================================================================
  //                        Functions
  //====================================================================
  const getInvoiceList = async () => {
    let customerFilter = {};
    if (filterObject && filterObject.customerId) {
      customerFilter.customerId = filterObject.customerId.value;
    } else {
      customerFilter.customerId = undefined;
    }
    const queryString = qs.stringify({
      ...filterObject,
      ...customerFilter,
      pageNumber: tableParams.pagination?.current,
      pageSize: tableParams.pagination?.pageSize,
      order: tableParams.sortOrder,
      orderByField: tableParams.sortField,
    });

    await invoiceListApiCall(`${url.TPS_INVOICE_MANAGEMENT}?${queryString}`);
  };

  const onFilterChanged = async (filterObject) => {
    setSelectedRowKeys([]);
    setFilterObject(filterObject);
    setOpenFilter(false);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination: pagination,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });
  };

  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };

  const onInquiry = async (id, fiscalId) => {
    setModalSize({ ...defaultValues.MODAL_LARGE })
    setModalContent(
      <InquiryResult
        key={uuid.v1()}
        saleDocumentHeaderId={id}
        saleDocumentFiscalId={fiscalId}
      />,
    );
    setModalOpenState(true);
  };

  const onViewSaleDocument = async (id) => {
    setModalSize({ ...defaultValues.MODAL_LARGE })
    setModalContent(<SaleDocumentDescription key={uuid.v1()} id={id} />);
    setModalOpenState(true);
  };

  const onViewCustomer = async (id) => {
    setModalSize({ ...defaultValues.MODAL_LARGE })
    setModalContent(<CustomerDescription key={uuid.v1()} id={id} />);
    setModalOpenState(true);
  };

  const onSendListToTaxPayersSystem = async () => {
    const postData = { saleDocumentIdList: selectedRowKeys };
    await invoiceSendApiCall(url.TPS_INVOICE_SEND_LIST, postData);
  };

  const onSendToTaxPayersSystem = async (id) => {
    const postData = { saleDocumentId: id };
    await invoiceSendApiCall(url.TPS_INVOICE_MANAGEMENT, postData);
  };

  //table row selection control
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    //hideSelectAll: true,
    preserveSelectedRowKeys: true,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: record.statusId && record.statusId === 1,
      name: record.statusId,
    }),
  };
  const hasSelectedRow = selectedRowKeys && selectedRowKeys.length > 0;

  const onViewCompanyInformation = (customerLegalEntityIdentity) => {
    const updateList = { ...defaultValues.MODAL_LARGE, width: 520 };
    setModalSize(updateList)
    setModalContent(<CompanyInformation key={uuid.v1()} legalEntityIdentity={customerLegalEntityIdentity} />);
    setModalOpenState(true);
  };

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getInvoiceList();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    filterCount
  ]);

  useEffect(() => {
    setDataSource(invoiceListData?.data);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: invoiceListData?.data && invoiceListData?.data[0]?.totalCount,
      },
    });
  }, [invoiceListData]);

  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    });

    filterObject && console.log(Object.keys(filterObject));
    filterObject &&
      setFilterCount(
        Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
      );
    !filterObject && setFilterCount(0);
  }, [filterObject]);

  useEffect(() => {
    invoiceSendData?.isSuccess &&
      setDataSource([...dataSource?.map((record) => {
          if ((invoiceSendData?.data?.idList && invoiceSendData?.data?.idList.some(id => id == record.id)) || (invoiceSendData?.data?.id === record.id))
          {
            const sentTime = record.sentTimes + 1;
            record = {...record, sentTimes: sentTime, statusId: invoiceSendData?.data?.statusId, sendingProgressStatusId: invoiceSendData?.data?.sendingProgressStatusId};
          }
          return record;
        }
      )]);
  }, [invoiceSendData])
  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <>
        <ButtonList
          filterCount={filterCount}
          onRefresh={() => getInvoiceList()}
          onFilter={() => setOpenFilter(true)}
        >
          <Ant.Popconfirm
            title="آیا از ارسال صورتحساب ها به سامانه مودیان مطمئن هستید؟"
            onConfirm={() => onSendListToTaxPayersSystem()}
          >
            <Ant.Tooltip title={"ارسال به سامانه مودیان"}>
              <Ant.Badge count={selectedRowKeys?.length} color="pink">
                <Ant.Button
                  className="text-pink-600 border-pink-600"
                  size="large"
                  disabled={!hasSelectedRow}
                >
                  <BsSend />
                </Ant.Button>
              </Ant.Badge>
            </Ant.Tooltip>
          </Ant.Popconfirm>
        </ButtonList>
      </>
    );
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Modal
        open={modalOpenState}
        centered
        {...defaultValues.MODAL_PROPS}
        {...modalSize}
        getContainer={null}
        footer={null}
        onCancel={() => setModalOpenState(false)}
        onOk={() => setModalOpenState(false)}
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Card
        style={{ ...styles.CARD_DEFAULT_STYLES }}
        title={pageTitle}
        type="inner"
      >
        <FilterDrawer
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          onRemoveFilter={onRemoveFilter}
        >
          <FilterPanel filterObject={filterObject} onSubmit={onFilterChanged} />
        </FilterDrawer>
        <FilterBedge filterCount={filterCount}>
          <Ant.Table
            rowSelection={rowSelection}
            columns={columns(
              onViewSaleDocument,
              onViewCustomer,
              onInquiry,
              onSendToTaxPayersSystem,
              onViewCompanyInformation
            )}
            dataSource={dataSource}
            pagination={tableParams?.pagination}
            onChange={handleTableChange}
            {...defaultValues.TABLE_PROPS}
            title={title}
            loading={invoiceListLoading}
          />
        </FilterBedge>
      </Ant.Card>
    </>
  );
};

export default InvoiceList;

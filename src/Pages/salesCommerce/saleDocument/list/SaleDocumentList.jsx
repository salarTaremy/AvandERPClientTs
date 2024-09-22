import React, { useState, useEffect } from "react";
import qs from "qs";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as styles from "@/styles";
import * as api from "@/api";
import * as defaultValues from "@/defaultValues";
import { columns } from "./columns";
import * as uuid from "uuid";
import ButtonList from "@/components/common/ButtonList";
import FilterPanel from "./FilterPanel";
import FilterBedge from "@/components/common/FilterBedge";
import FilterDrawer from "@/components/common/FilterDrawer";
import SaleDocumentDescription from "../description/SaleDocumentDescription";
import CustomerDescription from "../../basicInformation/CustomerManagement/description/CustomerDescription";
import EditSaleDoc from "../edit/EditSaleDoc";
import EditSaleDocHeader from "../edit/EditSaleDocHeader";
import AddSaleDocHeader from "../add/AddSaleDocHeader";
import useRequestManager from "@/hooks/useRequestManager";
//====================================================================
//                        Declaration
//====================================================================
const SaleDocumentList = () => {
  const pageTitle = "مدیریت برگه های فروش";
  const [listData, listLoading, listError, listApiCall] =
    api.useFetchWithHandler();
  useRequestManager({ error: listError })
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
  const [modalSize, setModalSize] = useState({ ...defaultValues.MODAL_EXTRA_LARGE });
  const [documentDetailModalState, setDocumentDetailModalState] =
    useState(false);
  const [documentDetailModalContent, setDocumentDetailModalContent] =
    useState(null);
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    filterObject &&
      setFilterCount(
        Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
      );
    !filterObject && setFilterCount(0);
    fillGrid();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    filterObject
  ]);

  useEffect(() => {
    setDataSource(listData?.data);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: listData?.data && listData?.data[0]?.totalCount,
      },
    });
  }, [listData]);

  //====================================================================
  //                        Functions
  //====================================================================
  const fillGrid = async () => {
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
    await listApiCall(`${url.SALE_DOCUMENT_HEADER}?${queryString}`);
  };


  const onSuccessAdd = () => {
    setDocumentDetailModalState(false);
    fillGrid();
  };
  const onSuccessEdit = () => {
    setDocumentDetailModalState(false);
    fillGrid();
  };
  const onFilterChanged = async (filterObject) => {
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

  const onDelete = async (id) => {
    //TODO: not implemented
    console.log("onDelete - " + id);
  };

  const onEdit = async (id) => {
    const updateList = { ...defaultValues.MODAL_EXTRA_LARGE, width: 520 };
    setModalSize(updateList)
    setDocumentDetailModalContent(<EditSaleDocHeader id={id} key={id} onSuccess={onSuccessEdit} />);
    setDocumentDetailModalState(true);
  };
  const onAdd = async (id) => {

    const updateList = { ...defaultValues.MODAL_EXTRA_LARGE, width: 520 };
    setModalSize(updateList)
    setDocumentDetailModalContent(<AddSaleDocHeader onSuccess={onSuccessAdd} key={uuid.v1()} />);
    setDocumentDetailModalState(true);
  };

  const onView = async (id) => {
    setModalSize({ ...defaultValues.MODAL_EXTRA_LARGE })
    setDocumentDetailModalContent(<SaleDocumentDescription id={id} />);
    setDocumentDetailModalState(true);
  };
  const onViewCustomer = async (id) => {
    setModalSize({ ...defaultValues.MODAL_EXTRA_LARGE })
    setDocumentDetailModalContent(<CustomerDescription id={id} />);
    setDocumentDetailModalState(true);
  };
  const onOpenDoc = (id) => {
    setModalSize({ ...defaultValues.MODAL_EXTRA_LARGE })
    setDocumentDetailModalContent(<EditSaleDoc id={id} />);
    setDocumentDetailModalState(true);
  }

  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <>
        {/* {JSON.stringify({listError})}
      <br></br>
      {JSON.stringify({listData})} */}
        <ButtonList
          filterCount={filterCount}
          onAdd={onAdd}
          onRefresh={() => fillGrid()}
          onFilter={() => setOpenFilter(true)}
        />
      </>
    );
  };

  //====================================================================
  //                        Component
  //====================================================================

  return (
    <>
      <Ant.Modal
        centered
        {...defaultValues.MODAL_PROPS}

        {...modalSize}
        open={documentDetailModalState}
        getContainer={null}
        footer={null}
        onCancel={() => setDocumentDetailModalState(false)}
        onOk={() => setDocumentDetailModalState(false)}
      >
        {documentDetailModalContent}
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
            columns={columns(onDelete, onEdit, onView, onViewCustomer, onOpenDoc)}
            dataSource={dataSource}
            pagination={tableParams?.pagination}
            onChange={handleTableChange}
            {...defaultValues.TABLE_PROPS}
            title={title}
            loading={listLoading}
          />
        </FilterBedge>
      </Ant.Card>
    </>
  );
};

export default SaleDocumentList;

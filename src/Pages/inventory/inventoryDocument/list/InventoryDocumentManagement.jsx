import React, { useState, useEffect } from "react";
import * as Ant from "antd";
import * as uuid from "uuid";
import qs from "qs";
import * as styles from "@/styles";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { columns } from "./columns";
import ButtonList from "@/components/common/ButtonList";
import FilterPanel from "./FilterPanel";
import FilterBedge from "@/components/common/FilterBedge";
import FilterDrawer from "@/components/common/FilterDrawer";
import CounterpartyInformation from "@/Pages/manageCounterParty/description/CounterpartyInformation";
import InventoryDocumentAddForm from "../add/InventoryDocumentAddForm";
import InventoryDocumentEditForm from "../edit/InventoryDocumentEditForm";
import InventoryDocumentDescription from "../description/InventoryDocumentDescription";

//====================================================================
//                        Declaration
//====================================================================
const InventoryDocumentManagement = () => {
  const pageTitle = "مدیریت برگه های انبار";
  const [
    documentListData,
    documentListLoading,
    documentListError,
    documentListApiCall,
  ] = useFetchWithHandler();

  const [
    documentDeleteData,
    documentDeleteLoading,
    documentDeleteError,
    documentDeleteApiCall,
  ] = useDelWithHandler();

  useRequestManager({ error: documentListError });
  useRequestManager({
    data: documentDeleteData,
    loading: documentDeleteLoading,
    error: documentDeleteError,
  });

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

  const [modalProps, setModalProps] = useState({
    open: false,
    closable: false,
    size: { ...defaultValues.MODAL_EXTRA_LARGE },
    content: null,
  });

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    filterObject &&
      setFilterCount(
        Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
      );
    !filterObject && setFilterCount(0);
    getInventoryDocumentList();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    filterObject,
  ]);

  useEffect(() => {
    setDataSource(documentListData?.data);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: documentListData?.data && documentListData?.data[0]?.totalCount,
      },
    });
  }, [documentListData]);

  useEffect(() => {
    if (documentDeleteData?.isSuccess) {
      setDataSource((dataSource) =>
        dataSource.filter((item) => item.id !== documentDeleteData?.data?.id),
      );
    }
  }, [documentDeleteData]);
  //====================================================================
  //                        Functions
  //====================================================================
  const getInventoryDocumentList = async () => {
    let counterpartyFilter = {};
    if (filterObject && filterObject.counterpartyId) {
      counterpartyFilter.counterpartyId = filterObject.counterpartyId.value;
    } else {
      counterpartyFilter.counterpartyId = undefined;
    }
    const queryString = qs.stringify({
      ...filterObject,
      ...counterpartyFilter,
      pageNumber: tableParams.pagination?.current,
      pageSize: tableParams.pagination?.pageSize,
      order: tableParams.sortOrder,
      orderByField: tableParams.sortField,
    });
    await documentListApiCall(`${url.INVENTORY_DOCUMENT}?${queryString}`);
  };

  //filter and table change events
  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject);
    setOpenFilter(false);
  };
  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination: pagination,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });
  };

  //inventory document related events
  const onViewCounterparty = async (counterpartyId) => {
    setModalProps({
      open: true,
      closable: true,
      size: { ...defaultValues.MODAL_LARGE },
      content: <CounterpartyInformation id={counterpartyId} />,
    });
  };

  const onAdd = async () => {
    setModalProps({
      open: true,
      closable: false,
      size: { ...defaultValues.MODAL_EXTRA_LARGE },
      content: (
        <InventoryDocumentAddForm
          onSuccess={onAddSucceeded}
          onCancel={onCancel}
          key={uuid.v1()}
        />
      ),
    });
  };
  const onCancel = async () => {
    setModalProps({
      open: false,
      closable: false,
      size: { ...defaultValues.MODAL_EXTRA_LARGE },
      content: null,
    });
  };
  const onAddSucceeded = () => {
    setModalProps({ ...modalProps, open: false });
    getInventoryDocumentList();
  };
  const onEdit = async (id) => {
    setModalProps({
      open: true,
      closable: false,
      size: { ...defaultValues.MODAL_EXTRA_LARGE },
      content: (
        <InventoryDocumentEditForm
          id={id}
          key={id}
          onSuccess={onEditSucceeded}
          onCancel={onCancel}
        />
      ),
    });
  };
  const onEditSucceeded = () => {
    setModalProps({ ...modalProps, open: false });
    getInventoryDocumentList();
  };

  const onDelete = async (id) => {
    await documentDeleteApiCall(`${url.INVENTORY_DOCUMENT}/${id}`);
  };

  const onView = async (id) => {
    setModalProps({
      ...modalProps,
      open: true,
      closable: true,
      content: <InventoryDocumentDescription id={id} />,
    });
  };
  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <>
        <ButtonList
          filterCount={filterCount}
          onAdd={onAdd}
          onRefresh={() => getInventoryDocumentList()}
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
        closable={modalProps.closable}
        maskClosable={modalProps.closable}
        {...modalProps.size}
        open={modalProps.open}
        getContainer={null}
        footer={null}
        onCancel={onCancel}
      >
        {modalProps.content}
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
            columns={columns(onDelete, onEdit, onView, onViewCounterparty)}
            dataSource={dataSource}
            pagination={tableParams?.pagination}
            onChange={handleTableChange}
            {...defaultValues.TABLE_PROPS}
            title={title}
            loading={documentListLoading}
          />
        </FilterBedge>
      </Ant.Card>
    </>
  );
};

export default InventoryDocumentManagement;

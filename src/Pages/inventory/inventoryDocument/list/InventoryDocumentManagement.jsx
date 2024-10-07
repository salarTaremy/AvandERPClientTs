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
import HeaderCounterParty from "@/Pages/manageCounterParty/description/HeaderCounterParty";
import InventoryDocumentAddForm from "../add/InventoryDocumentAddForm";
import InventoryDocumentEditForm from "../edit/InventoryDocumentEditForm";

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

  useRequestManager({ error: documentListError });

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

  const [modalSize, setModalSize] = useState({
    ...defaultValues.MODAL_EXTRA_LARGE,
  });
  const [modalOpenState, setModalOpenState] = useState(false);
  const [modalContent, setModalContent] = useState(null);

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
    setModalContent(
      <HeaderCounterParty id={counterpartyId} onHeaderEdit={() => {}} />,
    );
    setModalOpenState(true);
  };

  const onAdd = async () => {
    const addModal = { ...defaultValues.MODAL_EXTRA_LARGE };
    setModalSize(addModal);
    setModalContent(
      <InventoryDocumentAddForm onSuccess={onAddSucceeded} onCancel={onCancel} key={uuid.v1()} />,
    );
    setModalOpenState(true);
  };
  const onCancel = async () => {
    setModalOpenState(false);
  }
  const onAddSucceeded = () => {
    setModalOpenState(false);
    getInventoryDocumentList();
  };
  const onEdit = async (id) => {
    const updateList = { ...defaultValues.MODAL_EXTRA_LARGE };
    setModalSize(updateList);
    setModalContent(<InventoryDocumentEditForm id={id} key={id} onSuccess={onEditSucceeded} onCancel={onCancel} />);
    setModalOpenState(true);
  };
  const onEditSucceeded = () => {
    setModalOpenState(false);
    getInventoryDocumentList();
  };

  const onDelete = async (id) => {
    //TODO: not implemented
    console.log("onDelete - " + id);
  };

  const onView = async (id) => {
    setModalContent(<></>);
    setModalOpenState(true);
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
        closable={false}
        maskClosable={false}
        {...modalSize}
        open={modalOpenState}
        getContainer={null}
        footer={null}
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
            columns={columns(
              onDelete,
              onEdit,
              onView,
              onViewCounterparty,
            )}
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

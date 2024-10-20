import React, { useEffect, useState } from "react";
import qs from "qs";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as styles from "@/styles";
import * as defaultValues from "@/defaultValues";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import { columns } from "./columns";
import ButtonList from "@/components/common/ButtonList";
import FilterPanel from "./FilterPanel";
import FilterBedge from "@/components/common/FilterBedge";
import FilterDrawer from "@/components/common/FilterDrawer";
import AccountDocumentDescription from "@/Pages/accounting/accountDocument/description/AccountDocumentDescription";
import * as uuid from "uuid";
import FrmAddAccountDocument from "./../add/FrmAddAccountDocument";
import AddItemDetailList from "./../add/AddItemDetailList";
import FrmEditAccountDocument from "./../edit/FrmEditAccountDocument";

//====================================================================
//                        Declaration
//====================================================================
const AccountDocumentList = (props) => {
  const pageTitle = "مدیریت اسناد حسابداری";
  const defaultPagination ={
    current: 1,
    pageSize: 10,
  }
  const [listData, listLoading, listError, listApiCall] = api.useFetchWithHandler();
  const [delData, delLoading, delError, delApiCall] = api.useDelWithHandler();
  const [openFilter, setOpenFilter] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [filterObject, setFilterObject] = useState();
  const [filterCount, setFilterCount] = useState(0);
  const [modalContent, setModalContent] = useState();
  const [modalState, setModalState] = useState(false);
  const [modalSize, setModalSize] = useState({ ...defaultValues.MODAL_LARGE });
  const [pagination, setPagination] = useState(defaultPagination);
  useRequestManager({ error: listError });
  useRequestManager({ error: delError, data: delData, loading: delLoading });
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
  }, [pagination.current, pagination.pageSize, filterObject]);

  useEffect(() => {
    setDataSource(listData?.data);
    setPagination({
      ...pagination,
      total: listData?.data && listData?.data[0]?.totalCount,
    });
  }, [listData]);

  useEffect(() => {
    delData?.isSuccess &&
      setDataSource([...dataSource?.filter((c) => c.id != delData?.data?.id)]);
  }, [delData]);

  //====================================================================
  //                        Functions
  //====================================================================

  const fillGrid = async () => {
    const queryString = qs.stringify({
      ...filterObject,
      page: pagination.current,
      result: pagination.pageSize,
    });

    await listApiCall(`${url.ACCOUNT_DOCUMENT}?${queryString}`);
  };

  const onFilterChanged = async (filterObject) => {
    setPagination({...pagination,current:1})
    setFilterObject(filterObject);
    setOpenFilter(false);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };
  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };
  const onAdd = () => {
    const updateList = { ...defaultValues.MODAL_LARGE, width: 520 };
    setModalSize(updateList);
    setModalContent(
      <FrmAddAccountDocument onSuccess={onSuccessAdd} key={uuid.v1()} />,
    );
    setModalState(true);
  };
  const onEdit = (id) => {
    const updateList = { ...defaultValues.MODAL_LARGE, width: 520 };
    setModalSize(updateList);
    setModalContent(
      <FrmEditAccountDocument onSuccess={onSuccessEdit} id={id} key={id} />,
    );
    setModalState(true);
  };
  const onDelete = async (id) => {
    await delApiCall(`${url.ACCOUNT_DOCUMENT}/${id}`);
  };

  const onView = (id) => {
    setModalSize({ ...defaultValues.MODAL_LARGE });
    setModalContent(<AccountDocumentDescription id={id} key={id} />);
    setModalState(true);
  };
  const addItem = (id) => {
    setModalSize({ ...defaultValues.MODAL_EXTRA_LARGE });
    setModalContent(<AddItemDetailList id={id} key={uuid.v1()} />);
    setModalState(true);
  };
  const onSuccessEdit = () => {
    setModalState(false);
    fillGrid();
  };
  const onSuccessAdd = () => {
    setModalState(false);
    fillGrid();
  };
  //====================================================================
  //                        Child Components
  //====================================================================

  const title = () => {
    return (
      <ButtonList
        filterCount={filterCount}
        onAdd={onAdd}
        onRefresh={() => {
          fillGrid();
        }}
        onFilter={() => {
          setOpenFilter(true);
        }}
      />
    );
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Modal
        open={modalState}
        {...defaultValues.MODAL_PROPS}
        {...modalSize}
        getContainer={null}
        footer={null}
        onCancel={() => {
          setModalState(false);
        }}
        onOk={() => {
          setModalState(false);
        }}
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
            columns={columns(onDelete, onEdit, onView, addItem)}
            dataSource={dataSource}
            pagination={pagination}
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
export default AccountDocumentList;

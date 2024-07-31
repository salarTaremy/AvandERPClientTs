import React from "react";
import { useEffect, useState } from "react";
import * as Ant from "antd";
import * as styles from "@/styles";
import qs from "qs";
import * as url from "@/api/url";
import * as uuid from "uuid";
import FilterBedge from "@/components/common/FilterBedge";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import columns from "./columns";
import ButtonList from "@/components/common/ButtonList";
import * as defaultValues from "@/defaultValues";
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterPanel from "../list/FilterPanel";
import FormAddNewWarehouse from "../add/FormAddNewWarehouse";
import FormEditWarehouse from "../edit/FormEditWarehouse";
import ProductConnection from "../connection/ProductConnection";

const WareHouseManagment = () => {
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();

  const [dataSource, setDataSource] = useState(null);
  const [modalContent, setModalContent] = useState();
  const [filterObject, setFilterObject] = useState();
  const [modalState, setModalState] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [pagination, setPagination] = useState({});
  const [modalSize, setModalSize] = useState({
    ...defaultValues.MODAL_EXTRA_LARGE,
  });
  useRequestManager({ error: error });
  useRequestManager({ error: delError, data: delSaving, loading: delLoading });

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    filterObject &&
      setFilterCount(
        Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
      );
    !filterObject && setFilterCount(0);
    getWarehouse();
  }, [filterObject]);

  useEffect(() => {
    setDataSource((listData?.isSuccess && listData?.data) || null);
  }, [listData]);

  useEffect(() => {
    delSaving?.isSuccess &&
      setDataSource([
        ...dataSource?.filter((c) => c.id !== delSaving?.data?.id),
      ]);
  }, [delSaving]);

  //====================================================================
  //                        Functions
  //====================================================================
  const getWarehouse = async () => {
    const queryString = qs.stringify(filterObject);
    await ApiCall(`${url.WAREHOUSE}?${queryString}`);
  };

  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject);
    setOpenFilter(false);
  };

  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };

  const onDelete = async (id) => {
    await delApiCall(`${url.WAREHOUSE}/${id}`);
  };

  const onSuccessEdit = () => {
    setModalState(false);
    getWarehouse();
  };
  const onSuccessSubmit = () => {
    setModalState(false);

  };

  const onEdit = (val) => {
    setModalContent(
      <FormEditWarehouse
        onSuccess={onSuccessEdit}
        key={val.id}
        id={val.id}
        name={val.title}
      />,
    );
    setModalState(true);
  };
  const onConnection = (val) => {
    setModalContent(
      <ProductConnection
        id={val.id}
        key={val.id}
        onSuccess={onSuccessSubmit}
      />,
    );
    setModalState(true);
  };

  const onSuccessAdd = () => {
    setModalState(false);
    getWarehouse();
  };

  const onAdd = () => {
    setModalContent(
      <FormAddNewWarehouse key={uuid.v1()} onSuccess={onSuccessAdd} />,
    );
    setModalState(true);
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };


  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <ButtonList
        filterCount={filterCount}
        onAdd={onAdd}
        onFilter={() => {
          setOpenFilter(true);
        }}
        onRefresh={() => {
          getWarehouse();
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
        centered
        getContainer={null}
        footer={null}
        onCancel={() => {
          setModalState(false);
        }}
        onOk={() => {
          setModalState(false);
        }}
        {...defaultValues.MODAL_PROPS}
        {...modalSize}
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Card
        style={{ ...styles.CARD_DEFAULT_STYLES }}
        className="w-full"
        title={"مدیریت انبارها"}
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
            {...defaultValues.TABLE_PROPS}
            pagination={pagination}
            columns={columns(onDelete, onEdit, onConnection)}
            onChange={handleTableChange}
            dataSource={dataSource}
            title={title}
            loading={loadingData}
          />
        </FilterBedge>
      </Ant.Card>
    </>
  );
};

export default WareHouseManagment;

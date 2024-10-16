import React from "react";
import * as Ant from "antd";
import { useEffect, useState } from "react";
import columns from "../list/columns";
import * as defaultValues from "@/defaultValues";
import * as styles from "@/styles";
import * as url from "@/api/url";
import qs from "qs";
import ButtonList from "@/components/common/ButtonList";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import FilterPanel from "./FilterPanel";
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterBedge from "@/components/common/FilterBedge";
import FormAddTypeWareHouseSheetsList from "../add/FormAddTypeWareHouseSheetsList";
import FormEditTypeWareHouseSheetsList from "../edit/FormEditTypeWareHouseSheetsList";
import * as uuid from "uuid";

const TypeWareHouseSheetsList = () => {
  const [listData, loading, error, ApiCall] = useFetchWithHandler();
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  const [dataSource, setDataSource] = useState(null);

  useRequestManager({ error: error });
  useRequestManager({ error: delError, loading: delLoading, data: delSaving });
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [openFilter, setOpenFilter] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [filterObject, setFilterObject] = useState();

  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {
    filterObject &&
      setFilterCount(
        Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
      );
    !filterObject && setFilterCount(0);
    getAllTypeWareHouseSheets();
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

  const getAllTypeWareHouseSheets = async () => {
    const queryString = qs.stringify(filterObject);
    await ApiCall(`${url.INVENTORY_DOCUMENT_TYPE}?${queryString}`);
  };
  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };
  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject);
    setOpenFilter(false);
  };
  const onDelSuccess = async (id) => {
    await delApiCall(`${url.INVENTORY_DOCUMENT_TYPE}/${id}`);
  };
  const onAdd = () => {
    setModalContent(
      <FormAddTypeWareHouseSheetsList
        key={uuid.v1()}
        onSuccess={onSuccessAdd}
      />,
    );
    setModalState(true);
  };
  const onEdit = (val) => {
    setModalContent(
      <FormEditTypeWareHouseSheetsList
        id={val?.id}
        key={val?.id}
        onSuccess={onSuccessEdit}
      />,
    );
    setModalState(true);
  };

  //====================================================================
  //                        Events
  //====================================================================
  const onSuccessAdd = () => {
    setModalState(false);
    getAllTypeWareHouseSheets();
  };

  const onSuccessEdit = () => {
    setModalState(false);
    getAllTypeWareHouseSheets();
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
          getAllTypeWareHouseSheets();
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
        handleCancel={() => setModalState(false)}
        onCancel={() => {
          setModalState(false);
        }}
        footer={null}
        centered
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Card
        style={{ ...styles.CARD_DEFAULT_STYLES }}
        title={"انواع برگه های انبار"}
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
            title={title}
            columns={columns(onDelSuccess, onEdit)}
            dataSource={dataSource}
            loading={loading}
          />
        </FilterBedge>
      </Ant.Card>
    </>
  );
};

export default TypeWareHouseSheetsList;

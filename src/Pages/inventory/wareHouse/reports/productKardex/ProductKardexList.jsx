import React from "react";
import { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import qs from "qs";
import * as styles from "@/styles";
import columns from "./columns";
import * as defaultValues from "@/defaultValues";
import FilterPanel from "./FilterPanel";
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterBedge from "@/components/common/FilterBedge";
import ButtonList from "@/components/common/ButtonList";
import useRequestManager from "@/hooks/useRequestManager";
import * as uuid from "uuid";
import { useFetchWithHandler, useDelWithHandler } from "@/api";

import { useNavigate, generatePath } from "react-router-dom";

//====================================================================
//                        Declaration
//====================================================================
const ProductKardexList = () => {
  const [listData, loading, error, ApiCall] = useFetchWithHandler();
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  const [dataSource, setDataSource] = useState(null);
  const [modalContent, setModalContent] = useState();
  const [modalState, setModalState] = useState(false);
  const [filterObject, setFilterObject] = useState();
  const [filterCount, setFilterCount] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  useRequestManager({ error: error });
  useRequestManager({ error: delError, data: delSaving, loading: delLoading });
  const navigateTo = useNavigate();

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    filterObject &&
      setFilterCount(
        Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
      );
    !filterObject && setFilterCount(0);
    getAllProductKardex();
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

  const getAllProductKardex = async () => {
    const queryString = qs.stringify(filterObject);
    await ApiCall(`${url.PRODUCT_KARDEX}?${queryString}`)

  };

  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject);
    setOpenFilter(false);
  };

  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };

  const onTableChange = (pagination, filter, sorter) => {
    setPagination(pagination);
  };

  //====================================================================
  //                        Events
  //====================================================================

  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <ButtonList
        filterCount={filterCount}
        onRefresh={() => {
          getAllProductKardex();
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
        handleCancel={() => {
          setModalState(false);
        }}
        onCancel={() => {
          setModalState(false);
        }}
        footer={null}
        centered
        {...defaultValues.MODAL_PROPS}
        {...defaultValues.MODAL_LARGE}
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Card
        style={{ ...styles.CARD_DEFAULT_STYLES }}
        title={"لیست کاردکس کالا"}
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
            columns={columns()}
            dataSource={dataSource}
            pagination={pagination}
            onChange={onTableChange}
            loading={loading}
          />

        </FilterBedge>
      </Ant.Card>
    </>
  );
};
export default ProductKardexList;

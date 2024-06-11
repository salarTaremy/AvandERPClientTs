import React from "react";
import * as Ant from "antd";
import { useEffect, useState } from "react";
import columns from "../list/columns";
import * as defaultValues from "@/defaultValues";
import * as styles from "@/styles";
import * as url from "@/api/url";
import ButtonList from "@/components/common/ButtonList";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import FilterPanel from "./FilterPanel";
import FilterBedge from "@/components/common/FilterBedge";
import FilterDrawer from "@/components/common/FilterDrawer";
import DetailedCounterPartyList from "./../description/DetailedCounterPartyList";
import { useNavigate, generatePath } from "react-router-dom";
import * as uuid from "uuid";
import qs from "qs";
import CounterPartyStateList from "../state/CounterPartyStateList";
import FormEditCounterParty from "../edit/FormEditCounterParty";

import { FormCounterpartyAdd } from "../add/FormCounterpartyAdd";

const CounterPartyList = () => {
  const navigate = useNavigate();
  const [listData, loading, error, ApiCall] = useFetchWithHandler();
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  const [dataSource, setDataSource] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [filterObject, setFilterObject] = useState();
  const [filterCount, setFilterCount] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  useRequestManager({ error: error });
  useRequestManager({ error: delError, loading: delLoading, data: delSaving });
  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {
    setPagination({ ...pagination, current: 1 });
    filterObject &&
      setFilterCount(
        Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
      );
    !filterObject && setFilterCount(0);
    getAllCounterParty();
  }, [filterObject]);

  useEffect(() => {
    getAllCounterParty();
  }, [pagination.current, pagination.pageSize]);

  useEffect(() => {
    setDataSource(listData?.data);
    setPagination({
      ...pagination,
      total: listData?.data[0]?.totalCount,
    });
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
  const getAllCounterParty = async () => {
    const cityFilter = {};
    if (filterObject && filterObject?.cityId) {
      cityFilter.cityId = filterObject?.cityId[1];
    }

    const queryString = qs.stringify({
      ...filterObject,
      ...cityFilter,
      PageNumber: pagination.current,
      RowsOfPage: pagination.pageSize,
    });

    await ApiCall(`${url.COUNTER_PARTY}?${queryString}`);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject);
    setOpenFilter(false);
  };
  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };
  const onDelSuccess = async (id) => {
    await delApiCall(`${url.COUNTER_PARTY}/${id}`);
  };
  const onSuccessAdd = () => {
    setModalState(false);
    getAllCounterParty();
  };
  const onAdd = () => {
    setModalContent(<FormCounterpartyAdd key={uuid.v1()} onSuccess={onSuccessAdd} />);
    setModalState(true);
  };
  const onView = (id) => {
    setModalContent(<DetailedCounterPartyList id={id} key={id} />);
    setModalState(true);
  };

  const onSuccessEdit = () => {
    setModalState(false);
    getAllCounterParty();
  };
  //====================================================================
  //                        Events
  //====================================================================
  const onEdit = async (val) => {
    setModalContent(<FormEditCounterParty
      onSuccess={onSuccessEdit}
      id={val.id}
      key={val.id}
    />);
    setModalState(true);
  };

  const onBlock = (val) => {
    setModalContent(
      <CounterPartyStateList
        onSuccess={onSuccessBlock}
        key={val.id}
        counterPartyId={val.id}
        counterPartyName={val.counterpartyTitle}
      />,
    );
    setModalState(true);
  };

  const onSuccessBlock = () => {
    getAllCounterParty();
    setModalState(false);
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
          getAllCounterParty();
        }}
        onFilter={() => {
          setOpenFilter(true);
        }}
      />
    );

  };

  const Grid = () => {
    return (
      <>
        <Ant.Skeleton loading={loading}>
          <Ant.Table
            pagination={pagination}
            size="small"
            {...defaultValues.TABLE_PROPS}
            title={title}
            onChange={handleTableChange}
            columns={columns(onDelSuccess, onEdit, onView, onBlock)}
            dataSource={dataSource}
          />
        </Ant.Skeleton>
      </>
    );
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Modal
        {...defaultValues.MODAL_PROPS }
        {...defaultValues.MODAL_LARGE}
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
        title={"مدیریت طرف حساب ها"}
        type="inner"
        loading={loading}
      >
        <FilterDrawer
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          onRemoveFilter={onRemoveFilter}
        >
          <FilterPanel filterObject={filterObject} onSubmit={onFilterChanged} />
        </FilterDrawer>
        <FilterBedge filterCount={filterCount}>
          <Grid />
        </FilterBedge>
      </Ant.Card>
    </>
  );
};

export default CounterPartyList;
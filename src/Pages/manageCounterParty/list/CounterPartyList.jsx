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
import FormAddCounterParty from "../add/FormAddCounterParty";
import FormEditCounterParty from "../edit/FormEditCounterParty";
import FilterBedge from "@/components/common/FilterBedge";
import FilterDrawer from "@/components/common/FilterDrawer";
import { useNavigate, generatePath } from "react-router-dom";

import qs from "qs";
import CounterPartyStateList from "../state/CounterPartyStateList";
const CounterPartyList = () => {
  const navigate = useNavigate();
  const [listData, loading, error, ApiCall] = useFetchWithHandler();
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  const [dataSource, setDataSource] = useState(null);
  useRequestManager({ error: error });
  useRequestManager({ error: delError, loading: delLoading, data: delSaving });
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [filterObject, setFilterObject] = useState();
  const [filterCount, setFilterCount] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [pagination, setPpagination] = useState({
    current: 1,
    pageSize: 10,
  });

  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {
    setPpagination({ ...pagination, current: 1 });
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
    setPpagination({
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
    const queryString = qs.stringify({
      ...filterObject,
      PageNumber: pagination.current,
      RowsOfPage: pagination.pageSize,
    });
    console.log(queryString, "fafaqueryString");
    await ApiCall(`${url.COUNTER_PARTY}?${queryString}`);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPpagination(pagination);
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
  const onAdd = () => {
    setModalContent(
      navigate("/manage/counterparty/new"),
      // <FormAddCounterParty />,
      // <FormAddCounterParty key={uuid.v1()} onSuccess={onSuccessAdd} />,
    );
    setModalState(true);
  };

  //====================================================================
  //                        Events
  //====================================================================
  const onEdit = async (id) => {
    console.log(id, "afafafaf");
    // alert("ff")

    navigate(generatePath("/manage/counterparty/edit/:id", { id }));

    // setModalState(true);
  };

  const onBlock = (val) => {
    setModalContent(
      <CounterPartyStateList
        key={val.id}
        counterPartyId={val.id}
      />
    );
    console.log('counterPartyId',val.id)
    setModalState(true);
  }
  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <ButtonList
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
            columns={columns(onDelSuccess, onEdit, onBlock)}
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
        title={"لیست طرف حساب ها"}
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

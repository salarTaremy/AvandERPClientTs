import React from "react";
import { useEffect, useState } from "react";
import * as styles from "@/styles";
import * as Ant from "antd";
import * as url from "@/api/url";
import qs from "qs";
import * as uuid from "uuid";
import * as defaultValues from "@/defaultValues";
import CustomContent from "@/components/common/CustomContent";
import columns from "./columns";
import FrmAddFundList from "../add/FrmAddFundList";
import FrmEditFundList from "../edit/FrmEditFundList";
import FundDescription from "../description/FundDescription";
import FilterPanel from "./FilterPanel";
import FilterDrawer from "@/components/common/FilterDrawer";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import FilterBedge from "@/components/common/FilterBedge";
import ButtonList from "@/components/common/ButtonList";

const FundList = () => {
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  const [openFilter, setOpenFilter] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [filterObject, setFilterObject] = useState();
  const [modalContent, setModalContent] = useState();
  const [dataSource, setDataSource] = useState(null);
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
    getAllFund();
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

  const getAllFund = async () => {
    const queryString = qs.stringify(filterObject);
    await ApiCall(`${url.FUND}?${queryString}`);
  };

;
  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject);
    setOpenFilter(false);
  };
  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };
  const onAdd = () => {
    setModalContent(
      <FrmAddFundList key={uuid.v1()} onSuccess={onSuccessAdd} />,
    );
    setModalState(true);
  };
  const onDelete = async (id) => {
    await delApiCall(`${url.FUND}/${id}`);
  };
  const onSuccessAdd = () => {
    setModalState(false);
    getAllFund();
  }
  const onSuccessEdit = () => {
    setModalState(false);
    getAllFund();
  };

  //====================================================================
  //                        Events
  //====================================================================
  const onEdit = (val) => {
    setModalContent(
      <FrmEditFundList onSuccess={onSuccessEdit} key={val.id} id={val.id} />,
    );
    setModalState(true);
  };
  const onView = (id) => {
    setModalContent(
    <FundDescription id={id} key={id} />
  );
    setModalState(true);
  };
  //====================================================================
  //                        Child Components
  //=====================================================================

  const title = () => {
    return (
      <ButtonList
        filterCount={filterCount}
        onAdd={onAdd}
        onFilter={() => {
          setOpenFilter(true);
        }}
        onRefresh={() => {
          getAllFund();
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
        centered
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

      <CustomContent height="80vh" shadow title={"صندوق ها"}>
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
            columns={columns(onDelete, onEdit, onView)}
            title={title}
            dataSource={dataSource}
            loading={loadingData}
          />
        </FilterBedge>
      </CustomContent>
    </>
  );
};
export default FundList;

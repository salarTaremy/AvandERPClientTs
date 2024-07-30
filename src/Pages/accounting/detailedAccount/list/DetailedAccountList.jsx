import React, { useEffect, useState } from "react";
import qs from "qs";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as styles from "@/styles";
import * as defaultValues from "@/defaultValues";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import * as uuid from "uuid";
import { columns } from "./columns";
import ButtonList from "@/components/common/ButtonList";
import FilterPanel from "./FilterPanel";
import FilterBedge from "@/components/common/FilterBedge";
import FilterDrawer from "@/components/common/FilterDrawer";
import FrmAddDetailedAccount from "../add/FrmAddDetailedAccount";
import FrmEditDetailedAccount from "../edit/FrmEditDetailedAccount";
import DetailedAccountDescription from "../description/DetailedAccountDescription";
//====================================================================
//                        Declaration
//====================================================================
const DetailedAccountList = () => {
  const pageTitle = "حساب های تفصیل";
  const [listData, listLoading, listError, listApiCall] =
    api.useFetchWithHandler();
  const [delData, delLoading, delError, delApiCall] = api.useDelWithHandler();
  const [openFilter, setOpenFilter] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [filterObject, setFilterObject] = useState();
  const [filterCount, setFilterCount] = useState(0);
  const [modalContent, setModalContent] = useState();
  const [modalState, setModalState] = useState(false);
  const [modalSize, setModalSize] = useState({ ...defaultValues.MODAL_LARGE });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObject]);
  useEffect(() => {
    setDataSource((listData?.isSuccess && listData?.data) || null);
  }, [listData]);
  useEffect(() => {
    delData?.isSuccess &&
      setDataSource([...dataSource?.filter((c) => c.id != delData?.data?.id)]);
  }, [delData]);

  //====================================================================
  //                        Functions
  //====================================================================
  const fillGrid = async () => {
    const queryString = qs.stringify(filterObject);
    await listApiCall(`${url.DETAILED_ACCOUNT}?${queryString}`);
  };
  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject);
    setOpenFilter(false);
  };
  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };
  const onSuccessEdit = () => {
    setModalState(false);
    fillGrid();
  };
  const onSuccessAdd = () => {
    setModalState(false);
    fillGrid();
  };
  const onAdd = () => {
    const updateList = { ...defaultValues.MODAL_LARGE, width: 520 };
    setModalSize(updateList)
    setModalContent(
      <FrmAddDetailedAccount onSuccess={onSuccessAdd} key={uuid.v1()} />,
    );
    setModalState(true);
  };
  const onDelete = async (id) => {
    await delApiCall(`${url.DETAILED_ACCOUNT}/${id}`);
  };
  const onEdit = (val) => {
    const updateList = { ...defaultValues.MODAL_LARGE, width: 520 };
    setModalSize(updateList)
    setModalContent(
      <FrmEditDetailedAccount
        onSuccess={onSuccessEdit}
        id={val.id}
        key={val.id}
        obj={val}
      />,
    );
    setModalState(true);
  };
  const onView = (id) => {
    setModalSize({ ...defaultValues.MODAL_LARGE })
    setModalContent(<DetailedAccountDescription id={id} key={id} />);
    setModalState(true);
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
        centered
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
      <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} title={pageTitle} type="inner">
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
            loading={listLoading}
          />
        </FilterBedge>
      </Ant.Card>
    </>
  );
};
export default DetailedAccountList;

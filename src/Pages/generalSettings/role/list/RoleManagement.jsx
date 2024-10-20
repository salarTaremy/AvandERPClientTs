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
import FormAddRole from "../add/FormAddRole";
import FormEditRole from "../edit/FormEditRole";
import * as defaultValues from "@/defaultValues";
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterPanel from "../list/FilterPanel";
import RoleInfo from "../info/RoleInfo";
import RoleActionList from "../action/RoleActionList";
import RoleMenuList from "../menu/RoleMenuList";
import ActionSwitchList from "../switch/ActionSwitchList";


function RoleManagement() {
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  const [dataSource, setDataSource] = useState(null);
  const [modalContent, setModalContent] = useState();
  const [filterObject, setFilterObject] = useState();
  const [modalState, setModalState] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterCount, setFilterCount] = useState(0);

  const [modalSize, setModalSize] = useState({ ...defaultValues.MODAL_EXTRA_LARGE });
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
    getRole();
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
  const getRole = async () => {
    const queryString = qs.stringify(filterObject);
    await ApiCall(`${url.ROLE}?${queryString}`);
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
    await delApiCall(`${url.ROLE}/${id}`);
  };

  const onSuccessEdit = () => {
    setModalState(false);
    getRole();
  };

  const onEdit = (val) => {
    const updateList = { ...defaultValues.MODAL_EXTRA_LARGE, width: 520 };
    setModalSize(updateList)
    setModalContent(
      <FormEditRole
        onSuccess={onSuccessEdit}
        key={val.id}
        id={val.id}
        name={val.persianTitle}
      />,
    );
    setModalState(true);
  };

  const onInfo = (val) => {
    setModalSize({ ...defaultValues.MODAL_EXTRA_LARGE })
    setModalContent(
      <RoleInfo
        roleId={val.id}
        key={val.id}
        name={val.persianTitle}
      />
    );
    setModalState(true);
  }

  const onAction = (val) => {

    setModalSize({ ...defaultValues.MODAL_EXTRA_LARGE })
    setModalContent(
      <RoleActionList
        id={val.id}
        key={val.id}
        name={val.persianTitle}
      />
    );
    setModalState(true);
  }

  const onMenu = (val) => {

    setModalSize({ ...defaultValues.MODAL_EXTRA_LARGE })
    setModalContent(
      <RoleMenuList
        id={val.id}
        key={uuid.v1()}
        name={val.persianTitle}
        onSuccess={onSuccessMenu}
      />
    );
    setModalState(true);
  }

  const onSuccessMenu = () => {
    setModalState(false);
  }

  const onSwitch = (val) => {

    setModalSize({ ...defaultValues.MODAL_EXTRA_LARGE })
    setModalContent(
      <ActionSwitchList
        id={val.id}
        key={val.id}
        roleId={val.id}
        name={val.persianTitle}
        onSuccess={onSuccessSwitch}
      />
    );
    setModalState(true);
  }

  const onSuccessSwitch = () => {
    getRole
  }

  const onView = (id) => {
    setModalState(true);
  };

  const onSuccessAdd = () => {
    setModalState(false);
    getRole();
  };

  const onAdd = () => {
    const updateList = { ...defaultValues.MODAL_EXTRA_LARGE, width: 520 };
    setModalSize(updateList)
    setModalContent(<FormAddRole key={uuid.v1()} onSuccess={onSuccessAdd} />);
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
        onFilter={() => {
          setOpenFilter(true);
        }}
        onRefresh={() => {
          getRole();
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
        title={"مدیریت نقش ها"}
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

            columns={columns(onDelete, onEdit, onView, onInfo, onAction, onMenu, onSwitch)}

            dataSource={dataSource}
            title={title}
            loading={loadingData}
          />
        </FilterBedge>
      </Ant.Card>
    </>
  );
}

export default RoleManagement;

import React from "react";
import * as Ant from "antd";
import { useEffect, useState } from "react";
import columns from "./columns";
import * as defaultValues from "@/defaultValues";
import * as styles from "@/styles";
import * as url from "@/api/url";
import qs from "qs";
import ButtonList from "@/components/common/ButtonList";
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterBedge from "@/components/common/FilterBedge";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import FormEditUser from "../edit/FormEditUser";
import FormAddNewUser from "../add/FormAddNewUser";
import * as uuid from "uuid";
import FormResetPasswordUser from "../reset/FormResetPasswordUser";
import FilterPanel from "./FilterPanel";
import UserInfo from "../info/UserInfo";
import FormSwitchUserRollList from "../rollSwitch/FormSwitchUserRollList";
import FormUsersOtherAccess from "../otherAccess/FormUsersOtherAccess";
import FormUserDescription from "../description/FormUserDescription";

const UserManagement = () => {
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
  const [modalSize, setModalSize] = useState({ ...defaultValues.MODAL_LARGE });
  const [pagination, setPagination] = useState({});

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    filterObject &&
      setFilterCount(
        Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
      );
    !filterObject && setFilterCount(0);
    getAllUserList();
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
  const getAllUserList = async () => {
    const queryString = qs.stringify(filterObject);
    await ApiCall(`${url.USER}?${queryString}`);
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
    await delApiCall(`${url.USER}/${id}`);
  };

  const onSuccessEdit = () => {
    setModalState(false);
    getAllUserList();
  };

  const onAdd = () => {
    const updateList = { ...defaultValues.MODAL_LARGE, width: 520 };
    setModalSize(updateList)
    setModalContent(
      <FormAddNewUser key={uuid.v1()} onSuccess={onSuccessAdd} />,
    );
    setModalState(true);
  };

  const onSuccessAdd = () => {
    setModalState(false);
    getAllUserList();
  };

  const onReset = (val) => {
    setModalContent(
      <FormResetPasswordUser
        onSuccess={onSuccessReset}
        myKey={val.id}
        obj={val}
        id={val.id}
        userName={val.userName}
      />,
    );
    setModalState(true);
  };

  const onSuccessReset = () => {
    setModalState(false);
    getAllUserList();
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  //====================================================================
  //                        Events
  //====================================================================
  const onEdit = (val) => {
    const updateList = { ...defaultValues.MODAL_LARGE, width: 520 };
    setModalSize(updateList)
    setModalContent(
      <FormEditUser
        onSuccess={onSuccessEdit}
        key={val.id}
        id={val.id}
        userName={val.userName}
      />,
    );
    setModalState(true);
  };

  const onInfo = (val) => {
    setModalSize({ ...defaultValues.MODAL_LARGE })
    setModalContent(
      <UserInfo
        userId={val.id}
        key={val.id}
        userName={val.userName}
      />
    );
    setModalState(true);
  }

  const onSwitch = (val) => {
    setModalSize({ ...defaultValues.MODAL_LARGE })
    setModalContent(
      <FormSwitchUserRollList
        onSuccess={onSuccessSwitch}
        key={uuid.v1()}
        userId={val.id}
        userName={val.userName}
      />
    )
    setModalState(true);
  }

  const onSuccessSwitch = () => {
    setModalState(false);
  };

  const onOtherAccesses = (val) => {
    setModalSize({ ...defaultValues.MODAL_LARGE })
    setModalContent(
      <FormUsersOtherAccess
        onSuccess={onSuccessAccess}
        key={uuid.v1()}
        userId={val.id}
        userName={val.userName}
      />
    )
    setModalState(true);
  }

  const onSuccessAccess = () => {
    setModalState(false);
  }

  const onDescription = (val) => {
    setModalSize({ ...defaultValues.MODAL_LARGE })
    setModalContent(
      <FormUserDescription
        key={uuid.v1()}
        id={val.id}
      />
    )
    setModalState(true);
  }

  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <ButtonList
        filterCount={filterCount}
        onAdd={() => {
          onAdd();
        }}
        onRefresh={() => {
          getAllUserList();
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
        handleCancel={() => setModalState(false)}
        onCancel={() => {
          setModalState(false);
        }}
        onFinish={() => {
          setModalState(false);
        }}
        onOk={() => {
          setModalState(false);
        }}
        footer={null}
        centered
        {...defaultValues.MODAL_PROPS}
        {...modalSize}
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Card
        style={{ ...styles.CARD_DEFAULT_STYLES }}
        className="w-full"
        title={"مدیریت کاربران"}
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
            title={title}
            columns={columns(onDelSuccess, onEdit, onReset, onInfo, onSwitch, onOtherAccesses, onDescription)}
            onChange={handleTableChange}
            dataSource={dataSource}
            loading={loading}
          />
        </FilterBedge>
      </Ant.Card>
    </>
  );
};

export default UserManagement;

import React from "react";
import * as Ant from "antd";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { useFetchWithHandler, usePutWithHandler } from "@/api";
import * as defaultValues from "@/defaultValues";
import ButtonList from "@/components/common/ButtonList";
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterBedge from "@/components/common/FilterBedge";
import FilterPanel from "./FilterPanel";
import qs from "qs";
import useRequestManager from "@/hooks/useRequestManager";
import * as styles from "@/styles";
import ModalHeader from "@/components/common/ModalHeader";
import CustomContent from "@/components/common/CustomContent";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
const FormSwitchUserRollList = ({ userId, userName, onSuccess }) => {
  const [dataSource, setDataSource] = useState(null);
  const [listData, loading, error, ApiCall] = useFetchWithHandler();
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterObject, setFilterObject] = useState(null);
  const [filterCount, setFilterCount] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  useRequestManager({
    error: editError,
    loading: editLoading,
    data: editData,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [idActionsList, setIdActionsList] = useState([]);
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
    // getRoleScopeWithRoles();
  }, [filterObject]);

  useEffect(() => {
    getRoleScopeWithRoles();
  }, [selectedUser, filterCount]);

  useEffect(() => {
    const TmpSelected = [];
    if (listData?.isSuccess && listData?.data) {
      listData?.data.map((item) => {
        if (item.userHasRole) {
          TmpSelected.push(item.id);
        }
      });
    }
    setSelectedRowKeys([...TmpSelected]);

    setDataSource((listData?.isSuccess && listData?.data) || null);
  }, [listData]);

  useEffect(() => {
    editData?.isSuccess && onSuccess();
  }, [editData]);

  //====================================================================
  //                        Functions
  //====================================================================
  const getRoleScopeWithRoles = async () => {
    const req = {
      roleScopePersianTitle: filterObject?.persianTitle,
      rolePersianTitle: filterObject?.rolePersianTitle,
      UserId: userId,
    };
    console.log("req", filterObject);
    const queryString = qs.stringify(req);
    await ApiCall(`${url.ROLE_SCOPE_WITH_ROLES}?${queryString}`);
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

  const updateActionId = (listId) => {
    setIdActionsList(listId);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    updateActionId(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFinish = async () => {
    const data = {
      userId: userId,
      roleIdList: idActionsList,
    };
    await editApiCall(url.ROLE_UPDATE_ROLE_USER_ASSIGNMENT, data);
  };

  const columns = () => {
    return [
      {
        title: "محدوده نقش",
        dataIndex: "roleScopePersianTitle",
        key: "roleScopePersianTitle",
        width: 100,
        className: "text-xs sm:text-sm",
      },
      {
        title: "نام نقش",
        dataIndex: "rolePersianTitle",
        key: "rolePersianTitle",
        width: 100,
        className: "text-xs sm:text-sm",
      },
    ];
  };

  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <ButtonList
        filterCount={filterCount}
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
      <ModalHeader title={`ویرایش نقش های کاربر  " ${userName} "`} icon={<AiOutlineDeploymentUnit />} />

      <CustomContent >
        <FilterDrawer
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          onRemoveFilter={onRemoveFilter}
        >
          <FilterPanel filterObject={filterObject} onSubmit={onFilterChanged} />
        </FilterDrawer>
        <FilterBedge filterCount={filterCount}>
          <Ant.Table
            rowSelection={{ ...rowSelection }}
            {...defaultValues.TABLE_PROPS}
            title={title}
            pagination={pagination}
            columns={columns()}
            onChange={handleTableChange}
            dataSource={dataSource}
            loading={loading}
          />
        </FilterBedge>
      </CustomContent>

      <Ant.Button
        block
        className="mt-8"
        loading={editLoading}
        type="primary"
        onClick={onFinish}
      >
        {"تایید"}
      </Ant.Button>
    </>
  );
};

export default FormSwitchUserRollList;
FormSwitchUserRollList.propTypes = {
  onFinish: PropTypes.func,
};

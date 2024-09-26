import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ButtonList from "@/components/common/ButtonList";
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterBedge from "@/components/common/FilterBedge";
import FilterPanel from "../action/FilterPanel";
import qs from "qs";
import ModalHeader from "@/components/common/ModalHeader";
import CustomContent from "@/components/common/CustomContent";
import { TiThList } from "react-icons/ti";
import * as styles from "@/styles";

const RoleActionList = ({ id, name }) => {
  const [data, loading, error, ApiCall] = useFetchWithHandler();
  useRequestManager({ error: error });
  const [dataSource, setDataSource] = useState(null);
  const [filterObject, setFilterObject] = useState();
  const [filterCount, setFilterCount] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();
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
    getAllActions();
  }, [filterObject]);

  useEffect(() => {
    setDataSource((data?.isSuccess && data?.data.roleActionList) || null);
  }, [data]);

  //====================================================================
  //                        Functions
  //====================================================================
  const getAllActions = async () => {
    const req = {
      roleId: id,
      controllerName: filterObject?.controllerPersianTitle,
    };
    const queryString = qs.stringify(req);
    await ApiCall(`${url.ROLE_GET_ACTIONS_RELATED_TO_ROLE}?${queryString}`);
  };

  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject);
    setOpenFilter(false);
  };
  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const cl = [
    {
      title: "نام بخش (controller) ",
      dataIndex: "controllerPersianTitle",
      // key: "controllerPersianTitle",
      width: 100,
    },
    {
      title: "نام عملیات (action) ",
      dataIndex: "actionPersianTitle",
      // key: "actionPersianTitle",
      width: 100,
    },
  ];

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
      <ModalHeader title={`لیست عملیات نقش "${name}"`} icon={<TiThList />} />
      <CustomContent>
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
            className="mt-5"
            columns={cl}
            onChange={handleTableChange}
            dataSource={dataSource || null}
            loading={loading}
          />
        </FilterBedge>
      </CustomContent>
    </>
  );
};

export default RoleActionList;

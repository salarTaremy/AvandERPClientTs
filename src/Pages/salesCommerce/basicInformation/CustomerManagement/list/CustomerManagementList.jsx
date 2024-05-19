import React from "react";
import { useEffect, useState } from "react";
import * as styles from "@/styles";
import * as Ant from "antd";
import * as url from "@/api/url";
import qs from "qs";
import * as defaultValues from "@/defaultValues";
import columns from "./columns";

import FilterPanel from '../list/FilterPanel'
import FilterDrawer from '@/components/common/FilterDrawer'
import FilterBedge from '@/components/common/FilterBedge'
import useRequestManager from "@/hooks/useRequestManager";
import { useFetchWithHandler, useDelWithHandler } from "@/api";

import ButtonList from "@/components/common/ButtonList";
import { useNavigate, generatePath } from "react-router-dom";
import CustomerDescription from '../description/CustomerDescription'

const CustomerManagementList = () => {
  const navigate = useNavigate();
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  const [openFilter, setOpenFilter] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [filterObject, setFilterObject] = useState()
  const [filterCount, setFilterCount] = useState(0)
  const [modalContent, setModalContent] = useState();
  const [dataSource, setDataSource] = useState(null);
  const [pagination, setPpagination] = useState({
    PageNumber: 1,
    PageSize: 10,
  });

  useRequestManager({ error: error });
  useRequestManager({ error: delError, data: delSaving, loading: delLoading });
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    setPpagination({ ...pagination, PageNumber: 1 });
    filterObject &&
      setFilterCount(
        Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
      );
    !filterObject && setFilterCount(0);
    getAllCustomer();
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

  useEffect(() => {
    getAllCustomer();
  }, [pagination.PageNumber, pagination.PageSize]);

  useEffect(() => {
    setDataSource(listData?.data);
    setPpagination({
      ...pagination,
      total: listData?.data[0]?.totalCount,
    });
  }, [listData]);
  //====================================================================
  //                        Functions
  //====================================================================
  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject)
    setOpenFilter(false)
  }
  const handleTableChange = (pagination, filters, sorter) => {
    setPpagination(pagination);
  };

  const getAllCustomer = async () => {
    const queryString = qs.stringify({
        ...filterObject,
      PageNumber: pagination.PageNumber,
      PageSize: pagination.PageSize,
    });
    await ApiCall(`${url.CUSTOMER}?${queryString}`);
  };


  const onRemoveFilter = () => {
    setFilterObject(null)
    setOpenFilter(false)
  }

  //====================================================================
  //                        Events
  //====================================================================
  const onView = (id) => {
    setModalContent(<CustomerDescription id={id}/>)
    setModalState(true)
  }

  const onAdd = () => {
    navigate("/sale/customerManagemen/new")
  };

  const onDelete = async (id) => {
    await delApiCall(`${url.CUSTOMER}/${id}`);
  };
  const onEdit = (val) => {
    const id=val.id
    navigate(generatePath("/sale/customerManagemen/edit/:id",{ id }))

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
          getAllCustomer();
        }}
      />
    );
  };
  const Grid = () => {
    return (
      <>
        <Ant.Table
          pagination={pagination}
          onChange={handleTableChange}
          loading={delLoading}
          {...defaultValues.TABLE_PROPS}
          columns={columns(onDelete, onEdit, onView)}
          title={title}
          dataSource={dataSource}
        />
      </>
    );
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Modal
          {...defaultValues.MODAL_PROPS}
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
      >
        {modalContent}
      </Ant.Modal>

      <Ant.Card
        style={{ ...styles.CARD_DEFAULT_STYLES }}
        loading={loadingData}
        title={" لیست مدیریت مشتریان"}
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
          <Grid />
        </FilterBedge>
      </Ant.Card>
    </>
  );
};
export default CustomerManagementList;

import React from "react";
import { useEffect, useState } from "react";
import * as styles from "@/styles";
import * as Ant from "antd";
import * as url from "@/api/url";
import qs from "qs";
import * as defaultValues from "@/defaultValues";
import columns from "./columns";
import * as uuid from "uuid";
import FilterPanel from "../list/FilterPanel";
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterBedge from "@/components/common/FilterBedge";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetchWithHandler, useDelWithHandler } from "@/api";

import ButtonList from "@/components/common/ButtonList";
import { useNavigate, generatePath } from "react-router-dom";
import CustomerDescription from "../description/CustomerDescription";
import FormAddCustomer from "../add/FormAddCustomer";
import FormEditCustomer from "../edit/FormEditCustomer";

const CustomerManagementList = () => {
  const navigate = useNavigate();
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [DeleteData, DeleteLoading, DeleteError, DeleteApiCall] = useDelWithHandler();
  const [openFilter, setOpenFilter] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [filterObject, setFilterObject] = useState();
  const [filterCount, setFilterCount] = useState(0);
  const [modalContent, setModalContent] = useState();
  const [dataSource, setDataSource] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useRequestManager({ error: error });
  useRequestManager({ error: DeleteError, data: DeleteData, loading: DeleteLoading });
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
    getAllCustomer();
  }, [filterObject]);



  useEffect(() => {
    DeleteData?.isSuccess &&
      setDataSource([...dataSource?.filter((c) => c.id !== DeleteData?.data?.id)])
  }, [DeleteData])
  useEffect(() => {
    getAllCustomer();
  }, [pagination.current, pagination.pageSize]);

  useEffect(() => {
    setDataSource(listData?.data);
    setPagination({
      ...pagination,
      total: listData?.data[0]?.totalCount,
    });
  }, [listData]);
  //====================================================================
  //                        Functions
  //====================================================================
  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject);
    setOpenFilter(false);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const getAllCustomer = async () => {
    const queryString = qs.stringify({
      ...filterObject,
      PageNumber: pagination.current,
      PageSize: pagination.pageSize,
    });
    await ApiCall(`${url.CUSTOMER}?${queryString}`);
  };

  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };

  //====================================================================
  //                        Events
  //====================================================================
  const onView = (id) => {
    setModalContent(<CustomerDescription id={id} />);
    setModalState(true);
  };

  const onSuccessAdd = () => {
    setModalState(false);
    getAllCustomer();
  };

  const onAdd = () => {
    setModalContent(<FormAddCustomer key={uuid.v1()} onSucces={onSuccessAdd} />);
    setModalState(true);
  };

  const onDelete = async (id) => {
    await DeleteApiCall(`${url.CUSTOMER}/${id}`);
  };

  const onSuccessEdit = () => {
    setModalState(false);
    getAllCustomer();
  };

  const onEdit = (val) => {
    setModalContent(<FormEditCustomer
      onSuccess={onSuccessEdit}
      id={val.id}
      key={val.id}
      name={val.customerName}
    />);
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
          getAllCustomer();
        }}
      />
    );
  };
  const Grid = () => {
    return (
      <>
        <Ant.Skeleton loading={loadingData}>
          <Ant.Table
            pagination={pagination}
            {...defaultValues.TABLE_PROPS}
            title={title}
            onChange={handleTableChange}
            columns={columns(onDelete, onEdit, onView)}
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
        {...defaultValues.MODAL_PROPS}
        {...defaultValues.MODAL_EXTRA_LARGE}
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
        title={"  مدیریت مشتریان"}
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

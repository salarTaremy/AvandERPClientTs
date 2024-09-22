import React, { useState, useEffect } from "react";
import qs from "qs";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as styles from "@/styles";
import * as api from "@/api";
import * as defaultValues from "@/defaultValues";
import { columns } from "./columns";
import ButtonList from "@/components/common/ButtonList";
import * as uuid from "uuid";
import FilterPanel from './FilterPanel'
import FilterDrawer from '@/components/common/FilterDrawer'
import FilterBedge from '@/components/common/FilterBedge'
import FormSaleEffectiveFactorAdd from "../add/FormSaleEffectiveFactorAdd";
import FormSaleEffectiveFactorEdit from "../edit/FormSaleEffectiveFactorEdit";
import SaleEffectiveFactorDescription from "../description/SaleEffectiveFactorDescription";
import useRequestManager from '@/hooks/useRequestManager'

//====================================================================
//                        Declaration
//====================================================================
const SaleEffectiveFactor = () => {
  const pageTitle = "مدیریت عوامل موثر بر برگه فروش";
  const [listData, listLoading, listError, listApiCall] = api.useFetchWithHandler();
  const [deleteSaving, deleteLoading, deleteError, deleteApiCall] = api.useDelWithHandler()
  const [dataSource, setDataSource] = useState(null);
  const [modalOpenState, setModalOpenState] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [filterObject, setFilterObject] = useState()
  const [filterCount, setFilterCount] = useState(0)
  const [openFilter, setOpenFilter] = useState(false)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  useRequestManager({ error: listError });
  useRequestManager({ error: deleteError, data: deleteSaving, loading: deleteLoading });

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    filterObject &&
      setFilterCount(Object.keys(filterObject)?.filter((key) => filterObject[key])?.length)
    !filterObject && setFilterCount(0)
    getEffectiveFactorList();
  }, [filterObject]);

  useEffect(() => {
    setDataSource(listData?.data);
  }, [listData]);

  useEffect(() => {
    deleteSaving?.isSuccess &&
      setDataSource([...dataSource?.filter((c) => c.id !== deleteSaving?.data?.id)])
  }, [deleteSaving])

  //====================================================================
  //                        Functions
  //====================================================================
  const getEffectiveFactorList = async () => {
    const queryString = qs.stringify(filterObject);
    await listApiCall(`${url.SALE_EFFECTIVE_FACTOR}?${queryString}`);
  };

  const onTableChange = (pagination, filter, sorter) => {
    setPagination(pagination);
  }

  const onDelete = async (id) => {
    await deleteApiCall(`${url.SALE_EFFECTIVE_FACTOR}/${id}`)
  };

  const onEdit = async (value) => {
    setModalContent(
      <FormSaleEffectiveFactorEdit onSuccess={onSuccessEdit} myKey={value?.id} obj={value} id={value?.id} />,
    );
    setModalOpenState(true);
  };

  const onSuccessEdit = async () => {
    setModalOpenState(false)
    getEffectiveFactorList()
  }

  const onView = async (id) => {
    setModalContent(<SaleEffectiveFactorDescription id={id} />);
    setModalOpenState(true);
  };

  const onSuccessAdd = () => {
    setModalOpenState(false);
    getEffectiveFactorList();
  };

  const onAdd = async () => {
    setModalContent(<FormSaleEffectiveFactorAdd key={uuid.v1()} onSuccess={onSuccessAdd} />);
    setModalOpenState(true);
  }

  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject)
    setOpenFilter(false)
  }

  const onRemoveFilter = () => {
    setFilterObject(null)
    setOpenFilter(false)
  }

  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <>
        <ButtonList
          filterCount={filterCount}
          onAdd={onAdd}
          onFilter={() => setOpenFilter(true)}
          onRefresh={getEffectiveFactorList}
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
        open={modalOpenState}
        centered
        {...defaultValues.MODAL_PROPS}
        width={500}
        getContainer={null}
        footer={null}
        onCancel={() => setModalOpenState(false)}
        onOk={() => setModalOpenState(false)}
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Card
        style={{ ...styles.CARD_DEFAULT_STYLES }}
        title={pageTitle}
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
            columns={columns(onDelete, onEdit, onView)}
            dataSource={dataSource}
            {...defaultValues.TABLE_PROPS}
            title={title}
            pagination={pagination}
            onChange={onTableChange}
            loading={listLoading}
          />
        </FilterBedge>
      </Ant.Card>
    </>
  );
}

export default SaleEffectiveFactor;
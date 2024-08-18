import React, { useState, useEffect } from "react";
import qs from "qs";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as styles from "@/styles";
import * as api from "@/api";
import { usePutWithHandler } from '@/api'
import * as defaultValues from "@/defaultValues";
import { columns } from "./columns";
import ButtonList from "@/components/common/ButtonList";
import * as uuid from "uuid";
import FilterPanel from './FilterPanel';
import FilterDrawer from '@/components/common/FilterDrawer';
import FilterBedge from '@/components/common/FilterBedge';
import PriceCircularDetailList from "../../priceCircularDetail/list/PriceCircularDetailList";
import useRequestManager from '@/hooks/useRequestManager';
import FormAddPriceCircularHeader from "../add/FormAddPriceCircularHeader";
import FormEditPriceCircularHeader from "../edit/FormEditPriceCircularHeader";
import FormCopyPriceCircularHeader from "../copy/FormCopyPriceCircularHeader";


//====================================================================
//                        Declaration
//====================================================================
const PriceCircularHeader = () => {
  const pageTitle = "مدیریت بخشنامه قیمت";
  const [listData, listLoading, listError, listApiCall] = api.useFetchWithHandler();
  const [deleteSaving, deleteLoading, deleteError, deleteApiCall] = api.useDelWithHandler()
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
  const [dataSource, setDataSource] = useState(null);
  const [modalOpenState, setModalOpenState] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [filterObject, setFilterObject] = useState()
  const [filterCount, setFilterCount] = useState(0)
  const [openFilter, setOpenFilter] = useState(false)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [modalSize, setModalSize] = useState({ ...defaultValues.MODAL_EXTRA_LARGE });
  useRequestManager({ error: listError });
  useRequestManager({ error: deleteError, data: deleteSaving, loading: deleteLoading });

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    filterObject &&
      setFilterCount(Object.keys(filterObject)?.filter((key) => filterObject[key])?.length)
    !filterObject && setFilterCount(0)
    getPriceCircularList();
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
  const getPriceCircularList = async () => {
    const queryString = qs.stringify(filterObject);
    await listApiCall(`${url.PRICE_CIRCULAR_HEADER}?${queryString}`);
  };

  const onTableChange = (pagination, filter, sorter) => {
    setPagination(pagination);
  }

  const onDelete = async (id) => {
    await deleteApiCall(`${url.PRICE_CIRCULAR_HEADER}/${id}`)
  };

  const onChange = async (id) => {
    await editApiCall(`${url.PRICE_CIRCULAR_HEADER_ENABLE_DISABLE}/${id}`)
  }

  const onEdit = async (value) => {
    setModalSize({ ...defaultValues.MODAL_EXTRA_LARGE, width: 520 })
    setModalContent(
      <FormEditPriceCircularHeader onSuccess={onSuccessEdit} key={uuid.v1()} id={value} />,
    );
    setModalOpenState(true);
  };

  const onSuccessEdit = async () => {
    setModalOpenState(false)
    getPriceCircularList()
  }

  const onView = async (value) => {
    setModalSize({ ...defaultValues.MODAL_EXTRA_LARGE })
    setModalContent(<PriceCircularDetailList priceCircularHeaderId={value.id} priceCircularHeaderName={value.title} />);
    setModalOpenState(true);
  };

  const onSuccessAdd = () => {
    setModalOpenState(false);
    getPriceCircularList();
  };

  const onAdd = async () => {
    setModalSize({ ...defaultValues.MODAL_EXTRA_LARGE, width: 520 })
    setModalContent(<FormAddPriceCircularHeader key={uuid.v1()} onSuccess={onSuccessAdd} />);
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

  const onCopy = async (value) => {
    setModalSize({ ...defaultValues.MODAL_EXTRA_LARGE, width: 520 })
    setModalContent(<FormCopyPriceCircularHeader key={uuid.v1()} id={value} onSuccess={onSuccessAdd} />);
    setModalOpenState(true);
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
          onRefresh={getPriceCircularList}
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
        {...modalSize}
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
            columns={columns(onDelete, onEdit, onView, onCopy, onChange)}
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

export default PriceCircularHeader;
import React, { useState, useEffect } from "react";
import * as Ant from "antd";
import qs from "qs";
import * as api from "@/api";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { columns } from "./columns";
import * as uuid from "uuid";
import ButtonList from "@/components/common/ButtonList";
import useRequestManager from "@/hooks/useRequestManager";
import { useDelWithHandler } from "@/api";
import DetailProductListDescription from "@/Pages/inventory/product/description/DetailProductListDescription";
import BatchNumberDescription from "@/Pages/inventory/batchNumber/description/BatchNumberDescription";
import ModalHeader from "@/components/common/ModalHeader";
import { MdDescription } from "react-icons/md";
import FormEditPriceCircularDetail from "../edit/FormEditPriceCircularDetail";
import FormAddPriceCirculardetail from "../add/FormAddPriceCirculardetail";
import FilterPanel from './FilterPanel'
import FilterDrawer from '@/components/common/FilterDrawer'
import FilterBedge from '@/components/common/FilterBedge'
import CustomContent from "@/components/common/CustomContent";
//====================================================================
//                        Declaration
//====================================================================
const PriceCircularDetailList = (props) => {
  const { priceCircularHeaderId } = props;
  const pageTitle = `جزییات بخشنامه "${priceCircularHeaderId}"`;
  const [listData, listLoading, listError, listApiCall] =
    api.useFetchWithHandler();
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  useRequestManager({ error: delError, loading: delLoading, data: delSaving });
  const [dataSource, setDataSource] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [openFilter, setOpenFilter] = useState(false)
  const [filterCount, setFilterCount] = useState(0);
  const [filterObject, setFilterObject] = useState();
  const [modalSize, setModalSize] = useState({ ...defaultValues.MODAL_LARGE });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  useRequestManager({ error: listError });

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    const filteredKeys =
      filterObject &&
      Object.keys(filterObject).filter(
        (key) =>
          key !== "Product" &&
          key !== "productAndBatchNumber" &&
          key !== "BrandId",
      );

    const newFilterObject = {};
    filteredKeys?.forEach((key) => {
      newFilterObject[key] = filterObject[key];
    });

    setFilterCount(filteredKeys?.filter((key) => filterObject[key]).length);

    if (!filteredKeys?.length) {
      setFilterCount(0);

    }

    if (!openFilter) {
        getPriceCircularDetailList(newFilterObject);
    }
  }, [filterObject]);


//   useEffect(() => {
//     filterObject &&
//       setFilterCount(
//         Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
//       );
//     !filterObject && setFilterCount(0);
//     getPriceCircularDetailList();
//   }, [filterObject]);

  useEffect(() => {
    getPriceCircularDetailList();
  }, [priceCircularHeaderId]);

  useEffect(() => {
    setDataSource(listData?.data);
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
  const getPriceCircularDetailList = async () => {
    const newFilterObject = { ...filterObject };
    delete newFilterObject.Product;
    delete newFilterObject.productAndBatchNumber;
    delete newFilterObject.BrandId;
    const queryString = qs.stringify({
      priceCircularHeaderId: priceCircularHeaderId,
      ...newFilterObject,
    });

    await listApiCall(`${url.PRICE_CIRCULAR_DETAIL}?${queryString}`);
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
    const req = qs.stringify({
      id: id,
    });
    await delApiCall(`${url.PRICE_CIRCULAR_DETAIL}?${req}`);
  };

  const onProductView = (productId) => {
    setModalContent(<DetailProductListDescription id={productId} />);
    setModalState(true);
  };

  const onBatchNumberView = (batchNumberId) => {
    setModalContent(<BatchNumberDescription id={batchNumberId} />);
    setModalState(true);
  };

  const handleTableChange = (pagination, filter, sorter) => {
    setPagination(pagination);
  };

  const onSuccessAdd = () => {
    setModalState(false);
    getPriceCircularDetailList();
  };

  const onAdd = () => {
    const updateList = { ...defaultValues.MODAL_LARGE, width: 520 };
    setModalSize(updateList);
    setModalContent(
      <FormAddPriceCirculardetail
        key={uuid.v1()}
        onSuccess={onSuccessAdd}
        iD={priceCircularHeaderId}
      />,
    );
    setModalState(true);
  };

  const onSuccessEdit = () => {
    setModalState(false);
    getPriceCircularDetailList();
  };

  const onEdit = (val) => {
    const updateList = { ...defaultValues.MODAL_LARGE, width: 520 };
    setModalSize(updateList);
    setModalContent(
      <FormEditPriceCircularDetail
        onSuccess={onSuccessEdit}
        key={uuid.v1()}
        id={val.id}
      />,
    );
    setModalState(true);
  };

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
      <ModalHeader title={pageTitle} icon={<MdDescription />} />
      <CustomContent >
      <Ant.Modal
        open={modalState}
        {...defaultValues.MODAL_LARGE}
        {...modalSize}
        handleCancel={() => setModalState(false)}
        onCancel={() => {
          setModalState(false);
        }}
        footer={null}
        centered
      >
        {modalContent}
      </Ant.Modal>
      <FilterDrawer
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          onRemoveFilter={onRemoveFilter}
        >
          <FilterPanel filterObject={filterObject} onSubmit={onFilterChanged} />
        </FilterDrawer>
      <FilterBedge filterCount={filterCount}>
        <Ant.Table
          columns={columns(onDelete, onEdit, onProductView, onBatchNumberView)}
          dataSource={dataSource}
          pagination={pagination}
          {...defaultValues.TABLE_PROPS}
          title={title}
          onChange={handleTableChange}
          loading={listLoading}
        />
      </FilterBedge>
      </CustomContent>
    </>
  );
};

export default PriceCircularDetailList;

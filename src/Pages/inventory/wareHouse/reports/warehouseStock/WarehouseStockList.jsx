import React from "react";
import { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import qs from "qs";
import * as styles from "@/styles";
import columns from "./columns";
import * as defaultValues from "@/defaultValues";
import FilterPanel from "./FilterPanel";
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterBedge from "@/components/common/FilterBedge";
import ButtonList from "@/components/common/ButtonList";
import useRequestManager from "@/hooks/useRequestManager";
import BatchNumberDescription from "@/Pages/inventory/batchNumber/description/BatchNumberDescription";
import DetailProductListDescription from "../../../../inventory/product/description/DetailProductListDescription";
import DetailWareHouse from "../../../../inventory/wareHouse/description/DetailWareHouse";
import { useFetchWithHandler } from "@/api";

//====================================================================
//                        Declaration
//====================================================================
const WarehouseStockList = (props) => {
  const [listData, loading, error, ApiCall] = useFetchWithHandler();
  const [dataSource, setDataSource] = useState(null);
  const [modalContent, setModalContent] = useState();
  const [modalState, setModalState] = useState(false);
  const [filterObject, setFilterObject] = useState();
  const [filterCount, setFilterCount] = useState(0);
  const [openFilter, setOpenFilter] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  useRequestManager({ error: error });

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
      getAllWarehouseStock(newFilterObject);
    }
  }, [filterObject]);

  useEffect(() => {
    setDataSource((listData?.isSuccess && listData?.data) || null);
  }, [listData]);

  //====================================================================
  //                        Functions
  //====================================================================

  const getAllWarehouseStock = async () => {
    const newFilterObject = { ...filterObject };
    delete newFilterObject.Product;
    delete newFilterObject.productAndBatchNumber;
    delete newFilterObject.BrandId;

    const queryString = {
      ...newFilterObject,
    };
    const hasValidFilters = Object.values(queryString).some((value) => value);
    if (!hasValidFilters) {
      return;
    }

    await ApiCall(`${url.WAREHOUSE_STOCK_GET}?${qs.stringify(queryString)}`);
  };

  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject);

    setOpenFilter(false);
  };

  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };

  const onTableChange = (pagination, filter, sorter) => {
    setPagination(pagination);
  };

  //====================================================================
  //                        Events
  //====================================================================
  const onBatchNumberView = (batchNumberId) => {
    setModalContent(<BatchNumberDescription id={batchNumberId} />);
    setModalState(true);
  };
  const onWarehouseView = (warehouseId) => {
    setModalContent(<DetailWareHouse id={warehouseId} />);
    setModalState(true);
  };
  const onProductView = (productId) => {
    setModalContent(<DetailProductListDescription id={productId} />);
    setModalState(true);
  };
  const onProductKardexView = (val) => {
    // setModalContent(<DetailWareHouse id={val?.id} />);

    setModalState(true);
  };

  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <ButtonList
        filterCount={filterCount}
        // onRefresh={() => {
        //   getAllWarehouseStock();
        // }}
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
        {...defaultValues.MODAL_LARGE}
        {...defaultValues.MODAL_PROPS}
        footer={null}
        centered
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
        title={"موجودی انبار"}
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
            title={title}
            columns={columns(
              onProductKardexView,
              onBatchNumberView,
              onWarehouseView,
              onProductView,
            )}
            dataSource={dataSource}
            pagination={pagination}
            onChange={onTableChange}
            loading={loading}
          />
        </FilterBedge>
      </Ant.Card>
    </>
  );
};
export default WarehouseStockList;
// ProductKardexList.propTypes = {
//   productId: PropTypes.any,
//   BatchNumberId: PropTypes.any,
// };

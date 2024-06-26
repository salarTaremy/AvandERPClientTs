import React from "react";
import { useEffect, useState } from "react";
import * as Ant from "antd";
import CardContent from "@/components/common/CardContent";
import ModalHeader from "@/components/common/ModalHeader";
import * as defaultValues from "@/defaultValues";
import ButtonList from "@/components/common/ButtonList";
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterBedge from "@/components/common/FilterBedge";
import FilterPanel from "./FilterPanel";
import * as url from "@/api/url";
import useRequestManager from "@/hooks/useRequestManager";
import PropTypes from "prop-types";
import { useFetchWithHandler, usePostWithHandler } from "@/api";
import qs from "qs";
const ProductConnection = (props) => {
  const { onSuccess, id } = props;
  const [listData, loading, error, ApiCall] = useFetchWithHandler();
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
  const [filterCount, setFilterCount] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterObject, setFilterObject] = useState();
  const [dataSource, setDataSource] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  useRequestManager({ error: error });
  useRequestManager({ error: addError, loading: addLoading , data: addData,});

  //====================================================================
  //                        useEffects
  //====================================================================
  // useEffect(() => {
  //   getAllProductWarehouse();
  // }, []);



  useEffect(() => {

    setDataSource((listData?.isSuccess && listData?.data) || null);
  }, [listData]);

  useEffect(() => {
    filterObject &&
      setFilterCount(
        Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
      );
    !filterObject && setFilterCount(0);
    getAllProductWarehouse();
  }, [filterObject]);

  //====================================================================
  //                        Functions
  //===================================================================
  const getAllProductWarehouse = async () => {
    const req = {
      ...filterObject,
      WarehouseId: id,
    };
    const queryString = qs.stringify(req);
    await ApiCall(`${url.LINK_PRODUCT_WARE_HOUSE}?${queryString}`);
  };

  const submit = async () => {
    const data = {
      warehouseId: id,
      productIdList: selectedRowKeys,
    };
    await addApiCall(url.LINK_PRODUCT_WARE_HOUSE_ADD_LIST, data);
  };

  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject);
    setOpenFilter(false);
  };
  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const cl = [
    {
      title: "نام محصول",
      dataIndex: "productName",
      key: "productName",
      width: 150,
      className: "text-xs sm:text-sm",
    },
    {
      title: "نام دوم محصول",
      dataIndex: "productSecondName",
      key: "productSecondName",
      width: 150,
      className: "text-xs sm:text-sm",
    },
  ];
  //====================================================================
  //====================================================================

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
  const Grid = () => {
    return (
      <>
        <Ant.Skeleton loading={loading}>
          <Ant.Table
            rowSelection={{ ...rowSelection }}
            {...defaultValues.TABLE_PROPS}
            title={title}
            pagination={true}
            columns={cl}
            rowKey="productId"
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
      <ModalHeader title={"تخصیص کالا به انبار"} />
      <CardContent >
        <FilterDrawer
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          onRemoveFilter={onRemoveFilter}
        >
          <FilterPanel filterObject={filterObject} onSubmit={onFilterChanged} />
        </FilterDrawer>
        <FilterBedge filterCount={filterCount}>
          <Grid />
          <Ant.Form.Item >
            <Ant.Button className="mt-6" type="primary" onClick={submit}>
              {"تایید"}
            </Ant.Button>
          </Ant.Form.Item>
        </FilterBedge>
      </CardContent>
    </>
  );
};

export default ProductConnection;
ProductConnection.propTypes = {
  id: PropTypes.number,
  onSuccess: PropTypes.func,
};

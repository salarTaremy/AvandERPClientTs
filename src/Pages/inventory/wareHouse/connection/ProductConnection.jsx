import React from "react";
import { useEffect, useState } from "react";
import * as Ant from "antd";
import CoustomContent from "@/components/common/CoustomContent";
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
import { FaWarehouse } from "react-icons/fa6";
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
  const [pagination, setPagination] = useState({});
  useRequestManager({ error: error });
  useRequestManager({ error: addError, loading: addLoading, data: addData });

  //====================================================================
  //                        useEffects
  //====================================================================
  // useEffect(() => {
  //   getAllProductWarehouse();
  // }, []);

  useEffect(() => {
    filterObject &&
      setFilterCount(
        Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
      );
    !filterObject && setFilterCount(0);
    getAllProductWarehouse();
  }, [filterObject]);

  useEffect(() => {
    const TmpSelected = [];
    if (listData?.isSuccess && listData?.data) {
      listData?.data.map((item) => {
        if (item.isInWarehouse) {
          TmpSelected.push(item.productId);
        }
      });
    }
    setSelectedRowKeys([...TmpSelected]);
    // onSuccessBrand([...TmpSelected])
    // oldBrandId([...TmpSelected])

    setDataSource((listData?.isSuccess && listData?.data) || null);
  }, [listData]);

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
    onSuccess();
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
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };
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

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"تخصیص کالا به انبار"} icon={<FaWarehouse />} />
      <CoustomContent>
        <FilterDrawer
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          onRemoveFilter={onRemoveFilter}
        >
          <FilterPanel
            filterObject={filterObject}
            onSubmit={onFilterChanged}
          />
        </FilterDrawer>
        <FilterBedge filterCount={filterCount}>
          <Ant.Table
            rowSelection={{ ...rowSelection }}
            {...defaultValues.TABLE_PROPS}
            onChange={handleTableChange}
            title={title}
            pagination={pagination}
            columns={cl}
            rowKey="productId"
            dataSource={dataSource}
            loading={loading}
          />
          <Ant.Form.Item className="text-end">
            <Ant.Button
              disabled={addLoading}
              loading={addLoading}
              className="mt-6"
              type="primary"
              onClick={submit}
            >
              {"تایید"}
            </Ant.Button>
          </Ant.Form.Item>
        </FilterBedge>
      </CoustomContent >
    </>
  );
};

export default ProductConnection;
ProductConnection.propTypes = {
  id: PropTypes.number,
  onSuccess: PropTypes.func,
};

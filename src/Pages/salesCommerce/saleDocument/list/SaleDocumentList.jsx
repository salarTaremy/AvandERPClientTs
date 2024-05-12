import React, { useState, useEffect } from "react";
import qs from "qs";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as styles from "@/styles"
import * as api from "@/api";
import * as defaultValues from "@/defaultValues";
import { columns } from "./columns";
import ButtonList from "@/components/common/ButtonList";
import FilterPanel from "./FilterPanel";
import FilterBedge from "@/components/common/FilterBedge";
import FilterDrawer from "@/components/common/FilterDrawer";

//====================================================================
//                        Declaration
//====================================================================
const SaleDocumentList = () => {
    const pageTitle = "مدیریت صورتحساب ها";
    const [listData, listLoading, listError, listApiCall] = api.useFetchWithHandler();
    const [dataSource, setDataSource] = useState(null);
    const [openFilter, setOpenFilter] = useState(false);
    const [filterCount, setFilterCount] = useState(0);
    const [filterObject, setFilterObject] = useState();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        fillGrid();
    }, [pagination.current, pagination.pageSize]);

    useEffect(() => {
        setDataSource(listData?.data);
        setPagination({
            ...pagination,
            total: listData?.data[0]?.totalCount,
        });
    }, [listData]);
    
    useEffect(() => {
        setPagination({...pagination, current: 1});
        filterObject && 
        setFilterCount(
            Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
        );
        !filterObject && setFilterCount(0);
        fillGrid();
    }, [filterObject]);
    //====================================================================
    //                        Functions
    //====================================================================
    const fillGrid = async () => {
        let customerFilter = {};
        if (filterObject && filterObject.customerId && filterObject.customerId.length > 0){
            customerFilter.customerId = filterObject.customerId[0].value;
        }
        else {
            customerFilter.customerId = undefined;
        }
        const queryString = qs.stringify({
            ...filterObject,
            ...customerFilter,
            pageNumber: pagination.current,
            pageSize: pagination.pageSize
        });
        await listApiCall(`${url.SALE_DOCUMENT_HEADER}?${queryString}`);
    };
    
    const onFilterChanged = async(filterObject) => {
        setFilterObject(filterObject);
        setOpenFilter(false);
    }

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
    };

    const onRemoveFilter = () => {
        setFilterObject(null);
        setOpenFilter(false);
    };

    const onDelete = async (id) => {
        //TODO: not implemented
        console.log("onDelete - " + id);
    };

    const onEdit = async (id) => {
        //TODO: not implemented
        console.log("onEdit - " + id);
    };

    const onView = async (id) => {
        //TODO: not implemented
        console.log("onView - " + id);
    };

    //====================================================================
    //                        Child Components
    //====================================================================
    const title = () => {
        return (
            <>
                <ButtonList
                    filterCount={filterCount}
                    onAdd={() => console.log("grid-onAdd")}
                    onRefresh={() => fillGrid()}
                    onFilter={() => setOpenFilter(true)}
                />
            </>
        );
    };
    //====================================================================
    const Grid = () => {
        return (
            <>
                <Ant.Skeleton loading={listLoading}>
                    <Ant.Table
                        columns={columns(onDelete, onEdit, onView)}
                        dataSource={dataSource}
                        pagination={pagination}
                        onChange={handleTableChange}
                        {...defaultValues.TABLE_PROPS}
                        title={title}
                    />
                </Ant.Skeleton>
            </>
        )
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Card style={{...styles.CARD_DEFAULT_STYLES}} loading={""} title={pageTitle} type="inner">
                <FilterDrawer
                    open={openFilter}
                    onClose={() => setOpenFilter(false)}
                    onRemoveFilter={onRemoveFilter}
                >
                    <FilterPanel filterObject={filterObject} onSubmit={onFilterChanged} />
                </FilterDrawer>
                <FilterBedge filterCount={filterCount}>
                    <Grid/>
                </FilterBedge>
            </Ant.Card>
        </>
    )
}

export default SaleDocumentList;
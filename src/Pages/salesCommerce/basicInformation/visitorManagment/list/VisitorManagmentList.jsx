import React from 'react'
import * as Ant from "antd";
import { useEffect, useState } from "react";
import columns from "./columns"
import * as defaultValues from "@/defaultValues";
import * as styles from "@/styles";
import * as url from "@/api/url";
import ButtonList from "@/components/common/ButtonList";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import * as uuid from "uuid";
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterBedge from "@/components/common/FilterBedge";
import FilterPanel from './FilterPanel';
import qs from "qs";
import FormEditVisitor from '../edit/FormEditVisitor';
import FormAddVisitor from '../add/FormAddVisitor';


const VisitorManagmentList = () => {
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
    const [dataSource, setDataSource] = useState(null);
    useRequestManager({ error: error });
    useRequestManager({ error: delError, loading: delLoading, data: delSaving });
    const [modalState, setModalState] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [filterObject, setFilterObject] = useState();
    const [openFilter, setOpenFilter] = useState(false);
    const [filterCount, setFilterCount] = useState(0);
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
        getAllVisitor();
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

    //====================================================================
    //                        Functions
    //====================================================================
    const getAllVisitor = async () => {
        const queryString = qs.stringify({
            ...filterObject,
            CounterpartyId: filterObject?.counterpartyId?.value
        })
        await ApiCall(`${url.VISITOR}?${queryString}`);
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

    const onDelete = async (id) => {
        await delApiCall(`${url.VISITOR}/${id}`);
    };

    const onSuccessEdit = () => {
        setModalState(false);
        getAllVisitor();
    };

    const onAdd = () => {
        setModalContent(
            <FormAddVisitor key={uuid.v1()} onSuccess={onSuccessAdd} />
        );
        setModalState(true);
    };

    const onSuccessAdd = () => {
        setModalState(false);
        getAllVisitor();
    };

    //====================================================================
    //                        Events
    //====================================================================
    const onEdit = (val) => {
        setModalContent(
            <FormEditVisitor
                onSuccess={onSuccessEdit}
                key={uuid.v1()}
                id={val.id}
            />
        );
        setModalState(true);
    };
    //====================================================================
    //                        Child Components
    //====================================================================
    const title = () => {
        return (
            <ButtonList
                onAdd={() => {
                    onAdd();
                }}
                onFilter={() => {
                    setOpenFilter(true);
                }}
                onRefresh={() => {
                    getAllVisitor();
                }}
            />
        );
    };

    const Grid = () => {
        return (
            <>
                <Ant.Skeleton loading={loading}>
                    <Ant.Table
                        size="small"
                        {...defaultValues.TABLE_PROPS}
                        pagination={pagination}
                        title={title}
                        columns={columns(onDelete, onEdit)}
                        onChange={handleTableChange}
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
                handleCancel={() => setModalState(false)}
                onCancel={() => {
                    setModalState(false);
                }}
                footer={null}
                centered
            >
                {modalContent}
            </Ant.Modal>
            <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} title={"مدیریت ویزیتورها"} type="inner" loading={loading}>
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
}

export default VisitorManagmentList



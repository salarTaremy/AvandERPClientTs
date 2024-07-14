import React from 'react'
import * as Ant from "antd";
import { useEffect, useState } from "react";
import columns from "./columns";
import * as defaultValues from "@/defaultValues";
import * as styles from "@/styles";
import * as url from "@/api/url";
import qs from "qs";
import ButtonList from "@/components/common/ButtonList";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import * as uuid from "uuid";
import FormAddOtherSetting from '../add/FormAddOtherSetting';
import FormEditOtherSetting from '../edit/FormEditOtherSetting';
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterPanel from './FilterPanel';
import FilterBedge from "@/components/common/FilterBedge";


const OtherSettingList = () => {
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
    const [dataSource, setDataSource] = useState(null);
    useRequestManager({ error: error });
    useRequestManager({ error: delError, loading: delLoading, data: delSaving });
    const [modalState, setModalState] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [pagination, setPagination] = useState({});
    const [openFilter, setOpenFilter] = useState(false);
    const [filterCount, setFilterCount] = useState(0);
    const [filterObject, setFilterObject] = useState();

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        filterObject &&
            setFilterCount(
                Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
            );
        !filterObject && setFilterCount(0);
        getAllOtherSetting();
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
    const getAllOtherSetting = async () => {
        const queryString = qs.stringify(filterObject);
        await ApiCall(`${url.TPS_CONFIG}?${queryString}`);
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
        await delApiCall(`${url.TPS_CONFIG}/${id}`);
    };

    const onSuccessEdit = () => {
        setModalState(false);
        getAllOtherSetting();
    };

    const onAdd = () => {
        setModalContent(
            <FormAddOtherSetting key={uuid.v1()} onSuccess={onSuccessAdd} />
        );
        setModalState(true);
    };

    const onSuccessAdd = () => {
        setModalState(false);
        getAllOtherSetting();
    };

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    //====================================================================
    //                        Events
    //====================================================================
    const onEdit = (val) => {
        setModalContent(
            <FormEditOtherSetting
                onSuccess={onSuccessEdit}
                key={val.id}
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
                filterCount={filterCount}
                onAdd={() => {
                    onAdd();
                }}
                onFilter={() => {
                    setOpenFilter(true);
                }}
                onRefresh={() => {
                    getAllOtherSetting();
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
            <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} title={"سایر تنظیمات"} type="inner" loading={loading}>
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

export default OtherSettingList

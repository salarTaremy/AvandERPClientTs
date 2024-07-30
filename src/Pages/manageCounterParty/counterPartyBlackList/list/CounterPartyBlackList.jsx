import React from "react";
import * as Ant from "antd";
import { useEffect, useState } from "react";
import columns from "../list/columns";
import * as defaultValues from "@/defaultValues";
import * as styles from "@/styles";
import * as url from "@/api/url";
import qs from "qs";
import ButtonList from "@/components/common/ButtonList";
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterBedge from "@/components/common/FilterBedge";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetchWithHandler } from "@/api";
import FormAddNewCounterPartyBlackList from "../add/FormAddNewCounterPartyBlackList";
import * as uuid from "uuid";
import FilterPanel from "./FilterPanel"

const CounterPartyBlackList = () => {
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    const [dataSource, setDataSource] = useState(null);
    useRequestManager({ error: error });
    const [modalState, setModalState] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [filterObject, setFilterObject] = useState();
    const [filterCount, setFilterCount] = useState(0);
    const [openFilter, setOpenFilter] = useState(false);

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        filterObject &&
            setFilterCount(
                Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
            );
        !filterObject && setFilterCount(0);
        getAllCounterPartyBlackList();
    }, [filterObject]);

    useEffect(() => {
        setDataSource((listData?.isSuccess && listData?.data) || null);
    }, [listData]);

    //====================================================================
    //                        Functions
    //====================================================================
    const getAllCounterPartyBlackList = async () => {
        const queryString = qs.stringify(filterObject);
        console.log("filterObject", filterObject);
        await ApiCall(`${url.COUNTER_PARTY_BLACK_LIST}?${queryString}`);
    };

    const onFilterChanged = async (filterObject) => {
        setFilterObject(filterObject);
        setOpenFilter(false);
    };

    const onRemoveFilter = () => {
        setFilterObject(null);
        setOpenFilter(false);
    };

    const onAdd = () => {
        setModalContent(
            <FormAddNewCounterPartyBlackList key={uuid.v1()} onSuccess={onSuccessAdd} />,
        );
        setModalState(true);
    };
    const onSuccessAdd = () => {
        setModalState(false);
        getAllCounterPartyBlackList();
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
                onRefresh={() => {
                    getAllCounterPartyBlackList();
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
            <Ant.Card
                style={{ ...styles.CARD_DEFAULT_STYLES }}
                className="w-full"
                title={"مدیریت طرف حساب های بلوکه"}
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
                        columns={columns}
                        dataSource={dataSource}
                        loading={loading}
                    />
                </FilterBedge>
            </Ant.Card>
        </>
    );
}

export default CounterPartyBlackList


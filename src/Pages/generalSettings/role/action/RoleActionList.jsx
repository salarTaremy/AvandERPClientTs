import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ButtonList from "@/components/common/ButtonList";
import * as styles from "@/styles";
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterBedge from "@/components/common/FilterBedge";
import FilterPanel from "../action/FilterPanel";
import qs from "qs";

const RoleActionList = ({ id }) => {
    const [data, loading, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: error });
    const [dataSource, setDataSource] = useState(null);
    const [filterObject, setFilterObject] = useState();
    const [filterCount, setFilterCount] = useState(0);
    const [openFilter, setOpenFilter] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [modalContent, setModalContent] = useState();

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        filterObject &&
            setFilterCount(
                Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
            );
        !filterObject && setFilterCount(0);
        getAllActions();
    }, [filterObject]);

    useEffect(() => {
        setDataSource((data?.isSuccess && data?.data.roleActionList) || null);
    }, [data]);

    //====================================================================
    //                        Functions
    //====================================================================
    const getAllActions = async () => {
        const req = {
            roleId: id,
            controllerName: filterObject?.controllerPersianTitle
        }
        const queryString = qs.stringify(req);
        await ApiCall(`${url.ROLE_GET_ACTIONS_RELATED_TO_ROLE}?${queryString}`);
    };

    const onFilterChanged = async (filterObject) => {
        setFilterObject(filterObject);
        setOpenFilter(false);
    };
    const onRemoveFilter = () => {
        setFilterObject(null);
        setOpenFilter(false);
    };

    const cl = [
        {
            title: "نام بخش (controller) ",
            dataIndex: "controllerPersianTitle",
            key: "controllerPersianTitle",
            width: 100,
        },
        {
            title: "نام عملیات (action) ",
            dataIndex: "actionPersianTitle",
            key: "actionPersianTitle",
            width: 100,
        }
    ]

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
                        {...defaultValues.TABLE_PROPS}
                        title={title}
                        className="mt-5"
                        columns={cl}
                        dataSource={dataSource || null}
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
                handleCancel={() => {
                    setModalState(false)
                }}
                onCancel={() => {
                    setModalState(false);
                }}
                onFinish={() => {
                    setModalState(false);
                }}
                footer={null}
                centered
                {...defaultValues.MODAL_PROPS}
            >
                {modalContent}
            </Ant.Modal>
            <br></br>
            <Ant.Card
                loading={loading}
                style={{ ...styles.CARD_DEFAULT_STYLES }}
                className="w-full"
                title={"عملیات"}
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
                    <Grid />
                </FilterBedge>
            </Ant.Card>
        </>
    );
}

export default RoleActionList

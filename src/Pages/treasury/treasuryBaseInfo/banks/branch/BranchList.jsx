import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ButtonList from "@/components/common/ButtonList";
import FormAddNewBranch from "./add/FormAddNewBranch";
import * as styles from "@/styles";
import * as uuid from "uuid";
import qs from "qs";
import FilterPanel from "./FilterPanel";
import FilterDrawer from '@/components/common/FilterDrawer'
import FilterBedge from '@/components/common/FilterBedge'


const BranchList = (props) => {
    const { bankId, bankTitle, onSuccess } = props
    const [data, loading, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: error });
    const [dataSource, setDataSource] = useState(null);
    const [modalState, setModalState] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [filterObject, setFilterObject] = useState()
    const [filterCount, setFilterCount] = useState(0)
    const [openFilter, setOpenFilter] = useState(false)

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        filterObject &&
            setFilterCount(Object.keys(filterObject)?.filter((key) => filterObject[key])?.length)
        !filterObject && setFilterCount(0)
        getBranch()
    }, [filterObject])

    useEffect(() => {
        setDataSource((data?.isSuccess && data?.data) || null)
    }, [data]);

    //====================================================================
    //                        Functions
    //====================================================================
    const getBranch = async () => {
        const queryString = qs.stringify({
            bankId: bankId,
            code: filterObject?.code,
            name: filterObject?.name,
            provinceId: filterObject?.provinceId,
            cityId: filterObject?.cityId,
        });
        await ApiCall(`${url.BANKBRANCH}?${queryString}`);
    };

    const onFilterChanged = async (filterObject) => {
        setFilterObject(filterObject)
        setOpenFilter(false)
    }
    const onRemoveFilter = () => {
        setFilterObject(null)
        setOpenFilter(false)
    }

    const cl = () => {
        return [
            {
                title: "کد شعبه",
                dataIndex: "code",
                key: "code",
                width: 100,
                align: 'center',
                className: "text-xs sm:text-sm",
            },
            {
                title: "نام شعبه",
                dataIndex: "name",
                key: "name",
                width: 100,
                align: 'center',
                className: "text-xs sm:text-sm",
            },
            {
                title: "نام استان",
                dataIndex: "provinceTitle",
                key: "provinceTitle",
                width: 100,
                className: "text-xs sm:text-sm",
            },
            {
                title: "نام شهر",
                dataIndex: "cityTitle",
                key: "cityTitle",
                width: 200,
                className: "text-xs sm:text-sm",
            },
        ]
    }

    const onAdd = () => {
        setModalContent(
            <FormAddNewBranch bankId={bankId} key={uuid.v1()} onSuccess={onSuccessAdd} />
        );
        setModalState(true)
    }

    const onSuccessAdd = () => {
        setModalState(false);
        getBranch();
        onSuccess()
    };

    //====================================================================
    //                        Child Components
    //====================================================================
    const title = () => {
        return (
            <ButtonList
                filterCount={filterCount}
                onAdd={onAdd}
                onFilter={() => {
                    setOpenFilter(true)
                }}
            />
        )
    }

    const Grid = () => {
        return (
            <>
                <Ant.Skeleton loading={loading}>
                    <Ant.Table
                        {...defaultValues.TABLE_PROPS}
                        title={title}
                        className="mt-5"
                        pagination={false}
                        columns={cl()}
                        dataSource={dataSource || null}
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
            <br></br>
            <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} title={` بانک "${bankTitle}"`} type="inner" loading={loading}>
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

export default BranchList

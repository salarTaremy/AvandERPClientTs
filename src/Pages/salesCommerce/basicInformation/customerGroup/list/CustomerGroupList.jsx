import React from "react";
import * as Ant from "antd";
import { useEffect, useState } from "react";
import columns from "./columns";
import * as defaultValues from "@/defaultValues";
import * as styles from "@/styles";
import * as url from "@/api/url";
import ButtonList from "@/components/common/ButtonList";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import FormEditCustomerGroup from "../edit/FormEditCustomerGroup";
import * as uuid from "uuid";
import FormAddNewCustomerGrup from "../add/FormaddNewCustomerGrup";

const CustomerGroupList = () => {
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
    const [dataSource, setDataSource] = useState(null);
    useRequestManager({ error: error });
    useRequestManager({ error: delError, loading: delLoading, data: delSaving });
    const [modalState, setModalState] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [pagination, setPagination] = useState({});

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAllCustomerGroup();
    }, []);

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
    const getAllCustomerGroup = async () => {
        await ApiCall(url.CUSTOMER_GROUP);
    };

    const onDelete = async (id) => {
        await delApiCall(`${url.CUSTOMER_GROUP}/${id}`);
    };

    const onSuccessEdit = () => {
        setModalState(false);
        getAllCustomerGroup();
    };

    const onAdd = () => {
        setModalContent(
            <FormAddNewCustomerGrup key={uuid.v1()} onSuccess={onSuccessAdd} />
        );
        setModalState(true);
    };

    const onSuccessAdd = () => {
        setModalState(false);
        getAllCustomerGroup();
    };

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    //====================================================================
    //                        Events
    //====================================================================
    const onEdit = (val) => {
        setModalContent(
            <FormEditCustomerGroup
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
                onAdd={() => {
                    onAdd();
                }}
                onRefresh={() => {
                    getAllCustomerGroup();
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
            <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} title={"گروه مشتری"} type="inner" loading={loading}>
                <Grid />
            </Ant.Card>
        </>
    );
}

export default CustomerGroupList;

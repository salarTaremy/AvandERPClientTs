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
import FormEditCustomerType from "../edit/FormEditCustomerType";
import * as uuid from "uuid";
import FormAddNewCustomerType from "../add/FormAddNewCustometType";

const CustomerTypeList = () => {
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
    const [dataSource, setDataSource] = useState(null);
    useRequestManager({ error: error });
    useRequestManager({ error: delError, loading: delLoading, data: delSaving });
    const [modalState, setModalState] = useState(false);
    const [modalContent, setModalContent] = useState();

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAllCustomerType();
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
    const getAllCustomerType = async () => {
        await ApiCall(url.CUSTOMER_TYPE);
    };

    const onDelete = async (id) => {
        await delApiCall(`${url.CUSTOMER_TYPE}/${id}`);
    };

    const onSuccessEdit = () => {
        setModalState(false);
        getAllCustomerType();
    };

    const onAdd = () => {
        setModalContent(
            <FormAddNewCustomerType key={uuid.v1()} onSuccess={onSuccessAdd} />
        );
        setModalState(true);
    };

    const onSuccessAdd = () => {
        setModalState(false);
        getAllCustomerType();
    };

    //====================================================================
    //                        Events
    //====================================================================
    const onEdit = (val) => {
        setModalContent(
            <FormEditCustomerType
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
                    getAllCustomerType();
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
            <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} title={"انواع مشتری"} type="inner" >
                <Ant.Table
                    size="small"
                    {...defaultValues.TABLE_PROPS}
                    title={title}
                    columns={columns(onDelete, onEdit)}
                    dataSource={dataSource}
                    loading={loading}
                />
            </Ant.Card>
        </>
    );
}

export default CustomerTypeList

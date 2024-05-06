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
import FormEditCustomerGrade from "../edit/FormEditCustomerGrade";
import * as uuid from "uuid";
import FormAddNewCustomerGrade from '../add/FormAddNewCustomerGrade'

const CustomerGradeList = () => {
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
        getAllCustomerGrade();
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
    const getAllCustomerGrade = async () => {
        await ApiCall(url.CUSTOMER_GRADE);
    };

    const onDelete = async (id) => {
        await delApiCall(`${url.CUSTOMER_GRADE}/${id}`);
    };

    const onSuccessEdit = () => {
        setModalState(false);
        getAllCustomerGrade();
    };

    const onAdd = () => {
        setModalContent(
            <FormAddNewCustomerGrade key={uuid.v1()} onSuccess={onSuccessAdd} />
        );
        setModalState(true);
    };

    const onSuccessAdd = () => {
        setModalState(false);
        getAllCustomerGrade();
    };

    //====================================================================
    //                        Events
    //====================================================================
    const onEdit = (val) => {
        setModalContent(
            <FormEditCustomerGrade
                onSuccess={onSuccessEdit}
                myKey={val.id}
                obj={val}
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
                    getAllCustomerGrade();
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
                        title={title}
                        columns={columns(onDelete, onEdit)}
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
            <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} title={"رتبه مشتری"} type="inner" loading={loading}>
                <Grid />
            </Ant.Card>
        </>
    );
}

export default CustomerGradeList;


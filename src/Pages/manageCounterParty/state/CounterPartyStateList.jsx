import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ButtonList from "@/components/common/ButtonList";
import FormAddNewState from "./add/FormAddNewState";
import * as styles from "@/styles";
import * as uuid from "uuid";


const CounterPartyStateList = (props) => {
    const { counterPartyId, counterPartyName, onSuccess } = props
    const [data, loading, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: error });
    const [dataSource, setDataSource] = useState(null);
    const [modalState, setModalState] = useState(false);
    const [modalContent, setModalContent] = useState();

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getCounterPartyState();
    }, []);

    useEffect(() => {
        setDataSource((data?.isSuccess && data?.data) || null)
    }, [data]);

    // useEffect(()=>{
    //     onSuccess()
    // },[data])

    //====================================================================
    //                        Functions
    //====================================================================
    const getCounterPartyState = async () => {
        await ApiCall(`${url.COUNTER_PARTY_BLACK_LIST_STATE_GET_BY_COUNTER_PARTY_ID}/${counterPartyId}`);
    };

    const cl = () => {
        return [
            {
                title: "تاریخ",
                dataIndex: "dateString",
                key: "dateString",
                width: 100,
                align: 'center',
                className: "text-xs sm:text-sm",
            },
            {
                title: "وضعیت",
                dataIndex: "blackListStateTitle",
                key: "blackListStateTitle",
                width: 100,
                className: "text-xs sm:text-sm",
            },
            {
                title: "توضیحات",
                dataIndex: "description",
                key: "description",
                width: 200,
                className: "text-xs sm:text-sm",
            },
        ]
    }

    const onAdd = () => {
        setModalContent(
            <FormAddNewState counterPartyId={counterPartyId} key={uuid.v1()} onSuccess={onSuccessAdd} />
        );
        setModalState(true)
    }

    const onSuccessAdd = () => {
        setModalState(false);
        getCounterPartyState();
    };

    //====================================================================
    //                        Child Components
    //====================================================================
    const title = () => {
        return (
            <ButtonList
                onAdd={onAdd}
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
            <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} title={`وضعیت اعتبار "${counterPartyName}"`} type="inner" loading={loading}>
                <Grid />
            </Ant.Card>
        </>
    );
}

export default CounterPartyStateList
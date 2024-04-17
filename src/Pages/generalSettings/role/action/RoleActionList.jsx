import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";

const RoleActionList = ({ id }) => {
    const [data, loading, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: error });
    const [dataSource, setDataSource] = useState(null);

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAllActions();
    }, [id]);

    useEffect(() => {
        setDataSource((data?.isSuccess && data?.data.roleActionList) || null);
    }, [data]);

    //====================================================================
    //                        Functions
    //====================================================================
    const getAllActions = async () => {
        await ApiCall(`${url.ROLE_GET_ACTIONS_RELATED_TO_ROLE}/${id}`);
    };

    const cl = [
        {
            title: "نام بخش",
            dataIndex: "controllerPersianTitle",
            key: "controllerPersianTitle",
            width: 100,
        },
        {
            title: "نام عملیات",
            dataIndex: "actionPersianTitle",
            key: "actionPersianTitle",
            width: 100,
        }
    ]

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Skeleton loading={loading}>
                <Ant.Table
                    {...defaultValues.TABLE_PROPS}
                    className="mt-5"
                    pagination={false}
                    columns={cl}
                    dataSource={dataSource || null}
                />
            </Ant.Skeleton>
        </>
    )
}

export default RoleActionList

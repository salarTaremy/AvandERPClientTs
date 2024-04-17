import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";

const RoleInfo = ({ id }) => {
    const [data, loading, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: error });
    const [dataSource, setDataSource] = useState(null);

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAllUsers();
    }, [id]);

    useEffect(() => {
        setDataSource((data?.isSuccess && data?.data.userRoleList) || null);
    }, [data]);

    //====================================================================
    //                        Functions
    //====================================================================
    const getAllUsers = async () => {
        await ApiCall(`${url.ROLE_GET_USERS_OF_ROLE}/${id}`);
    };

    const cl = [
        {
            title: "نام کاربری",
            dataIndex: "userName",
            key: "userName",
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

export default RoleInfo

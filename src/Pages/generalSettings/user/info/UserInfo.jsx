import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import qs from "qs";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";

const UserInfo = ({userId}) => {
    const [data, loading, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: error });
    const [dataSource, setDataSource] = useState(null);

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAllRoles();
    }, []);

    useEffect(() => {
        setDataSource((data?.isSuccess && data?.data) || null);
    }, [data]);

    //====================================================================
    //                        Functions
    //====================================================================
    const getAllRoles = async () => {
        const queryString = qs.stringify({
            userId: userId
        });
        await ApiCall(`${url.ROLE}?${queryString}`);
    };

    const cl = [
        {
            title: "محدوده نقش",
            dataIndex: "roleScopePersianTitle",
            key: "roleScopePersianTitle",
            width: 100,
        },
        {
            title: "نام نقش",
            dataIndex: "persianTitle",
            key: "persianTitle",
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

export default UserInfo

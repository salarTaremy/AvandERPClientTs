import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import qs from "qs";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";

const UserInfo = ({ userId, userName }) => {
    const [data, loading, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: error });
    const [dataSource, setDataSource] = useState(null);
    const [pagination, setPagination] = useState({});


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

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
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
            <ModalHeader title={`لیست نقش های کاربر "${userName}"`} />
            <Ant.Skeleton loading={loading}>
                <Ant.Table
                    {...defaultValues.TABLE_PROPS}
                    className="mt-5"
                    pagination={pagination}
                    columns={cl}
                    onChange={handleTableChange}
                    dataSource={dataSource || null}
                />
            </Ant.Skeleton>
        </>
    )
}

export default UserInfo

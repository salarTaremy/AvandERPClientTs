import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import { RiDeleteBin6Line } from "react-icons/ri";
import qs from "qs";

const RoleInfo = ({ roleId }) => {
    const [data, loading, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: error });
    const [dataSource, setDataSource] = useState(null);
    const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
    useRequestManager({ error: delError, data: delSaving, loading: delLoading });

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAllUsers();
    }, [delSaving]);

    useEffect(() => {
        getAllUsers();
    }, [roleId]);

    useEffect(() => {
        setDataSource((data?.isSuccess && data?.data.userRoleList) || null);
    }, [data]);

    //====================================================================
    //                        Functions
    //====================================================================
    const getAllUsers = async () => {
        await ApiCall(`${url.ROLE_GET_USERS_OF_ROLE}/${roleId}`);
    };

    const onDelete = async (id) => {
        const queryString = qs.stringify({
            roleId: roleId,
            userId: id
        });
        await delApiCall(`${url.ROLE_REMOVE_ROLE_AASSIGNMENT_FROM_USER}?${queryString}`)
    };

    const cl = (onDelete) => {
        return [
            {
                title: "نام کاربری",
                dataIndex: "userName",
                key: "userName",
                width: 150,
            },
            {
                title: "عملیات",
                dataIndex: "operation",
                key: "operation",
                width: 100,
                align: "center",
                fixed: "right",
                className: "text-xs sm:text-sm",
                render: (text, val) => (
                    <>
                        <Ant.Popconfirm
                            onConfirm={() => onDelete(val.id)}
                            title={` برای حذف دسترسی کاربر  "${val.userName}" مطمئن هستید؟`}
                        >
                            <Ant.Button
                                className="text-red-600"
                                icon={<RiDeleteBin6Line />}
                                type="text"
                            />
                        </Ant.Popconfirm>
                    </>
                )
            }
        ]
    }

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
                    columns={cl(onDelete)}
                    dataSource={dataSource || null}
                />
            </Ant.Skeleton>
        </>
    )
}

export default RoleInfo

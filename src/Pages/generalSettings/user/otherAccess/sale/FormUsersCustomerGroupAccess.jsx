import React from 'react'
import * as Ant from 'antd'
import { useEffect, useState } from "react";
import * as url from '@/api/url'
import {
    useFetchWithHandler,
    usePutWithHandler,
}
    from '@/api'
import * as defaultValues from "@/defaultValues";
import useRequestManager from '@/hooks/useRequestManager'


const FormUsersCustomerGroupAccess = ({ userId, onSuccess }) => {
    const [dataSource, setDataSource] = useState(null);
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    useRequestManager({ error: editError, editLoading: editLoading, data: editData })
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAssignedCustomerGroup()
    }, []);

    useEffect(() => {
        const TmpSelected = []
        if (listData?.isSuccess && listData?.data) {
            listData?.data.map((item) => {
                if (item.userHasAccessToCustomerGroup) {
                    TmpSelected.push(item.id)
                }
            })
        }
        setSelectedRowKeys([...TmpSelected])

        setDataSource((listData?.isSuccess && listData?.data) || null);
    }, [listData]);

    useEffect(() => {
        editData?.isSuccess && onSuccess()
    }, [editData])

    //====================================================================
    //                        Functions
    //====================================================================
    const getAssignedCustomerGroup = async () => {
        await ApiCall(`${url.GET_ASSIGNED_CUSTOMER_GROUPS}/${userId}`)
    }


    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);

    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = () => {
        return [
            {
                title: " نام گروه مشتری ",
                dataIndex: "customerGroupName",
                key: "customerGroupName",
                width: 100,
                className: "text-xs sm:text-sm",
            },
        ]
    }

    //====================================================================
    //                         Component
    //====================================================================
    return (
        <>
            <Ant.Skeleton loading={loading}>
                <Ant.Table
                    rowSelection={{ ...rowSelection }}
                    {...defaultValues.TABLE_PROPS}
                    pagination={false}
                    columns={columns()}
                    dataSource={dataSource}
                />
            </Ant.Skeleton>
        </>
    )
}

export default FormUsersCustomerGroupAccess



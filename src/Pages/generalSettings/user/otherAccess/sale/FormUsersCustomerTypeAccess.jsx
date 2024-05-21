import React from 'react'
import * as Ant from 'antd'
import { useEffect, useState } from "react";
import * as url from '@/api/url'
import { useFetchWithHandler } from '@/api'
import * as defaultValues from "@/defaultValues";


const FormUsersCustomerTypeAccess = ({ userId, onSuccessCustomerTypeAccess, oldTypeId }) => {
    const [dataSource, setDataSource] = useState(null);
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAssignedCustomerType()
    }, []);

    useEffect(() => {
        const TmpSelected = []
        if (listData?.isSuccess && listData?.data) {
            listData?.data.map((item) => {
                if (item.userHasAccessToCustomerType) {
                    TmpSelected.push(item.id)
                }
            })
        }
        setSelectedRowKeys([...TmpSelected])
        onSuccessCustomerTypeAccess([...TmpSelected])
        oldTypeId([...TmpSelected])

        setDataSource((listData?.isSuccess && listData?.data) || null);
    }, [listData]);

    //====================================================================
    //                        Functions
    //====================================================================
    const getAssignedCustomerType = async () => {
        await ApiCall(`${url.GET_ASSIGNED_CUSTOMER_TYPES}/${userId}`)
    }

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
        onSuccessCustomerTypeAccess(newSelectedRowKeys)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = () => {
        return [
            {
                title: " نام نوع مشتری ",
                dataIndex: "customerTypeName",
                key: "customerTypeName",
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

export default FormUsersCustomerTypeAccess



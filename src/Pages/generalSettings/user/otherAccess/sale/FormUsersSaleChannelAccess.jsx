import React from 'react'
import * as Ant from 'antd'
import { useEffect, useState } from "react";
import * as url from '@/api/url'
import { useFetchWithHandler } from '@/api'
import * as defaultValues from "@/defaultValues";
import useRequestManager from "@/hooks/useRequestManager";

const FormUsersSaleChannelAccess = ({ userId, onSuccessSaleChannelAccess, oldChannelId }) => {
    const [dataSource, setDataSource] = useState(null);
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    useRequestManager({ error });    
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAssignedSaleChannel()
    }, []);

    useEffect(() => {
        const TmpSelected = []
        if (listData?.isSuccess && listData?.data) {
            listData?.data.map((item) => {
                if (item.userHasAccessToSaleChannel) {
                    TmpSelected.push(item.id)
                }
            })
        }
        setSelectedRowKeys([...TmpSelected])
        onSuccessSaleChannelAccess([...TmpSelected])
        oldChannelId([...TmpSelected])

        setDataSource((listData?.isSuccess && listData?.data) || null);
    }, [listData]);

    //====================================================================
    //                        Functions
    //====================================================================
    const getAssignedSaleChannel = async () => {
        await ApiCall(`${url.GET_ASSIGNED_SALE_CHANNELS}/${userId}`)
    }

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
        onSuccessSaleChannelAccess(newSelectedRowKeys)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = () => {
        return [
            {
                title: " نام کانال فروش ",
                dataIndex: "saleChannelName",
                key: "saleChannelName",
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

export default FormUsersSaleChannelAccess

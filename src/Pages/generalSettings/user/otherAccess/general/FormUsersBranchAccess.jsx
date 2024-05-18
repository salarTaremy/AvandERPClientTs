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


const FormUsersBranchAccess = ({ userId, onSuccessBranch }) => {
    const [dataSource, setDataSource] = useState(null);
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    // const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    // useRequestManager({ error: editError, editLoading: editLoading, data: editData })
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
 

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAssignedBranch()
    }, []);

    useEffect(() => {
        const TmpSelected = []
        if (listData?.isSuccess && listData?.data) {
            listData?.data.map((item) => {
                if (item.userHasAccessToBranch) {
                    TmpSelected.push(item.id)
                }
            })
        }
        setSelectedRowKeys([...TmpSelected])

        setDataSource((listData?.isSuccess && listData?.data) || null);
    }, [listData]);

    //====================================================================
    //                        Functions
    //====================================================================
    const getAssignedBranch = async () => {
        await ApiCall(`${url.GET_ASSIGNED_BRANCHES}/${userId}`)
    }

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
        onSuccessBranch(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = () => {
        return [
            {
                title: " نام شعبه ",
                dataIndex: "branchName",
                key: "branchName",
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

export default FormUsersBranchAccess


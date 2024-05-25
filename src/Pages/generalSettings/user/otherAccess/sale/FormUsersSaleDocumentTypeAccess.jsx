import React from 'react'
import * as Ant from 'antd'
import { useEffect, useState } from "react";
import * as url from '@/api/url'
import { useFetchWithHandler } from '@/api'
import * as defaultValues from "@/defaultValues";


const FormUsersSaleDocumentTypeAccess = ({ userId, onSuccessSaleDocumentTypeAccess, oldDocumentId }) => {
    const [dataSource, setDataSource] = useState(null);
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAssignedDocumentType()
    }, []);

    useEffect(() => {
        const TmpSelected = []
        if (listData?.isSuccess && listData?.data) {
            listData?.data.map((item) => {
                if (item.userHasAccessToSaleDocumentType) {
                    TmpSelected.push(item.id)
                }
            })
        }
        setSelectedRowKeys([...TmpSelected])
        onSuccessSaleDocumentTypeAccess([...TmpSelected])
        oldDocumentId([...TmpSelected])

        setDataSource((listData?.isSuccess && listData?.data) || null);
    }, [listData]);

    //====================================================================
    //                        Functions
    //====================================================================
    const getAssignedDocumentType = async () => {
        await ApiCall(`${url.GET_ASSIGNED_SALE_DOCUMENT_TYPES}/${userId}`)
    }

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
        onSuccessSaleDocumentTypeAccess(newSelectedRowKeys)
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = () => {
        return [
            {
                title: " نام نوع برگه فروش ",
                dataIndex: "saleDocumentTypeName",
                key: "saleDocumentTypeName",
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

export default FormUsersSaleDocumentTypeAccess

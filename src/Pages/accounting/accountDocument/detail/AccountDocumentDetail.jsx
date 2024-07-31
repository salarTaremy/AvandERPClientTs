import React, { useState, useEffect } from "react";
import * as Ant from "antd";
import qs from "qs";
import * as api from "@/api";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import column from "./column";
import useRequestManager from "@/hooks/useRequestManager";

//====================================================================
//                        Declaration
//====================================================================
const AccountDocumentDetail = (props) => {
    const { accountDocumentHeaderId } = props;
    const [listData, listLoading, listError, listApiCall] = api.useFetchWithHandler();
    const [dataSource, setDataSource] = useState(null);
    useRequestManager({ error: listError });
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        fillGrid();
    }, []);

    useEffect(() => {
        setDataSource(listData?.data);
    }, [listData]);
    //====================================================================
    //                        Functions
    //====================================================================
    const fillGrid = async () => {
        const queryString = qs.stringify({
            AccountingDocumentID: accountDocumentHeaderId
        });
        await listApiCall(`${url.ACCOUNT_DOCUMENT_DETAIL}?${queryString}`);
    }

    //====================================================================
    //                        Child Components
    //====================================================================

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Table
                columns={column()}
                dataSource={dataSource}
                {...defaultValues.TABLE_PROPS}
                loading={listLoading}
            />
        </>
    )
}

export default AccountDocumentDetail;
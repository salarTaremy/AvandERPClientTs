import React, { useState } from "react";
import * as api from "@/api";
import * as url from "@/api/url";
import * as Ant from "antd";
import { Typography } from "antd";
import useRequestManager from "@/hooks/useRequestManager";

//====================================================================
//                        Declaration
//====================================================================
const BatchNumberDescription = (props) => {
    const {id} = props;
    const pageTitle = "سری ساخت";
    const [batchNumberData, batchNumberLoading, batchNumberError] = api.useFetch(`${url.BATCH_NUMBER}/${id}`);
    useRequestManager({error: batchNumberError});
    
    const descriptionItems = [
        {
            key: "1",
            label: "سری ساخت",
            children: batchNumberData?.data?.batchNumber
        },
        {
            key: "2",
            label: "تاریخ تولید",
            children: batchNumberData?.data?.productionDate
        },
        {
            key: "3",
            label: "تاریخ انقضا",
            children: batchNumberData?.data?.expiryDate
        },
        {
            key: "4",
            label: "عمر مفید",
            children: `${batchNumberData?.data?.shelfLife} ماه`
        }
    ];

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
        <Ant.Skeleton active={true} loading={batchNumberLoading}>        
            <Ant.Descriptions
                column={{
                    xs: 1,
                    sm: 1,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 4
                }}
                title={pageTitle}
                bordered
                layout="vertical"
                size="medium"
                items={descriptionItems}
            />
        </Ant.Skeleton>
        </>
    )
}

export default BatchNumberDescription;
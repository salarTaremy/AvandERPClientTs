import React from "react";
import * as api from "@/api";
import * as url from "@/api/url";
import * as Ant from "antd";
import { Typography } from "antd";
import useRequestManager from "@/hooks/useRequestManager";

//====================================================================
//                        Declaration
//====================================================================
const PriceCircularHeaderDescription = (props) => {
    const {priceCircularDetailId } = props;
    const pageTitle = "بخشنامه قیمت مرتبط";
    const [priceCircularHeaderData, priceCircularHeaderLoading, priceCircularHeaderError] = 
        api.useFetch(`${url.PRICE_CIRCULAR_HEADER_GET_BY_DETAIL_ID}/${priceCircularDetailId}`);
    useRequestManager({error: priceCircularHeaderError});
    const descriptionItems = [
        {
            key: "1",
            label: "عنوان",
            children: <Typography.Link href="#">{priceCircularHeaderData?.data?.title}</Typography.Link>
        },
        {
            key: "2",
            label: "تاریخ شروع",
            children: priceCircularHeaderData?.data?.startDate
        },
        {
            key: "3",
            label: "تاریخ پایان",
            children: priceCircularHeaderData?.data?.endDate
        },
        {
            key: "4",
            label: "وضعیت",
            children: priceCircularHeaderData?.data?.isActive ? "فعال" : "غیرفعال"
        },
        {
            key: "5",
            label: "توضیحات",
            children: priceCircularHeaderData?.data?.description
        }
    ];

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
        <Ant.Skeleton active={true} loading={priceCircularHeaderLoading}>
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

export default PriceCircularHeaderDescription;
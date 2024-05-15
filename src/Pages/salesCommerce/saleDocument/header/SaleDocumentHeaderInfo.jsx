import React from "react";
import * as Ant from "antd";
import { Typography } from "antd";

//====================================================================
//                        Declaration
//====================================================================
const SaleDocumentHeaderInfo = (props) => {
    const { id, saleDocumentData, loading, className } = props;
    const title = `${saleDocumentData?.saleDocumentType} شماره ${saleDocumentData?.documentNumber}`;
    const referenceDocumentNumber =  saleDocumentData?.referenceDocumentNumber !== 0 ? <Typography.Link href="#">{`${saleDocumentData?.referenceDocumentType} شماره ${saleDocumentData?.referenceDocumentNumber}`}</Typography.Link> : '-';
    const borderedItems = [
        {
            key: "1",
            label: 'شماره سریال',
            children: saleDocumentData?.serialNumber
        },
        {
            key: "2",
            label: "برگه مرجع",
            children: referenceDocumentNumber
        },
        {
            key: "3",
            label: "کانال فروش",
            children: saleDocumentData?.saleChannel
        },
        {
            key: "4",
            label: "نام شعبه",
            children: saleDocumentData?.branchName
        },
        {
            key: "6",
            label: "مشتری",
            children: <Typography.Link href="#">{saleDocumentData?.customerName}</Typography.Link> //customerId
        },
        {
            key: "5",
            label: "زمان صدور",
            children: saleDocumentData?.issueDateTimeString
        }
    ];

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Skeleton loading={loading}>
                <Ant.Descriptions 
                    bordered={false}
                    layout="horizontal"
                    title={title}
                    size="small"
                    items={borderedItems}
                    className={className}
                />
            </Ant.Skeleton>
        </>
    )
}

export default SaleDocumentHeaderInfo;
import React, { useState } from "react";
import * as Ant from "antd";

//====================================================================
//                        Declaration
//====================================================================
const SaleDocumentFooterInfo = (props) => {
    const { id, saleDocumentData, loading, className } = props;
    const saleDocumentFooterItems = [
        {
            key: "1",
            label: "جمع کل",
            children: saleDocumentData?.subTotal.toLocaleString()
        },
        {
            key: "2",
            label: "تخفیف",
            children: saleDocumentData?.discounts.toLocaleString()
        },
        {
            key: "3",
            label: "مالیات و عوارض",
            children: saleDocumentData?.taxTotal.toLocaleString()
        },
        {
            key: "4",
            label: "مبلغ قابل پرداخت",
            children: saleDocumentData?.totalPrice.toLocaleString()
        }
    ];

    const documentDescription = [
        {
            key: "1",
            label: "شرح سند",
            children: (
                saleDocumentData?.description ? saleDocumentData?.description : "ندارد"
            )
        }
    ];
    const documentInfo = [
        {
            key: "1",
            label: "خلاصه اطلاعات صورتحساب شما تا پایان روز",
            children: ""
        },
        {
            key: "2",
            label: "فاکتور باز یا مانده بدهی",
            children: "--- ریال"
        },
        {
            key: "3",
            label: "به حروف",
            children: "----"
        }
    ];

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Skeleton loading={loading}>
                 <Ant.Row gutter={16} className={className}>
                    <Ant.Col span={24}>
                        <Ant.Descriptions 
                            column={{
                                xs: 1,
                                sm: 1,
                                md: 1,
                                lg: 1,
                                xl: 1,
                                xxl: 1
                            }}
                            bordered={false}
                            layout="horizontal"
                            size="small"
                            items={documentDescription}
                        />
                    </Ant.Col>
                 </Ant.Row>
                <Ant.Row gutter={16} className={className}>
                    <Ant.Col span={16}>
                        <Ant.Descriptions 
                            column={{
                                xs: 1,
                                sm: 1,
                                md: 1,
                                lg: 1,
                                xl: 1,
                                xxl: 1
                            }}
                            bordered={false}
                            layout="horizontal"
                            size="small"
                            items={documentInfo}
                        />
                    </Ant.Col>
                    <Ant.Col span={8}>
                        <Ant.Descriptions
                            column={{
                                xs: 1,
                                sm: 1,
                                md: 1,
                                lg: 1,
                                xl: 1,
                                xxl: 1
                            }} 
                            bordered={false}
                            layout="horizontal"
                            size="small"
                            items={saleDocumentFooterItems}
                        />
                    </Ant.Col>
                </Ant.Row>
            </Ant.Skeleton>
        </>
    )
}

export default SaleDocumentFooterInfo;
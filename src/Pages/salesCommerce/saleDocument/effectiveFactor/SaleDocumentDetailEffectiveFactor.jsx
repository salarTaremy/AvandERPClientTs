import React, { Children, useEffect, useState } from "react";
import * as Ant from "antd";
import * as api from "@/api";
import * as url from "@/api/url";
import qs from "qs";
import * as styles from "@/styles"
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

//====================================================================
//                        Declaration
//====================================================================
const SaleDocumentDetailEffectiveFactor = (props) => {
    const {saleDocumentDetailId, effectiveFactorNature} = props;
    const [listData, listLoading, listError, listApiCall] = api.useFetchWithHandler();
    const [dataSource, setDataSource] = useState([]);
    const pageTitle= `${effectiveFactorNature == 1 ? "جزییات مالیات و عوارض" : "جزییات تخفیفات"}`;

    //====================================================================
    //                        Functions
    //====================================================================
    const fillGrid = async () => {
        const queryString = qs.stringify({
            id: saleDocumentDetailId,
            effectiveFactorNature: effectiveFactorNature
        });
        await listApiCall(`${url.SALE_DOCUMENT_DETAIL_EFFECTIVE_FACTOR}?${queryString}`);
    }

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        fillGrid(); 
    }, [saleDocumentDetailId]);

    useEffect(() => {
        setDataSource(listData?.data)
    }, [listData])

    //====================================================================
    //                        Components
    //====================================================================
    return (
        <>
            <Ant.Skeleton active={true} loading={listLoading} >
                <Ant.List 
                    bordered={false}
                    itemLayout="horizontal"
                    dataSource={dataSource}
                    loading={listLoading}
                    header={<Ant.Typography.Text strong style={{ fontSize:'12pt'}}>{pageTitle}</Ant.Typography.Text>}
                    renderItem={(item) => (
                        <Ant.List.Item>
                            <Ant.List.Item.Meta
                                title={item.saleEffectiveFactorTitle}
                                description={`مقدار ${item.percentage ? item.percentage + " درصد" : item.amount + " ریال"} ${item.saleEffectiveOperativeType} برای این آیتم محاسبه شده است.`}
                            />
                            <Ant.Row gutter={[12,12]}>
                                <Ant.Col span={24}>
                                    {`مبلغ : ${item.calculatedAmount} ریال`}
                                </Ant.Col>
                                <Ant.Col span={24}>
                                    {`وضعیت: ${item.isActive ? "فعال" : "غیرفعال"}`}
                                </Ant.Col>
                            </Ant.Row>
                        </Ant.List.Item>
                    )}
                />
            </Ant.Skeleton>
        </>
    )
}

export default SaleDocumentDetailEffectiveFactor;
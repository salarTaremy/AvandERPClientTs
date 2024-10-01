import React from 'react'
import { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import { useFetchWithHandler } from "@/api";
import qs from "qs";
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";
import CustomContent from '@/components/common/CustomContent';

const ProductKardexDetailList = () => {
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    const [dataSource, setDataSource] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 30,
    });



    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAllProductKardexDetail();
    }, [pagination.current, pagination.pageSize]);

    useEffect(() => {
        setDataSource((listData?.isSuccess && listData?.data) || null);
        setPagination({
            ...pagination,
            total: listData?.data && listData?.data[0]?.totalCount,
        });
        createProductDetailItems(listData?.data)
    }, [listData]);

    //====================================================================
    //                        Functions
    //====================================================================

    const getAllProductKardexDetail = async () => {
        const queryString = qs.stringify({
            PageNumber: pagination.current,
            PageSize: pagination.pageSize,
        });
        await ApiCall(`${url.PRODUCT_KARDEX_DETAIL}?${queryString}`)
    };

    const createProductDetailItems = () => {
        let itemList = [];
        listData?.data?.map((item) => {
            itemList.push({
                key: item.id,
                dot: (item.inventoryDocumentTypeNature == 1 &&
                    <FaRegArrowAltCircleDown style={{ fontSize: '18px', color: 'green' }} />) ||
                    < FaRegArrowAltCircleUp style={{ fontSize: '18px', color: 'red' }} />,
                position: (item.inventoryDocumentTypeNature == 1 && 'right') || 'left',
                children: (
                    <>
                        <CustomContent shadow>
                            <Ant.Space direction="vertical">
                                <Ant.Typography.Text strong>
                                    {`نام انبار: ${item.warehouseName} `}
                                </Ant.Typography.Text>
                                <Ant.Typography.Text strong>
                                    {`نام محصول: ${item.productName} - کد محصول: ${item.productCode}`}
                                </Ant.Typography.Text>
                                <Ant.Typography.Text strong>
                                    {`نام دوم محصول: ${item.productSecondName} - کد دوم محصول: ${item.productSecondCode}`}
                                </Ant.Typography.Text>
                                <Ant.Typography.Text strong>
                                    {` سری ساخت: ${item.batchNumber}`}
                                </Ant.Typography.Text>
                                <Ant.Typography.Text strong>
                                    {`نام طرف حساب: ${item.counterpartyName}`}
                                </Ant.Typography.Text>
                                <Ant.Typography.Text strong>
                                    {` عمر مفید: ${item.shelfLife} ماه`}
                                </Ant.Typography.Text>
                            </Ant.Space>
                        </CustomContent>
                    </>
                ),
            });
        });

        setDataSource(itemList);
    }


    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <h3>{'کاردکس کالا با جزئیات'}</h3>
            <br></br>
            <Ant.Timeline
                mode="alternate"
                items={dataSource}
                pagination={pagination}
            >
            </Ant.Timeline>
        </>
    )
}

export default ProductKardexDetailList

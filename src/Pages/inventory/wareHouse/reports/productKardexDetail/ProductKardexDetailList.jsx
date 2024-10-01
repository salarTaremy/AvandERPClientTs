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
        // window.addEventListener('scroll', handleScroll);
        // return () => window.removeEventListener('scroll', handleScroll);
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

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight
        ) {
            getAllProductKardexDetail(pagination.current + 1);
            setPagination(pagination.current + 1);
        }
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
                label: <Ant.Typography.Text type="secondary">
                    {` ${item.issueDate} - ${item.issueTime}`}
                </Ant.Typography.Text>,
                children: (
                    <>
                        {item.isReserve == true &&
                            <Ant.Badge.Ribbon
                                text={'رزرو'}
                                color='orange'
                            >
                            </Ant.Badge.Ribbon>}
                        <CustomContent shadow="true" >

                            <Ant.Row >
                                <Ant.Col span={14}>
                                    <Ant.Typography.Text type="secondary">
                                        {`نام انبار: ${item.warehouseName}`}
                                    </Ant.Typography.Text>
                                </Ant.Col>
                                <Ant.Col span={10}>
                                    <Ant.Typography.Text type="secondary">
                                        {`نام طرف حساب: ${item.counterpartyName}`}
                                    </Ant.Typography.Text>
                                </Ant.Col>
                                <Ant.Col span={14}>
                                    <Ant.Typography.Text type="secondary">
                                        {`نام کالا: `} { }
                                    </Ant.Typography.Text>
                                    <Ant.Typography.Text strong>
                                        {`${item.productName} `}
                                    </Ant.Typography.Text>
                                </Ant.Col>
                                <Ant.Col span={10}>
                                    <Ant.Typography.Text type="secondary">
                                        {`کد کالا: `}{ }
                                    </Ant.Typography.Text>
                                    <Ant.Typography.Text strong>
                                        {`${item.productCode}`}
                                    </Ant.Typography.Text>
                                </Ant.Col>
                                <Ant.Col span={14}>
                                    <Ant.Typography.Text type="secondary">
                                        {`نام دوم کالا: ${item.productSecondName}`}
                                    </Ant.Typography.Text>
                                </Ant.Col>
                                <Ant.Col span={10}>
                                    <Ant.Typography.Text type="secondary">
                                        {`کد دوم کالا: ${item.productSecondCode}`}
                                    </Ant.Typography.Text>
                                </Ant.Col>
                                <Ant.Col span={24}>
                                    <Ant.Typography.Text type="secondary">
                                        {`نام لاتین کالا: ${item.productLatinName}`}
                                    </Ant.Typography.Text>
                                </Ant.Col>
                                <Ant.Col span={14}>
                                    <Ant.Typography.Text type="secondary">
                                        {` سری ساخت: ${item.batchNumber}`}
                                    </Ant.Typography.Text>
                                </Ant.Col>
                                <Ant.Col span={10}>
                                    <Ant.Typography.Text type="secondary">
                                        {` عمر مفید: ${item.shelfLife} ماه`}
                                    </Ant.Typography.Text>
                                </Ant.Col>
                                <Ant.Col span={14}>
                                    <Ant.Typography.Text type="secondary">
                                        {` واحد : ${item.productUnitName} `}
                                    </Ant.Typography.Text>
                                </Ant.Col>
                                <Ant.Col span={10}>
                                    <Ant.Typography.Text type="secondary">
                                        {` نوع واحد : ${item.productUnitTypeName} `}
                                    </Ant.Typography.Text>
                                </Ant.Col>
                                <Ant.Col>
                                    <Ant.Typography.Text strong>
                                        {`${item.inventoryDocumentTypeName} `}
                                    </Ant.Typography.Text>
                                </Ant.Col>
                            </Ant.Row>
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
            {listData?.data?.isReserve == true &&
                <Ant.Badge.Ribbon
                    text={'رزرو'}
                    color='orange'
                />}
            <Ant.Timeline
                mode="alternate"
                items={dataSource}
                pending="در حال بارگیری اطلاعات "
                pagination={pagination}
            />
        </>
    )
}

export default ProductKardexDetailList

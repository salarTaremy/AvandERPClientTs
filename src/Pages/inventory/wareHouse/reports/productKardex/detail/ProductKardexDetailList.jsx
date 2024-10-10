import React from 'react'
import { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import { useFetchWithHandler } from "@/api";
import qs from "qs";
import CustomContent from '@/components/common/CustomContent';
import InfiniteScroll from 'react-infinite-scroll-component';
import useRequestManager from "@/hooks/useRequestManager";
import { LoadingOutlined } from '@ant-design/icons';
import { PiArrowSquareDownDuotone, PiArrowSquareUpDuotone } from "react-icons/pi";
import ButtonList from "@/components/common/ButtonList";
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterBedge from "@/components/common/FilterBedge";
import FilterPanel from './FilterPanel';

const ProductKardexDetailList = () => {
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    const [scrollableContent, setScrollableContent] = useState([]);
    useRequestManager({ error: error });
    const [dataSource, setDataSource] = useState(null);
    const [hasMore, setHasMore] = useState(true)
    const [filterObject, setFilterObject] = useState({});
    const [filterCount, setFilterCount] = useState(0);
    const [openFilter, setOpenFilter] = useState(false);
    const [width, setWidth] = useState(window.innerWidth)
    const [isMobile, setIsMobile] = useState(false)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {

        if (width < 768) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }, [width])

    useEffect(() => {
        filterObject &&
            setFilterCount(
                Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
            );
        !filterObject && setFilterCount(0);
        getAllProductKardexDetail();
    }, [pagination.current, pagination.pageSize, filterObject]);

    useEffect(() => {
        if (listData?.isSuccess) {
            if (filterCount > 0) { setScrollableContent((listData?.data)) }
            else
                setScrollableContent((scrollableContent) => (scrollableContent.concat(listData?.data)));
        }
    }, [listData]);

    useEffect(() => {
        createProductDetailItems();
    }, [scrollableContent])

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange)
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange)
        }
    }, [])
    //====================================================================
    //                        Functions
    //====================================================================

    const getAllProductKardexDetail = async () => {
        const queryString = qs.stringify({
            ...filterObject,
            pageNumber: pagination.current,
            pageSize: pagination.pageSize,
        });
        await ApiCall(`${url.PRODUCT_KARDEX_DETAIL}?${queryString}`)
    };

    const onFilterChanged = async (filterObject) => {
        setFilterObject(filterObject);
        setOpenFilter(false);
        setScrollableContent([]);
        setPagination({ ...pagination, current: 1 })
    };
    const onRemoveFilter = () => {
        setFilterObject(null);
        setOpenFilter(false);
        setScrollableContent([]);
        setPagination({ ...pagination, current: 1 })
    };

    const fetchMoreData = () => {
        if (scrollableContent?.length >= 52) { //pagination.total
            setHasMore(false);
            return;
        }
        else {
            setPagination({ ...pagination, current: pagination.current + 1 });
        }
    };

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth)
    }

    const renderTimelineItem = (item) => {
        return <CustomContent shadow="true">
            <Ant.Row>
                {isMobile && <Ant.Col lg={14} md={24} sm={24} xs={24} >
                    <Ant.Typography.Text type="secondary">
                        {`ساعت: ${item.issueTime?.substring(0, 8)} - ${item.issueDate} `}
                    </Ant.Typography.Text>
                </Ant.Col>}
                <Ant.Col lg={14} md={24} sm={24} xs={24} >
                    <Ant.Typography.Text type="secondary">
                        {`نام انبار: ${item.warehouseName}`}
                    </Ant.Typography.Text>
                </Ant.Col>
                <Ant.Col lg={10} md={24} sm={24} xs={24}>
                    <Ant.Typography.Text type="secondary">
                        {`نام طرف حساب: ${item.counterpartyName}`}
                    </Ant.Typography.Text>
                </Ant.Col>
                <Ant.Col lg={14} md={24} sm={24} xs={24}>
                    <Ant.Typography.Text type="secondary">
                        {`نام کالا: `} { }
                    </Ant.Typography.Text>
                    <Ant.Typography.Text strong>
                        {`${item.productName} `}
                    </Ant.Typography.Text>
                </Ant.Col>
                <Ant.Col lg={10} md={24} sm={24} xs={24} >
                    <Ant.Typography.Text type="secondary">
                        {`کد کالا: `}{ }
                    </Ant.Typography.Text>
                    <Ant.Typography.Text strong>
                        {`${item.productCode}`}
                    </Ant.Typography.Text>
                </Ant.Col>
                <Ant.Col lg={14} md={24} sm={24} xs={24} >
                    <Ant.Typography.Text type="secondary">
                        {`نام دوم کالا: ${item.productSecondName}`}
                    </Ant.Typography.Text>
                </Ant.Col>
                <Ant.Col lg={10} md={24} sm={24} xs={24}>
                    <Ant.Typography.Text type="secondary">
                        {`کد دوم کالا: ${item.productSecondCode}`}
                    </Ant.Typography.Text>
                </Ant.Col >
                <Ant.Col span={24}>
                    <Ant.Typography.Text type="secondary">
                        {`نام لاتین کالا: ${item.productLatinName}`}
                    </Ant.Typography.Text>
                </Ant.Col>
                <Ant.Col lg={14} md={24} sm={24} xs={24} >
                    <Ant.Typography.Text type="secondary">
                        {` سری ساخت: ${item.batchNumber}`}
                    </Ant.Typography.Text>
                </Ant.Col>
                <Ant.Col lg={10} md={24} sm={24} xs={24}>
                    <Ant.Typography.Text type="secondary">
                        {` عمر مفید: ${item.shelfLife} ماه`}
                    </Ant.Typography.Text>
                </Ant.Col>
                <Ant.Col lg={14} md={24} sm={24} xs={24}>
                    <Ant.Typography.Text type="secondary">
                        {` واحد : ${item.productUnitName} `}
                    </Ant.Typography.Text>
                </Ant.Col>
                <Ant.Col lg={10} md={24} sm={24} xs={24}>
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
    }

    const createProductDetailItems = () => {
        let itemList = [];
        scrollableContent?.map((item) => {
            let label = null
            if (!isMobile) {
                label = <Ant.Typography.Text type="secondary">
                    {` ${item.issueTime?.substring(0, 8)} - ${item.issueDate} `}
                </Ant.Typography.Text>
            }
            itemList.push({
                key: item.id,
                dot: (item.inventoryDocumentTypeNature == 1 &&
                    <PiArrowSquareDownDuotone style={{ fontSize: '30px', color: 'green' }} />) ||
                    < PiArrowSquareUpDuotone style={{ fontSize: '30px', color: 'red' }} />,
                position: (item.inventoryDocumentTypeNature == 1 && 'right') || 'left',
                label: label,
                children: (
                    <>
                        {item.isReserve && <Ant.Badge.Ribbon
                            text={item.isReserve == true && 'رزرو'}
                            color={item.isReserve == true && 'orange'}
                        >
                            {renderTimelineItem(item)}
                        </Ant.Badge.Ribbon >}
                        {!item.isReserve && renderTimelineItem(item)}
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
            <h3>کاردکس کالا با جزئیات</h3>
            <ButtonList
                filterCount={filterCount}
                onFilter={() => {
                    setOpenFilter(true);
                }}
            />
            <FilterDrawer
                open={openFilter}
                onClose={() => setOpenFilter(false)}
                onRemoveFilter={onRemoveFilter}
            >
                <FilterPanel filterObject={filterObject} onSubmit={onFilterChanged} />
            </FilterDrawer>
            <FilterBedge filterCount={filterCount}>
                <InfiniteScroll
                    dataLength={scrollableContent?.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    scrollThreshold={"0.9"}
                    loader={<LoadingOutlined />}
                    height={"80vh"}
                    endMessage={<Ant.Typography.Text >{"اطلاعات بیشتری برای نمایش وجود ندارد."}</Ant.Typography.Text>}
                    style={{ textAlign: "center" }}
                >
                    <Ant.Timeline className='m-5'
                        mode={isMobile && 'left' || 'alternate'}
                        items={dataSource}
                        loading={loading}
                    />
                </InfiniteScroll>
            </FilterBedge>
        </>
    )
}

export default ProductKardexDetailList

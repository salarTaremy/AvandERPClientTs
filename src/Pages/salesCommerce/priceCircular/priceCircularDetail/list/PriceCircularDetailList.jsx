import React, { useState, useEffect } from "react";
import * as Ant from "antd";
import qs from "qs";
import * as api from "@/api";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { columns } from "./columns";
import useRequestManager from "@/hooks/useRequestManager";
import DetailProductListDescription from "../../../../inventory/product/description/DetailProductListDescription";
import BatchNumberDescription from "../../../../inventory/batchNumber/description/BatchNumberDescription";
import ModalHeader from "@/components/common/ModalHeader";
//====================================================================
//                        Declaration
//====================================================================
const PriceCircularDetailList = (props) => {
    const { priceCircularHeaderId, priceCircularHeaderName } = props;
    const pageTitle = `جزییات بخشنامه "${priceCircularHeaderName}"`;
    const [listData, listLoading, listError, listApiCall] = api.useFetchWithHandler();
    const [dataSource, setDataSource] = useState(null);
    const [modalContent, setModalContent] = useState(null);
    const [modalOpenState, setModalOpenState] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    });
    useRequestManager({error: listError});

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getPriceCircularDetailList();
    }, [priceCircularHeaderId]);

    useEffect(() => {
        setDataSource(listData?.data);
    }, [listData]);

    //====================================================================
    //                        Functions
    //====================================================================
    const getPriceCircularDetailList = async () => {
        const queryString = qs.stringify({
            priceCircularHeaderId: props.priceCircularHeaderId
        });
        await listApiCall(`${url.PRICE_CIRCULAR_DETAIL}?${queryString}`);
    }

    const onProductView = (productId) => {
        setModalContent(<DetailProductListDescription id={productId}/>);
        setModalOpenState(true);
    }

    const onBatchNumberView = (batchNumberId) => {
        setModalContent(<BatchNumberDescription id={batchNumberId}/>);
        setModalOpenState(true);
    }

    const handleTableChange = (pagination, filter, sorter) => {
        setPagination(pagination);
    }

    //====================================================================
    //                        Child Components
    //====================================================================
    const Grid = () => {
        return (
            <>
                <ModalHeader title= {pageTitle}/>
                <Ant.Modal
                    open={modalOpenState}
                    centered
                    {...defaultValues.MODAL_PROPS}
                    {...defaultValues.MODAL_LARGE}
                    getContainer={null}
                    footer={null}
                    onCancel={() => setModalOpenState(false)}
                    onOk={() => setModalOpenState(false)}
                >
                    {modalContent}
                </Ant.Modal>
                <Ant.Skeleton loading={listLoading}>
                    <Ant.Table
                        columns={columns(onProductView, onBatchNumberView)}
                        dataSource={dataSource}
                        pagination={pagination}
                        {...defaultValues.TABLE_PROPS}
                        onChange={handleTableChange}
                    />
                </Ant.Skeleton>
            </>
        )
    }

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <Grid />
    )
}

export default PriceCircularDetailList;
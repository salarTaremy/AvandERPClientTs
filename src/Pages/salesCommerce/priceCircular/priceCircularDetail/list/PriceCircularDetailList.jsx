import React, { useState, useEffect } from "react";
import * as Ant from "antd";
import qs from "qs";
import * as api from "@/api";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { columns } from "./columns";
import * as uuid from "uuid";
import ButtonList from "@/components/common/ButtonList";
import useRequestManager from "@/hooks/useRequestManager";
import { useDelWithHandler } from "@/api";
import DetailProductListDescription from "@/Pages/inventory/product/description/DetailProductListDescription";
import BatchNumberDescription from "@/Pages/inventory/batchNumber/description/BatchNumberDescription";
import ModalHeader from "@/components/common/ModalHeader";
import { MdDescription } from "react-icons/md";
import FormEditPriceCircularDetail from "../edit/FormEditPriceCircularDetail";
import FormAddPriceCirculardetail from "../add/FormAddPriceCirculardetail";
//====================================================================
//                        Declaration
//====================================================================
const PriceCircularDetailList = (props) => {
    const { priceCircularHeaderId } = props;
    const pageTitle = `جزییات بخشنامه "${priceCircularHeaderId}"`;
    const [listData, listLoading, listError, listApiCall] = api.useFetchWithHandler();
    const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
    useRequestManager({ error: delError, loading: delLoading, data: delSaving });
    const [dataSource, setDataSource] = useState(null);
    const [modalContent, setModalContent] = useState(null);
    const [modalState, setModalState] = useState(false);
    const [modalSize, setModalSize] = useState({ ...defaultValues.MODAL_LARGE });
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    });
    useRequestManager({ error: listError });

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getPriceCircularDetailList();
    }, [priceCircularHeaderId]);

    useEffect(() => {
        setDataSource(listData?.data);
    }, [listData]);

    useEffect(() => {
        delSaving?.isSuccess &&
            setDataSource([
                ...dataSource?.filter((c) => c.id !== delSaving?.data?.id),
            ]);
    }, [delSaving]);

    //====================================================================
    //                        Functions
    //====================================================================
    const getPriceCircularDetailList = async () => {
        const queryString = qs.stringify({
            priceCircularHeaderId: priceCircularHeaderId
        });
        await listApiCall(`${url.PRICE_CIRCULAR_DETAIL}?${queryString}`);
    }

    const onDelete = async (id) => {
        const req = qs.stringify({
            id: id
        })
        await delApiCall(`${url.PRICE_CIRCULAR_DETAIL}?${req}`);
    };

    const onProductView = (productId) => {
        setModalContent(<DetailProductListDescription id={productId} />);
        setModalState(true);
    }

    const onBatchNumberView = (batchNumberId) => {
        setModalContent(<BatchNumberDescription id={batchNumberId} />);
        setModalState(true);
    }

    const handleTableChange = (pagination, filter, sorter) => {
        setPagination(pagination);
    }

    const onSuccessAdd = () => {
        setModalState(false);
        getPriceCircularDetailList();
    };

    const onAdd = () => {
        const updateList = { ...defaultValues.MODAL_LARGE, width: 520 };
        setModalSize(updateList);
        setModalContent(
            <FormAddPriceCirculardetail key={uuid.v1()} onSuccess={onSuccessAdd} iD={priceCircularHeaderId} />
        );
        setModalState(true);
    };

    const onSuccessEdit = () => {
        setModalState(false);
        getPriceCircularDetailList();
    };

    const onEdit = (val) => {
        const updateList = { ...defaultValues.MODAL_LARGE, width: 520 };
        setModalSize(updateList);
        setModalContent(
            <FormEditPriceCircularDetail
                onSuccess={onSuccessEdit}
                key={uuid.v1()}
                id={val.id}
            />
        );
        setModalState(true);
    };

    //====================================================================
    //                        Child Components
    //====================================================================
    const title = () => {
        return (
            <ButtonList
                onAdd={() => {
                    onAdd();
                }}
            />
        );
    };

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={pageTitle} icon={<MdDescription />} />
            <Ant.Modal
                open={modalState}
                {...defaultValues.MODAL_LARGE}
                {...modalSize}
                handleCancel={() => setModalState(false)}
                onCancel={() => {
                    setModalState(false);
                }}
                footer={null}
                centered
            >
                {modalContent}
            </Ant.Modal>
            <Ant.Table
                columns={columns(onDelete, onEdit, onProductView, onBatchNumberView)}
                dataSource={dataSource}
                pagination={pagination}
                {...defaultValues.TABLE_PROPS}
                title={title}
                onChange={handleTableChange}
                loading={listLoading}
            />
        </>
    )
}

export default PriceCircularDetailList;
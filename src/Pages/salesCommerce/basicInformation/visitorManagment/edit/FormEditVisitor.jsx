import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import * as styles from "@/styles";
import * as defaultValues from "@/defaultValues";
import * as uuid from "uuid";
import { usePutWithHandler, useFetchWithHandler, useFetch, Get } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import CounterpartyInformation from "@/Pages/manageCounterParty/description/CounterpartyInformation";
import { PiArrowLineDownLeftLight } from "react-icons/pi";
import FormEditCounterParty from '@/Pages/manageCounterParty/edit/FormEditCounterParty';
import { FaUserPen } from "react-icons/fa6";
import CustomContent from "@/components/common/CustomContent";

const FormEditVisitor = (props) => {
    const { onSuccess, id } = props
    const [modalState, setModalState] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
    const [counterpartyListData, counterpartyLoadingData, counterpartyError, counterpartyApiCall] = useFetchWithHandler();
    const [freeCodeData, freeCodeLoading, freeCodeError, freeCodeApiCall] = useFetchWithHandler()
    useRequestManager({ error: freeCodeError })
    useRequestManager({ error: editError, loading: editLoading, data: editData })
    useRequestManager({ error: counterpartyError, loading: counterpartyLoadingData, data: counterpartyListData })
    const [saleChannelData, saleChannelLoading, saleChannelError] = useFetch(url.SALE_CHANNEL_GET_WITH_PERMISSION);
    const [branchList, branchLoading, branchError] = useFetch(url.BRANCH_GET_WITH_PERMISSION);
    useRequestManager({ error: saleChannelError });
    useRequestManager({ error: branchError });
    useRequestManager({ error: error });
    const commonOptions = {
        showSearch: true,
        filterOption: (input, option) => option.title.indexOf(input) >= 0,
    };
    const commonOptionsBranch = {
        placeholder: "انتخاب کنید...",
        showSearch: true,
        filterOption: (input, option) => option.name.indexOf(input) >= 0,
    };
    const [form] = Ant.Form.useForm()
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getVisitorById()
    }, []);

    useEffect(() => {
        form.resetFields()
        listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) });
        listData?.data?.counterpartyId && handleCounterParty();
    }, [listData]);

    useEffect(() => {
        freeCodeData?.isSuccess &&
            freeCodeData?.data &&
            form.setFieldsValue({ code: freeCodeData.data })
    }, [freeCodeData])
    //====================================================================
    //                        Functions
    //======================================================================
    const getVisitorById = async () => {
        await ApiCall(`${url.VISITOR}/${id}`)
    }

    const handleCounterParty = async () => {
        const counterpartyId = listData?.data?.counterpartyId;
        await counterpartyApiCall(`${url.COUNTER_PARTY}/${counterpartyId}`);
    };

    const onFinish = async (values) => {
        const req = {
            ...values,
            counterpartyId: listData?.data?.counterpartyId,
            id: id,
        }
        await editApiCall(url.VISITOR, req)
        onSuccess()
    }

    const getFreeCode = async () => {
        await freeCodeApiCall(`${url.VISITOR_FREE_CODE}`)
    }

    //====================================================================
    //                        Child Components
    //====================================================================
    const AddonBefore = () => {
        return (
            <Ant.Button size="small" type="text" onClick={getFreeCode} loading={freeCodeLoading}>
                <PiArrowLineDownLeftLight />
            </Ant.Button>
        )
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={'ویرایش ویزیتور'} icon={<FaUserPen />} />
            <Ant.Modal
                {...defaultValues.MODAL_PROPS}
                {...defaultValues.MODAL_LARGE}
                open={modalState}
                centered
                getContainer={null}
                footer={null}
                onCancel={() => {
                    setModalState(false);
                }}
                onOk={() => {
                    setModalState(false);
                }}

            >
                {modalContent}
            </Ant.Modal>
            <Ant.Skeleton active loading={loadingData}>
                <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                    <Ant.Row gutter={[16, 8]}>
                        <Ant.Col span={24} sm={10}>
                            {/* <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }}> */}
                            <CustomContent bordered>
                                <Ant.Col>
                                    <Ant.Form.Item
                                        rules={[{ required: true }]}
                                        name={"code"}
                                        label="کد"
                                    >
                                        <Ant.Input
                                            allowClear
                                            showCount
                                            maxLength={10}
                                            addonBefore={<AddonBefore />}
                                            style={{ textAlign: "center" }}
                                        />
                                    </Ant.Form.Item>
                                </Ant.Col>
                                <Ant.Col>
                                    <Ant.Form.Item
                                        rules={[{ required: true }]}
                                        name={"branchId"}
                                        label="شعبه"
                                    >
                                        <Ant.Select
                                            {...commonOptionsBranch}
                                            allowClear={true}
                                            placeholder={"انتخاب کنید..."}
                                            disabled={branchLoading}
                                            loading={branchLoading}
                                            options={branchList?.data}
                                            fieldNames={{ label: "name", value: "id" }}
                                        />
                                    </Ant.Form.Item>
                                </Ant.Col>
                                <Ant.Col>
                                    <Ant.Form.Item
                                        name={"saleChannelIdList"}
                                        label="کانال فروش"
                                        rules={[{ required: true }]}
                                    >
                                        <Ant.Select
                                            {...commonOptions}
                                            allowClear={true}
                                            mode="multiple"
                                            placeholder={"انتخاب کنید..."}
                                            disabled={saleChannelLoading}
                                            loading={saleChannelLoading}
                                            options={saleChannelData?.data}
                                            fieldNames={{ label: "title", value: "id" }}
                                        />
                                    </Ant.Form.Item>
                                </Ant.Col>
                                <Ant.Form.Item>
                                    <Ant.Button
                                        type="primary"
                                        onClick={() => {
                                            form.submit()
                                        }}
                                        block
                                    >
                                        {'تایید'}
                                    </Ant.Button>
                                </Ant.Form.Item>
                            </CustomContent>
                            {/* </Ant.Card> */}
                        </Ant.Col>
                        <Ant.Col span={24} sm={14}>
                            {/* <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }}> */}
                            <CustomContent bordered>
                                <CounterpartyInformation id={listData?.data?.counterpartyId} />
                                {/* </Ant.Card> */}
                            </CustomContent>
                        </Ant.Col>
                    </Ant.Row>
                </Ant.Form>
            </Ant.Skeleton>
        </>
    )
}
export default FormEditVisitor
FormEditVisitor.propTypes = {
    onSuccess: PropTypes.func,
    obj: PropTypes.any,
    id: PropTypes.number,
    myKey: PropTypes.number,
}


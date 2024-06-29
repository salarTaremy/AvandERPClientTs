import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as styles from "@/styles";
import { useFetch, useFetchWithHandler, Get, usePostWithHandler } from "@/api";
import qs from "qs";
import * as url from "@/api/url";
import * as uuid from "uuid";
import CardContent from "@/components/common/CardContent";
import DebounceSelect from "@/components/common/DebounceSelect";
import { PiArrowLineDownLeftLight } from "react-icons/pi";
import HeaderCounterParty from "../../../../manageCounterParty/description/HeaderCounterParty";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import { MdOutlineAdd } from "react-icons/md";
import * as defaultValues from "@/defaultValues";
import { FormCounterpartyAdd } from "@/Pages/manageCounterParty/add/FormCounterpartyAdd";
import FormEditCounterParty from "@/Pages/manageCounterParty/edit/FormEditCounterParty";
import { FaUserPlus } from "react-icons/fa6";

const FormAddVisitor = ({ onSuccess }) => {
    const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
    const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
    const [modalState, setModalState] = useState(false);
    const [modalContent, setModalContent] = useState();
    const [empty, setEmpty] = useState(undefined);
    const [freeCodeData, freeCodeLoading, freeCodeError, freeCodeApiCall] =
        useFetchWithHandler();
    const [branchList, branchLoading, branchError] = useFetch(url.BRANCH);
    const [saleChannelData, saleChannelLoading, saleChannelError] = useFetch(
        url.SALE_CHANNEL,
    );
    useRequestManager({ error: addError, loading: addLoading, data: addData });
    useRequestManager({ error: freeCodeError });
    useRequestManager({ error: branchError });
    useRequestManager({ error: saleChannelError });
    const [form] = Ant.Form.useForm();

    const commonOptionsBranch = {
        placeholder: "انتخاب کنید...",
        showSearch: true,
        filterOption: (input, option) => option.name.indexOf(input) >= 0,
    };

    const commonOptionsSaleChannel = {
        showSearch: true,
        filterOption: (input, option) => option.title.indexOf(input) >= 0,
    };

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        form.resetFields();
        addData?.isSuccess && onSuccess();
    }, [addData]);

    useEffect(() => {
        freeCodeData?.isSuccess &&
            freeCodeData?.data &&
            form.setFieldsValue({ code: freeCodeData.data });
    }, [freeCodeData]);

    //==================================================================
    //                        Functions
    //==================================================================
    const getFreeCode = async () => {
        await freeCodeApiCall(`${url.VISITOR_FREE_CODE}`);
    };
    const handleCounterParty = async (val) => {
        setEmpty(val);
        await ApiCall(`${url.COUNTER_PARTY}/${val.key}`);
    };

    const getAllCounterPartyForDropDown = async (inputValue) => {
        const queryString = qs.stringify({
            counterpartyName: inputValue,
        });

        const response = await Get(
            `${url.COUNTER_PARTY_GET_FOR_DROPDOWN}?${queryString}`,
            "",
        );
        if (response?.data) {
            return response?.data.map((item) => ({
                label: `${item.counterpartyName} `,
                value: item.id,
            }));
        }
    };

    const onFinish = async (values) => {
        const req = { ...values, counterpartyId: values?.counterpartyId?.key };
        await addApiCall(url.VISITOR, req);
    };

    const onSuccessAdd = () => {
        setModalState(false);
    };

    const onAddCounterparty = () => {
        console.log('asasas')
        setModalContent(< FormCounterpartyAdd key={uuid.v1()} onSuccess={onSuccessAdd} />);
        setModalState(true);
    };

    const onSuccessEdit = () => {
        setModalState(false);
        handleCounterParty()
    };

    const onHeaderEdit = (data) => {
        setModalContent(
            <FormEditCounterParty
                onSuccess={onSuccessEdit}
                key={uuid.v1()}
                id={(data.id)}
            />
        );
        setModalState(true);
    }

    //====================================================================
    //                        Child Components
    //===================================================================

    const AddonBefore = () => {
        return (
            <Ant.Button
                size="small"
                type="text"
                onClick={getFreeCode}
                loading={freeCodeLoading}
            >
                <PiArrowLineDownLeftLight />
            </Ant.Button>
        );
    };
    //====================================================================
    //                        Component
    //====================================================================

    return (
        <>
            <ModalHeader title={'ایجاد ویزیتور'} icon={<FaUserPlus />}/>
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
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                <Ant.Row gutter={[16, 8]}>
                    <Ant.Col span={24} sm={10}>
                        {/* <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }}> */}
                        <CardContent bordered>
                            <Ant.Row gutter={[19]}>
                                <Ant.Col span={21}>
                                    <Ant.Form.Item
                                        rules={[{ required: true }]}
                                        name={"counterpartyId"}
                                        label="طرف حساب مرتبط"
                                    >
                                        <DebounceSelect
                                            onChange={handleCounterParty}
                                            maxCount={1}
                                            placeholder="بخشی از نام طرف حساب را تایپ کنید..."
                                            fetchOptions={getAllCounterPartyForDropDown}
                                        />
                                    </Ant.Form.Item>
                                </Ant.Col>
                                <Ant.Col span={3}>
                                    <Ant.Tooltip title={"افزودن"}>
                                        <Ant.Button
                                            className="mt-8"
                                            onClick={() => { onAddCounterparty() }}
                                            icon={<MdOutlineAdd />}
                                        />
                                    </Ant.Tooltip>
                                </Ant.Col>
                            </Ant.Row>
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
                                        disabled={branchLoading || false}
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
                                        {...commonOptionsSaleChannel}
                                        mode="multiple"
                                        allowClear={true}
                                        placeholder={"انتخاب کنید..."}
                                        disabled={saleChannelLoading || false}
                                        loading={saleChannelLoading}
                                        options={saleChannelData?.data}
                                        fieldNames={{ label: "title", value: "id" }}
                                    />
                                </Ant.Form.Item>
                            </Ant.Col>
                            <Ant.Col>
                                <Ant.Button
                                    block
                                    type="primary"
                                    onClick={() => {
                                        form.submit();
                                    }}
                                >
                                    {"تایید"}
                                </Ant.Button>
                            </Ant.Col>
                            </CardContent>
                        {/* </Ant.Card> */}
                    </Ant.Col>
                    <Ant.Col span={24} sm={14}>
                        <Ant.Skeleton loading={loadingData}>
                            {/* <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }}> */}
                            <CardContent bordered>
                                {empty == undefined ? (
                                    <Ant.Empty description={'طرف حساب مربوطه را انتخاب کنید'} />
                                ) : (
                                    <HeaderCounterParty data={listData} onHeaderEdit={onHeaderEdit} />
                                )}
                                </CardContent>
                            {/* </Ant.Card> */}
                        </Ant.Skeleton>
                    </Ant.Col>
                </Ant.Row>
            </Ant.Form>

        </>
    );
};

export default FormAddVisitor;

import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import * as styles from "@/styles";
import { usePutWithHandler, useFetchWithHandler, useFetch, Get } from '@/api'
import qs from "qs";
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import DebounceSelect from "@/components/common/DebounceSelect";
import HeaderCounterParty from "../../../../manageCounterParty/description/HeaderCounterParty";
import { PiArrowLineDownLeftLight } from "react-icons/pi";

const FormEditVisitor = (props) => {
    const { onSuccess, id } = props
    const [empty, setEmpty] = useState(undefined);
    const [loading, setLoading] = useState(false)
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
    const [freeCodeData, freeCodeLoading, freeCodeError, freeCodeApiCall] = useFetchWithHandler()
    useRequestManager({ error: freeCodeError })
    useRequestManager({ error: editError, loading: editLoading, data: editData })
    const [saleChannelData, saleChannelLoading, saleChannelError] = useFetch(url.SALE_CHANNEL);
    const [branchList, branchLoading, branchError] = useFetch(url.BRANCH);
    useRequestManager({ error: saleChannelError });
    useRequestManager({ error: branchError });
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
        listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
    }, [listData])

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
        setLoading(true)
        const req = {
            ...values,
            counterpartyId: values?.counterpartyId,
            id: id,
        }
        await editApiCall(url.VISITOR, req)
        setLoading(false)
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
            <ModalHeader title={'ویرایش ویزیتور'} />
            <Ant.Skeleton loading={loadingData}>
                <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                    <Ant.Row gutter={[16, 8]}>
                        <Ant.Col span={24} sm={10}>
                            <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }}>
                                <Ant.Col>
                                    <Ant.Form.Item
                                        rules={[{ required: true }]}
                                        name={"counterpartyId"}
                                        label="طرف حساب مرتبط"
                                    >
                                        <DebounceSelect
                                            onChange={handleCounterParty}
                                            freecount={1}
                                            placeholder="بخشی از نام طرف حساب را تایپ کنید..."
                                            fetchOptions={getAllCounterPartyForDropDown}
                                        />
                                    </Ant.Form.Item>
                                </Ant.Col>
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
                                            {...commonOptions}
                                            allowClear={true}
                                            mode="multiple"
                                            placeholder={"انتخاب کنید..."}
                                            disabled={saleChannelLoading || false}
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
                            </Ant.Card>
                        </Ant.Col>
                        <Ant.Col span={24} sm={14}>
                            <Ant.Skeleton loading={loadingData}>
                                <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }}>
                                    {empty == undefined ? (
                                        <Ant.Empty description={'طرف حساب مربوطه را انتخاب کنید'} />
                                    ) : (
                                        <HeaderCounterParty data={listData} />
                                    )}
                                </Ant.Card>
                            </Ant.Skeleton>
                        </Ant.Col>
                    </Ant.Row>
                </Ant.Form>
            </Ant.Skeleton >
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


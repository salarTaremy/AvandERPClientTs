import React, { useEffect } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { useFetch, Get, useFetchWithHandler } from '@/api'
import useRequestManager from "@/hooks/useRequestManager";
import qs from "qs";
import DebounceSelect from "@/components/common/DebounceSelect";

const FilterPanel = (props) => {
    const { onSubmit, filterObject } = props;
    const [form] = Ant.Form.useForm();
    const [saleChannelData, saleChannelLoading, saleChannelError] = useFetch(url.SALE_CHANNEL);
    const [branchList, branchLoading, branchError] = useFetch(url.BRANCH);
    const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
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

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        filterObject && form.setFieldsValue({ ...filterObject });
    }, []);

    //====================================================================
    //                        Functions
    //====================================================================
    const handleCounterParty = async (val) => {
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

    const onFinish = (values) => {
        onSubmit({
            ...values,
        });
    };

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                <Ant.Form.Item
                    rules={[{ required: false }]}
                    name={"counterpartyId"}
                    label="نام ویزیتور"
                >
                    <DebounceSelect
                        onChange={handleCounterParty}
                        maxCount={1}
                        placeholder="بخشی از نام ویزیتور را تایپ کنید..."
                        fetchOptions={getAllCounterPartyForDropDown}
                    />
                </Ant.Form.Item>
                <Ant.Form.Item rules={[{ max: 10 }]} name={"code"} label="کد">
                    <Ant.Input allowClear />
                </Ant.Form.Item>
                <Ant.Form.Item
                    rules={[{ required: false }]}
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
                <Ant.Form.Item
                    name={"saleChannelIdList"}
                    label="کانال فروش"
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
                <Ant.Form.Item>
                    <Ant.Button
                        type="primary"
                        onClick={() => {
                            form.submit();
                        }}
                        block
                    >
                        {"تایید"}
                    </Ant.Button>
                </Ant.Form.Item>
            </Ant.Form>
        </>
    );
}

export default FilterPanel
FilterPanel.propTypes = {
    onSubmit: PropTypes.func,
    filterObject: PropTypes.any,
};



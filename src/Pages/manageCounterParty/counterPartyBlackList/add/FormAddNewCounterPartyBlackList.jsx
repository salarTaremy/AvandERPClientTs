import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import { usePostWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import MyDatePicker from "@/components/common/MyDatePicker";
import { useFetch, useFetchWithHandler, Get } from "@/api";
import DebounceSelect from './DebounceSelect'
import qs from "qs";

const FormAddNewCounterPartyBlackList = (props) => {
    const { onSuccess } = props
    const [loading, setLoading] = useState(false)
    const [addData, addLoading, addError, addApiCall] = usePostWithHandler()
    useRequestManager({ error: addError, loading: addLoading, data: addData })
    const [form] = Ant.Form.useForm()
    const [stateData, stateLoading, stateError] = useFetch(url.COUNTER_PARTY_BLACK_LIST_STATE);
    useRequestManager({ error: stateError });
    const [value, setValue] = useState([]);
    const [listData, dataloading, error, ApiCall] = useFetchWithHandler();
    const commonOptions = {
        showSearch: true,
        filterOption: (input, option) => option.title.indexOf(input) >= 0,
    };


    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        addData?.isSuccess && onSuccess()
    }, [addData])

    //====================================================================
    //                        Functions
    //====================================================================
    const onFinish = async (values) => {
        setLoading(true)
        const req = { ...values }
        await addApiCall(url.USER, req)
        setLoading(false)
    }

    const getAllCounterPartyForDropDown = async (inputValue) => {
        const queryString = qs.stringify({
            CounterpartyName: inputValue
        })
      
        const response = await Get(`${url.COUNTER_PARTY_GET_FOR_DROPDOWN}?${queryString}`,'' );
        if (response?.data) {
          return response?.data.map((item) => ({
                label: `${item.counterpartyName} `,
                value: item.id,
            }))
        }
    }

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
        {JSON.stringify(dataloading)}
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                <Ant.Row>
                    <Ant.Col span={24}>
                        {'ایجاد طرف حساب بلوکه جدید'}
                        <Ant.Divider />
                    </Ant.Col>
                </Ant.Row>
                <Ant.Form.Item name="counterpartyName" label={"نام طرف حساب "} rules={[{ required: true }]}>
                    <DebounceSelect
                        mode="multiple"
                        maxCount={1}
                        placeholder="انتخاب کنید..."
                        fetchOptions={getAllCounterPartyForDropDown}
                        // onSuccess = {() => console.log('onSuccess')}
                        // onFinish = {() => console.log('onFinish')}
                        // onChange={(newValue) => {
                        //     console.log('onChange')
                        //     setValue(newValue);
                        // }}
                        value={value}
                    />
                </Ant.Form.Item>
                <Ant.Form.Item name={"dateString"} label="تاریخ" rules={[{ required: true }]}>
                    <MyDatePicker />
                </Ant.Form.Item>
                <Ant.Form.Item
                    name={"title"}
                    label="وضعیت"
                    valuePropName="checked"
                    rules={[{ required: true }]}
                >
                    <Ant.Select
                        {...commonOptions}
                        allowClear={true}
                        placeholder={"انتخاب کنید..."}
                        disabled={stateLoading || false}
                        loading={stateLoading}
                        options={stateData?.data}
                        fieldNames={{ label: "name", value: "title" }}
                    />
                </Ant.Form.Item>
                <Ant.Form.Item name={'description'} label="توضیحات" rules={[{ required: true }]}>
                    <Ant.Input.TextArea allowClear showCount maxLength={400} />
                </Ant.Form.Item>
                <Ant.Form.Item>
                    <Ant.Button block
                        type="primary"
                        loading={loading}
                        onClick={() => {
                            form.submit()
                        }}>
                        {'تایید'}
                    </Ant.Button>
                </Ant.Form.Item>
            </Ant.Form>
        </>
    )
}

export default FormAddNewCounterPartyBlackList
FormAddNewCounterPartyBlackList.propTypes = {
    onSuccess: PropTypes.func,
}


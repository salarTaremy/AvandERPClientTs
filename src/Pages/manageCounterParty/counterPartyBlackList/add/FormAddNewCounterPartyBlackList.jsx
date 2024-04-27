import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import { usePostWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import MyDatePicker from "@/components/common/MyDatePicker";
import { useFetch, useFetchWithHandler } from "@/api";
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

    // const getAllCounterPartyForDropDown = 

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
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
                        // value={value}
                        placeholder="انتخاب کنید..."
                        fetchOptions={
                            async (inputValue) => {
                                const queryString = qs.stringify({
                                    CounterpartyName: inputValue
                                })
                                console.log('start search for ' + inputValue)
                                const _url = `http://192.168.200.19:81/api/Counterparty/GetForDropdown?CounterpartyName=%DA%A9%D8%AA%D8%A7%D8%A8`
                                console.log('url => ' + _url)
                                return fetch(_url)
                                    .then((res) =>  console.log('res',res))
                                    .then((responseData) =>
                                    console.log('responseData',responseData)
                                    // responseData.map((item) => ({
                                    //         label: `${item.counterpartyNam}`,
                                    //         value: item.id,
                                    //     })),
                                    );


                                // console.log('b')
                                // if (listData?.isSuccess && listData?.data) {
                                //     console.log('data', listData)

                                //     const res =  listData?.data.map((item) => ({
                                //         label: `${item.counterpartyName} `,
                                //         value: item.id,
                                //     }))

                                //     console.log('res', res)

                                //     return res
                                // } else{
                                //     console.log('res null', null)
                                //     return null
                                // }
                            }
                        }
                        // onChange={(newValue) => {
                        //     console.log('newValue', newValue)
                        //     setValue(newValue);
                        // }}
                        style={{
                            width: '100%',
                        }}
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


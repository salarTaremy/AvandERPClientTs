import React from 'react'
import * as Ant from "antd";
import { useEffect, useState } from "react";
import * as styles from "@/styles";
import * as url from "@/api/url";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetchWithHandler, usePutWithHandler } from "@/api";


const OtherSettingList = () => {
    const [listData, loading, error, ApiCall] = useFetchWithHandler();
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    useRequestManager({ error: editError, loading: editLoading, data: editData })
    useRequestManager({ error: error });
    const [defaultValue, setDefaultValue] = useState()
    const [selectedSchema, setSelectedSchema] = useState()
    const [form] = Ant.Form.useForm()

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAllOtherSetting()
    }, [])

    useEffect(() => {
        form.resetFields()
        listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
        const urlSchema = listData?.data?.apiURL.split("://");
        listData?.isSuccess && form.setFieldsValue({ apiURL: `${urlSchema[1]}` })
        urlSchema && setDefaultValue(`${urlSchema[0]}://`);
        urlSchema && setSelectedSchema(`${urlSchema[0]}://`);
    }, [listData])

    //====================================================================
    //                        Functions
    //====================================================================
    const getAllOtherSetting = async () => {
        await ApiCall(url.TPS_CONFIG);
    };

    const onFinish = async (values) => {
        const req = {
            ...values,
            apiURL: `${selectedSchema}${values.apiURL}`
        }
        await editApiCall(url.TPS_CONFIG, req)
    }

    const addonAfter = (
        <Ant.Select defaultValue={defaultValue} onChange={(value) => setSelectedSchema(value)}>
            <Option value="http://">://http</Option>
            <Option value="https://">://https</Option>
        </Ant.Select>
    )

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} title={"سایر تنظیمات"} type="inner" loading={loading}>
                <Ant.Form form={form} onFinish={onFinish} >
                    <Ant.Form.Item
                        label={"زمان تکرار چرخه ارسال خودکار صورتحساب ها"}
                        name="sendRecurTimeInMinute"
                        rules={[{
                            required: true,
                            pattern: new RegExp("^[0-9]*$"),
                            message: 'لطفا مقدار عددی وارد نمایید.'
                        }]}
                        style={{ width: 430 }}
                    >
                        <Ant.Input suffix="دقیقه" />
                    </Ant.Form.Item>
                    <Ant.Form.Item
                        name="inquiryRecurTimeInMinute"
                        label={"زمان تکرار چرخه استعلام خودکار صورتحساب ها"}
                        rules={[{
                            required: true,
                            pattern: new RegExp("^[0-9]*$"),
                            message: 'لطفا مقدار عددی وارد نمایید.'
                        }]}
                        style={{ width: 430 }}
                    >
                        <Ant.Input suffix="دقیقه" />
                    </Ant.Form.Item>
                    <Ant.Form.Item
                        name="apiURL"
                        label={"آدرس URL "}
                        rules={[{
                            required: true,
                            pattern: new RegExp("(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"),
                            message: 'لطفا آدرس URL صحیح وارد نمایید. '
                        }]}
                        style={{ width: 430 }}
                    >
                        <Ant.Input addonAfter={addonAfter} style={{ textAlign: "left" }} />
                    </Ant.Form.Item>
                    <Ant.Form.Item>
                        <Ant.Button
                            type="primary"
                            loading={loading}
                            onClick={() => {
                                form.submit();
                            }}
                        >
                            {"ذخیره"}
                        </Ant.Button>
                    </Ant.Form.Item>
                </Ant.Form>
            </Ant.Card>
        </>
    );
}

export default OtherSettingList

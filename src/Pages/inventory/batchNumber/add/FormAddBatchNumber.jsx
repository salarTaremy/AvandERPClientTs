import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { usePostWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import { FaBarcode } from "react-icons/fa6";
import MyDatePicker from "@/components/common/MyDatePicker";

const FormAddBatchNumber = (props) => {
    const { onSuccess } = props;
    const [loading, setLoading] = useState(false);
    const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
    useRequestManager({ error: addError, loading: addLoading, data: addData });
    const [form] = Ant.Form.useForm();

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        addData?.isSuccess && onSuccess();
    }, [addData]);

    //====================================================================
    //                        Functions
    //======================================================================
    const onFinish = async (values) => {
        setLoading(true);
        const req = {
            ...values,
            productionDateCalendarId: values?.productionDate?.toString().replace(/\//g, ''),
            expiryDateCalendarId: values?.expiryDate?.toString().replace(/\//g, ''),
        };
        await addApiCall(url.BATCH_NUMBER, req);
        setLoading(false);
    };
    //====================================================================
    //                        Child Components
    //====================================================================
    //====================================================================
    //                        Component
    //====================================================================

    return (
        <>
            <ModalHeader title={"ایجاد سری ساخت"} icon={<FaBarcode />} />
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                <Ant.Space>
                    <Ant.Form.Item name="batchNumber" label={'سری ساخت'} rules={[{ required: true }]}>
                        <Ant.Input allowClear showCount maxLength={100} />
                    </Ant.Form.Item>
                    <Ant.Form.Item name="shelfLife" label={'عمر مفید'} rules={[{ required: true }]}>
                        <Ant.Input allowClear showCount maxLength={100} />
                    </Ant.Form.Item>
                </Ant.Space>
                <Ant.Space>
                    <Ant.Form.Item name="productionDate" label={'تاریخ تولید'} rules={[{ required: true }]}>
                        <MyDatePicker />
                    </Ant.Form.Item>
                    <Ant.Form.Item name="expiryDate" label={'تاریخ انقضا'} rules={[{ required: true }]}>
                        <MyDatePicker />
                    </Ant.Form.Item>
                </Ant.Space>
                <Ant.Form.Item>
                    <Ant.Button
                        loading={loading}
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
};
export default FormAddBatchNumber;
FormAddBatchNumber.propTypes = {
    onSuccess: PropTypes.func,
};

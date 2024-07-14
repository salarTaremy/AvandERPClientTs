import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { usePostWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import ModalHeader from "@/components/common/ModalHeader";
import { IoMdSettings } from "react-icons/io";

const FormAddOtherSetting = (props) => {
    const { onSuccess } = props;
    const [loading, setLoading] = useState(false);
    const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
    useRequestManager({ error: addError, loading: addLoading, data: addData });
    const [form] = Ant.Form.useForm();

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        form.setFieldValue("isActive", true);
    }, [form]);

    useEffect(() => {
        addData?.isSuccess && onSuccess();
    }, [addData]);
    //====================================================================
    //                        Functions
    //====================================================================
    const onFinish = async (values) => {
        setLoading(true);
        const req = { ...values };
        await addApiCall(url.TPS_CONFIG, req);
        setLoading(false);
    };
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={"تنظیمات جدید"} icon={<IoMdSettings />} />
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                <Ant.Form.Item
                    name="title"
                    label={"عنوان"}
                    rules={[{ required: true }]}
                >
                    <Ant.Input allowClear showCount maxLength={150} />
                </Ant.Form.Item>
                <Ant.Form.Item
                    name="value"
                    label={"مقدار"}
                    rules={[{ required: true }]}
                >
                    <Ant.Input allowClear showCount maxLength={50} />
                </Ant.Form.Item>
                <Ant.Form.Item
                    name="description"
                    label={"توضیحات"}
                    rules={[{ required: true }]}
                >
                    <Ant.Input.TextArea allowClear showCount maxLength={500} />
                </Ant.Form.Item>
                <Ant.Form.Item>
                    <Ant.Button
                        block
                        type="primary"
                        loading={loading}
                        onClick={() => {
                            form.submit();
                        }}
                    >
                        {"تایید"}
                    </Ant.Button>
                </Ant.Form.Item>
            </Ant.Form>
        </>
    );
}
export default FormAddOtherSetting
FormAddOtherSetting.propTypes = {
    onSuccess: PropTypes.func,
};

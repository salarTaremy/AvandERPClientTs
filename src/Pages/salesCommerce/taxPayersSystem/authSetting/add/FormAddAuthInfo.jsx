import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { usePostWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import ModalHeader from "@/components/common/ModalHeader";
import { TbSettingsPlus } from "react-icons/tb";

const FormAddAuthInfo = (props) => {
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
        await addApiCall(url.TAX_PAYERS_SYSTEM_AUTH_INFORMATION, req);
        setLoading(false);
    };
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={" اطلاعات احراز هویت جدید "} icon={<TbSettingsPlus />} />
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                <Ant.Form.Item
                    name="uniqueFiscalId"
                    label={"شناسه مالیاتی یکتا"}
                    rules={[{ required: true }]}
                >
                    <Ant.Input allowClear showCount maxLength={6} />
                </Ant.Form.Item>
                <Ant.Form.Item
                    name="publicKey"
                    label={"کلید عمومی"}
                    rules={[{ required: true }]}
                >
                    <Ant.Input.TextArea allowClear showCount maxLength={4000} rows={4} />
                </Ant.Form.Item>
                <Ant.Form.Item
                    name="privateKey"
                    label={"کلید خصوصی"}
                    rules={[{ required: true }]}
                >
                    <Ant.Input.TextArea allowClear showCount maxLength={4000} rows={4} />
                </Ant.Form.Item>
                <Ant.Space size={110}>
                    <Ant.Form.Item
                        name="isDefault"
                        label="شناسه پیش فرض"
                    >
                        <Ant.Switch />
                    </Ant.Form.Item>
                    <Ant.Form.Item
                        name="isActive"
                        label="فعال"
                    >
                        <Ant.Switch />
                    </Ant.Form.Item>
                </Ant.Space>
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
};

export default FormAddAuthInfo;
FormAddAuthInfo.propTypes = {
    onSuccess: PropTypes.func,
};


import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { usePutWithHandler, useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";

const FormEditPhoneNumber = (props) => {
    const { onSuccess, id } = props;
    const [loading, setLoading] = useState(false);
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
    const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: editError, loading: editLoading, data: editData });
    const [form] = Ant.Form.useForm();

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getCurrencyById()
    }, []);

    useEffect(() => {
        form.resetFields()
        listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
    }, [listData])
    //=====================================================================
    //                        Functions
    //=====================================================================
    const getCurrencyById = async () => {
        await ApiCall(`${url.COUNTERPARTY_PHONE_NUMBER}/${id}`)
    };

    const onFinish = async (values) => {
        setLoading(true);
        const req = {
            ...values,
            id: id,
        };
        await editApiCall(url.COUNTERPARTY_PHONE_NUMBER, req);
        setLoading(false);
        onSuccess()
    };
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={"ویرایش شماره تماس"} />
            <Ant.Skeleton active loading={loadingData}>
                <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                    <Ant.Form.Item name="title" label={"عنوان"} rules={[{ required: true }]}>
                        <Ant.Input allowClear showCount maxLength={100} />
                    </Ant.Form.Item>
                    <Ant.Form.Item
                        name="phoneNumber"
                        label={"شماره تماس"}
                        rules={[{
                            required: true,
                            pattern: new RegExp("^[0-9]*$"),
                            message:
                                " شماره تماس نمی تواند شامل کاراکترهای غیرعددی باشد"
                        }]}
                    >
                        <Ant.Input allowClear showCount maxLength={11} />
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
            </Ant.Skeleton>
        </>
    );
};

export default FormEditPhoneNumber;
FormEditPhoneNumber.propTypes = {
    onSuccess: PropTypes.func,
    id: PropTypes.number.isRequired,
};

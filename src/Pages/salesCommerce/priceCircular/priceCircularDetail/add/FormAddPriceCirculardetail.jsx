import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import ModalHeader from "@/components/common/ModalHeader";
import { usePostWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import { MdDescription } from "react-icons/md";

const FormAddPriceCirculardetail = (props) => {
    const { onSuccess, iD } = props;
    const [loading, setLoading] = useState(false);
    const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
    const [productData, productLoading, poductError] = api.useFetch(url.PRODUCT);
    useRequestManager({ error: poductError });
    const [form] = Ant.Form.useForm();
    const commonOptions = {
        showSearch: true,
        filterOption: (input, option) => option.name.indexOf(input) >= 0,
    };
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        addData?.isSuccess && onSuccess()
    }, [addData])
    //==================================================================
    //                        Functions
    //==================================================================
    const onFinish = async (values) => {
        const req = { ...values, priceCircularHeaderId: iD }
        await addApiCall(url.PRICE_CIRCULAR_DETAIL, req);
    };

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={"افزودن جزئیات بخشنامه قیمت"} icon={<MdDescription />} />
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                <Ant.Form.Item
                    name="productId"
                    label={"نام کالا"}
                    rules={[{ required: true }]}>
                    <Ant.Select
                        {...commonOptions}
                        placeholder={"انتخاب کنید..."}
                        disabled={productLoading || false}
                        loading={productLoading}
                        options={productData?.data}
                        fieldNames={{ label: "name", value: "id" }}
                    />
                </Ant.Form.Item>
                <Ant.Form.Item
                    name="productDetailId"
                    label={"سری ساخت"}
                    rules={[{ required: false }]}
                >
                    <Ant.Input allowClear showCount maxLength={100} />
                </Ant.Form.Item>
                <Ant.Form.Item name="price" label={"قیمت"} rules={[{
                    required: true
                }]}
                >
                    <Ant.InputNumber allowClear showCount maxLength={100}
                        formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        style={{ width: "100%" }} />
                </Ant.Form.Item>
                <Ant.Form.Item name="consumerPrice" label={"قیمت مصرف کننده"} rules={[{
                    required: false
                }]}
                >
                    <Ant.InputNumber allowClear showCount maxLength={100}
                        formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        style={{ width: "100%" }} />
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

export default FormAddPriceCirculardetail

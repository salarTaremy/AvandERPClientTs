import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import * as api from "@/api";
import { usePutWithHandler, useFetchWithHandler, useFetch } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import { MdDescription } from "react-icons/md";

const FormEditPriceCircularDetail = (props) => {
    const { onSuccess, id } = props;
    const [loading, setLoading] = useState(false);
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
    const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: editError, loading: editLoading, data: editData });
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
        getPriceCircularDetailById()
    }, []);

    useEffect(() => {
        form.resetFields()
        listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
    }, [listData])
    //=====================================================================
    //                        Functions
    //=====================================================================
    const getPriceCircularDetailById = async () => {
        await ApiCall(`${url.PRICE_CIRCULAR_DETAIL}/${id}`)
    };

    const onFinish = async (values) => {
        setLoading(true);
        const req = { ...values, id: id };
        await editApiCall(url.PRICE_CIRCULAR_DETAIL, req);
        setLoading(false);
        onSuccess()
    };
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={"ویرایش جزئیات بخشنامه قیمت"} icon={<MdDescription />} />
            <Ant.Skeleton active loading={loadingData}>
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
                    <Ant.Form.Item name="price" label={"قیمت"} rules={[{ required: true }]}  >
                        <Ant.InputNumber allowClear showCount maxLength={100}
                            formatter={(value) =>
                                value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            style={{ width: "100%" }} />
                    </Ant.Form.Item>
                    <Ant.Form.Item name="consumerPrice" label={"قیمت مصرف کننده"} rules={[{
                        required: false
                    }]}>
                        <Ant.InputNumber allowClear showCount maxLength={100}
                            formatter={(value) =>
                                value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
            </Ant.Skeleton>
        </>
    );
}

export default FormEditPriceCircularDetail
FormEditPriceCircularDetail.propTypes = {
    onFinish: PropTypes.func,
    onSuccess: PropTypes.func,
    obj: PropTypes.any,
    id: PropTypes.number,
    loading: PropTypes.bool,
};


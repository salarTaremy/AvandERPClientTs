import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import * as api from "@/api";
import { usePutWithHandler, useFetchWithHandler, useFetch } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import { MdDescription } from "react-icons/md";
import ProductPicker, {
    FormatValueToDisplay as ProductPickerDisplayValue,
} from "@/components/common/ProductPicker";


const FormEditPriceCircularDetail = (props) => {
    const { onSuccess, id } = props;
    const [loading, setLoading] = useState(false);
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
    const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
    const [selectedItemValues, setSelectedItemValues] = useState({});
    const [validationErrors, setValidationErrors] = useState(null);
    const [valueType, setValueType] = useState("0")
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [loadingBachNumber, setLoadingBachNumber] = useState(false);
    const [warehouseId, setWarehouseId] = useState(null);
    useRequestManager({ error: editError, loading: editLoading, data: editData });
    useRequestManager({ error: error })
    const [product, setProduct] = useState(null);
    const [brand, setBrand] = useState(null);
    const [form] = Ant.Form.useForm();

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getPriceCircularDetailById()
    }, []);

    useEffect(() => {
        if (listData?.isSuccess) {
            if (listData?.data?.batchNumberId) {
                setValueType("1");
                form.setFieldValue(
                    "productAndBatchNumber",
                    ProductPickerDisplayValue([listData?.data?.brandId, listData?.data?.productId, listData?.data?.batchNumberId]),
                );
                setSelectedItemValues({
                    brand: { id: listData?.data?.brandId },
                    product: { id: listData?.data?.productId },
                    productDetail: { id: listData?.data?.productDetailId },
                    batchNumber: { id: listData?.data?.batchNumberId, name: listData?.data?.batchNumber },
                })
                form.setFieldValue("productPickerMode", "1")
            }
            else {
                setValueType("0");
                form.setFieldValue(
                    "product",
                    ProductPickerDisplayValue([listData?.data?.brandId, listData?.data?.productId]),
                );
                setSelectedItemValues({
                    brand: { id: listData?.data?.brandId },
                    product: { name: listData?.data?.productId },
                })
                form.setFieldValue("productPickerMode", "0")
            }
            form.setFieldsValue({ ...(listData?.data || null) })
        }
    }, [listData]);

    //=====================================================================
    //                        Functions
    //=====================================================================
    const getPriceCircularDetailById = async () => {
        await ApiCall(`${url.PRICE_CIRCULAR_DETAIL}/${id}`)
    };

    const onProductPickerModeChange = (value) => {
        setValueType(value);
        setValidationErrors("");
    }
    const onProductDetailChange = async (value, selectedNode, extra) => {
        const selectedValue = extra.selectedOptionData;
        if (selectedValue.productDetail) {
            setValidationErrors("");
            setSelectedItemValues({
                brand: { id: selectedValue.brand.id, name: selectedValue.brand.name },
                product: { id: selectedValue.product.id, name: selectedValue.product.name },
                productDetail: {
                    id: selectedValue.productDetail.productDetailId,
                    batchNumberId: selectedValue.productDetail.batchNumberId,
                    batchNumber: selectedValue.productDetail.batchNumber,
                },
            });
        } else {
            setValidationErrors("انتخاب کالا و سری ساخت اجباری است");
        }
    };

    const onProductChange = async (value, selectedNode, extra) => {
        const selectedValue = extra.selectedOptionData;
        if (selectedValue.product) {
            setValidationErrors("");
            setSelectedItemValues({
                product: { id: selectedValue.product.id, name: selectedValue.product.name },
            });
        } else {
            setValidationErrors("انتخاب کالا اجباری است");            
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        setProduct(values.ProductId);
        setBrand(product?.brand?.id);
        if (valueType === "1") {
            let req = {
                id: id,
                productId: selectedItemValues.product.id,
                productDetailId: selectedItemValues.productDetail.id,
                price: values.price,
                consumerPrice: values.consumerPrice,
            }
            await editApiCall(url.PRICE_CIRCULAR_DETAIL, req);
        }
        else {
            let req = {
                id: id,
                productId: selectedItemValues?.product?.id,
                price: values.price,
                consumerPrice: values.consumerPrice,
            }
            await editApiCall(url.PRICE_CIRCULAR_DETAIL, req);
        }
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
                        name={"productPickerMode"}
                        label="کالا و سری ساخت"
                        rules={[
                            {
                                required: true,
                                message: "فیلد کالا اجباری است",
                            },
                        ]}
                    >
                        <Ant.Segmented
                            disabled={loadingProduct || loadingBachNumber}
                            block
                            options={[
                                {
                                    label: "کالا",
                                    value: "0",
                                },
                                {
                                    label: "سری ساخت",
                                    value: "1",
                                },
                            ]}
                            onChange={onProductPickerModeChange}
                        />
                    </Ant.Form.Item>
                    {valueType === "0" && (
                        <Ant.Form.Item
                            name={"product"}
                            label="کالا"
                            rules={[{ required: true }]}
                            help={
                                validationErrors && (
                                    <Ant.Typography.Text type="danger">
                                        {validationErrors}
                                    </Ant.Typography.Text>
                                )
                            }
                        >
                            <ProductPicker
                                warehouseId={warehouseId}
                                mode="product"
                                onChange={onProductChange}
                            />
                        </Ant.Form.Item>
                    )}
                    {valueType === "1" && (
                        <Ant.Form.Item
                            name={"productAndBatchNumber"}
                            label="برند، کالا و سری ساخت"
                            rules={[{ required: true }]}
                            help={
                                validationErrors && (
                                    <Ant.Typography.Text type="danger">
                                        {validationErrors}
                                    </Ant.Typography.Text>
                                )
                            }
                        >
                            <ProductPicker
                                // initialValues={{ brandId: brandId, productId: productId, batchNumberId: batchNumberId }}
                                warehouseId={warehouseId}
                                mode="productDetail"
                                onChange={onProductDetailChange}
                            />
                        </Ant.Form.Item>
                    )}
                    <Ant.Form.Item name="price" label={"قیمت"} rules={[{ required: true }]}  >
                        <Ant.InputNumber showCount maxLength={100}
                            formatter={(value) =>
                                value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            style={{ width: "100%" }} />
                    </Ant.Form.Item>
                    <Ant.Form.Item name="consumerPrice" label={"قیمت مصرف کننده"} rules={[{
                        required: false
                    }]}>
                        <Ant.InputNumber showCount maxLength={100}
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


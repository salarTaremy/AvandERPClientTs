import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import ModalHeader from "@/components/common/ModalHeader";
import { usePostWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import { MdDescription } from "react-icons/md";
import ProductPicker from "@/components/common/ProductPicker";

const FormAddPriceCirculardetail = (props) => {
    const { onSuccess, iD } = props;
    const [valueType, setValueType] = useState("0")
    const [loading, setLoading] = useState(false);
    const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
    const [productData, productLoading, poductError] = api.useFetch(url.PRODUCT);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [loadingBachNumber, setLoadingBachNumber] = useState(false);
    const [warehouseId, setWarehouseId] = useState(null);
    const [product, setProduct] = useState(null);
    const [brand, setBrand] = useState(null);
    const [selectedItemValues, setSelectedItemValues] = useState({});
    const [validationErrors, setValidationErrors] = useState(null);
    useRequestManager({ error: poductError });
    useRequestManager({ error: addError, data: addData });
    const [form] = Ant.Form.useForm();
  
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        addData?.isSuccess && onSuccess()
    }, [addData])
    //==================================================================
    //                        Functions
    //==================================================================
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
        setProduct(values.ProductId);
        setBrand(product?.brand?.id);
        if (valueType === "1") {
            let req = {
                ...values,
                priceCircularHeaderId: iD,
                productId: selectedItemValues.product.id,
                productDetailId: selectedItemValues.productDetail.id
            }
            await addApiCall(url.PRICE_CIRCULAR_DETAIL, req);
        }
        else {
            let req = {
                ...values,
                priceCircularHeaderId: iD,
                productId: selectedItemValues?.product?.id,
            }
            await addApiCall(url.PRICE_CIRCULAR_DETAIL, req);
        }
    };

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={"افزودن جزئیات بخشنامه قیمت"} icon={<MdDescription />} />
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                <Ant.Form.Item
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
                <Ant.Form.Item name="price" label={"قیمت"} rules={[{
                    required: true
                }]}
                >
                    <Ant.InputNumber allowClear showCount maxLength={100}
                        formatter={(value) =>
                            value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        style={{ width: "100%" }} />
                </Ant.Form.Item>
                <Ant.Form.Item name="consumerPrice" label={"قیمت مصرف کننده"} rules={[{
                    required: false
                }]}
                >
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
        </>
    );
}

export default FormAddPriceCirculardetail

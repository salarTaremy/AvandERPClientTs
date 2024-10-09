import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import { PropTypes } from 'prop-types'
import * as url from "@/api/url";
import MyDatePicker, {
    FormatDateToDisplay,
    FormatDateToPost,
} from "@/components/common/MyDatePicker";
import useRequestManager from "@/hooks/useRequestManager";
import * as api from "@/api";
import ProductPicker, {
    GetSelectedValue as GetProductPickerValue,
    FormatValueToDisplay as ProductPickerDisplayValue,
} from "@/components/common/ProductPicker";


const FilterPanel = (props) => {
    const { onSubmit, filterObject } = props
    const [valueType, setValueType] = useState("0");
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [loadingBachNumber, setLoadingBachNumber] = useState(false);
    const [warehouseId, setWarehouseId] = useState(null);
    const [product, setProduct] = useState(null);
    const [brand, setBrand] = useState(null);
    const [batchNumber, setBatchNumber] = useState(null);
    const [selectedItemValues, setSelectedItemValues] = useState({});
    const [validationErrors, setValidationErrors] = useState(null);
    const [wareHouseList, wareHouseLoading, wareHouseError] = api.useFetch(
        url.WAREHOUSE,
    );
    const [
        inventoryDocumentList,
        inventoryDocumentLoading,
        inventoryDocumentError,
    ] = api.useFetch(url.INVENTORY_DOCUMENT_TYPE);
    useRequestManager({ error: wareHouseError });
    useRequestManager({ error: inventoryDocumentError });

    const [form] = Ant.Form.useForm()
    const commonOptionsWareHouse = {
        showSearch: true,
        filterOption: (input, option) => option.title.indexOf(input) >= 0,
    };
    const commonOptionsInventoryDocumentType = {
        showSearch: true,
        filterOption: (input, option) => option.title.indexOf(input) >= 0,
    };

    //====================================================================
    //                        Functions
    //====================================================================
    useEffect(() => {
        setBrand(product?.brand?.id);
    }, [product]);

    useEffect(() => {
        const dateFilter = {};
        if (filterObject?.fromIssueDateCalendarId) {
            dateFilter.fromIssueDateCalendarId = FormatDateToDisplay(
                filterObject?.fromIssueDateCalendarId,
            );
        }
        if (filterObject?.toIssueDateCalendarId) {
            dateFilter.toIssueDateCalendarId = FormatDateToDisplay(
                filterObject?.toIssueDateCalendarId,
            );
        }
        setBrand(product?.brand?.id);
        filterObject && form.setFieldsValue({ ...filterObject, ...dateFilter });
    }, []);

    //====================================================================
    //                        Functions
    //====================================================================
    const onProductChange = async (value, option) => {
        const selectedValue = GetProductPickerValue(option);
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
            setSelectedItemValues({
                // brand: { id: selectedValue.brand.id, name: selectedValue.brand.name },
                product: { id: selectedValue.product.id, name: selectedValue.product.name },
                // productDetail: {
                //     id: selectedValue.productDetail.productDetailId,
                //     batchNumberId: selectedValue.productDetail.batchNumberId,
                //     batchNumber: selectedValue.productDetail.batchNumber,
                // },
            });
        }
    };

    const onFinish = (values) => {
        const otherFilterItems = {};
        if (values?.fromIssueDateCalendarId) {
            otherFilterItems.fromIssueDateCalendarId = FormatDateToPost(
                values?.fromIssueDateCalendarId,
            );
        }

        if (values?.toIssueDateCalendarId) {
            otherFilterItems.toIssueDateCalendarId = FormatDateToPost(
                values?.toIssueDateCalendarId,
            );
        }
        setProduct(values.ProductId);
        setBrand(product?.brand?.id);
        console.log('selectedItemValues', selectedItemValues)
        console.log('values', values)
        if (selectedItemValues.productDetail) {

            (onSubmit({
                ...values,
                ...otherFilterItems,
                warehouseId: values.warehouseId,
                productId: selectedItemValues.product.id,
                // brandId: selectedItemValues.brand.id,
                batchNumberId: selectedItemValues.productDetail.batchNumberId,
            }))

        }
        else {
            onSubmit({
                ...values,
                ...otherFilterItems,
                productId: selectedItemValues?.product?.id,
                warehouseId: values.warehouseId,
                // brandId: selectedItemValues.brand.id,
                //batchNumberId: selectedItemValues.productDetail.batchNumberId,
            })
            console.log('selectedItemValues', selectedItemValues)
        }



    };

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical" onFinishFailed={null}>
                <Ant.Form.Item name="fromIssueDateCalendarId" label={'از تاریخ '} >
                    <MyDatePicker />
                </Ant.Form.Item>
                <Ant.Form.Item name="toIssueDateCalendarId" label={'تا تاریخ '} >
                    <MyDatePicker />
                </Ant.Form.Item>
                <Ant.Form.Item name={"warehouseId"} label="نام انبار">
                    <Ant.Select
                        {...commonOptionsWareHouse}
                        disabled={wareHouseLoading}
                        allowClear
                        placeholder="لطفا انتخاب کنید ..."
                        loading={wareHouseLoading}
                        options={wareHouseList?.data}
                        fieldNames={{ label: "title", value: "id" }}
                        onChange={(val) => setWarehouseId(val)}
                    />
                </Ant.Form.Item>
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
                        onChange={(e) => setValueType(e)}
                    />
                </Ant.Form.Item>
                {valueType === "0" && (
                    <Ant.Form.Item
                        name={"product"}
                        label="کالا"
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
                            onChange={onProductChange}
                        />
                    </Ant.Form.Item>
                )}
                <Ant.Form.Item name={"inventoryDocumentTypeId"} label="نوع برگه انبار">
                    <Ant.Select
                        {...commonOptionsInventoryDocumentType}
                        allowClear
                        placeholder="لطفا انتخاب کنید ..."
                        disabled={inventoryDocumentLoading}
                        loading={inventoryDocumentLoading}
                        options={inventoryDocumentList?.data}
                        fieldNames={{ label: "title", value: "id" }}
                    />
                </Ant.Form.Item>
                <Ant.Form.Item>
                    <Ant.Button
                        block
                        type="primary"
                        onClick={() => {
                            form.submit()
                        }}
                    >
                        {'اعمال'}
                    </Ant.Button>
                </Ant.Form.Item>
            </Ant.Form>
        </>
    )
}

export default FilterPanel
FilterPanel.propTypes = {
    onSubmit: PropTypes.func,
    filterObject: PropTypes.any,
}
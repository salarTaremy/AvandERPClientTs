import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import qs from "qs";
import * as uuid from "uuid";
import * as Ant from "antd";
import * as url from "@/api/url";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import CustomContent from "@/components/common/CustomContent";
import ModalHeader from "@/components/common/ModalHeader";
import { FaFileMedical } from "react-icons/fa";
import { SyncOutlined } from "@ant-design/icons";
import ProductPicker, {
  GetSelectedValue as GetProductPickerValue,
} from "@/components/common/ProductPicker";
//====================================================================
//                        Declaration
//====================================================================
const InventoryDocumentDetailAddForm = ({
  warehouseId,
  documentTypeNature,
  onSuccess,
  onCancel,
}) => {
  const [form] = Ant.Form.useForm();

  const [
    productUnitlListData,
    productUnitListLoading,
    productUnitListError,
    productUnitApiCall,
  ] = useFetchWithHandler();

  const [
    warehouseStockListData,
    warehouseStockListLoading,
    warehouseStockListError,
    warehouseStockApiCall,
  ] = useFetchWithHandler();

  const [
    productDetailData,
    productDetailLoading,
    productDetailError,
    productDetailApiCall,
  ] = useFetchWithHandler();

  useRequestManager({ error: productUnitListError });
  useRequestManager({ error: warehouseStockListError });

  const [validationErrors, setValidationErrors] = useState();
  const [documentDetailValues, setDocumentDetailValues] = useState({});
  const [productStock, setProductStock] = useState({
    reserved: 0,
    total: 0,
    real: 0,
  });
  const [productUnitOption, setProductUnitOption] = useState([]);
  const [productDetail, setProductDetail] = useState({});
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    const stock = { reserved: 0, real: 0, total: 0 };
    if (warehouseStockListData?.isSuccess) {
      stock.reserved = warehouseStockListData?.data[0].sumReserve;
      stock.total = warehouseStockListData?.data[0].totalStock;
      stock.real = warehouseStockListData?.data[0].realStock;
    }
    setProductStock(stock);
  }, [warehouseStockListData]);

  useEffect(() => {
    productUnitlListData?.isSuccess &&
      setProductUnitOption(productUnitlListData?.data);
  }, [productUnitlListData]);

  useEffect(() => {
    productDetailData?.isSuccess && setProductDetail(productDetailData?.data);
  }, [productDetailData]);
  //====================================================================
  //                        Functions
  //====================================================================
  const getProductUnitList = async (productId) => {
    const queryString = qs.stringify({
      productId: productId,
    });
    await productUnitApiCall(`${url.PRODUCT_UNIT}?${queryString}`);
  };

  const getWarehouseStock = async (productId, productDetailId) => {
    const queryString = qs.stringify({
      warehouseId: warehouseId,
      productId: productId,
      productDetailId: productDetailId,
    });
    await warehouseStockApiCall(`${url.WAREHOUSE_STOCK_GET}?${queryString}`);
  };

  const getProductDetail = async (productId) => {
    await productDetailApiCall(`${url.PRODUCT}/${productId}`);
  };

  const onProductChange = async (value, option) => {
    const optionData = GetProductPickerValue(option);
    if (optionData.productDetail) {
      setValidationErrors("");

      setDocumentDetailValues((documentDetailValues) => ({
        ...documentDetailValues,
        product: { id: optionData.product.id, name: optionData.product.name },
        productDetail: {
          id: optionData.productDetail.productDetailId,
          batchNumber: optionData.productDetail.batchNumber,
        },
      }));

      await getWarehouseStock(
        optionData.product.id,
        optionData.productDetail.productDetailId,
      );
      await getProductUnitList(optionData.product.id);
      await getProductDetail(optionData.product.id);
    } else {
      setValidationErrors("انتخاب کالا و سری ساخت اجباری است");
    }
  };

  const onProductUnitChange = (value, option) => {
    setDocumentDetailValues((documentDetailValues) => ({
      ...documentDetailValues,
      productUnit: { id: option.id, name: option.name },
    }));
  };

  const submitButtonOnClick = () => {
    form.submit();
  };
  const onFinish = (formValues) => {
    const detailValues = {
      ...documentDetailValues,
      quantity: formValues?.quantity,
      description: formValues?.description,
      unitPrice: 0,
      totalPrice: 0,
      key: uuid.v1(),
    };
    onSuccess(detailValues);
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={"افزودن اقلام برگه انبار"} icon={<FaFileMedical />} />
      <CustomContent scroll>
        <Ant.Form form={form} layout="vertical" onFinish={onFinish}>
          <Ant.Row gutter={[8, 8]}>
            <Ant.Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Ant.Form.Item
                name={"productId"}
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
                  mode="productDetail"
                  onChange={onProductChange}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Ant.Form.Item
                name={"quantity"}
                label="تعداد"
                rules={[
                  { required: true },
                  {
                    validator: (_, value) => {
                      if (
                        (documentTypeNature >= 0 &&
                          value != null &&
                          value > 0) ||
                        (documentTypeNature < 0 &&
                          value != null &&
                          value > 0 &&
                          value <= productStock.total)
                      ) {
                        return Promise.resolve();
                      } else if (
                        documentTypeNature < 0 &&
                        value >= productStock.total
                      ) {
                        return Promise.reject(
                          "مقدار وارد شده بیش از موجودی کالا است.",
                        );
                      } else if (value <= 0) {
                        return Promise.reject("مقدار وارد شده صحیح نیست");
                      }
                    },
                  },
                ]}
              >
                <Ant.InputNumber
                  style={{ width: "100%" }}
                  disabled={warehouseStockListLoading}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Ant.Form.Item
                name={"productUnitId"}
                label="واحد کالا"
                rules={[{ required: true }]}
              >
                <Ant.Select
                  placeholder="لطفا انتخاب کنید..."
                  disabled={productUnitListLoading}
                  loading={productUnitListLoading}
                  options={productUnitOption}
                  fieldNames={{ label: "name", value: "id" }}
                  onChange={onProductUnitChange}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <Ant.Typography.Text type="secondary">
                {"موجودی: "}
              </Ant.Typography.Text>
              <Ant.Typography.Text>
                {!warehouseStockListLoading && productStock.total}
                {warehouseStockListLoading && (
                  <SyncOutlined color="#ff1233" spin />
                )}
              </Ant.Typography.Text>
            </Ant.Col>
            <Ant.Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <Ant.Typography.Text type="secondary">
                {"موجودی رزرو: "}
              </Ant.Typography.Text>
              <Ant.Typography.Text>
                {!warehouseStockListLoading && productStock.reserved}
                {warehouseStockListLoading && <SyncOutlined spin />}
              </Ant.Typography.Text>
            </Ant.Col>
            <Ant.Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <Ant.Typography.Text type="secondary">
                {"موجودی واقعی: "}
              </Ant.Typography.Text>
              <Ant.Typography.Text>
                {!warehouseStockListLoading && productStock.real}
                {warehouseStockListLoading && <SyncOutlined spin />}
              </Ant.Typography.Text>
            </Ant.Col>
            <Ant.Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Ant.Typography.Text type="secondary">
                {"تامین کننده: "}
              </Ant.Typography.Text>
              <Ant.Typography.Text>
                {!productDetailLoading && productDetail.supplier}
                {productDetailLoading && <SyncOutlined spin />}
              </Ant.Typography.Text>
            </Ant.Col>
            <Ant.Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Ant.Form.Item name={"description"} label="توضیحات">
                <Ant.Input.TextArea
                  rows={3}
                  style={{ resize: "none" }}
                  showCount
                  maxLength={200}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Ant.Row justify={"end"} gutter={[8, 8]}>
                <Ant.Col xs={24} sm={24} md={6} lg={6}>
                  <Ant.Form.Item>
                    <Ant.Button
                      type="primary"
                      block
                      onClick={submitButtonOnClick}
                    >
                      {"ذخیره"}
                    </Ant.Button>
                  </Ant.Form.Item>
                </Ant.Col>
                <Ant.Col xs={24} sm={24} md={6} lg={6}>
                  <Ant.Button type="default" block onClick={onCancel}>
                    {"انصراف"}
                  </Ant.Button>
                </Ant.Col>
              </Ant.Row>
            </Ant.Col>
          </Ant.Row>
        </Ant.Form>
      </CustomContent>
    </>
  );
};

InventoryDocumentDetailAddForm.propTypes = {
  warehouseId: PropTypes.number.isRequired,
  documentTypeNature: PropTypes.number.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

export default InventoryDocumentDetailAddForm;

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
import { TbBrandAirtable } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { RiBarcodeBoxLine } from "react-icons/ri";
import { SyncOutlined } from "@ant-design/icons";

//====================================================================
//                        Declaration
//====================================================================
const InventoryDocumentDetailAddForm = ({ warehouseId, onSuccess }) => {
  const [form] = Ant.Form.useForm();
  const [
    productListData,
    productListLoading,
    productListError,
    productListApiCall,
  ] = useFetchWithHandler();

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

  useRequestManager({ error: productListError });
  useRequestManager({ error: productUnitListError });
  useRequestManager({ error: warehouseStockListError });

  const [validationErrors, setValidationErrors] = useState();
  const [productCascaderOption, setProductCascaderOption] = useState([]);
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
    const queryString = qs.stringify({ warehouseId: warehouseId });
    productListApiCall(`${url.PRODUCT_TREE}?${queryString}`);
  }, []);

  useEffect(() => {
    productListData?.isSuccess &&
      setProductCascaderOption(productListData?.data);
  }, [productListData]);

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

  const productFilter = (inputValue, path) =>
    path.some(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
        String(option.fullCode).indexOf(inputValue) > -1,
    );

  const onProductChange = async (value, option) => {
    if (option.length > 1) {
      const selectedProduct = option[option.length - 2];
      const selectedBatchNumber = option[option.length - 1];
      setDocumentDetailValues((documentDetailValues) => ({
        ...documentDetailValues,
        product: { id: selectedProduct.productId, name: selectedProduct.name },
        productDetail: {
          id: selectedBatchNumber.productDetailId,
          batchNumber: selectedBatchNumber.name,
        },
      }));

      await getWarehouseStock(
        selectedProduct.productId,
        selectedBatchNumber.productDetailId,
      );
      await getProductUnitList(selectedProduct.productId);
      await getProductDetail(selectedProduct.productId);

      setValidationErrors("");
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
      <CustomContent>
        <Ant.Form form={form} layout="vertical" onFinish={onFinish}>
          <Ant.Row gutter={[8, 12]}>
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
                <Ant.Cascader
                  loading={productListLoading}
                  options={productCascaderOption}
                  onChange={onProductChange}
                  optionRender={(option) => (
                    <>
                      <Ant.Flex gap="small" key={uuid.v1()}>
                        {option.level === 1 && (
                          <TbBrandAirtable className="text-indigo-500" />
                        )}
                        {option.level === 2 && (
                          <AiOutlineProduct className="text-cyan-500" />
                        )}
                        {option.level === 3 && (
                          <RiBarcodeBoxLine className="text-teal-500" />
                        )}
                        {option.title}
                      </Ant.Flex>
                    </>
                  )}
                  placeholder="لطفا انتخاب کنید ..."
                  fieldNames={{
                    label: "title",
                    value: "id",
                    children: "children",
                  }}
                  showSearch={{ productFilter }}
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
                        value != null &&
                        value > 0 &&
                        value <= productStock.total
                      ) {
                        return Promise.resolve();
                      } else if (value >= productStock.total) {
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
            <Ant.Col xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
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
              <Ant.Form.Item>
                <Ant.Button type="primary" block onClick={submitButtonOnClick}>
                  {"ذخیره"}
                </Ant.Button>
              </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>
        </Ant.Form>
      </CustomContent>
    </>
  );
};

InventoryDocumentDetailAddForm.propTypes = {
  warehouseId: PropTypes.number.isRequired,
  onSuccess: PropTypes.func,
};

export default InventoryDocumentDetailAddForm;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import qs from "qs";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { useFetch, useFetchWithHandler } from "@/api";
import CustomContent from "@/components/common/CustomContent";
import ModalHeader from "@/components/common/ModalHeader";
import { FaFileMedical } from "react-icons/fa";
import { TbBrandAirtable } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { RiBarcodeBoxLine } from "react-icons/ri";

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

  const [productUnitlListData, productUnitListLoading, productUnitListError] =
    useFetch(url.PRODUCT_UNIT);

  const [validationErrors, setValidationErrors] = useState();
  const [productCascaderOption, setProductCascaderOption] = useState([]);
  const [documentDetailValues, setDocumentDetailValues] = useState({});
  const [productInventory, setProductInventory] = useState({
    batchNumberInventory: 0,
    totalInventory: 0,
  });
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
  //====================================================================
  //                        Functions
  //====================================================================
  const productFilter = (inputValue, path) =>
    path.some(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
        String(option.fullCode).indexOf(inputValue) > -1,
    );

  const onProductChange = (value, option) => {
    if (option.length > 1) {
      const selectedProduct = option[option.length - 2];
      const selectedBatchNumber = option[option.length - 1];
      setDocumentDetailValues((documentDetailValues) => ({
        ...documentDetailValues,
        product: { id: selectedProduct.productId, name: selectedProduct.name },
        productDetail: {
          id: selectedBatchNumber.batchNumberId,
          batchNumber: selectedBatchNumber.name,
        },
      }));

      //TODO: Get product inventory from API
      const inventory = 456;
      const totalInventory = 791;
      setProductInventory({
        batchNumberInventory: inventory,
        totalInventory: totalInventory,
      });

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
    };
    onSuccess(detailValues);
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader
        title={"افزودن اقلام برگه ی انبار"}
        icon={<FaFileMedical />}
      />
      <CustomContent>
        <Ant.Form form={form} layout="vertical" onFinish={onFinish}>
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
                  <Ant.Space>
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
                  </Ant.Space>
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
          <Ant.Form.Item
            name={"productUnitId"}
            label="واحد کالا"
            rules={[{ required: true }]}
          >
            <Ant.Select
              placeholder="لطفا انتخاب کنید..."
              disabled={productUnitListLoading}
              loading={productUnitListLoading}
              options={productUnitlListData?.data}
              fieldNames={{ label: "name", value: "id" }}
              onChange={onProductUnitChange}
            />
          </Ant.Form.Item>
          <Ant.Form.Item>
            <Ant.Space wrap>
              <Ant.Typography.Text type="secondary">
                {"موجودی کالا برای سری ساخت:"}
              </Ant.Typography.Text>
              <Ant.Typography.Text>
                {productInventory.batchNumberInventory}
              </Ant.Typography.Text>
              <Ant.Divider type="vertical" />
              <Ant.Typography.Text type="secondary">
                {"موجودی کل:"}
              </Ant.Typography.Text>
              <Ant.Typography.Text>
                {productInventory.totalInventory}
              </Ant.Typography.Text>
            </Ant.Space>
          </Ant.Form.Item>
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
                    value <= productInventory.batchNumberInventory
                  ) {
                    return Promise.resolve();
                  } else if (value >= productInventory.batchNumberInventory) {
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
            <Ant.InputNumber style={{ width: "100%" }} />
          </Ant.Form.Item>
          <Ant.Form.Item name={"description"} label="توضیحات">
            <Ant.Input.TextArea
              rows={3}
              style={{ resize: "none" }}
              showCount
              maxLength={200}
            />
          </Ant.Form.Item>
          <Ant.Form.Item>
            <Ant.Button type="primary" block onClick={submitButtonOnClick}>
              {"ذخیره"}
            </Ant.Button>
          </Ant.Form.Item>
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

import React, { useState } from "react";
import * as Ant from "antd";
import ProductPicker from "@/components/common/ProductPicker";

const ProductPickerSample = () => {
  const [form] = Ant.Form.useForm();
  const [validationErrors, setValidationErrors] = useState();
  const [selectedItemValues, setSelectedItemValues] = useState({});
  
  //warehouseId must be set from another input or a prop
  const warehouseId = 6;
  //these consts must be set from a server response
  const brandId = 1140;
  const productId = 33479;
  const batchNumberId = 8;

  const onProductChange = async (optionData) => {
    if (optionData.productDetail) {
      setValidationErrors("");

      setSelectedItemValues({
        brand: { id: optionData.brand.id, name: optionData.brand.name },
        product: { id: optionData.product.id, name: optionData.product.name },
        productDetail: {
          id: optionData.productDetail.productDetailId,
          batchNumberId: optionData.productDetail.batchNumberId,
          batchNumber: optionData.productDetail.batchNumber,
        },
      });
    } else {
      setValidationErrors("انتخاب کالا و سری ساخت اجباری است");
    }
  };

  const onFinish = () => {
    console.log(selectedItemValues);
    const dataToDisplay = `اطلاعات انتخاب شده در آیتم اول: 
    \r\nbrandId: ${selectedItemValues.brand.id}\r\nbrandName: ${selectedItemValues.brand.name}
    \r\nproductId: ${selectedItemValues.product.id}\r\nproductName: ${selectedItemValues.product.name}
    \r\nproductDetailId: ${selectedItemValues.productDetail.id}
    \r\nbatchNumberId: ${selectedItemValues.productDetail.batchNumberId}\r\nbatchNumber: ${selectedItemValues.productDetail.batchNumber}`;

    alert(dataToDisplay);
  };

  return (
    <Ant.Card>
      <Ant.Row gutter={[8, 20]}>
        <Ant.Col span={24}>
          <Ant.Typography.Text>
            به سه روش می توان از این کامپوننت استفاده کرد. نمونه ی هر کدام در
            فرم زیر قابل مشاهده است.
          </Ant.Typography.Text>
        </Ant.Col>
        <Ant.Col span={24}>
          <Ant.Form form={form} layout="vertical" onFinish={onFinish}>
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
                initialValues={{brandId: brandId, productId: productId, batchNumberId: batchNumberId}}
                warehouseId={warehouseId}
                mode="productDetail"
                onChange={onProductChange}
              />
            </Ant.Form.Item>
            <Ant.Form.Item
              name={"product"}
              label="کالا"
            >
              <ProductPicker warehouseId={warehouseId} mode="product"/>
            </Ant.Form.Item>
            <Ant.Form.Item>
              <Ant.Button onClick={() => form.submit()}>
                {"تایید فرم"}
              </Ant.Button>
            </Ant.Form.Item>
          </Ant.Form>
        </Ant.Col>
      </Ant.Row>
    </Ant.Card>
  );
};

export default ProductPickerSample;
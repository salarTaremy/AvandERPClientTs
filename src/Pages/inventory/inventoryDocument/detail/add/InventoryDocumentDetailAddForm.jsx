import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import qs from "qs";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { useFetch, GetAsync } from "@/api";
import CustomContent from "@/components/common/CustomContent";
import ModalHeader from "@/components/common/ModalHeader";
import { FaFileMedical } from "react-icons/fa";

//====================================================================
//                        Declaration
//====================================================================
const InventoryDocumentDetailAddForm = ({ onSuccess }) => {
  const [form] = Ant.Form.useForm();
  const [productListData, productListLoading, productListError] = useFetch(
    url.PRODUCT,
  );
  //TODO: must be changed after the related method implemented
  const [
    productDetailListData,
    productDetailListLoading,
    productDetailListError,
  ] = useFetch(url.BATCH_NUMBER);

  const [documentDetailValues, setDocumentDetailValues] = useState({});
  const [addonAfter, setAddonAfter] = useState(null);
  const [productInventory, setProductInventory] = useState(null);

  //====================================================================
  //                        useEffects
  //====================================================================

  //====================================================================
  //                        Functions
  //====================================================================
  const onProductChange = (value, option) => {
    setDocumentDetailValues({
      ...documentDetailValues,
      product: { id: option.id, name: option.name },
    });

    //TODO: Get product inventory from API
    const inventory = 456;
    setProductInventory(456);
    setAddonAfter(
      <Ant.Typography.Text>{`موجودی: ${inventory}`}</Ant.Typography.Text>,
    );
  };
  const onProductDetailChange = (value, option) => {
    setDocumentDetailValues({
      ...documentDetailValues,
      productDetail: { id: option.id, batchNumber: option.batchNumber },
    });
  };

  const submitButtonOnClick = () => {
    form.submit();
  };
  const onFinish = (formValues) => {
    const detailValues = {
      quantity: formValues?.quantity,
      description: formValues?.description,
      ...documentDetailValues,
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
          >
            <Ant.Select
              placeholder="لطفا انتخاب کنید..."
              disabled={productListLoading}
              loading={productListLoading}
              options={productListData?.data}
              fieldNames={{ label: "name", value: "id" }}
              onChange={onProductChange}
              showSearch={true}
            />
          </Ant.Form.Item>
          {/* TODO: must be loaded according to selected productId */}
          <Ant.Form.Item
            name={"productDetailId"}
            label="سری ساخت"
            rules={[{ required: true }]}
          >
            <Ant.Select
              placeholder="لطفا انتخاب کنید..."
              disabled={productDetailListLoading}
              loading={productDetailListLoading}
              options={productDetailListData?.data}
              fieldNames={{ label: "batchNumber", value: "id" }}
              onChange={onProductDetailChange}
            />
          </Ant.Form.Item>
          <Ant.Form.Item
            name={"quantity"}
            label="تعداد"
            rules={[
              { required: true },
              {
                validator: (_, value) => {
                  if (value != null && value <= productInventory) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      "مقدار وارد شده بیش از موجودی کالا است.",
                    );
                  }
                },
              },
            ]}
          >
            <Ant.InputNumber
              addonAfter={addonAfter}
              style={{ width: "100%" }}
            />
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
  onSuccess: PropTypes.func,
};

export default InventoryDocumentDetailAddForm;

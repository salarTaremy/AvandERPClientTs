import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as styles from "@/styles";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import useAllLoading from "@/hooks/useAllLoading ";

import qs from "qs";
import * as uuid from "uuid";
import { TbBrandAirtable } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { RiBarcodeBoxLine } from "react-icons/ri";
import CustomContent from "@/components/common/CustomContent";
//====================================================================
//                        Declaration
//====================================================================
const CitySelector = (props) => {
  const { id } = props;
  const [form] = Ant.Form.useForm();
  const pageTitle = "انتخاب درختی";
  const [CityData, CityLoading, CityError, CityApiCall] =
    api.useFetchWithHandler();
  const [options, setOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState({ value: null });
  useRequestManager({ error: CityError });

  const [
    productListData,
    productListLoading,
    productListError,
    productListApiCall,
  ] = api.useFetchWithHandler();
  const [productCascaderOption, setProductCascaderOption] = useState([]);
  const [open, setOpen] = useState(false);
  //...
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    const queryString = qs.stringify({ warehouseId: 6 });
    productListApiCall(`${url.PRODUCT_TREE}?${queryString}`);
  }, []);
  useEffect(() => {
    productListData?.isSuccess &&
      setProductCascaderOption(productListData?.data);
  }, [productListData]);

  useEffect(() => {
    CityApiCall(url.CITY_TREE);
  }, []);
  useEffect(() => {
    CityData?.isSuccess && setOptions(CityData?.data);
    CityData?.isSuccess && form.setFieldValue("city", [1, 1001]);
  }, [CityData]);

  // useEffect(() => {
  //   CityApiCall(url.ACCOUNT_TREE);
  // }, []);
  // useEffect(() => {
  //   CityData?.isSuccess && setOptions(CityData?.data);
  //   CityData?.isSuccess && form.setFieldValue("city", [1, 111,111112 ]);
  // }, [CityData]);
  //====================================================================
  //                        Functions
  //====================================================================
  function onChange(value, selectedOptions) {
    setSelectedItem(value);
  }
  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );

  const [value, setValue] = useState({});
  const onTreeChange = (newValue) => {
    setValue(newValue);
  };
  //====================================================================
  //                        Child Components
  //====================================================================
  const onFinish = async (values) => {
    alert(JSON.stringify(values, null, 1, 1));
  };
  const CitySelector = () => {
    return (
      <>
        <Ant.Button onClick={() => setOpen(true)}>Open modal</Ant.Button>
        <Ant.Modal
          //centered
          width={600}
          // height={800}
          open={open}
          getContainer={null}
          footer={null}
          onCancel={() => setOpen(false)}
          onOk={() => setOpen(false)}
        >
          <Ant.Card>
          <Ant.Row gutter={[8, 12]}>
            <Ant.Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Ant.Cascader
                loading={productListLoading}
                options={productCascaderOption}
                // onChange={onProductChange}
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
                // showSearch={{ productFilter }}
              />
              <Ant.TreeSelect 
                showSearch
                style={{
                  width: '100%',
                }}
                value={value}
                dropdownStyle={{
                  maxHeight: 400,
                  overflow: 'auto',
                }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                onChange={onTreeChange}
                treeData={productCascaderOption}
              />
            </Ant.Col>
          </Ant.Row>
          </Ant.Card>
        </Ant.Modal>

        <Ant.Form form={form} onFinish={onFinish} layout="vertical">
          <Ant.Form.Item name={"city"} rules={[{ required: true }]}>
            <Ant.Cascader
              loading={CityLoading}
              options={options}
              onChange={onChange}
              placeholder="لطفا انتخاب کنید ..."
              fieldNames={{
                label: "name",
                value: "id",
                children: "children",
              }}
              showSearch={{
                filter,
              }}
              onSearch={(value) => console.log(value)}
            />
          </Ant.Form.Item>
          <Ant.Button
            onClick={() => {
              form.submit();
            }}
          >
            {"پست"}
          </Ant.Button>
        </Ant.Form>
        <Ant.Divider></Ant.Divider>
        {JSON.stringify(selectedItem, null, 1, 1)}
      </>
    );
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Card
      Card
      title={pageTitle}
      type="inner"
      style={{ ...styles.CARD_DEFAULT_STYLES }}
      loading={false}
    >
      <CitySelector />
    </Ant.Card>
  );
};

export default CitySelector;
CitySelector.propTypes = {
  id: PropTypes.any,
};

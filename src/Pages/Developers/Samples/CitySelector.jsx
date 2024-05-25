import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as styles from "@/styles";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import useAllLoading from "@/hooks/useAllLoading ";
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
  //...
  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {
    CityApiCall(url.CITY_TREE);
  }, []);
  useEffect(() => {
    CityData?.isSuccess && setOptions(CityData?.data);
    CityData?.isSuccess && form.setFieldValue("city", [1, 1001]);
  }, [CityData]);
  //====================================================================
  //                        Functions
  //====================================================================
  function onChange(value, selectedOptions) {
    setSelectedItem(value);
    console.log("Onchenge", selectedOptions);
  }
  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
  //====================================================================
  //                        Child Components
  //====================================================================
  const onFinish = async (values) => {
    console.log("onFinish", values);
    alert(JSON.stringify(values, null, 1, 1));
  };
  const CitySelector = () => {
    return (
      <>
        <Ant.Form form={form} onFinish={onFinish}>
  
          <Ant.Form.Item name={"city"} rules={[{ required: true }]}>
            <Ant.Cascader
              loading={CityLoading}
              options={options}
              onChange={onChange}
              placeholder="لطفا انتخاب کنید ..."
              fieldNames={{ label: "name", value: "id", children: "children" }}
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
            {'پست'}
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
